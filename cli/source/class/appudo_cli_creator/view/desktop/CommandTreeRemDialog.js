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
qx.Class.define("appudo_cli_creator.view.desktop.CommandTreeRemDialog",
{
  extend : qx.ui.window.Window,
  members :
  {
    __controller : null,
    __commandTree : null,

    openAndCenter : function(type, item) {
      var selection = this.__commandTree.getSelection();
      var item;
      var kind;
      if(selection.length) {
        item = selection[0];
      } else {
        return;
      }
      kind = item.getNodeKind();
      var type = kind == 2 || kind == 4 ? 1 : 0;

      this.setCaption(type == 0 ? this.tr('Remove Command') : this.tr('Remove Function'));

      this.removeAll();

      var form = new qx.ui.form.Form();

      var textLabel = new qx.ui.form.TextField();
      textLabel.setValue(item.getLabel());
      textLabel.setReadOnly(true);
      form.add(textLabel, type == 0 ? this.tr("Name") : this.tr("Index"));
  
      var renderedForm = new qx.ui.form.renderer.Single(form);
      this.add(renderedForm);

      var okButton = new qx.ui.form.Button(this.tr("Remove"), "icon/22/actions/dialog-apply.png");
      okButton.addState("default");
      renderedForm.addButton(okButton);

      var submit = function() {
        if(type == 0) {
          this.__commandTree.remCommand(item);
        } else {
          this.__commandTree.remFunction(item);
        }
        this.close();
      };
  
      okButton.addListener('execute', submit, this);
  
      var cancelButton = new qx.ui.form.Button(this.tr("Cancel"), "icon/22/actions/dialog-cancel.png");
      renderedForm.addButton(cancelButton);
  
      cancelButton.addListener('execute', function() {
          this.close();
      }, this);

      this.center();
      this.open();
    },

    __close : function() {

    }
  },

  construct : function(controller, tree)
  {
    var _this = this;
    this.base(arguments);
    this.__controller = controller;
    this.__commandTree = tree;
    this.setModal(true);
    this.setAllowMinimize(false);
    this.setLayout(new qx.ui.layout.VBox(5));
    this.setMinWidth(300);

    this.addListener('beforeClose', this.__close, this);
  }
});