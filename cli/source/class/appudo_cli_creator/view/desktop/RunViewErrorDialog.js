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
qx.Class.define("appudo_cli_creator.view.desktop.RunViewErrorDialog",
{
  extend : qx.ui.window.Window,
  members :
  {
    openAndCenter : function(errorMsg) {
        this.__errorLbl.setValue(errorMsg);
        this.center();
        this.open();
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
    this.setCaption(this.tr('Run Error'));

    this.addListener('beforeClose', this.__close, this);

    this.__errorLbl = new qx.ui.basic.Label();
    this.add(this.__errorLbl);

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
        this.close();
    }, this);

  }
});