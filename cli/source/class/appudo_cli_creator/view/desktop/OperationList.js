/* ************************************************************************

   APPUDO CLI Creator

   https://www.appudo.com

   Copyright: 2018 Appudo UG (haftungsbeschränkt), https://www.appudo.com

   License: MIT License, https://opensource.org/licenses/MIT

   Authors: source@appudo.com

************************************************************************ */

/**
 * 
 * @asset(qx/icon/${qx.icontheme}/22/apps/utilities-system-monitor.png)
 */
qx.Class.define("appudo_cli_creator.view.desktop.OperationList",
{
  extend : qx.ui.list.List,
  members :
  {
    __controller : null,
    __model : null,

    filter : function(txt) {
      txt = txt.toLowerCase();
      var _this = this;
      this.reset(function() {
        if(txt != '' && txt != undefined) {
          _this.__model = _this.__model.filter(function(n) {
            return n.getLabel().toLowerCase().indexOf(txt) != -1;
          });
          _this.setModel(_this.__model);
        }
      });
    },

    reset : function(after) {
      var _this = this;
      this.__model = new qx.data.Array();
      this.__controller.getOperationInfoFile(function(data) {
        if(data.operations) {
          data.operations.forEach(function(n) {
            _this.__model.push(new appudo_cli_creator.view.desktop.OperationListItem(n.n, "icon/22/apps/utilities-system-monitor.png", n));
          })
        }
        _this.__model.sort(function(a, b) {
          return a.getLabel().localeCompare(b.getLabel());
        })
        _this.setModel(_this.__model);
        if(after)
          after();
      });
    },

    __getItem : function(child) {
      while(child) {
          if("ListItem" == child.basename)
              return child;
          child = child.getLayoutParent();
      }

      return null;
    }
  },
  construct : function(controller, chain)
  {
    var _this = this;
    this.base(arguments);
    this.setPadding(0);
    this.setLabelPath('label');
    this.setIconPath('icon');
    this.setDraggable(true);
    this.setSelectionMode('single');

    this.__controller = controller;

    var delegate = {
      bindItem : function(controller, item, id) { 
        controller.bindDefaultProperties(item, id);
        controller.bindProperty("nodeData", "toolTipText", { 
          converter: function(value) { 
            return value.d ? value.d : null; 
          } 
        } , item, id);
      }
    };

    this.setDelegate(delegate);

    var indicator = new qx.ui.core.Widget();
    indicator.setOpacity(0.9);
    indicator.setZIndex(100);
    indicator.setLayoutProperties({
        left : -1000,
        top : -1000
    });
    qx.core.Init.getApplication().getRoot().add(indicator);

    this.addListener("dragstart", function(e) {
      var item = this.__getItem(e.getOriginalTarget());

      if(!item) {
          e.preventDefault();
          return;
      }

      var inode = indicator.getContentElement().getDomElement(); 
      var tnode = item.getContentElement().getDomElement();
      var l = qx.bom.element.Dimension.getSize(tnode);
      inode.innerHTML = '';
      tnode = tnode.cloneNode(true);
      qx.bom.element.Style.set(tnode, 'top', '0');
      qx.bom.element.Style.set(tnode, 'left', '0');
      inode.appendChild(tnode);
      indicator.setWidth(l.width);
      indicator.setHeight(l.height);

      e.addType("OperationList");
      e.addData("OperationList", item.getModel());
      e.addAction("move");
    }, this);

    this.addListener("dragend", function(e) {
      indicator.setDomPosition(-1000, -1000);
      chain.onDragend.call(chain, e);
    }, this);

    this.addListener("drag", function(e) {
      indicator.setDomPosition(e.getDocumentLeft() - 30, e.getDocumentTop() - 30);
      chain.onDrag.call(chain, e);
    }, this);

    this.__controller.operationsFilter = function(txt) {
      _this.filter.call(_this, txt);
    }

    this.__controller.addReset(function() {
      _this.reset.call(_this);
    });

    this.addListener('mouseup', function(e) {
      this.getSelection().removeAll();
    }, this);
  }
});