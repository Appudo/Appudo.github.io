/* ************************************************************************

   APPUDO CLI Creator

   https://www.appudo.com

   Copyright: 2018 Appudo UG (haftungsbeschränkt), https://www.appudo.com

   License: MIT License, https://opensource.org/licenses/MIT

   Authors: source@appudo.com

************************************************************************ */

/**
 * 
 * @asset(qx/icon/${qx.icontheme}/22/actions/list-add.png)
 * @asset(qx/icon/${qx.icontheme}/22/places/user-trash.png)
 * @asset(qx/icon/${qx.icontheme}/22/apps/utilities-log-viewer.png)
 * 
 */
qx.Class.define('appudo_cli_creator.view.desktop.OperationView',
{
  extend : qx.ui.container.Composite,


  members :
  {
    __controller : null,
    __horizontalSplitPane : null
  },

  construct : function(controller)
  {
    this.base(arguments);

    var dockLayout = new qx.ui.layout.Dock();
    this.setLayout(dockLayout);

    this.__horizontalSplitPane = new qx.ui.splitpane.Pane().set({appearance:'app-splitpane'});
    this.add(this.__horizontalSplitPane, {flex:1});
    this.__horizontalSplitPane.setPadding(0);
    this.__horizontalSplitPane.setPaddingTop(0);
    this.__horizontalSplitPane.setPaddingLeft(0);
    
    var left = new qx.ui.container.Composite(new qx.ui.layout.VBox(10));
    left.setPadding(0);
    left.setPaddingRight(10);
    left.setPaddingTop(1);
    this.__horizontalSplitPane.add(left, 1);

    var right = new qx.ui.container.Composite(new qx.ui.layout.VBox(10));
    right.setMinWidth(250);
    right.setPadding(0);
    right.setPaddingTop(2);
    right.setPaddingLeft(10);
    this.__horizontalSplitPane.add(right, 0);

    this.__verticalSplitPane0 = new qx.ui.splitpane.Pane().set({orientation:'vertical', appearance:'app-splitpane'});
    this.__verticalSplitPane1 = new qx.ui.splitpane.Pane().set({orientation:'vertical', appearance:'app-splitpane'});
    this.__verticalSplitPane2 = new qx.ui.splitpane.Pane().set({orientation:'vertical', appearance:'app-splitpane'});


    left.add(this.__verticalSplitPane2, {flex:1});

    var addSetup = new qx.ui.toolbar.Button(null, "icon/22/actions/list-add.png");
    var delSetup = new qx.ui.toolbar.Button(null, "icon/22/places/user-trash.png");
    addSetup.setToolTipText(this.tr("Add (composite) value to selected list or item"));
    delSetup.setToolTipText(this.tr("Delete value from selected list"));

    var operationChainCurrentLbl = new qx.ui.basic.Label("").set({padding:9});
    var operationSetupCurrentLbl = new qx.ui.basic.Label("").set({padding:9});
    this.__varSlots = new appudo_cli_creator.view.desktop.VarSlots(controller);
    this.__operationSetup = new appudo_cli_creator.view.desktop.OperationSetup(controller, operationSetupCurrentLbl, addSetup, delSetup);
    this.__operationChain = new appudo_cli_creator.view.desktop.OperationChain(controller, operationChainCurrentLbl, this.__operationSetup, this.__varSlots);

    this.__operationChain.setMinHeight(100);
    this.__operationChain.setHeight(100);
    
    this.__varSlotsHolder = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({paddingTop:1});
    this.__operationChainHolder = new qx.ui.container.Composite(new qx.ui.layout.VBox());
    this.__operationSetupHolder = new qx.ui.container.Composite(new qx.ui.layout.VBox());

    this.__varSlotsBar = new qx.ui.toolbar.ToolBar();
    var slotLbl = new qx.ui.basic.Label(this.tr("Variable Slot Usage")).set({padding:9});
    this.__varSlotsBar.add(slotLbl);
    this.__varSlotsHolder.add(this.__varSlotsBar);
    this.__varSlotsHolder.add(this.__varSlots, {flex:1});

    this.__operationChainBar = new qx.ui.toolbar.ToolBar();
    this.__operationChainRemoveBtn = new qx.ui.toolbar.Button(null, "icon/22/places/user-trash.png");
    this.__operationChainRemoveBtn.setToolTipText(this.tr('Remove Operation'));
    this.__operationChainRemoveBtn.setEnabled(false);
    var operationChainLbl = new qx.ui.basic.Label(this.tr("Command Operation Chain")).set({padding:9});
    this.__operationChainBar.add(operationChainLbl);
    this.__operationChainBar.add(operationChainCurrentLbl);
    this.__operationChainBar.addSpacer();
    this.__operationChainBar.add(this.__operationChainRemoveBtn);

    this.__operationChainHolder.add(this.__operationChainBar);
    this.__operationChainHolder.add(this.__operationChain, {flex:1});

    this.__operationChain.addListener('changeSelection', function(e) {
      var selection = e.getData();
      this.__operationChainRemoveBtn.setEnabled(selection.length != 0);
    }, this);

    this.__operationChainRemoveBtn.addListener('execute', this.__operationChain.onRemove, this.__operationChain);

    this.__operationSetupBar = new qx.ui.toolbar.ToolBar();
    var operationSetupLbl = new qx.ui.basic.Label(this.tr("Operation Setup")).set({padding:9});
    this.__operationSetupBar.add(operationSetupLbl);
    this.__operationSetupBar.add(operationSetupCurrentLbl);
    this.__operationSetupBar.addSpacer();

    var wr = new qx.ui.toolbar.RadioButton(null, "icon/22/apps/utilities-text-editor.png");
    wr.setToolTipText(this.tr('Edit Mode'));
    var ronly = new qx.ui.toolbar.RadioButton(null, "icon/22/apps/utilities-log-viewer.png");
    ronly.setToolTipText(this.tr('View Mode'));
    var group = new qx.ui.form.RadioGroup();
    group.add(wr, ronly);
    this.__operationSetupBar.add(addSetup);
    this.__operationSetupBar.add(delSetup);
    this.__operationSetupBar.addSeparator();
    this.__operationSetupBar.add(wr);
    this.__operationSetupBar.add(ronly);
    this.__operationSetupBar.setKeepFocus(true);

    group.addListener("changeSelection", function(e)
    {
        var selection = e.getData();
        this.__operationSetup.updateMode.call(this.__operationSetup, selection[0] == ronly);
    }, this);

    this.__operationSetupHolder.add(this.__operationSetupBar);
    this.__operationSetupHolder.add(this.__operationSetup, {flex:1});

    this.__verticalSplitPane1.add(this.__varSlotsHolder, 0);
    this.__verticalSplitPane1.add(this.__operationChainHolder, 1);
    this.__verticalSplitPane2.add(this.__verticalSplitPane1, 0);
    this.__verticalSplitPane2.add(this.__operationSetupHolder, 1);

    right.add(this.__verticalSplitPane0, {flex:1});

    this.__operationListHolder = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
    this.__varSlotsSettingHolder = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));

    this.__operationList = new appudo_cli_creator.view.desktop.OperationList(controller, this.__operationChain);
    this.__operationListFilter = new appudo_cli_creator.view.desktop.OperationListFilter(controller);
    this.__varSlotsSetting = new appudo_cli_creator.view.desktop.VarSlotsSetting(this.__varSlots);
    this.__operationList.setMinHeight(200);
    this.__varSlotsSetting.setMinHeight(200);

    this.__operationListBar = new qx.ui.toolbar.ToolBar();
    var operationListLbl = new qx.ui.basic.Label(this.tr("Operation Drag List")).set({padding:7});
    this.__operationListBar.add(operationListLbl);

    this.__operationListHolder.add(this.__operationListBar);
    this.__operationListHolder.add(this.__operationListFilter);
    this.__operationListHolder.add(this.__operationList, {flex:1});

    this.__varSlotsSettingBar = new qx.ui.toolbar.ToolBar();
    var varSlotsSettingLbl = new qx.ui.basic.Label(this.tr("Variable Slots Settings")).set({padding:7});
    this.__varSlotsSettingBar.add(varSlotsSettingLbl);

    this.__varSlotsSettingHolder.add(this.__varSlotsSettingBar);
    this.__varSlotsSettingHolder.add(this.__varSlotsSetting, {flex:1});

    this.__verticalSplitPane0.add(this.__operationListHolder, 1);
    this.__verticalSplitPane0.add(this.__varSlotsSettingHolder, 0);
  },
  destruct : function()
  {
    this._disposeObjects("__horizontalSplitPane", "__verticalSplitPane0");
  }
});