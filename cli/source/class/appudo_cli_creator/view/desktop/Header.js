/* ************************************************************************

   APPUDO CLI Creator

   https://www.appudo.com

   Copyright: 2018 Appudo UG (haftungsbeschränkt), https://www.appudo.com

   License: MIT License, https://opensource.org/licenses/MIT

   Authors: source@appudo.com

************************************************************************ */

qx.Class.define("appudo_cli_creator.view.desktop.Header",
{
  extend : qx.ui.container.Composite,

  construct : function()
  {
    this.base(arguments);
    this.setAppearance("app-header");
    this.setLayout(new qx.ui.layout.VBox());

    var title = new qx.ui.basic.Label("APPUDO CLI Creator");

    this.add(title);
  }
});
