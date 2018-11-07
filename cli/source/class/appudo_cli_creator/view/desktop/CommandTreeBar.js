/* ************************************************************************

   APPUDO CLI Creator

   https://www.appudo.com

   Copyright: 2018 Appudo UG (haftungsbeschränkt), https://www.appudo.com

   License: MIT License, https://opensource.org/licenses/MIT

   Authors: source@appudo.com

************************************************************************ */

/**
 * @asset(qx/icon/${qx.icontheme}/22/actions/list-add.png)
 * @asset(qx/icon/${qx.icontheme}/22/places/user-trash.png)
 */
qx.Class.define("appudo_cli_creator.view.desktop.CommandTreeBar",
{
  extend : qx.ui.toolbar.ToolBar,

  members :
  {
    __addBtn : null,
    __remBtn : null,
    __addDlg : null,
    __remDlg : null

  },

  /**
   * @param controller {appudo_cli_creator.controller.MainController} The main controller class
   */
  construct : function(controller, tree)
  {
    this.base(arguments);

    this.__menuItemStore = {};

    this.setAlignY('middle');

    var lbl = new qx.ui.basic.Label("Command Tree");
    lbl.setAlignY("middle");
    lbl.setPaddingLeft(5);

    this.add(lbl);

    this.addSpacer();

    this.__addDlg = new appudo_cli_creator.view.desktop.CommandTreeAddDialog(controller, tree);
    this.__remDlg = new appudo_cli_creator.view.desktop.CommandTreeRemDialog(controller, tree);

    this.__addBtn = new qx.ui.toolbar.Button(null, "icon/22/actions/list-add.png");
    this.__addBtn.setToolTipText(this.tr('Add Command or Function'));
    this.__remBtn = new qx.ui.toolbar.Button(null, "icon/22/places/user-trash.png");
    this.__remBtn.setToolTipText(this.tr('Remove Command or Function'));
    this.add(this.__addBtn);
    this.add(this.__remBtn);
    this.__remBtn.setEnabled(false);

    tree.addListener('changeSelection', function(e) {
      this.__remBtn.setEnabled(tree.canDelete());
    }, this);

    this.__addBtn.addListener('execute', this.__addDlg.openAndCenter, this.__addDlg);
    this.__remBtn.addListener('execute', this.__remDlg.openAndCenter, this.__remDlg);
  },

  destruct : function() {
    this._disposeObjects("__addBtn", "__remBtn", "__addDlg", "__remDlg");
  }
});
