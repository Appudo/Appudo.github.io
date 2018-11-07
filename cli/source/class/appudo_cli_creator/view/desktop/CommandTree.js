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
 * 
 */
qx.Class.define("appudo_cli_creator.view.desktop.CommandTree",
{
  extend : qx.ui.tree.Tree,

  members :
  {
    __controller : null,
    __cmdFolder : null,
    __funcFolder : null,    
    __funcDragIndicator : null,
    __dragItem : null,
    __currentCmdHover : null,
    __currentDrop : null,
    
    __isChild : function(child) {
      return child && ("CommandTreeFolder" == child.basename || "CommandTreeFile" == child.basename);
    },

    __getItem : function(child) {
      while(child) {
          if("CommandTreeFolder" == child.basename || "CommandTreeFile" == child.basename)
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

    __getLabel: function(node) {
      var lbl = node.getLabel();
      if(typeof lbl != 'string') {
        lbl = lbl.getMessageId();
      }
      return lbl;
    }, 

    __hasChildren : function(n) {
      var c = n.getChildren();
      return c && c.length != 0;
    },

    __getIndex : function(node) {
      var parent = node.getParent();
      var children = parent.getChildren();

      return children.indexOf(node);
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

    __openPath : function(path, select, len) {
      var p = this.getRoot();
      if(path[0] != this.__getLabel(p))
        return;
      for(var i = 1; i < (len || path.length); i++) {
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

    addCommand : function(parentNode, name, type) {
      this.__controller.modifyData();
      var pdata = parentNode.getNodeData();
      if(pdata[name] !== undefined) {
        return false;
      }
      var path = this.__getPath(parentNode, name);
      var data = {};
      if(type == 0)
        data.o = [];
      pdata[name] = data;
      this.__controller.changedData(null, true, {p:path, t:'CommandTreeAddCmd'});
      this.__openPath(path, true);

      return true;
    },
    
    addFunction : function() {
      var children = this.__funcFolder.getChildren();
      var i = children ? children.length : 0;

      this.__controller.modifyData();
      var pdata = this.__funcFolder.getNodeData();
      pdata[i] = [];

      var path = this.__getPath(this.__funcFolder, '' + i);
      this.__controller.changedData(null, true, {p:path, index:i, t:'CommandTreeAddFunc'});
      this.__openPath(path, true);

      return true;
    },

    remCommand : function(node) {
      var p = node;
      p = p.getParent();
      var data = p.getNodeData();
      var key = this.__getLabel(node);
      var path = this.__getPath(p, key);
      delete data[key];
      this.__controller.changedData(null, true, {p:path, c:this.__hasChildren(node), t:'CommandTreeRemCmd'});
      this.__openPath(path, true, path.length - 1);
    },

    remFunction : function(node) {
      var data = this.__funcFolder.getNodeData();
      var index = this.__getIndex(node);
      if(index == -1)
        return false;
      var path = this.__getPath(this.__funcFolder, '' + index);
      data.splice(index, 1);
      this.__controller.changedData(null, true, {p:path, index:index, t:'CommandTreeRemFunc'});
      this.__funcFolder.setOpen(true);
      return true;
    },

    __addCommand : function(node, key, data) {
      if(key == 'o'  || key == '_') {
        node.setIcon("icon/22/mimetypes/executable.png");
        var kind = node.getNodeKind();
        if(kind > 3) {
          node.setNodeKind(5);
        }
        return;
      }

      var cmd = node;
      var pn = Object.getOwnPropertyNames(data || {});
      if(pn.length > 1) {
        pn.sort();
      }
      if(key !== undefined)
      {
        if(pn.length == 0) {
          cmd = new appudo_cli_creator.view.desktop.CommandTreeFile(6, key, data);
        } else {
          cmd = new appudo_cli_creator.view.desktop.CommandTreeFolder(6, key, data);
        }
        cmd.setIcon("icon/22/places/folder.png");

        node.add(cmd);
      }

      for(var i = 0; i < pn.length; i++) {
        this.__addCommand(cmd, pn[i], data[pn[i]]);
      }
    },

    __addFunctions: function(node, data) {
      if(data === undefined)
        return;

      data.forEach(function(n, i) {
        var f = new appudo_cli_creator.view.desktop.CommandTreeFile(4, '' + i, n);
        f.setIcon("icon/22/categories/accessories.png");
        node.add(f);
      });
    },

    getCommandFolder : function() {
      return this.__cmdFolder;
    },

    __getOpenState : function(n, o) {
      var c = n.getChildren();
      for(var i = 0; i < c.length; i++) {
        var item = c[i];
        if(item.isOpen()){
          var on = o[this.__getLabel(item) + this.__getIndex(item)] = {};
          this.__getOpenState(item, on);
        }
      }
    },

    getOpenState : function() {
      var o = {};
      var r = this.getRoot();
      if(r) {
        this.__getOpenState(r, o);
      }
      return o;
    },

    __setOpenState : function(n, o) {
      var c = n.getChildren();
      for(var i = 0; i < c.length; i++) {
        var item = c[i];
        var lbl = this.__getLabel(item); 
        var on = o[lbl + this.__getIndex(item)];
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

    treeRefresh : function() {
      var o = this.getOpenState();
      this.resetSelection();
      var fd = this.__controller.getRawFileData();
      var cmd = fd.deploy['cmd.json'].d;

      var root = new appudo_cli_creator.view.desktop.CommandTreeFolder(0, "root");
      root.setOpen(true);
      this.setRoot(root);

      var cmds = new appudo_cli_creator.view.desktop.CommandTreeFolder(1, this.tr("Commands"), cmd['_']);
      this.__addCommand(cmds, undefined, cmd['_']);
      cmds.setOpen(false);
      cmds.setIcon("icon/22/apps/utilities-terminal.png");
      root.add(cmds);
      this.__cmdFolder = cmds;

      var fkts = new appudo_cli_creator.view.desktop.CommandTreeFolder(2, this.tr("Functions"), cmd['f']);
      fkts.setOpen(false);
      fkts.setIcon("icon/22/categories/utilities.png");
      root.add(fkts);
      this.__funcFolder = fkts;

      this.__addFunctions(fkts, cmd['f']);

      var sup = new appudo_cli_creator.view.desktop.CommandTreeFile(3, this.tr("Startup"), cmd['s']);
      sup.setIcon("icon/22/actions/media-playback-start.png");
      
      root.add(sup);
      this.setOpenState(o);
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
      var selection = e.getData();
      var data;
      if(selection.length && (data = selection[0].getNodeData())) {
        var n = selection[0];
        var nodeKind = n.getNodeKind();
        if(nodeKind < 3) {
          this.__controller.setCommand(null, null, null);
          return;
        }
        var path = [];
        var lbl = n.getLabel();
        var t = lbl + ' ]';
        var root = this.getRoot();
        path.push(lbl);
        while((n = n.getParent())) {
          if(n == root)
            break;
          var lbl = n.getLabel();
          path.push(lbl);
          t = lbl + ' / ' + t;
        }
        path.length = path.length - 1;
        this.__controller.setCommand(null, data, '[ ' + t, path.reverse(), nodeKind);
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

    __onDataChange : function(full) {
      if(full)
        this.treeRefresh();
    },

    __onDataInitialize : function() {
      var fd = this.__controller.getRawFileData();
      var cmd = fd.deploy['cmd.json'].d;

      this.__cmdFolder.setNodeData(cmd['_']);
      this.__funcFolder.setNodeData(cmd['f']);
    },

    __doDrop : function() {
      var source = this.__currentDrop.source;
      var target = this.__currentDrop.target;
      var before = this.__currentDrop.before;
      var sourceKind = this.__currentDrop.sourceKind;
      var source_path;
      var path;
      var t;
      var source_index = -1;
      var target_index = -1;
      if(sourceKind == 4) {
        t = 'CommandTreeReorderFunc';
        // reorder function
        var data = this.__funcFolder.getNodeData();
        source_index = this.__getIndex(source);
        target_index = this.__getIndex(target);
        var oldData = data.splice(source_index, 1)[0];
        target_index -= (source_index <= target_index);
        target_index += !before;
        source_path = this.__getPath(this.__funcFolder, '' + source_index);
        data.splice(target_index, 0, oldData);
        path = this.__getPath(this.__funcFolder, '' + target_index);
      } else {
        t = 'CommandTreeReorderCmd';
        // move command
        var sdata = source.getNodeData();
        var tdata = target.getNodeData();
        var spdata = source.getParent().getNodeData();
        var slabel = this.__getLabel(source);
        source_path = this.__getPath(source);
        path = this.__getPath(target, slabel);
        if(tdata[slabel] !== undefined) {
          // TODO override error
          return;
        }
        delete spdata[slabel];
        tdata[slabel] = sdata;
      }
      this.__controller.changedData(null, true, {findex:source_index, tindex:target_index, from:source_path, to:path, t:t});
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
    }
  },

  construct : function(controller)
  {
    var _this = this;
    this.base(arguments);
    this.__controller = controller;
    this.setHideRoot(true);
    this.setRootOpenClose(true);
    this.setPaddingTop(1);
    this.setDraggable(true);
    this.setDroppable(true);

    this.__funcDragIndicator = new qx.ui.core.Widget();
    var decorator = new qx.ui.decoration.Decorator();
    this.__funcDragIndicator.setDecorator(decorator.set({
      widthTop : 1,
      styleTop : "solid",
      colorTop : "black"
    }));
    this.__funcDragIndicator.setHeight(1);
    this.__funcDragIndicator.setWidth(0);
    this.__funcDragIndicator.setOpacity(0.5);
    this.__funcDragIndicator.setZIndex(100);
    this.__funcDragIndicator.setLayoutProperties({
        left : -1000,
        top : -1000
    });
    qx.core.Init.getApplication().getRoot().add(this.__funcDragIndicator);

    this.addListener("dragstart", function(e) {
      var item = this.__getItem(e.getOriginalTarget());

      if(!item) {
          e.preventDefault();
          return;
      }

      this.resetSelection();

      e.addType("CommandTree");
      e.addData("CommandTree", item);
      e.addAction("move");
      this.__dragItem = item;
    }, this);

    this.addListener("dragend", function(e) {
      this.__updateDropHover();
      this.__funcDragIndicator.setDomPosition(-1000, -1000);
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
          if(res.sourceKind == 4) {
            this.__funcDragIndicator.setWidth(bounds.width);
            this.__funcDragIndicator.setDomPosition(origCoords.left, targetTop);
          } else {
            this.__updateDropHover(res.target);
            this.__funcDragIndicator.setWidth(0);
          }
          return;
        } else {
          this.__updateDropHover();
        }
      }
      this.__funcDragIndicator.setWidth(0);
    }, this);
    
    this.addListener("dragover", function(e) {
      if(!e.supportsType('CommandTree')) {
        e.preventDefault();
      } 
    }, this);

    this.addListener("drop", function(e) {
      if(e.supportsType('CommandTree') && this.__currentDrop)
      {
        this.__doDrop();
      }
    }, this);

    this.__controller.getCommandSelection = function() {
      var path = [];
      var sel = _this.getSelection();
      if(sel.length == 0)
        return null;
      var p = sel[0];
      var path = _this.__getPath(p);
      return path;
    }

    this.__controller.setCommandSelection = function(v) {
      _this.__openPath(v, true);
    }

    this.__controller.commandsFilter = function(txt) {
      _this.filter.call(_this, txt);
    }

    this.__controller.addReset(function() {
      _this.treeRefresh.call(_this);
    });
    
    this.__controller.addDataInitialized(function() {
      _this.__onDataInitialize.call(_this);
    });

    this.__controller.addDataChanged(function(from, full) {
      if(from != _this) {
        _this.__onDataChange.call(_this, full);
      }
    });

    this.addListener('changeSelection', this.onSelect, this);
  },
  destruct : function()
  {
  }
});