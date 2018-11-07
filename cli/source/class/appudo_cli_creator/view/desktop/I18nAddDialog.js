/* ************************************************************************

   APPUDO CLI Creator

   https://www.appudo.com

   Copyright: 2018 Appudo UG (haftungsbeschränkt), https://www.appudo.com

   License: MIT License, https://opensource.org/licenses/MIT

   Authors: source@appudo.com

************************************************************************ */

/**
 * @asset(qx/icon/${qx.icontheme}/22/actions/dialog-apply.png)
 * @asset(qx/icon/${qx.icontheme}/22/actions/dialog-cancel.png)
 */
qx.Class.define("appudo_cli_creator.view.desktop.I18nAddDialog",
{
  extend : qx.ui.window.Window,
  members :
  {
    __controller : null,
    __textField : null,
    __currentData : null,
    __i18nView : null,

    openAndCenter : function(data) {
      this.__textField.resetValue();
      this.__currentData = data;
      this.center();
      this.open();
    },

    __close : function() {

    },

    __doSubmit : function() {
      var name = this.__textField.getValue() || '';
      var data = this.__currentData;
      var key = name + '.json';
      if(data[key] === undefined) {
        this.__controller.modifyData();
        data[key] = {n:key, d:{'_':{},'s':[],'f':[]}};
        this.__controller.changedData(this.__i18nView, true);
        this.__i18nView.clear();
        this.__i18nView.doRefresh();
        this.__i18nView.setSelection({lang:name});
        this.close();
      }
    }
  },

  construct : function(controller, view)
  {
    var _this = this;
    this.base(arguments);
    this.__controller = controller;
    this.__i18nView = view;
    this.setModal(true);
    this.setAllowMinimize(false);
    this.setLayout(new qx.ui.layout.VBox(5));
    this.setMinWidth(300);
    this.setCaption(this.tr('Add new Language'));

    this.addListener('beforeClose', this.__close, this);

    var tabIndex = 1;
    var form = new qx.ui.form.Form();

    this.__textField = new qx.ui.form.TextField();
    this.__textField.setPlaceholder("required");
    this.__textField.setTabIndex(tabIndex++);
    this.__textField.setRequired(true);
    form.add(this.__textField, this.tr("Name"));

    var renderedForm = new qx.ui.form.renderer.Single(form);
    this.add(renderedForm);

    var okButton = new qx.ui.form.Button(this.tr("Ok"), "icon/22/actions/dialog-apply.png");
    okButton.addState("default");
    renderedForm.addButton(okButton);
     
    renderedForm.addListener("keypress", function(e){
      var key = e.getKeyIdentifier().toLowerCase();
      switch(key) {
        case "enter":
          this.__doSubmit();
          break;
      }
    }, this);

    renderedForm.addListener("appear",function() {
      this.__textField.focus();
    }, this);

    okButton.addListener('execute', function() {
      this.__doSubmit();
    }, this);

    var cancelButton = new qx.ui.form.Button(this.tr("Cancel"), "icon/22/actions/dialog-cancel.png");
    renderedForm.addButton(cancelButton);

    cancelButton.addListener('execute', function() {
        this.close();
    }, this);
  }
});