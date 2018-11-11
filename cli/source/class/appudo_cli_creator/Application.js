/* ************************************************************************

   APPUDO CLI Creator

   https://www.appudo.com

   Copyright: 2018 Appudo UG (haftungsbeschränkt), https://www.appudo.com

   License: MIT License, https://opensource.org/licenses/MIT

   Authors: source@appudo.com

************************************************************************ */

/**
 * This is the main application class of your custom application "APPUDO_CLI_CREATOR"
 *
 * @asset(zip/*)
 * @asset(cmd/*)
 */
qx.Class.define("appudo_cli_creator.Application",
{
  extend : qx.application.Standalone,
  
  members :
  {
    __hdr : null,
    __horizontalSplitPane : null,
    __mainController : null,
    __cmdTree : null,
    __cmdTreeFilter : null,
                                                                                                                                                                                                                    
    changeLabelFonstSize : function(font, add) {                                                                                                                                                                                                                
      var m = qx.theme.manager.Font.getInstance();   
      var l = new qx.ui.basic.Label('');
      l.setFont(font);                                                                                                                                                                               
      var dF = m.resolve(l.getFont());                                                                                                                                                                                  
      var size = dF.getSize();                                                                                                                                                                                                  
      dF.setSize(size + add);                                                                                                                                                                                                   
    },       
    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     * 
     * @lint ignoreDeprecated(alert)
     */
    main : function()
    {
      this.base(arguments);

      var doc = this.getRoot();

      doc.setBlockerColor('#656565');
      doc.setBlockerOpacity(0.5);

      this.__mainController = new appudo_cli_creator.controller.MainController(doc);
      this.__mainController.initData();

      this.changeLabelFonstSize('default', 3);
      this.changeLabelFonstSize('bold', 3);

      if(qx.core.Environment.get("qx.debug"))
      {
        qx.log.appender.Native;
        qx.log.appender.Console;
      }

      var area = new qx.ui.container.Scroll;

      var dockLayout = new qx.ui.layout.Dock();
      var dockLayoutComposite = new qx.ui.container.Composite(dockLayout);

      area.add(dockLayoutComposite);
      this.getRoot().add(area, {edge:0});

      this.__hdr = new appudo_cli_creator.view.desktop.Header(this.__mainController);
      dockLayoutComposite.add(this.__hdr, {edge: "north"});

      var stack = new qx.ui.container.Stack();

      this.__toolBarView = new appudo_cli_creator.view.desktop.MainBar(this.__mainController, stack);
      dockLayoutComposite.add(this.__toolBarView, {edge: "north"});

      this.__horizontalSplitPane = new qx.ui.splitpane.Pane();
      dockLayoutComposite.add(this.__horizontalSplitPane);
      this.__horizontalSplitPane.setPadding(10);
      this.__horizontalSplitPane.setPaddingTop(3);

      this.__cmdTree = new appudo_cli_creator.view.desktop.CommandTree(this.__mainController);
      var left = new qx.ui.container.Composite(new qx.ui.layout.VBox());
      left.setPadding(0);
      left.setPaddingRight(10);
      left.setPaddingTop(2);
      left.setMinWidth(250);
      var leftHBox = new appudo_cli_creator.view.desktop.CommandTreeBar(this.__mainController, this.__cmdTree);

      left.add(leftHBox);
      
      var treeBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));

      this.__cmdTreeFilter = new appudo_cli_creator.view.desktop.CommandTreeFilter(this.__mainController);

      treeBox.add(this.__cmdTree, {flex:1});
      treeBox.add(this.__cmdTreeFilter);
      left.add(treeBox, {flex:1});

      this.__horizontalSplitPane.add(left, 0);
      this.__horizontalSplitPane.setAppearance("app-splitpane");

      var stackBox = new qx.ui.container.Composite(new qx.ui.layout.VBox());

      stackBox.add(stack, {flex:1});

      stackBox.setPadding(0);
      stackBox.setPaddingTop(0);
      stackBox.setPaddingLeft(10);

      this.__horizontalSplitPane.add(stackBox, 1);
      this.__horizontalSplitPane.setAppearance("app-splitpane");

      this.__mainController.isActive = function(v) {
        return stack.getSelection()[0] == v;
      }

      stack.add(new appudo_cli_creator.view.desktop.OperationView(this.__mainController));
      stack.add(new appudo_cli_creator.view.desktop.I18nView(this.__mainController));
      stack.add(new appudo_cli_creator.view.desktop.SettingView(this.__mainController));
      stack.add(new appudo_cli_creator.view.desktop.EditorView(this.__mainController));
      stack.add(new appudo_cli_creator.view.desktop.RunView(this.__mainController));

      this.__mainController.resetData();

      qx.Class.patch(qx.ui.tooltip.Manager, appudo_cli_creator.view.desktop.TooltipManager);
    }
  },

  destruct : function()
  {
    this._disposeObjects("__hdr", "__horizontalSplitPane", "__mainController", "__cmdTree", "__cmdTreeFilter");
  }
});