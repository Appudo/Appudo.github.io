/* ************************************************************************

   APPUDO CLI Creator

   https://www.appudo.com

   Copyright: 2018 Appudo UG (haftungsbeschränkt), https://www.appudo.com

   License: MIT License, https://opensource.org/licenses/MIT

   Authors: source@appudo.com

************************************************************************ */

qx.Class.define("appudo_cli_creator.view.desktop.I18nSetupUndefTextField",
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
    __view : null,

    getSelection : function() {
        return null;
    },

    getSelectables : function() {
        return null;
    },

    setSelection : function(v) {
    },

    resetSelection : function() {
    },

    isSelectionEmpty : function(v) {
      return true;
    },

    isSelected : function(v) {
      return false;
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
    }
  },

  construct : function(view, fd, tabIndex)
  {
    var _this = this;
    this.base(arguments);
    this.setPadding(0);
    this.setLayout(new qx.ui.layout.HBox(5));

    this.__view = view;

    var check = new qx.ui.form.CheckBox();
    var textField = new appudo_cli_creator.view.desktop.EscapeTextField();
    textField.setTabIndex(tabIndex);
    textField.setValue(fd.u || '');
    textField.setEnabled(fd.u !== undefined);
    check.setValue(fd.u !== undefined);

    this.add(textField, {flex:1});
    this.add(check);
    
    check.addListener('changeValue', function(e) {
        if(e.getData()) {
            fd.u = textField.getValue();
            textField.setEnabled(true);
        } else {
            textField.setEnabled(false);
            delete fd.u;
        }
        this.__view.changedI18nData();
    }, this);

    textField.addListener('changeValue', function(e) {
        fd.u = e.getData();
        this.__view.changedI18nData();
    }, this);
  }
});