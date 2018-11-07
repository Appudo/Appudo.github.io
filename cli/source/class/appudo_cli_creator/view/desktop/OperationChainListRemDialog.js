/* ************************************************************************

   APPUDO CLI Creator

   https://www.appudo.com

   Copyright: 2018 Appudo UG (haftungsbeschränkt), https://www.appudo.com

   License: MIT License, https://opensource.org/licenses/MIT

   Authors: source@appudo.com

************************************************************************ */

/**
 * @asset(qx/icon/${qx.icontheme}/22/actions/dialog-apply.png)
 */
qx.Class.define("appudo_cli_creator.view.desktop.OperationChainListRemDialog",
{
  extend : qx.ui.window.Window,
  members :
  {
    __controller : null,
    __textLabel : null,
    __operationChain : null,

    openAndCenter : function(name) {
      this.center();
      this.open();
      this.__textLabel.setValue(name);
    },

    __close : function() {

    }
  },

  construct : function(controller, operationChain)
  {
    var _this = this;
    this.base(arguments);
    this.__controller = controller;
    this.__operationChain = operationChain;
    this.setModal(true);
    this.setAllowMinimize(false);
    this.setLayout(new qx.ui.layout.VBox(5));
    this.setCaption(this.tr('Remove Operation from Command'));
    this.setMinWidth(400);

    this.addListener('beforeClose', this.__close, this);

    var form = new qx.ui.form.Form();

    this.__textLabel = new qx.ui.form.TextField();
    this.__textLabel.setReadOnly(true);
    form.add(this.__textLabel, this.tr("Name"));

    var renderedForm = new qx.ui.form.renderer.Single(form);
    this.add(renderedForm);

    var submit = function() {
      this.__operationChain.removeSelected();
      this.close();
    };

    var okButton = new qx.ui.form.Button(this.tr("Ok"), "icon/22/actions/dialog-apply.png");
    okButton.addState("default");
    renderedForm.addButton(okButton);

    okButton.addListener('execute', submit, this);

    var cancelButton = new qx.ui.form.Button(this.tr("Cancel"), "icon/22/actions/dialog-cancel.png");
    renderedForm.addButton(cancelButton);

    cancelButton.addListener('execute', function() {
        this.close();
    }, this);
  }
});