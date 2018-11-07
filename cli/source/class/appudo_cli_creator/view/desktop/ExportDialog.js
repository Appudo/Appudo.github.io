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
qx.Class.define("appudo_cli_creator.view.desktop.ExportDialog",
{
  extend : qx.ui.window.Window,
  members :
  {
    __controller : null,
    openAndCenter : function() {
      this.center();
      this.open();
    }
  },
  construct : function(controller)
  {
    var _this = this;
    this.base(arguments);
    this.setModal(true);
    this.setAllowMinimize(false);
    this.setLayout(new qx.ui.layout.VBox());
    this.setWidth(300);
    this.setCaption(this.tr('Export CLI Data'));
    this.__controller = controller;

    var tabIndex = 1;
    var form = new qx.ui.form.Form();

    var textField = new qx.ui.form.TextField();
    textField.setPlaceholder("required");
    textField.setTabIndex(tabIndex++);
    textField.setRequired(true);
    textField.setValue('command.zip');
    form.add(textField, this.tr("Name"));

    var renderedForm = new qx.ui.form.renderer.Single(form);
    this.add(renderedForm);

    var okButton = new qx.ui.form.Button(this.tr("Download"), "icon/22/actions/dialog-apply.png");
    okButton.addState("default");
    renderedForm.addButton(okButton);

    var submit = function() {
      if((textField.getValue() || '') != '') {
        this.__controller.saveFile(textField.getValue(), function() {
          _this.close();
        }, function() {
          // TODO error
        });
      }
    };
     
    renderedForm.addListener("keypress", function(e){
      var key = e.getKeyIdentifier().toLowerCase();
      switch(key) {
        case "enter":
          submit.call(_this);
          break;
      }
    }, this);

    renderedForm.addListener("appear",function() {
      textField.focus();
    }, this);

    okButton.addListener('execute', submit, this);

    var cancelButton = new qx.ui.form.Button(this.tr("Cancel"), "icon/22/actions/dialog-cancel.png");
    renderedForm.addButton(cancelButton);

    cancelButton.addListener('execute', function() {
        this.close();
    }, this);
  }
});