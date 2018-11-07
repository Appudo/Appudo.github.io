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
qx.Class.define("appudo_cli_creator.view.desktop.ResetDialog",
{
  extend : qx.ui.window.Window,
  members :
  {
    __controller : null,
    __openBtn : null,
    __after : null,

    openAndCenter : function(after) {
      this.center();
      this.open();
      this.__after = after;
    },

    __close : function() {
    }
  },
  construct : function(controller)
  {
    var _this = this;
    this.base(arguments);
    this.__controller = controller;
    this.setModal(true);
    this.setAllowMinimize(false);
    this.setLayout(new qx.ui.layout.VBox(5));
    this.setCaption(this.tr('Reset CLI Data'));

    this.addListener('beforeClose', this.__close, this);

    var lbl = new qx.ui.basic.Label(this.tr('This will close the current setup without saving!'));
    this.add(lbl);

    var paneLayout = new qx.ui.layout.HBox().set({
    spacing: 4,
    alignX : "right"
    });
    var buttonPane = new qx.ui.container.Composite(paneLayout).set({
    paddingTop: 11
    });
    this.add(buttonPane);

    var okButton = new qx.ui.form.Button(this.tr("Ok"), "icon/22/actions/dialog-apply.png");
    okButton.addState("default");
    buttonPane.add(okButton);

    okButton.addListener('execute', function() {
        this.__controller.resetData();
        this.close();
        if(this.__after)
          this.__after();
    }, this);

    var cancelButton = new qx.ui.form.Button(this.tr("Cancel"), "icon/22/actions/dialog-cancel.png");
    buttonPane.add(cancelButton);

    cancelButton.addListener('execute', function() {
        this.close();
    }, this);

  }
});