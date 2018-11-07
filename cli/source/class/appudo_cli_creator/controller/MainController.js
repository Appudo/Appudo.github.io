/* ************************************************************************

   APPUDO CLI Creator

   https://www.appudo.com

   Copyright: 2018 Appudo UG (haftungsbeschränkt), https://www.appudo.com

   License: MIT License, https://opensource.org/licenses/MIT

   Authors: source@appudo.com

************************************************************************ */

/**
 * @ignore(zip)
 * @ignore(zip.workerScriptsPath)
 * @ignore(webkitRequestFileSystem)
 * @ignore(mozRequestFileSystem)
 * @ignore(requestFileSystem)
 * @ignore(zip.createWriter)
 * @ignore(zip.BlobWriter)
 * @ignore(URL.createObjectURL)
 * @ignore(zip.TextReader)
 * @ignore(zip.createReader)
 * @ignore(zip.BlobReader)
 * @ignore(zip.FileWriter)
 * 
 */
qx.Class.define("appudo_cli_creator.controller.MainController",
{
  extend : qx.core.Object,

  members :
  {
    __root : null,
    __fileData : null,
    __initialData : {},
    __reset : [],
    __dataChange : [],
    __dataSave : [],
    __commandChange : [],
    __dataInitialize : [],
    __operationMap : [],
    __operationData : null,
    __operationDataPending : null,
    __i18nData : null,
    __configData : null,
    __requestFileSystem : window.requestFileSystem || window.webkitRequestFileSystem || window.mozRequestFileSystem,
  
    isInt : function(x) {
      return x % 1 === 0;
    },

    getType : function(v) {
      switch(typeof v) {
        case 'string':
          return 0;
        case 'number':
          if(this.isInt(v)) {
            return 2;
          } else {
            return 3;
          }
        case 'boolean':
          return 1;
        case 'object':
          break;
      }
      return -1;
    },

    __createTempFile : function(callback) {
      var tmpFilename = "tmp.dat";
      requestFileSystem(window.TEMPORARY, 4 * 1024 * 1024 * 1024, function(filesystem) {
        function create() {
          filesystem.root.getFile(tmpFilename, {
            create : true
          }, function(zipFile) {
            callback(zipFile);
          });
        }
  
        filesystem.root.getFile(tmpFilename, null, function(entry) {
          entry.remove(create, create);
        }, create);
      });
    },

    __blobToJson : function(blob, onReady) {
      var reader = new FileReader();
      reader.addEventListener('loadend', function(e) {
        onReady(reader.result);
      });
      reader.readAsText(blob);
    },
 
    __zipCompress : function(onReady, onerror) {
      var tmp = {c:1};
      var _this = this;
      zip.createWriter(new zip.BlobWriter("application/zip"), function(zipWriter) {
        var files = [];
        var rdy = function() {
          var n = files.pop();
          if(n)
            n();
          if(--tmp.c == 0) {
            zipWriter.close(function(blob) {
              onReady(URL.createObjectURL(blob));
            });
          }
        }
        var addFile = function(filename, obj) {
          tmp.c++;
          var s = JSON.stringify(obj);
          files.push(function() {
            zipWriter.add(filename, new zip.TextReader(s), function() {
              rdy();
            }); 
          });
        }
        var fd = _this.__fileData;
        var i18n = fd.deploy.i18n;
        if(i18n) {
          var pn = Object.getOwnPropertyNames(i18n);
          for(var i = 0; i < pn.length; i++) {
            var k = i18n[pn[i]];
            addFile('deploy/i18n/' + k.n, k.d);
          }
        }
        addFile('deploy/cmd.json', fd.deploy['cmd.json'].d);
        addFile('config.json', fd['config.json'].d);
        rdy();
      }, onerror);
    },

    __zipModel : (function() {
      var _this = this;
      return {
        getEntries : function(file, onend, onerror) {
          zip.createReader(new zip.BlobReader(file), function(zipReader) {
            zipReader.getEntries(onend);
          }, onerror);
        },
        getEntryFile : function(entry, creationMethod, onend, onprogress) {
          var writer, zipFileEntry;
  
          function getData() {
            entry.getData(writer, function(blob) {
              onend(blob);
            }, onprogress);
          }
  
          if(creationMethod == "Blob") {
            writer = new zip.BlobWriter();
            getData();
          } else {
            _this.__createTempFile(function(fileEntry) {
              zipFileEntry = fileEntry;
              writer = new zip.FileWriter(zipFileEntry);
              getData();
            });
          }
        }
      };
    }),

    __zipExtract : function(method, fileInput, unzipProgress, onReady, onError, onStart) {
      var _this = this;
      if(typeof requestFileSystem == "undefined" && method == 'File')
        return false;
      fileInput.addEventListener('change', function() {
        var result = {};
        var tmp = {c:0, t:0}
        var model = _this.__zipModel();
  
        unzipProgress.setValue(0);
        unzipProgress.setMax(0);

        onStart();
        model.getEntries(fileInput.files[0], function(entries) {
          entries.forEach(function(entry) {
            tmp.c++;
            model.getEntryFile(entry, method, function(blobURL) {
              var n = entry.filename;
              if(n.endsWith('/'))
                n = n.slice(0, -1); 
              var p = n.split('/');

              var c = result;
              for(var i = 0; i < p.length-(!entry.directory); i++) {
                if(c[p[i]] === undefined)
                  c[p[i]] = {};
                c = c[p[i]];
              }

              if(!entry.directory) {
                c[p[p.length-1]] = {d:blobURL, n:p[p.length-1], t:entry.directory ? 1 : 0};
              }

              if(--tmp.c == 0) {
                onReady(result);
              }

              unzipProgress.setValue(tmp.max - tmp.c);
            }, function(current, total) {
            });
          });
          tmp.max = tmp.c;
          unzipProgress.setMax(tmp.c);
        }, onError);
      }, false);

      return true;
    },

    getFileData : function() {
      return this.__fileData === this.__initialData ? null : this.__fileData;
    },

    getConfigInfoFile : function(onReady) {
      if(this.__configData)
      {
        onReady(this.__configData);
        return;
      }
      var req = new qx.io.remote.Request('resource/cmd/data.json', "GET", "text/plain");
      var _this = this;
      req.addListener("completed", function(e) {
        _this.__configData = JSON.parse(e.getContent());
        onReady(_this.__configData);
      });

      req.send();
    },

    __parseI18nData : function(d, map) {
      var r = {p:[], g:[], gn:[]};
      var pn = d.p;
      for(var i = 0; i < pn.length; i++) {
        var opName = pn[i].n;
        var idx = map[opName];
        if(idx) {
          var e = d.p[i].e;
          var pa = r.p[idx] = [];
          var ga = r.g[idx] = [];
          var opn = Object.getOwnPropertyNames(e);
          opn.sort(function(a, b) {
            return a.localeCompare(b, undefined, {numeric:true});
          });
          for(var j = 0; j < opn.length; j++) {
            var key = opn[j];
            if(key.startsWith('c_')) {
              ga.push(e[key]);
            } else {
              pa.push(e[key]);
            }
          }
        }
      }
      var opn = Object.getOwnPropertyNames(d.g);
      opn.sort(function(a, b) {
        return a.localeCompare(b, undefined, {numeric:true});
      });
      for(var j = 0; j < opn.length; j++) {
        var key = opn[j];
        r.gn.push(d.g[key]);
      }
      return r;
    },

    getOperationInfoFile : function(onReady) {
      var _this = this;
      if(this.__operationData)
      {
        onReady(this.__operationData, this.__i18nData);
        return;
      }
      if(!this.__operationDataPending) {
        this.__operationDataPending = [];
      } else {
        return this.__operationDataPending.push(function() {
          onReady(_this.__operationData, _this.__i18nData);
        });
      }
      if(this.__fileData) {
        var version = this.__fileData['config.json'].d.version;
        var cmd_req = new qx.io.remote.Request('resource/cmd/' + version + '.json', "GET", "text/plain");
        var i18n_req = new qx.io.remote.Request('resource/cmd/i18n_' + version + '.json', "GET", "text/plain");
        var r = {};
        var num = 0;
        var ready = function() {
          if(++num == 2) {
            _this.__i18nData = _this.__parseI18nData(r.i18n, r.map);
            if(_this.__operationDataPending) {
              _this.__operationDataPending.forEach(function(n) {
                n();
              });
              _this.__operationDataPending = null;
            }
            onReady(_this.__operationData, _this.__i18nData);
          }
        }
        cmd_req.addListener("completed", function(e) {
          _this.__operationData = JSON.parse(e.getContent());
          _this.__operationMap = {};
          r.map = {};
          var pn = _this.__operationData.operations;
          for(var i = 0; i < pn.length; i++) {
            var d = pn[i];
            r.map[d.n] = d.i;
            _this.__operationMap[d.i] = d;
          }
          ready();
        });
        i18n_req.addListener("completed", function(e) {
          r.i18n = JSON.parse(e.getContent());
          ready();
        });

        i18n_req.send();
        cmd_req.send();
      } else {
        onReady({});
      }
    },

    getOperationInfo : function(opIdx) {
      return this.__operationMap[opIdx];
    },

    getOperationTypes : function() {
      return this.__operationData.types;
    },

    getRawFileData : function() {
      return this.__fileData;
    },

    initData : function() {
      this.__fileData = this.__initialData;
    },

    modifyData : function() {
      if(this.__fileData === this.__initialData) {
        this.__initialData = JSON.parse(JSON.stringify(this.__initialData));
        this.__doDataInitialized();
      }
    },

    resetOperationData : function(from) {
      this.__operationData = null;
      this.__operationMap = null;
      this.__i18nData = null;
      this.__doReset(from);
    },

    refreshData : function(from) {
      this.__doReset(from);
    },

    resetData : function(from) {
      this.initData();
      this.__i18nData = null;
      this.__operationData = null;
      this.__operationMap = null;
      this.__doReset(from);
    },

    updateData : function(from) {
      this.fillDefaults(this.__fileData);
      this.__i18nData = null;
      this.__operationData = null;
      this.__operationMap = null;
      this.__doReset(from);
      this.settingViewUpdate(this.__fileData['config.json']);
    },

    getCommandSelection : function() {
      return null;
    },

    getOperationSelection : function() {
      return null;
    },

    setCommandSelection : function(v) {
    },

    setOperationSelection : function(v) {
    },

    getSelection : function() {
      return {cmd:this.getCommandSelection(), op:this.getOperationSelection()};
    },

    setSelection : function(sel) {
      if(sel.cmd) {
        this.setCommandSelection(sel.cmd);
        if(sel.op) {
          this.setOperationSelection(sel.op);
        }
      }
    },

    changedData : function(from, full, info) {
      this.__doDataChanged(from, full, info);
    },

    fillDefaults : function(fileData) {
      var d;
      if((d = fileData['config.json']) == undefined) {
        d = fileData['config.json'] = {};
        d.n = 'config.json';
        d.d = {};
      }

      if(d.d.version == undefined)
        d.d.version = "v1";

      if(fileData['deploy'] == undefined) {
        d = fileData.deploy = {};
      }

      if(fileData.deploy['cmd.json'] == undefined) {
        d = fileData.deploy['cmd.json'] = {};
        d.n = 'cmd.json';
        d.d = {};
      } 

      if(fileData.deploy['i18n'] == undefined) {
        fileData.deploy['i18n'] = {};
      }

      if(!d.d['_']) {
        d.d['_'] = {};
      }

      if(!d.d['f']) {
        d.d['f'] = [];
      }

      if(!d.d['s']) {
        d.d['s'] = [];
      }
    },

    saveFile : function(filename, onready, onerror) {
      var URL = window.URL || window.webkitURL || window.mozURL;

      this.__doDataSaved();

      var onReady = function(url) {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
        a.parentNode.removeChild(a);
        onready();
      }
      this.__zipCompress(onReady, onerror);
    },

    loadFile : function(fileInput, unzipProgress) {
      var _this = this;
      this.__zipExtract('Blob', fileInput, unzipProgress, function(e) {
        var d = e.deploy;
        var tmp = {c:1};
        var c;
        var rdy = function() {
          if(--tmp.c == 0 && !tmp.err) {
            _this.__fileData = e;
            _this.updateData();
            _this.loadOk();
          }
        };
        if(d) {
          var i18n = d.i18n;
          if(i18n) {
            var pn = Object.getOwnPropertyNames(i18n);
            for(var i = 0; i < pn.length; i++) {
              if(pn[i].endsWith('.json')) {
                tmp.c++;
                (function() {
                  var k = i18n[pn[i]];
                  _this.__blobToJson(k.d, function(txt) {
                    try {
                      k.d = JSON.parse(txt);
                    } catch(v) {
                      tmp.err = 'cannot parse ' + k.n;
                      _this.loadError(tmp.err);
                    }
                    rdy();
                  });
                })();
              }
            }
          }

          if((c = d['cmd.json'])) {
            tmp.c++;
            (function() {
              var k = c;
              _this.__blobToJson(k.d, function(txt) {
                try {
                  k.d = JSON.parse(txt);
                } catch(v) {
                  tmp.err = 'cannot parse ' + k.n;
                  _this.loadError(tmp.err);
                }
                rdy();
              });
            })();
          }
        }
        if((c = e['config.json'])) {
          tmp.c++;
          (function() {
            var k = c;
            _this.__blobToJson(k.d, function(txt) {
              try {
                k.d = JSON.parse(txt);
              } catch(v) {
                tmp.err = 'cannot parse ' + k.n;
                _this.loadError(tmp.err);
              }
              rdy();
            });
          })();
        }
        rdy();
      }, function() {
        _this.loadError();
      }, function() {
        _this.initData();
        _this.loadStart();
      });
    },

    openLink: function(link) {
      window.open(link, '_blank');
    },

    getRoot : function() {
      return this.__root;
    },

    addReset : function(fkt) {
      this.__reset.push(fkt);
    },

    addDataChanged : function(fkt) {
      this.__dataChange.push(fkt);
    },

    addDataSaved : function(fkt) {
      this.__dataSave.push(fkt);
    },

    addCommandChanged : function(fkt) {
      this.__commandChange.push(fkt);
    },

    addDataInitialized : function(fkt) {
      this.__dataInitialize.push(fkt);
    },

    __doReset : function(from) {
      this.__reset.forEach(function(n) {
        n(from);
      });
    },

    __doDataInitialized : function(from, full) {
      this.__dataInitialize.forEach(function(n) {
        n(from, full);
      });
    },

    __doDataChanged : function(from, full, info) {
      this.__dataChange.forEach(function(n) {
        n(from, full, info);
      });
    },

    __doDataSaved : function(from, full, info) {
      this.__dataSave.forEach(function(n) {
        n(from, full, info);
      });
    },

    __doCommandChanged : function(from, cmd, text, path, kind) {
      this.__commandChange.forEach(function(n) {
        n(from, cmd, text, path, kind);
      });
    },

    setCommand : function(from, cmd, text, path, kind) {
      this.__doCommandChanged(from, cmd, text, path, kind);
    },

    getCommandOps : function(cmd) {
      var chain = null;
      if(cmd) {
        if(Array.isArray(cmd)) {
          chain = cmd;
        } else {
          var chain = cmd.o;
          if(chain !== undefined && !Array.isArray(chain)) {
            if(typeof chain == 'number') {
              chain = cmd;
            }
            chain = [chain];
          }
        }
      }
      return chain || [];
    },
  
    getI18nOpMap : function(i18nItems, op) {
      var nMap = null;
      var n = 0;
      for(var j = 0; j < i18nItems.length; j++) {
        var deps = i18nItems[j].d;
        var pn = 1;
        if(deps) {
          deps = deps.split('+');
          for(var k = 0; k < deps.length; k++) {
            var o = op[deps[k]];
            if(o) {
              var nn = o.length || 0;
              if(nn > pn)
                pn = nn;
            }
          }
          if(!nMap) 
            nMap = {};
          nMap[j] = pn;
        }
        n += pn;
      }
      return {map: nMap, num:n};
    }
  },

  construct : function(root)
  {
    this.base(arguments);
    this.__root = root;
    this.fillDefaults(this.__initialData);
    zip.workerScriptsPath = "./resource/zip/";
  },
  
  destruct : function() {
    this._disposeObjects("__requestFileSystem", "__root");
  }
});