/* ************************************************************************

   APPUDO CLI Creator

   https://www.appudo.com

   Copyright: 2018 Appudo UG (haftungsbeschränkt), https://www.appudo.com

   License: MIT License, https://opensource.org/licenses/MIT

   Authors: source@appudo.com

************************************************************************ */

/**
 * The main tool bar widget
 *
 * @asset(qx/icon/${qx.icontheme}/22/actions/document-new.png)
 * @asset(qx/icon/${qx.icontheme}/22/actions/document-open.png)
 * @asset(qx/icon/${qx.icontheme}/22/actions/document-save.png)
 * @asset(qx/icon/${qx.icontheme}/22/actions/help-about.png)
 * @asset(qx/icon/${qx.icontheme}/22/actions/help-contents.png)
 * @asset(qx/icon/${qx.icontheme}/22/apps/preferences-locale.png)
 * @asset(qx/icon/${qx.icontheme}/22/categories/system.png)
 * @asset(qx/icon/${qx.icontheme}/22/apps/utilities-text-editor.png)
 * @asset(qx/icon/${qx.icontheme}/22/actions/media-playback-start.png)
 */
qx.Class.define("appudo_cli_creator.view.desktop.MainBar",
{
  extend : qx.ui.menubar.MenuBar,

  members :
  {
    __addBtn : null,
    __saveBtn : null,
    __controller : null,
    __openDialog : null,
    __exportDialog : null,
    __resetDialog : null,
    __uploadBtn : null
  },
  /**
   * @param controller {appudo_cli_creator.controller.MainController} The main controller class
   */
  construct : function(controller, stack)
  {
    var _this = this;
    this.base(arguments);

    this.__controller = controller;

    this.__newBtn = new qx.ui.toolbar.Button(this.tr("New"), "icon/22/actions/document-new.png");
    this.add(this.__newBtn);

    this.__addBtn = new qx.ui.toolbar.Button(this.tr("Load"), "icon/22/actions/document-open.png");
    this.add(this.__addBtn);

    this.__saveBtn = new qx.ui.toolbar.Button(this.tr("Export"), "icon/22/actions/document-save.png");
    this.add(this.__saveBtn);

    this.__stack = stack;
    
    var cmd = new qx.ui.toolbar.RadioButton(this.tr("Command"), "icon/22/apps/utilities-terminal.png");
    var edit = new qx.ui.toolbar.RadioButton(this.tr("Editor"), "icon/22/apps/utilities-text-editor.png");
    var i18n = new qx.ui.toolbar.RadioButton(this.tr("I18n"), "icon/22/apps/preferences-locale.png");
    var setting = new qx.ui.toolbar.RadioButton(this.tr("Settings"), "icon/22/categories/system.png");
    var run = new qx.ui.toolbar.RadioButton(this.tr("Run"), "icon/22/actions/media-playback-start.png");

    var group = new qx.ui.form.RadioGroup();
    group.add(cmd, edit, i18n, setting, run);
    
    this.addSeparator();

    this.add(cmd);
    this.add(edit);
    this.add(i18n);
    this.add(setting);
    this.add(run);

    group.addListener("changeSelection", function(e)
    {
        var selection = e.getData();
        var child = 0;
        if(selection[0] == i18n)
        {
          child = 1;
        }
        else
        if(selection[0] == setting)
        {
          child = 2;
        }
        else
        if(selection[0] == edit)
        {
          child = 3;
        }
        else
        if(selection[0] == run)
        {
          child = 4;
        }
        var item = this.__stack.getChildren()[child];
        if(item.activate)
          item.activate();
        this.__stack.setSelection([item]);
    }, this);

    this.addSeparator();
    this.addSpacer();

    var helpBtn = new qx.ui.toolbar.Button(this.tr("Help"), "icon/22/actions/help-contents.png");
    this.add(helpBtn);

    var aboutBtn = new qx.ui.toolbar.Button(this.tr("About"), "icon/22/actions/help-about.png");
    this.add(aboutBtn);

    controller.loadStart = function() {
      _this.__openDialog.openAndCenter();
    }

    this.__newBtn.addListener("execute", function(e) {
      if(this.__controller.getFileData())
        this.__resetDialog.openAndCenter();
    }, this);

    this.__addBtn.addListener("execute", function(e) {
      if(this.__controller.getFileData()) {
        this.__resetDialog.openAndCenter(function() {
          _this.__uploadBtn.getDom().click();
        });
      } else {
        this.__uploadBtn.getDom().click();
      }
    }, this);

    this.__saveBtn.addListener("execute", function(e) {
      this.__exportDialog.openAndCenter();
    }, this);

    helpBtn.addListener("execute", function(e) {
      this.__controller.openLink('https://www.appudo.com/doc/appudo_cli');
    }, this);

    aboutBtn.addListener("execute", function(e) {
      this.__controller.openLink('https://www.appudo.com/doc/appudo_cli');
    }, this);

    this.__openDialog = new appudo_cli_creator.view.desktop.OpenDialog(this.__controller);
    this.__exportDialog = new appudo_cli_creator.view.desktop.ExportDialog(this.__controller);
    this.__resetDialog = new appudo_cli_creator.view.desktop.ResetDialog(this.__controller);
    
    this.__controller.getRoot().add(this.__openDialog);
    this.__controller.getRoot().add(this.__exportDialog);

    this.__uploadBtn = new appudo_cli_creator.view.desktop.UploadButton();
    this.add(this.__uploadBtn);

    this.__uploadBtn.addListener('appear', function(e)
    {
      var dom = this.__uploadBtn.getDom();
      controller.resetUpload = function() {
        dom.value = '';
      }
  
      controller.loadFile(dom, {setValue:function(v) {
        controller.loadSetValue(v);
      },setMax:function(v) {
        controller.loadSetMax(v);
      }});
      this.__uploadBtn.setVisibility('excluded');
    }, this);
  },

  destruct : function() {
    this._disposeObjects("__addBtn", "__saveBtn", "__controller", "__openDialog", "__exportDialog", "__resetDialog", "__uploadBtn");
  }
});
