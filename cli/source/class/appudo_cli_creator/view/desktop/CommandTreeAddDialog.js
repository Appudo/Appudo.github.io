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
qx.Class.define("appudo_cli_creator.view.desktop.CommandTreeAddDialog",
{
  extend : qx.ui.window.Window,
  members :
  {
    __controller : null,
    __commandTree : null,

    openAndCenter : function() {
      var selection = this.__commandTree.getSelection();
      var parent;
      var kind;
      var field;
      if(selection.length) {
        parent = selection[0];
      } else {
        parent = this.__commandTree.getCommandFolder();
      }
      kind = parent.getNodeKind();
      
      if(kind == 2 || kind == 4) {
        if(this.__commandTree.addFunction()) {
        }
        return;
      } else {
        if(kind == 3) {
          parent = this.__commandTree.getRoot().getChildren()[0];
        } else {
          while(kind == 5) {
            parent = parent.getParent();
            kind = parent.getNodeKind();
          }
        }
        field = this.__addCommand(parent);
      }

      this.center();
      this.open();
    },

    __addCommand : function(parent) {
      var _this = this;
      this.setCaption(this.tr('Add new Command'));
      this.removeAll();

      var tabIndex = 1;
      var form = new qx.ui.form.Form();

      var textLabel = new qx.ui.form.TextField();
      textLabel.setValue(parent.getLabel());
      textLabel.setReadOnly(true);
      form.add(textLabel, this.tr("Parent"));

      var textField = new qx.ui.form.TextField();
      textField.setPlaceholder("required");
      textField.setTabIndex(tabIndex++);
      textField.setRequired(true);
      form.add(textField, this.tr("Name"));

      var kindField = new qx.ui.form.SelectBox();
      kindField.setTabIndex(tabIndex++);   
      var cmdKind = new qx.ui.form.ListItem(this.tr("Command"), null, 0);
      kindField.add(cmdKind);
      var collKind = new qx.ui.form.ListItem(this.tr("Collection"), null, 1);
      kindField.add(collKind);
      form.add(kindField, this.tr("Type"));
  
      var renderedForm = new qx.ui.form.renderer.Single(form);
      this.add(renderedForm);

      var okButton = new qx.ui.form.Button(this.tr("Ok"), "icon/22/actions/dialog-apply.png");
      okButton.addState("default");
      renderedForm.addButton(okButton);

      var submit = function() {
        var name = textField.getValue() || '';
        var kindSel = kindField.getSelection()[0];
        if(name != '') {
          if(this.__commandTree.addCommand(parent, name, kindSel == cmdKind ? 0 : 1)) {
            this.close();
          }
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

      return textField;
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