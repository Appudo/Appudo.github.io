/* ************************************************************************

   APPUDO CLI Creator

   https://www.appudo.com

   Copyright: 2018 Appudo UG (haftungsbeschränkt), https://www.appudo.com

   License: MIT License, https://opensource.org/licenses/MIT

   Authors: source@appudo.com

************************************************************************ */

/**
 * @asset(qx/icon/${qx.icontheme}/22/apps/utilities-terminal.png)
 * @asset(qx/icon/${qx.icontheme}/22/categories/utilities.png)
 * @asset(qx/icon/${qx.icontheme}/22/categories/accessories.png)
 * @asset(qx/icon/${qx.icontheme}/22/actions/media-playback-start.png)
 * @asset(qx/icon/${qx.icontheme}/22/places/folder.png)
 * @asset(qx/icon/${qx.icontheme}/22/mimetypes/executable.png)
 * @asset(qx/icon/${qx.icontheme}/22/apps/utilities-system-monitor.png)
 * @asset(qx/icon/${qx.icontheme}/22/actions/system-run.png)
 * 
 */
qx.Class.define("appudo_cli_creator.view.desktop.I18nTree",
{
  extend : qx.ui.tree.Tree,

  members :
  {
    __controller : null,
    __view : null,
    __cmdCheckListener : -1,
    __currentCommandKind : -1,
    __currentCommand : null,
    __currentPath : null,
    __currentData : null,
    __opsFolder : null,
    __cmdFile : null,
    __genFolder : null,    
    __dragItem : null,
    __currentCmdHover : null,
    __currentDrop : null,
    __pending : false,
    
    __isChild : function(child) {
      return child && ("I18nTreeFolder" == child.basename || "I18nTreeFile" == child.basename);
    },

    __getItem : function(child) {
      while(child) {
          if("I18nTreeFolder" == child.basename || "I18nTreeFile" == child.basename)
            return child;
          child = child.getLayoutParent();
      }

      return null;
    },

    __findChild : function(node, label) {
      var children = node.getChildren();

      for(var i = 0; i < children.length; i++) {
        if(children[i].getLabel() == label) {
          return children[i];
        }
      }
      return null;
    },

    __findSelectChild : function(node, label) {
      var children = node.getChildren();

      for(var i = 0; i < children.length; i++) {
        var c = children[i];
        if(c.getLabel() + c.getIndex() == label) {
          return children[i];
        }
      }
      return null;
    },

    __getLabel: function(node) {
      var lbl = node.getLabel();
      if(typeof lbl != 'string') {
        lbl = lbl.getMessageId();
      }
      return lbl;
    }, 

    __getIndex : function(node) {
      var parent = node.getParent();
      var children = parent.getChildren();

      return children.indexOf(node);
    },

    __getSelection : function() {
      var s = this.getSelection();
      if(s.length) {
        return this.__getSelectPath(s[0]);
      }
      return null;
    }, 

    __setSelection : function(v) {
      if(v) {
        this.__openSelectPath(v, true);
      }
    }, 

    __getSelectPath : function(node) {
      var path = [];
      var p = node;
      while(p) {
        path.push(this.__getLabel(p) + p.getIndex());
        p = p.getParent();
      }
      return path.reverse();
    },

    __getPath : function(node, name) {
      var path = [];
      var p = node;
      if(name)
        path.push(name);
      while(p) {
        path.push(this.__getLabel(p));
        p = p.getParent();
      }
      return path.reverse();
    },

    __openSelectPath : function(path, select) {
      var p = this.getRoot();
      if(path[0] != this.__getLabel(p) + p.getIndex())
        return;
      for(var i = 1; i < path.length; i++) {
        if((p = this.__findSelectChild(p, path[i]))) {
          p.setOpen(true);
        } else {
          return;
        }
      }

      if(select && p) {
        this.setSelection([p]);
      } 

    },

    __openPath : function(path, select) {
      var p = this.getRoot();
      if(path[0] != this.__getLabel(p))
        return;
      for(var i = 1; i < path.length; i++) {
        if((p = this.__findChild(p, path[i]))) {
          p.setOpen(true);
        } else {
          return;
        }
      }

      if(select && p) {
        this.setSelection([p]);
      } 

    },

    doReset : function() {
      this.__currentCommand = null;
      this.__currentPath = null;
      this.__currentData = null;
      this.treeRefresh();
    },

    __onCheck : function(item, value) {
      var nodeKind = item.getNodeKind();
      this.__controller.modifyData();
      var nd = item.getNodeData();
      var changedFull = false;
      if(value) {
        var itemIdx = item.getIndex();
        if(nd == null) {
          if(nodeKind == 6) { // general
            d = this.__view.addGeneralI18n();
            if(!d.getChildren()) { // operations
              c = [];
              node = c[itemIdx] = new appudo_cli_creator.view.desktop.I18nDataNode();
              node.setParent(d);
              node.setData({f:''});
              d.setChildren(c);
            } else {
              node = d.getChildren()[itemIdx];
              if(!node) { 
                c = d.getChildren();
                node = c[itemIdx] = new appudo_cli_creator.view.desktop.I18nDataNode();
                node.setParent(d);
                node.setData({f:''});
              }
            }
          }
          if(nodeKind == 5) { // command description
            var path = this.__currentPath;
            var cmdOps = this.__controller.getCommandOps(this.__currentCommand);
            d = this.__view.addCommandI18n(path);

            if(!d.getChildren()) { // operations
              c = new Array(cmdOps.length);
              node = c[0] = new appudo_cli_creator.view.desktop.I18nDataNode();
              node.setParent(d);
              node.setData({f:''});
              d.setChildren(c);
              d = node;
            } else {
              node = d.getChildren()[0];
              if(!node) { 
                c = d.getChildren();
                node = c[0] = new appudo_cli_creator.view.desktop.I18nDataNode();
                node.setParent(d);
                node.setData({f:''});
              }
              d = node;
            }
          }
          else
          if(nodeKind == 7 || // command print
             nodeKind == 8) { // command general
            var path = this.__currentPath;
            var c;
            var node;
            var subOp = item.getParent();
            var is_general = subOp.getIndex() == 0;
            var op = subOp.getParent();
            var opIdx = op.getIndex() + 1;
            var cmdOps = this.__controller.getCommandOps(this.__currentCommand);

            var d;     
            if(this.__currentCommandKind == 3)
            {
              d = this.__view.addStartupI18n();
            } else
            if(this.__currentCommandKind == 4)
            {
              d = this.__view.addFuncI18n();
              var fktIdx = parseInt(path[0]);
              if(!(c = d.getChildren())) {
                c = [];
                d.setChildren(c);
              }
              d = c[fktIdx];
              if(!d) {
                d = c[fktIdx] = new appudo_cli_creator.view.desktop.I18nDataNode();
              }
            } else
            if(this.__currentCommandKind == 5) {
              d = this.__view.addCommandI18n(path);
            }

            if(!d.getChildren()) { // operations
              c = new Array(cmdOps.length);
              node = c[opIdx] = new appudo_cli_creator.view.desktop.I18nDataNode();
              node.setParent(d);
              node.setData(null);
              d.setChildren(c);
              d = node;
            } else {
              node = d.getChildren()[opIdx];
              if(!node) { 
                c = d.getChildren();
                node = c[opIdx] = new appudo_cli_creator.view.desktop.I18nDataNode();
                node.setParent(d);
                node.setData(null);
              }
              d = node;
            }

            if(!d.getChildren()) { // general or print
              var general = new appudo_cli_creator.view.desktop.I18nDataNode();
              var print = new appudo_cli_creator.view.desktop.I18nDataNode();
              d.addChild(general);
              d.addChild(print);
              general.setParent(d);
              general.setChildren([]);
              print.setParent(d);
              print.setChildren([]);
              d = is_general ? general : print;
            } else {
              var c = d.getChildren();
              d = is_general ? c[0] : c[1];
            }

            if(!d.getChildren()) { // target item
              var len = subOp.getChildren().length;
              c = new Array(len);
              node = c[itemIdx] = new appudo_cli_creator.view.desktop.I18nDataNode();
              node.setParent(d);
              node.setData({f:''});
              item.setNodeData(node);
              d.setChildren(c);
            } else {
              c = d.getChildren();
              if(!(node = c[itemIdx])) {
                node = c[itemIdx] = new appudo_cli_creator.view.desktop.I18nDataNode();
                node.setParent(d);
                item.setNodeData(node);
              }
              node.setData({f:''});
            }
          }
        } else {
          var realData = nd.getData(); 
          if(!realData) {
            realData = {};
            nd.setData(realData);
          }
        }
        changedFull = true;
      } else {
        if(nd) {
          nd.setData(null);
          nd.removeFromParent();
          changedFull = true;
        }
      }

      var sel = this.__getSelection();
      var open = this.getOpenState();
      this.__view.changedI18nData(changedFull);
      this.setOpenState(open);
      this.__setSelection(sel);
    },

    __getOpenState : function(n, o) {
      var c = n.getChildren();
      for(var i = 0; i < c.length; i++) {
        var item = c[i];
        if(item.isOpen()){
          var on = o[this.__getLabel(item) + item.getIndex()] = {};
          this.__getOpenState(item, on);
        }
      }
    },

    getOpenState : function() {
      var o = {};
      var r = this.getRoot();
      this.__getOpenState(r, o)
      return o;
    },

    __setOpenState : function(n, o) {
      var c = n.getChildren();
      for(var i = 0; i < c.length; i++) {
        var item = c[i];
        var lbl = this.__getLabel(item); 
        var on = o[lbl + item.getIndex()];
        if(on) {
          item.setOpen(true);
          this.__setOpenState(item, on);
        }
      }
    },

    setOpenState : function(s) {
      if(s) {
        var r = this.getRoot();
        this.__setOpenState(r, s);
      }
    },

    treeUpdate : function() {
      var sel = this.__getSelection();
      this.treeRefresh();
      this.__setSelection(sel);
    },

    treeRefresh : function() {
      var _this = this;
      this.resetSelection();
      if(this.__cmdCheckListener != -1) {
        this.__cmdFile.removeCheckListener(this.__cmdCheckListener);
      }
      this.__genFolder.removeAll();
      this.__opsFolder.removeAll();
      this.__cmdFile.setChecked(false);
      this.__cmdFile.setNodeData(null);
      var cmd = this.__currentCommand;
      var lang = this.__view.getLang();
      var ldata = this.__view.getLangData();
      var ops = this.__controller.getCommandOps(cmd);
      var i18n;
      this.__controller.getOperationInfoFile(function(data, _i18n) {
        i18n =_i18n;
      });

      if(cmd && lang && i18n) {
        if(ldata.cmd) {
          var root;
          var s = 1;
            
          if(this.__currentCommandKind == 3)
          {
            root = ldata.startup.getData(lang, ['_']);
          } else
          if(this.__currentCommandKind == 4)
          {
            root = ldata.func.getData(lang, ['_']);
            if(root) {
              var fidx = parseInt(this.__currentPath);
              var c = root.getChildren();
              if(c) {
                root = c[fidx];
              } else {
                root = null;
              }
            }
          } else
          if(this.__currentCommandKind == 5) {
            root = ldata.cmd.getData(lang, this.__currentPath);
          }
          if(root) {
            var cdata = root.getChildren();
            var len = cdata.length;

            if(this.__currentCommandKind == 5) {
              var cmdDesc = cdata[0];

              this.__cmdFile.setChecked(cmdDesc && cmdDesc.getData() ? true : false);
              this.__cmdFile.setNodeData(cmdDesc || null);
              this.__cmdFile.setKindData({});
              this.__cmdCheckListener = this.__cmdFile.addCheckListener(function(e) {
                this.__onCheck(this.__cmdFile, e.getData());
              }, this);
            }

            var sitem;
            var odata;
            for(var i = s; i < len; i++) {
              var cmdItem = cdata[i];
              var op = ops[i-s];
              var n = this.__controller.getOperationInfo(op.o).n;
              var item = new appudo_cli_creator.view.desktop.I18nTreeFolder(4, i-s, n);   
              item.setOpen(false);
              item.setIcon("icon/22/apps/utilities-system-monitor.png");
              this.__opsFolder.add(item);
              var c;
              // general
              if(cmdItem && (c = cmdItem.getChildren()[0])) {
                odata = c.getChildren();
              } else {
                odata = [];
              }
              var i18nItems = i18n.g[op.o];
              if(i18nItems.length) {
                sitem = new appudo_cli_creator.view.desktop.I18nTreeFolder(3, 0, this.tr('General'));
                item.add(sitem);
                for(var k = 0; k < i18nItems.length; k++) {
                  var gitem = odata[k];
                  var gdata = undefined;
                  if(gitem) {
                    gdata = gitem.getData();
                  }
                  var ti = i18n.g[op.o][k];
                  var nitem = new appudo_cli_creator.view.desktop.I18nTreeFile(8, k, ti.t, gitem || null, ti);
                  nitem.setIcon("icon/22/apps/preferences-locale.png");
                  sitem.add(nitem);
                  if(gdata !== undefined && gdata != 0)
                    nitem.setChecked(true);
                  nitem.addCheckListener(function(e) {
                    _this.__onCheck(this, e.getData());
                  }, nitem);
                }
              }
              // print
              i18nItems = i18n.p[op.o];
              var nMap = null;
              if(cmdItem && (c = cmdItem.getChildren()[1])) {
                odata = c.getChildren();
                nMap = c.getNMap();
              } else {
                odata = [];
                nMap = this.__controller.getI18nOpMap(i18nItems, op).map;
              }
              if(i18nItems.length) {
                sitem = new appudo_cli_creator.view.desktop.I18nTreeFolder(3, 1, this.tr('Print'));
                item.add(sitem);
                var count = 0;
                var l = 0;
                for(var k = 0; k < i18nItems.length; k++) {
                  count = (nMap && nMap[k]) ? nMap[k] : 1;
                  for(var j = 0; j < count; j++, l++) {
                    var kitem = odata[l];
                    var kdata = undefined;
                    if(kitem) {
                      kdata = kitem.getData();
                    }
                    var ti = i18nItems[k];
                    var nitem = new appudo_cli_creator.view.desktop.I18nTreeFile(7, l, ti.t, kitem || null, ti);
                    nitem.setIcon("icon/22/apps/preferences-locale.png");
                    sitem.add(nitem);
                    if(kdata !== undefined && kdata != 0)
                      nitem.setChecked(true);
                    nitem.addCheckListener(function(e) {
                      _this.__onCheck(this, e.getData());
                    }, nitem);
                  }
                }
              }
            }
          }
        }

        if(ldata.general) {
          var generalRoot = ldata.general.getData(lang, ['_']);
          odata = undefined;
          if(generalRoot) {
            odata = generalRoot.getChildren();
          }
          if(!odata)
            odata = [];
          i18nItems = i18n.gn;
          for(var k = 0; k < i18nItems.length; k++) {
            var kitem = odata[k];
            var kdata = undefined;
            if(kitem) {
              kdata = kitem.getData();
            }

            var ti = i18n.gn[k];
            var item = new appudo_cli_creator.view.desktop.I18nTreeFile(6, k, ti.t, kitem || null, ti);   
            item.setOpen(false);
            item.setIcon("icon/22/apps/preferences-locale.png");
            this.__genFolder.add(item);

            if(kdata !== undefined && kdata != 0) {
              item.setChecked(true);
            }
            item.addCheckListener(function(e) {
              _this.__onCheck(this, e.getData());
            }, item);
          }
        }
      }
    },

    __openChildren : function(node)
    {
      var _this = this;
      node.setOpen(true);
      var c = node.getChildren();
      c.forEach(function(n) {
        _this.__openChildren(n);
      });
    },

    __filterChildren : function(node, txt, rem)
    {
      var res = false;
      var _this = this;
      var c = node.getChildren();
      var hit = node.getLabel().toLowerCase().indexOf(txt) != -1;
      node.setOpen(true);
      if(hit) {
        this.__openChildren(node);
        return true;
      }
      c.forEach(function(n) {
        res |= _this.__filterChildren(n, txt, rem);
      });
      if(res || hit)
        return true;

      rem.push(node);
      return false;
    },

    filter : function(txt) {
      txt = txt.toLowerCase();
      this.__setupTree();
      this.treeRefresh();

      if(txt != '' && txt != undefined) {
        var root = this.getRoot();
        var rem = [];
        this.__filterChildren(root, txt, rem);

        rem.forEach(function(n) {
          var p = n.getParent();
          if(p)
            p.remove(n);
        });
        this.setRoot(root);
      }
    },

    onSelect : function(e) {
      this.updateSelect(e.getData());
    },

    updateSelect : function(selection) {
      if(!selection)
        selection = this.getSelection();
      var data;
      if(selection.length) {
        var item = selection[0];
        if(item.getNodeKind() < 5) {
          this.resetSelection();
          return;
        }
        data = item.getNodeData();
        this.__view.doSelect(this.__getPath(item), 
                             item.getNodeData(), 
                             item.getNodeKind(), 
                             item.getKindData());
      } else{
        this.__view.doSelect();
      }
    },

    canDelete : function() {
      var selection = this.getSelection();
      if(selection.length == 1) {
        var kind = selection[0].getNodeKind();
        if(kind > 3)
          return true;
      }
      return false;
    },

    __doDrop : function() {
      var source = this.__currentDrop.source;
      var target = this.__currentDrop.target;
      var before = this.__currentDrop.before;
      var sourceKind = this.__currentDrop.sourceKind;
      var path;
      if(sourceKind == 4) {
        // reorder function
        var data = this.__genFolder.getNodeData();
        var source_index = this.__getIndex(source);
        var target_index = this.__getIndex(target);
        var oldData = data.splice(source_index, 1)[0];
        target_index -= (source_index <= target_index);
        target_index += !before;
        data.splice(target_index, 0, oldData);
        path = this.__getPath(this.__genFolder, '' + target_index);
      } else {
        // move command
        var sdata = source.getNodeData();
        var tdata = target.getNodeData();
        var spdata = source.getParent().getNodeData();
        var slabel = this.__getLabel(source);
        path = this.__getPath(target, slabel);
        if(tdata[slabel] !== undefined) {
          // TODO override error
          return;
        }
        delete spdata[slabel];
        tdata[slabel] = sdata;
      }
      this.__controller.changedData(null, true);
      this.__openPath(path, true);
    },

    canDrop : function(e, target, before, res) {
      var top = e.getDocumentLeft();
      var left = e.getDocumentTop();
      var ditem = document.elementFromPoint(top, left);
      var titem = qx.ui.core.Widget.getWidgetByElement(ditem);
      var item = this.__getItem(titem);
      if(this.__dragItem) {
        var sourceKind = this.__dragItem.getNodeKind();
        if(item) {
          var targetKind = item.getNodeKind();
          var allowFunc = false;
          if((sourceKind > 3 && targetKind > 3) || targetKind == 1) {
            if(sourceKind == 4 && targetKind == 4) {
              var index = this.__getIndex(target);
              var tindex = index - this.__getIndex(this.__dragItem);
              allowFunc = !(tindex == 0 || (tindex == -1 && !before) || (tindex == 1 && before));
            }
            if(allowFunc || ((targetKind == 6 || targetKind == 1) && sourceKind > 4 && item != this.__dragItem)) {
              if(res) {
                this.__currentDrop = res;
                res.source = this.__dragItem;
                res.target = item;
                res.sourceKind = sourceKind;
                res.targetKind = targetKind;
                res.before = before;
              }
              e.setDropAllowed(true);
              return true;
            }
          }
        }
      }
      e.setDropAllowed(false);
      return false;
    },

    __updateDropHover : function(item) {
      if(this.__currentCmdHover) {
        this.__currentCmdHover.setTextColor('text-label');
        this.__currentCmdHover = null;
      }
      if(item) {
        this.__currentCmdHover = item;
        this.__currentCmdHover.setTextColor('#2196f3');
      }
    },

    __onDataChange : function(full) {
      if(this.__controller.isActive(this.__view)) {
        this.__pending = false;
        this.update();
      } else {
        this.__pending = true;
      }
    },

    __getCurrentCommandData : function() {
      if(this.__currentData) {
        var n = this.__currentData['_'];
        var path = this.__currentPath;
        for(var i = 0; i < path.length; i++) {
          n = n[path[i]]
        }
        return n;
      }
      return null;
    },

    __updateCurrentData : function() {
      var lang = this.__view.getSelection().lang;
      var cmd = this.__currentCommand;
      if(cmd && lang) {
        var data = this.__controller.getRawFileData();
        var i18n = data.deploy.i18n[lang + '.json'].d;
        this.__currentData = i18n;
      } else {
        this.__currentData = null;
      }
    },

    __onCommandChange : function(cmd, text, path, kind) {
      this.__currentCommandKind = kind;
      this.__currentCommand = cmd;
      this.__currentPath = path;
      this.__onDataChange();
    },

    try_update : function() {
      if(this.__pending) {
        this.__pending = false;
        this.update();
      }
    },

    update : function(keepOen) {
      var s = keepOen ? this.getOpenState() : null;
      this.__updateCurrentData();
      this.treeUpdate();
      this.updateSelect();
      this.setOpenState(s);
    },

    clear : function() {
      this.__currentCommand = null;
      this.__currentPath = null;
      this.update();
    },

    getCurrentPath : function() {
      return this.__currentPath;
    },

    getCurrentCommandKind : function() {
      return this.__currentCommandKind;
    },

    __setupTree : function() {
      var root = this.getRoot();
      if(root) {
        root.removeAll();
      } else {
        root = new appudo_cli_creator.view.desktop.I18nTreeFolder(0, 0, "root");
        root.setOpen(true);
        this.setRoot(root);
      }
    
      var cmd = new appudo_cli_creator.view.desktop.I18nTreeFile(5, undefined, this.tr("Command"));
      cmd.setIcon("icon/22/apps/preferences-locale.png");
      root.add(cmd);
      this.__cmdFile = cmd;
  
      var ops = new appudo_cli_creator.view.desktop.I18nTreeFolder(1, 0, this.tr("Operations"));
      ops.setOpen(false);
      ops.setIcon("icon/22/apps/utilities-system-monitor.png");
      root.add(ops);
      this.__opsFolder = ops;
  
      var gen = new appudo_cli_creator.view.desktop.I18nTreeFolder(2, 0, this.tr("General"));
      gen.setOpen(false);
      gen.setIcon("icon/22/actions/system-run.png");
      root.add(gen);
      this.__genFolder = gen;
    }
  },

  construct : function(controller, view, label)
  {
    var _this = this;
    this.base(arguments);
    this.__controller = controller;
    this.__view = view;
    this.setHideRoot(true);
    this.setRootOpenClose(true);
    this.setPaddingTop(1);
    this.setEnabled(false);
    //this.setDraggable(true);
    //this.setDroppable(true);

    this.__setupTree();

    this.addListener("dragstart", function(e) {
      var item = this.__getItem(e.getOriginalTarget());

      if(!item) {
          e.preventDefault();
          return;
      }

      this.resetSelection();

      e.addType("I18nTree");
      e.addData("I18nTree", item);
      e.addAction("move");
      this.__dragItem = item;
    }, this);

    this.addListener("dragend", function(e) {
      this.__updateDropHover();
      this.__dragItem = null;
      this.__currentDrop = null;
    }, this);

    this.addListener("drag", function(e) {
      var target = e.getOriginalTarget();

      if(target && this.__isChild(target)) {
        var origCoords = target.getContentLocation();
        var bounds = target.getBounds();
        var height = bounds.height;
        var top = e.getDocumentTop();
        var above = top - origCoords.top < (height / 2);
        var targetTop = above ? origCoords.top : origCoords.top + height;
        var res = {};

        if(this.canDrop(e, target, above, res)) {
            this.__updateDropHover(res.target);
        } else {
          this.__updateDropHover();
        }
      }
    }, this);
    
    this.addListener("dragover", function(e) {
      if(!e.supportsType('I18nTree')) {
        e.preventDefault();
      } 
    }, this);

    this.addListener("drop", function(e) {
      if(e.supportsType('I18nTree') && this.__currentDrop)
      {
        this.__doDrop();
      }
    }, this);

    this.__controller.i18nFilter = function(txt) {
      _this.filter.call(_this, txt);
    }

    this.__controller.addDataChanged(function(from, full, info) {
      if(from != _this) {
        _this.__onDataChange.call(_this, full, info);
      }
    });

    this.__controller.addCommandChanged(function(from, cmd, text, path, kind) {
      if(from != _this) {
        _this.__onCommandChange.call(_this, cmd, text, path, kind);
      }
      if(cmd && cmd.o) {
        label.setValue(text);
      } else {
        label.resetValue();
      }
    });

    this.addListener('changeSelection', this.onSelect, this);
  },
  destruct : function()
  {
  }
});