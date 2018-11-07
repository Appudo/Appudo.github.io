/* ************************************************************************

   APPUDO CLI Creator

   https://www.appudo.com

   Copyright: 2018 Appudo UG (haftungsbeschränkt), https://www.appudo.com

   License: MIT License, https://opensource.org/licenses/MIT

   Authors: source@appudo.com

************************************************************************ */

qx.Class.define("appudo_cli_creator.view.desktop.I18nView",
{
  extend : qx.ui.container.Composite,

  members : {
    __controller : null,
    __currentData : null,
    __horizontalSplitPane : null,
    __i18nSetupCurrentLbl : null,
    __tree : null,
    __treeFilter : null,
    __saveBtn : null,
    __editor : null,
    __addDlg : null,
    __remDlg : null,
    __addBtn : null,
    __remBtn : null,
    __languages : null,
    __langCommandData : null,
    __langFunctionData : null,
    __langGeneralData : null,
    __langStartupData : null,
    __justAdded : true,
    __listenerId : -1,
    __pending : false,

    getLang : function() {
      return this.getSelection().lang;
    },

    getLangData : function() {
      return {
        cmd:this.__langCommandData,
        func:this.__langFunctionData,
        general:this.__langGeneralData,
        startup:this.__langStartupData
      };
    },

    activate : function() {
      this.__tree.try_update();
      this.__tryRefresh();
    },

    __expandObject : function(parent, v, num) {
      var r = new Array(num);
      var node;
      var items;
      if(typeof v != 'object')
          return r;
      if(Array.isArray(v)) {
        items = v;
      } else {
        if(!v.o) {
          items = [v];
        } else {
          items = v.o;
        }
      }
      for(var i = 0; i < items.length; i++) {
        var n = items[i];
        var m = [];
        if(typeof n != 'object') {
          if(i < num) {
            if(r[i]) {
              r[i].onRemove();
            }
            r[i] = null;
          }
        } else {
          if(n.p) {
            for(var j = 0; j < n.p.length; j++) {
              var idx = n.p[j];
              if(typeof idx == 'number') {
                if(idx < num) {
                  if(r[idx]) {
                    r[idx].onRemove();
                  }
                  node = new appudo_cli_creator.view.desktop.I18nDataNode();
                  node.setParent(parent);
                  node.setData(n);
                  node.setMulti(m);
                  m.push(node);
                  r[idx] = node;
                }
              } else 
              if(Array.isArray(idx) && (idx.length % 2) == 0) {
                for(var k = 0; k < (idx.length >> 1); k+= 2) {
                  var a = idx[k];
                  var b = idx[k + 1];
                  if(a < num && b < num) {
                    if(a > b) {
                        var c = b;
                        b = a;
                        a = c;
                    }

                    for(; a <= b; a++) {
                      if(r[a]) {
                        r[a].onRemove();
                      }

                      node = new appudo_cli_creator.view.desktop.I18nDataNode();
                      node.setParent(parent);
                      node.setData(n);
                      node.setMulti(m);
                      m.push(node);
                      r[a] = node;
                    }
                  }
                }
              }
            }
          } else {
            if(i < num) {
              if(r[i]) {
                r[i].onRemove();
              }
              node = new appudo_cli_creator.view.desktop.I18nDataNode();
              node.setParent(parent);
              node.setData(n);
              node.setMulti(m);
              m.push(node);
              r[i] = node;
            }
          }
        }
      }
      for(var i = 0; i < r.length; i++) {
        var item = r[i];
        if(item) {
          item.checkMulti();
        }
      }
      parent.setChildren(r);
      return r;
    },

    addCommandI18n : function(path) {
      var lang = this.getLang();
      return this.__langCommandData.addData(lang, path, true);
    },

    addFuncI18n : function() {
      var lang = this.getLang();
      return this.__langFunctionData.addData(lang, ['_'], true);
    },

    addStartupI18n : function() {
      var lang = this.getLang();
      return this.__langStartupData.addData(lang, ['_'], true);
    },

    addGeneralI18n : function() {
      var lang = this.getLang();
      return this.__langGeneralData.addData(lang, ['_'], true);
    },
    
    __parseGeneralI18n : function() {
      this.__forEachLang(function(lang, i18n) {
        var d = this.__langGeneralData.addData(lang, ['_']);
        var items = i18n.e;
        if(items) {
          this.__expandObject(d, items, items.length);
        }
      });
    },

    __parseCommandI18n : function(ops, i18nNode, i18nData, s) {
      var _this = this;
      this.__controller.getOperationInfoFile(function(data, i18n) {
        if(typeof ops != 'object') {
          ops = [{o:ops}];
        }
        var cdata = _this.__expandObject(i18nNode, i18nData || {o:[]}, ops.length + s);

        for(var i = s; i < cdata.length; i++) {
          var ditem = cdata[i];
          if(ditem) {
            var op = ops[i - s];
            var general = new appudo_cli_creator.view.desktop.I18nDataNode();
            var print = new appudo_cli_creator.view.desktop.I18nDataNode();
            
            ditem.addChild(general);
            ditem.addChild(print);
            general.setParent(ditem);
            print.setParent(ditem);
            var kn = i18n.p[op.o];
            var dta = ditem.getData();
            var nm = _this.__controller.getI18nOpMap(kn, op);
            var nMap = nm.map;
            var n = nm.num;

            print.setNMap(nMap);

            _this.__expandObject(general, dta.g || {o:[]}, i18n.g[op.o].length);
            var c = _this.__expandObject(print, dta || {o:[]}, n);
          }
        }
      });
    },

    __forEachLang : function(handler) {
      var children = this.__languages.getChildren();
      for(var i = 0; i < children.length; i++) {
        var child = children[i];
        if(child.getEnabled()) {
          var fd = this.__controller.getRawFileData();
          var lang = child.getLabel();
          var i18n = fd.deploy.i18n[lang + '.json'].d;
          handler.call(this, lang, i18n);
        }
      }
    },

    __parseCommands : function(path, node, key, data) {
      if(key == 'o'  || key == '_') {
        var kind = node.t
        if(kind > 3) {
          this.__forEachLang(function(lang, i18n) {
            var d = this.__langCommandData.addData(lang, path);
            i18n = i18n['_'];
            for(var j = 0; j < path.length; j++) {
              i18n = i18n[path[j]];
              if(!i18n)
                break;
            }
            this.__parseCommandI18n(data, d, i18n, 1);
          });
        }
        return;
      }

      var cmd = node;
      var pn = Object.getOwnPropertyNames(data || {});
      if(key !== undefined)
      {
        cmd = {t:6};
      }

      if(key !== undefined)
        path.push(key);
      for(var i = 0; i < pn.length; i++) {
        this.__parseCommands(path, cmd, pn[i], data[pn[i]]);
      }
      if(key !== undefined)
        path.pop();
    },

    __parseFunctions : function(node, data) {
      var _this = this;
      if(data === undefined)
        return;

      this.__forEachLang(function(lang, i18n) {
        var p = _this.__langFunctionData.addData(lang, ['_']);
        var c = new Array(data.length);
        i18n = i18n['f'];
        p.setChildren(c);
        data.forEach(function(n, i) {
          var d = c[i] = new appudo_cli_creator.view.desktop.I18nDataNode();
          d.setParent(p)
          _this.__parseCommandI18n(n, d, i18n[i], 1);
        });
      });
    },

    __parseStartup: function(node, data) {
      var _this = this;
      if(data === undefined)
        return;

      this.__forEachLang(function(lang, i18n) {
        var d = _this.__langStartupData.addData(lang, ['_']);
        i18n = i18n['s'];

        this.__parseCommandI18n(data, d, i18n, 1);
      });
    },

    /*
     * Parse i18n data files into a data structure that fits the command data structure.
     * The structure is aware of multi usage of i18n data due to placement.
     * It is possible to retrieve and change multi usage of i18n data.
     * It is possible to easily adapt i18n data to command data changes for all languages.
     * The data structure is used to serialize i18n data back to i18n files.
     */
    __parseLanguages : function() {
      var fd = this.__controller.getRawFileData();
      var cmd = fd.deploy['cmd.json'].d;
      this._disposeObjects("__langCommandData", "__langFunctionData", "__langGeneralData", "__langStartupData");
      this.__langCommandData = new appudo_cli_creator.view.desktop.I18nLangNode();
      this.__langFunctionData = new appudo_cli_creator.view.desktop.I18nLangNode();
      this.__langGeneralData = new appudo_cli_creator.view.desktop.I18nLangNode();
      this.__langStartupData = new appudo_cli_creator.view.desktop.I18nLangNode();
      var children = this.__languages.getChildren();
      for(var i = 0; i < children.length; i++) {
        var child = children[i];
        if(child.getEnabled()) {
          var lang = child.getLabel();
          this.__langCommandData.addLang(lang);
          this.__langFunctionData.addLang(lang);
          this.__langGeneralData.addLang(lang);
          this.__langStartupData.addLang(lang);
        }
      }
      var p = [];
      this.__parseCommands(p, {t:1}, undefined, cmd['_']);
      this.__parseFunctions({t:1}, cmd['f']);
      this.__parseStartup({t:1}, cmd['s']);
      this.__parseGeneralI18n();
    },

    __onReset : function() {
      this.__tree.doReset();
      this.__setup.doReset();
      this.clear(true);
      this.__parseLanguages();
      this.__tree.clear();
    },

    __copyI18nValue : function(to, from) {
      var r = 0;
      if(from.o !== undefined) {
        from = from.o;
        r++;
      }
      if(from.f !== undefined) {
        to.f = from.f;
        r++;
      }
      if(from.v !== undefined) {
        to.v = from.v;
        r++;
      }
      if(from.u !== undefined) {
        to.u = from.u;
        r++;
      }
      if(from.v !== undefined) {
        to.g = from.g;
        r++;
      }
      return r;
    },

    split : function(treeNodes) {
      for(var i = 0; i < treeNodes.length; i++) {
        var node = treeNodes[i];
        var dn = node.getNodeData();
        var data = dn.getData();
        data = JSON.parse(JSON.stringify(data));
        dn.setData(data);
        dn.resetMultiPath();
      }
    },

    __saveItem : function(item) {
      // save and optimize data
      var _this = this;
      var item;
      var items = item.getChildren();
      var res = [];
      var obj;
      var data;
      var i;
      var c;
      var ro;
      var map0 = {};
      if(items) {
        res[0] = 0;
        if(items[0] && (data = items[0].getData())) { // command description
          obj = {};
          if(this.__copyI18nValue(obj, data) != 0)
            res[0] = obj;
        }
        for(i = 1; i < items.length; i++) {  // operations
          res[i] = 0;
          item = items[i];
          var ritem = null;
          if(item && (c = item.getChildren())) {
            var general = c[0]  // general
            var print = c[1]  // print

            var collect = function(node) {
              var ro = [];
              var obj;
              var num = 0;
              if(print && (c = node.getChildren())) {
                num = c.length;
                var map = {};
                for(var k = 0; k < num; k++) {
                  item = c[k];
                  if(item) {
                    data = item.getData();
                    if(data) {
                      obj = {};
                      _this.__copyI18nValue(obj, data);
                      var key = JSON.stringify(obj);
                      var mi = map[key];
                      if(mi === undefined) {
                        map[key] = k;
                        ro[k] = obj;
                      } else {
                        var a = ro[mi];
                        if(!a.p) {
                          a.p = [mi];
                        }
                        a.p.push(k);
                      }
                    }
                  }
                }

                var opn = Object.getOwnPropertyNames(map);
                var end = ro.length - 1;
                var multiIdx = 0;
                for(var k = 0; k <= end; k++) {
                  obj = ro[k];
                  if(!obj) {
                    var kidx;
                    while(true) {
                      kidx = undefined;
                      if(multiIdx < opn.length) {
                        kidx = map[opn[multiIdx++]];
                        if(kidx <= k || !ro[kidx].p) {
                          continue;
                        }
                      }
                      break;
                    }
                    if(kidx !== undefined) {
                      ro[k] = ro[kidx];
                      ro[kidx] = undefined;
                    } else {
                      var hit = false;
                      while(!hit && k <= end) {
                        var hit = ro[end];
                        if(hit) {
                          obj = ro[k] = ro[end];
                          obj.p = [end];
                        }
                        end--;
                        ro.length--;
                      }
                    }
                  } else {
                    if(obj.p) {
                      // TODO optimize p array
                    }
                  }
                }
              }
              return {num:num, r:ro.length == 0 ? 0 : ro};
            }

            var ro = collect(print);
            var max_num = ro.r ? ro.num : 0;
            var rg = collect(general);
            max_num = rg.r && rg.num > max_num ? rg.num : max_num;
            rg = rg.r;
            ro = ro.r;
            if(rg) {
              if(!ro) {
                ro = {g:rg};
                if(max_num > rg.length)
                  ro.n = max_num;
              } else {
                var oro = ro;
                ro = {o:ro, g:rg};
                if(max_num > rg.length || max_num > oro.length)
                  ro.n = max_num;
              }
            } else {
              if(ro) {
                if(max_num > ro.length) {
                  ro = {o:ro};
                }
                ro.n = max_num;
              }
            }
            ritem = ro;
          }  
          
          if(ritem) {
            var key = JSON.stringify(ritem);
            var mi = map0[key];
            if(mi === undefined) {
              map0[key] = i;
              res[i] = ritem;
            } else { 
              if(Array.isArray(ritem)) {
                ritem = {o:ritem};
              }
              if(!ritem.p) {
                ritem.p = [mi];
              }
              ritem.p.push(i);
            }
          }
        }
      }

      var opn = Object.getOwnPropertyNames(map0);
      var end = res.length - 1;
      var multiIdx = 0;
      for(var k = 1; k <= end; k++) {
        obj = res[k];
        if(!obj) {
          var kidx;
          while(true) {
            kidx = undefined;
            if(multiIdx < opn.length) {
              kidx = map0[opn[multiIdx++]];
              if(kidx <= k || !res[kidx].p) {
                continue;
              }
            }
            break;
          }
          if(kidx !== undefined) {
            res[k] = res[kidx];
            res[kidx] = undefined;
          } else {
            var hit = false;
            while(!hit && k <= end) {
              var hit = res[end];
              if(hit) {
                obj = res[k] = res[end];
                obj.p = [end];
              }
              end--;
              res.length--;
            }
          }
        } else {
          if(obj.p) {
            // TODO optimize p array
          }
        }
      }

      if(res.length == 1 && !res[0])
        res.length--;

      return res.length != 0 ? res : 0;
    },

    __saveCommand : function(obj, path, res) {
      var sp = path.split('/');
      var n = obj;
      for(var i = 0; i < sp.length - 1; i++) {
        var key = sp[i];
        n = n[key];
        if(!n) {
          n = obj[key] = {};
        }
      }
      n[sp[sp.length - 1]] = res;
    },

    __saveTree : function(lang) {
      var data;
      var path;
      var item;
      var i;
      var pn;
      var a;
      var result = {'_':{},'s':[],'f':[]};
      var items;
      // rebuild data from structure
      items = this.__langGeneralData.getData(lang, ['_']);
      if(items && (items = items.getChildren())) {
        a = result.e = [];
        for(i = 0; i < items.length; i++) {
          item = items[i];
          if(item && (data = item.getData())) {
            this.__copyI18nValue(a[i] = {}, data);
          } else {
            a[i] = 0;
          }
        }
      }
      items = this.__langCommandData.getMap()[lang];
      if(items) {
        pn = Object.getOwnPropertyNames(items);
        for(i = 0; i < pn.length; i++) {
          path = pn[i];
          item = items[path];
          if(item.getChildren()) {
            var o = this.__saveItem(item);
            this.__saveCommand(result['_'], path, o);
          }
        }
      }
      items = this.__langFunctionData.getData(lang, ['_']);
      if(items && (items = items.getChildren())) {
        for(i = 0; i < items.length; i++) {
          item = items[i];
          result.f[i] = this.__saveItem(item);
        }
      }
      items = this.__langStartupData.getData(lang, ['_']);
      if(items) {
        result.s = this.__saveItem(items);
      }

      if(!result.f || result.f.length == 0)
        delete result.f;

      if(!result.s || result.s.length == 0)
        delete result.s;

      var fd = this.__controller.getRawFileData();
      fd.deploy.i18n[lang + '.json'].d = result;
    },

    __saveCurrent : function() {
      this.__saveTree(this.getLang());
      this.__parseLanguages();
      this.__tree.update();
      this.__updateEditor();
    },
    
    __onDataSave : function() {
      this.__forEachLang(function(lang, i18n) {
        this.__saveTree(lang);
      });
    },

    __removeChildren : function(parent, expect) {
      var hit;
      while(true) {
        hit = false;
        var c = parent.getChildren();
        for(var i = 0; i < c.length; i++) {
          if(c[i] !== expect) {
            parent.remove(c[i]);
            hit = true;
            break;
          }
        }
        if(!hit)
          break;
      }
    },
    
    clear : function(noTreeRefresh) {
      var cmdKind;
      var data = this.__controller.getRawFileData();
      var i18n = this.__currentData = data.deploy.i18n;
      var s = this.getSelection();
      var dmy = new qx.ui.form.ListItem(this.tr("Language"), null, 0);
      dmy.setTextColor('#616161');
      dmy.setEnabled(false);
      this.__languages.add(dmy);
      this.__languages.setSelection([dmy]);
      this.__removeChildren(this.__languages, dmy);
      this.__tree.setEnabled(false);
      var pn = Object.getOwnPropertyNames(i18n);
      for(var i = 0; i < pn.length; i++) {
        var k = pn[i];
        if(k.endsWith('.json')) {
          cmdKind = new qx.ui.form.ListItem(k.substring(0, k.length - 5), null, 0);
          this.__languages.add(cmdKind);
        } else {
          delete i18n[k];
        }
      }
      if(this.__languages.getChildren().length != 1) {
        this.__languages.remove(dmy);
        this.__tree.setEnabled(true);
        this.__remBtn.setEnabled(true);
      }

      if(!noTreeRefresh) {
        this.__tree.clear();
      }

      this.__i18nSetupCurrentLbl.resetValue();
      this.setSelection(s);
      this.__updateEditor();
    },

    __onChangeLanguage : function() {
      this.__updateEditor();
      this.__tree.update(true);
    },

    changedI18nData : function(full) {
      this.__controller.modifyData();
      if(full) {
        this.__saveCurrent();
      }
      this.__updateEditor();
    },

    __updateEditor : function() {
      var sel = this.__languages.getSelection();
      var hit = false;
      if(sel.length) {
        var item = sel[0];
        if(item.getEnabled()) {
          var data = this.__currentData[item.getLabel() + '.json'].d;
          this.__justAdded = true;
          this.__editor.setValue(JSON.stringify(data, undefined, 4));
          this.__saveBtn.setEnabled(false);
          this.__justAdded = false;
          this.__addEditorListener();
          hit = true;
        }
      }

      if(!hit) {
        this.__justAdded = true;
        this.__editor.resetValue();
        this.__saveBtn.setEnabled(false);
        this.__justAdded = false;
        this.__addEditorListener();
      }
    },

    getSelection : function() {
      var r = {};
      var s = this.__languages.getSelection();
      if(s.length && s[0].getEnabled()) {
        r.lang = s[0].getLabel();
      }
      return r;
    },

    setSelection : function(r) {
      if(r.lang) {
        var children = this.__languages.getChildren();
        for(var i = 0; i < children.length; i++) {
          var child = children[i];
          if(child.getLabel() == r.lang) {
            this.__languages.setSelection([child]);
            break;
          }
        }
      }
    },

    doSelect : function(path, data, kind, kindData) {
      this.__onSelect(path, data, kind, kindData);
    },

    __onSelect : function(path, data, kind, kindData) {
      if(data) {
        var t = '[ ';
        for(var i = 1; i < path.length; i++) {
          t += path[i] + ' / ';
        }
        t = t.slice(0, -3);
        t += ' ]';
  
        this.__i18nSetupCurrentLbl.setValue(t);
      } else {
        this.__i18nSetupCurrentLbl.resetValue();
      }

      this.__setup.doSelect(path, data, kind, kindData);
    },

    __tryRefresh : function() {
      if(this.__pending) {
        this.__pending = false;
        this.__parseLanguages();
        this.__tree.update();
      }
    },

    doRefresh : function() {
      if(this.__controller.isActive(this)) {
        this.__pending = false;
        this.__parseLanguages();
        this.__tree.update();
      } else {
        this.__pending = true;
      }
    },

    __onDataChange : function(full, info) {
      var _this = this;
      var needSave = false;
      var needRefresh = false;
      var c;
      if(info) { 
        var t = info.t;
        if(t.indexOf('OperationChain') != -1) {
          var path = this.__tree.getCurrentPath();
          var kind = this.__tree.getCurrentCommandKind();
          var base;
          var getBase = function(lang) {
            var base;
            if(kind == 3) { // startup
              base = _this.__langStartupData.getData(lang, ['_']);
            } else
            if(kind == 4) { // functions
              base = _this.__langFunctionData.getData(lang, ['_']);
              var c = base.getChildren();
              if(c) {
                base = c[parseInt(path[0])];
              } else {
                base = null;
              }
            } else {        // command
              base = _this.__langCommandData.getData(lang, path);
            }
            return base;
          }
          switch(t) {
            case 'OperationChainRemove':
              this.__forEachLang(function(lang, i18n) {
                base = getBase(lang);
                c = base ? base.getChildren() : null;
                if(c) {
                  c.splice(info.index + 1, 1);
                }
              });
              needSave = true;
              needRefresh = true;
              break;
            case 'OperationChainAdd':
              this.__forEachLang(function(lang, i18n) {
                base = getBase(lang);
                c = base ? base.getChildren() : null;
                if(c) {
                  c.splice(info.index + 1, 0, 0);
                }
              });
              needSave = true;
              needRefresh = true;
              break;
            case 'OperationChainMove':
              this.__forEachLang(function(lang, i18n) {
                base = getBase(lang);
                c = base ? base.getChildren() : null;
                if(c) {
                  var item_data = c.splice(info.findex + 1, 1)[0];
                  c.splice(info.tindex + 1, 0, item_data);
                }
              });
              needSave = true;
              needRefresh = true;
              break;
          }
        }
        
        if(t.indexOf('CommandTree') != -1) {
          switch(t) {
            case 'CommandTreeAddFunc':
              needRefresh = true;
              break;
            case 'CommandTreeAddCmd':
              needRefresh = true;
              break;
            case 'CommandTreeRemCmd':
              this.__forEachLang(function(lang, i18n) {
                var n0 = info.p.shift();
                var n1 = info.p.shift();
                if(info.c) {
                  this.__langCommandData.removePrefix(lang, info.p);
                } else {
                  this.__langCommandData.removeData(lang, info.p);
                }
                info.p.splice(0, 0, n0, n1);
              });
              needSave = true;
              break;
            case 'CommandTreeRemFunc':
              this.__forEachLang(function(lang, i18n) {
                var base = this.__langFunctionData.getData(lang, ['_']);
                c = base ? base.getChildren() : null;
                if(c) {
                  c.splice(info.index, 1);
                }
              });
              needSave = true;
              break;
            case 'CommandTreeReorderFunc':
              this.__forEachLang(function(lang, i18n) {
                var base = this.__langFunctionData.getData(lang, ['_']);
                c = base ? base.getChildren() : null;
                if(c) {
                  var item_data = c.splice(info.findex, 1)[0];
                  c.splice(info.tindex, 0, item_data);
                }
              });
              needSave = true;
              break;
            case 'CommandTreeReorderCmd':
              this.__forEachLang(function(lang, i18n) {
                var n0 = info.from.shift();
                var n1 = info.from.shift();
                var fromBase = this.__langCommandData.removeData(lang, info.from);
                info.from.splice(0, 0, n0, n1);
                n0 = info.to.shift();
                n1 = info.to.shift();
                var toBase = this.__langCommandData.addData(lang, info.to, true);
                info.to.splice(0, 0, n0, n1);
                toBase.setChildren(fromBase.getChildren());
              });
              needSave = true;
              break;
          }
        }
        if(needSave) {
          this.__onDataSave();
          this.__updateEditor();
        }
        if(needRefresh) {
          this.doRefresh();
        }
      }
    },
    
    __onDataChangeSelf : function(full) {
    },

    __addEditorListener : function() {
      if(this.__listenerId == -1) {
        this.__listenerId = this.__editor.addListener('changeValue', this.__onChangeValue, this);
      }
    },

    __onChangeValue : function() {
      if(this.__justAdded) {
        return;
      }
      if(this.__listenerId != -1) {
        this.__editor.removeListenerById(this.__listenerId);
        this.__listenerId = -1;
      }
      this.__saveBtn.setEnabled(true);
    },

    __onSave : function() {      
      var data = this.__currentData;
      var newData;
      var lang;
      var s = this.__languages.getSelection();
      var sel = this.getSelection();
      if(s.length == 0)
        return;
      lang = s[0].getLabel();

      try {
        newData = JSON.parse(this.__editor.getValue());
      } catch(e) {
        console.log(e);
        return;
      }

      data[lang + '.json'].d = newData;
      this.clear(true);
      this.__parseLanguages();
      this.__tree.update();

      this.setSelection(sel);
      this.__saveBtn.setEnabled(false);
      this.__addEditorListener();
    }
  },

  construct : function(controller)
  {
    var _this = this;
    this.__controller = controller;
    this.base(arguments);

    this.setLayout(new qx.ui.layout.VBox());

    var stack = new qx.ui.container.Stack();
    this.__horizontalSplitPane = new qx.ui.splitpane.Pane().set({appearance:'app-splitpane'});
    this.add(this.__horizontalSplitPane, {flex:1});
    this.__horizontalSplitPane.setPadding(0);
    this.__horizontalSplitPane.setPaddingTop(0);
    this.__horizontalSplitPane.setPaddingLeft(0);
    
    var left = new qx.ui.container.Composite(new qx.ui.layout.VBox());
    left.setMinWidth(250);
    left.setWidth(400);
    left.setPadding(0);
    left.setPaddingRight(10);
    left.setPaddingTop(2);
    this.__horizontalSplitPane.add(left, 0);

    var right = new qx.ui.container.Composite(new qx.ui.layout.VBox());
    right.setPadding(0);
    right.setPaddingTop(2);
    right.setPaddingLeft(10);
    this.__horizontalSplitPane.add(right, 1);


    this.__i18nTreeBar = new qx.ui.toolbar.ToolBar();
    var i18nTreeLbl = new qx.ui.basic.Label(this.tr("I18n Tree")).set({padding:9});
    var currentTreeLbl = new qx.ui.basic.Label().set({padding:9});
    this.__i18nTreeBar.add(i18nTreeLbl);
    this.__i18nTreeBar.add(currentTreeLbl);

    left.add(this.__i18nTreeBar);

    var treeBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));

    this.__tree = new appudo_cli_creator.view.desktop.I18nTree(controller, this, currentTreeLbl);
    this.__treeFilter = new appudo_cli_creator.view.desktop.I18nTreeFilter(controller);
    treeBox.add(this.__tree, {flex:1});
    treeBox.add(this.__treeFilter);

    left.add(treeBox, {flex:1});

    this.__editor = new qx.ui.form.TextArea();
    this.__i18nSetupBar = new qx.ui.toolbar.ToolBar();
    this.__saveBtn = new qx.ui.toolbar.Button(null, "icon/22/actions/document-save.png");
    this.__saveBtn.setToolTipText(this.tr('Save'));
    var i18nSetupLbl = new qx.ui.basic.Label(this.tr("I18n Setting")).set({padding:9});
    this.__i18nSetupCurrentLbl = new qx.ui.basic.Label("").set({padding:9});
    this.__i18nSetupBar.add(this.__saveBtn);
    this.__i18nSetupBar.add(i18nSetupLbl);
    this.__i18nSetupBar.add(this.__i18nSetupCurrentLbl);
    this.__i18nSetupBar.addSpacer();
    this.__saveBtn.setVisibility('excluded');
    this.__saveBtn.setEnabled(false);
    this.__saveBtn.addListener('execute', this.__onSave, this);
    this.__editor.addListenerOnce('changeValue', this.__onChangeValue, this);
    this.__editor.setLiveUpdate(true);

    this.__addDlg = new appudo_cli_creator.view.desktop.I18nAddDialog(controller, this);
    this.__remDlg = new appudo_cli_creator.view.desktop.I18nRemDialog(controller, this);

    this.__addBtn = new qx.ui.toolbar.Button(null, "icon/22/actions/list-add.png");
    this.__addBtn.setToolTipText(this.tr('Add Language'));
    this.__remBtn = new qx.ui.toolbar.Button(null, "icon/22/places/user-trash.png");
    this.__remBtn.setToolTipText(this.tr('Remove Language'));
    this.__remBtn.setEnabled(false);
    this.__i18nSetupBar.add(this.__addBtn);
    this.__i18nSetupBar.add(this.__remBtn);

    this.__languages = new qx.ui.form.SelectBox();
    this.__i18nSetupBar.add(this.__languages);

    this.__i18nSetupBar.addSeparator();

    this.__languages.addListener('changeSelection', this.__onChangeLanguage, this);
    this.__languages.addListenerOnce('appear', function() {
      var b = this.__languages.getBounds();
      this.__languages.setMaxHeight(Math.floor(b.height * 0.9));
      this.__languages.setAlignY('middle');
    }, this);

    var editor = new qx.ui.toolbar.RadioButton(null, "icon/22/apps/utilities-text-editor.png");
    editor.setToolTipText(this.tr('Edit Mode'));
    var cmdMode = new qx.ui.toolbar.RadioButton(null, "icon/22/apps/utilities-terminal.png");
    cmdMode.setToolTipText(this.tr('Command Mode'));
    var group = new qx.ui.form.RadioGroup();
    group.add(cmdMode, editor);
    this.__i18nSetupBar.add(cmdMode);
    this.__i18nSetupBar.add(editor);
    this.__i18nSetupBar.setKeepFocus(true);

    this.__addBtn.addListener('execute', function() {
      this.__addDlg.openAndCenter(this.__currentData);
    }, this);

    this.__remBtn.addListener('execute', function() {
      var s = this.__languages.getSelection();
      if(s.length) {
        this.__remDlg.openAndCenter(this.__currentData, s[0].getLabel());
      }
    }, this);

    this.__setup = new appudo_cli_creator.view.desktop.I18nSetup(controller, this);
    stack.add(this.__setup);
    stack.add(this.__editor);

    group.addListener("changeSelection", function(e)
    {
        var selection = e.getData();
        var child = 0;
        if(selection[0] == cmdMode)
        {
          i18nSetupLbl.setValue(this.tr("I18n Setting"));
          this.__saveBtn.setVisibility('excluded');
          child = 0;
        }
        else
        if(selection[0] == editor)
        {
          i18nSetupLbl.setValue(this.tr("Raw I18n Editor"));
          this.__saveBtn.setVisibility('visible');
          child = 1;
        }
        stack.setSelection([stack.getChildren()[child]]);
    }, this);

    right.add(this.__i18nSetupBar);
    right.add(stack, {flex:1});

    this.__controller.addReset(function(from) {
      if(from != _this) {
        _this.__onReset.call(_this);
      }
    });

    this.__controller.addDataSaved(function() {
      _this.__onDataSave.call(_this);
    });

    this.__controller.addDataChanged(function(from, full, info) {
      if(from == _this) {
        _this.__onDataChangeSelf.call(_this, full);
      } else {
        _this.__onDataChange.call(_this, full, info);
      }
    });

    this.__listenerId = this.__editor.addListener('changeValue', this.__onChangeValue, this);

    this.clear();
  }
});