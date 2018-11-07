/* ************************************************************************

   APPUDO CLI Creator

   https://www.appudo.com

   Copyright: 2018 Appudo UG (haftungsbeschränkt), https://www.appudo.com

   License: MIT License, https://opensource.org/licenses/MIT

   Authors: source@appudo.com

************************************************************************ */


/**
 * @asset(qx/icon/${qx.icontheme}/22/actions/help-faq.png)
 */
qx.Class.define("appudo_cli_creator.view.desktop.VarSlotsSettingList",
{
  extend : qx.ui.list.List,

  members : {
    __parent : null,
    __kind : -1,
    __hasMore : false,
    
    getParent : function() {
      return this.__parent;
    },

    selectAll : function() {
      this.__doSelectAll(true);
    },

    selectNone : function() {
      this.__doSelectAll(false);
    },

    __doSelectAll : function(v) {
      var len = this.__model.getLength();
      this.__hasMore = true;
      for(var i = 0; i < len; i++) {
        var item = this.__model.getItem(i);
        item.setChecked(v);
        this.onChangeValue(item, v);
      }
      this.__hasMore = false;
      this.__parent.doChange();
    },

    selectUsed : function() {
      var len = this.__model.getLength();
      this.__hasMore = true;
      for(var i = 0; i < len; i++) {
        var item = this.__model.getItem(i);
        var v = this.__parent.getSlotUsed(item.getIndex(), item.getLocal());
        item.setChecked(v);
        this.onChangeValue(item, v);
      }
      this.__hasMore = false;
      this.__parent.doChange();
    },

    update : function() {
    },

    refresh : function() {
      var model = this.__model = new qx.data.Array();

      if(this.__kind == 0) {
        var max = this.__parent.getMax();
        for(var i = 0; i < max; i++) {
          model.push(new appudo_cli_creator.view.desktop.VarSlotsSettingListObject('Slot ' + i + ' [local]', "icon/22/actions/help-faq.png", i, true, true));
        }
        for(var i = 0; i < max; i++) {
          model.push(new appudo_cli_creator.view.desktop.VarSlotsSettingListObject('Slot ' + i + ' [global]', "icon/22/actions/help-faq.png", i, true, false));
        }
      } else {
        var ops = this.__parent.getOps();
        for(var i = 0; i < ops.length; i++) {
          var op = this.__parent.getController().getOperationInfo(ops[i].o);
          if(op) {
            model.push(new appudo_cli_creator.view.desktop.VarSlotsSettingListObject(op.n + ' [' + i + ']', "icon/22/apps/utilities-system-monitor.png", i, true));
          }
         }
      }
      this.setModel(model);
    },

    onChangeValue : function(item, v) {
      if(this.__kind == 0) {
        this.__parent.setSlotActive(item.getIndex(), item.getLocal(), v, this.__hasMore);
      } else {
        this.__parent.setOperationActive(item.getIndex(), v, this.__hasMore);
      }
    } 
  },

  construct : function(parent, kind)
  {
    var _this = this;
    this.base(arguments);

    this.__parent = parent;
    this.__kind = kind;
   
    var delegate = {
      configureItem : function(item) {
      },
      createItem : function() {
        return new appudo_cli_creator.view.desktop.VarSlotsSettingListItem(_this); 
      },
      bindItem : function(controller, item, id) {
        controller.bindProperty("value", "value", null, item, id);
        controller.bindProperty("icon", "icon", null, item, id);
        controller.bindProperty("index", "index", null, item, id);
        controller.bindProperty("local", "local", null, item, id);
        controller.bindProperty("checked", "checked", null, item, id);
      }
    };

    this.setDelegate(delegate);

    this.setPadding(0);
    
    this.refresh();
  }
});