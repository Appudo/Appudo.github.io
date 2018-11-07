/* ************************************************************************

   APPUDO CLI Creator

   https://www.appudo.com

   Copyright: 2018 Appudo UG (haftungsbeschränkt), https://www.appudo.com

   License: MIT License, https://opensource.org/licenses/MIT

   Authors: source@appudo.com

************************************************************************ */

/**
 * @asset(qx/icon/${qx.icontheme}/22/apps/utilities-color-chooser.png)
 */
qx.Class.define("appudo_cli_creator.view.desktop.I18nMultiList",
{
  extend : qx.ui.container.Composite,
  implement: [qx.ui.form.IForm, qx.ui.core.ISingleSelection],

  events :
  {
    changeValid : "qx.event.type.Data",
    changeInvalidMessage : "qx.event.type.Data",
    changeRequired : "qx.event.type.Data",
    changeSelection : "qx.event.type.Data"
  },

  members :
  {
    __controller : null,
    __list : null,
    __parent : null,
    __needSave : false, 
    
    setSelection : function(v) {
      this.__list.setSelection(v);
    },

    getSelection : function() {
        return this.__list.getSelection();
    },    

    resetSelection : function() {
      this.__list.resetSelection();
    },    

    isSelectionEmpty : function() {
      this.__list.isSelectionEmpty();
    },

    getSelectables : function(all) {
      this.__list.getSelectables(all);
    },

    isSelected : function(v) {
      this.__list.isSelected(v);
    },

    setRequired : function(v) {

    },

    getRequired : function() {
        return false;
    },    
    
    setValid : function(v) {

    },

    getValid : function() {
        return false;
    }, 

    isValid : function() {
        return true;
    }, 
    
    setInvalidMessage : function(v) {

    },

    getInvalidMessage : function() {
        return false;
    }, 
    
    setRequiredInvalidMessage : function(v) {

    },

    getRequiredInvalidMessage : function() {
        return false;
    }, 

    getParent : function() {
      return this.__parent;
    },

    setModel : function(m) {
      this.__list.setModel(m);
    },

    onDisappear : function() {
      if(this.__needSave) {
        this.__parent.changedI18nData(true);
      }
    }
  },
  
  construct : function(controller, parent, nodes, refresh)
  {
    var _this = this;
    this.base(arguments);
    this.setPadding(0);
    this.setLayout(new qx.ui.layout.HBox(5));
    this.__controller = controller;
    this.__parent = parent;
    this.__list = new qx.ui.list.List();

    var delegate = {
      configureItem : function(item) {
      },
      createItem : function() {
        return new appudo_cli_creator.view.desktop.I18nMultiListItem(null, _this); 
      },
      bindItem : function(controller, item, id) {
        controller.bindProperty("value", "value", null, item, id);
      }
    };

    this.__list.setPadding(0);
    this.__list.setDelegate(delegate);
    this.__list.setLabelPath('label');
    this.__list.setIconPath('icon');
    this.__list.setItemHeight(28);
    this.add(this.__list, {flex:1});

    var holder0 = new qx.ui.container.Composite();
    holder0.setLayout(new qx.ui.layout.VBox(5).set({
      alignX : "right"
    }));
    this.add(holder0);
    var splitBtn = new qx.ui.toolbar.Button(null, "icon/22/apps/utilities-color-chooser.png");
    splitBtn.setToolTipText(this.tr('Split multi usage'));
    holder0.add(splitBtn);

    splitBtn.addListener('execute', function(e) {
      this.__needSave = true;
      this.__parent.split(nodes);
      refresh();
      this.setVisibility('excluded');
    }, this);
  }
});