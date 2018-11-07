/* ************************************************************************

   APPUDO CLI Creator

   https://www.appudo.com

   Copyright: 2018 Appudo UG (haftungsbeschränkt), https://www.appudo.com

   License: MIT License, https://opensource.org/licenses/MIT

   Authors: source@appudo.com

************************************************************************ */

qx.Class.define("appudo_cli_creator.view.desktop.UploadButton",
{
  extend : qx.ui.core.Widget,

  members :
  {
    _createContentElement : function()
    {
      return new qx.html.Element(
        "input",
        {
          overflowX: "hidden",
          overflowY: "hidden"
        },
        {
          type: "file"
        }
      );
    }, 

    getDom : function() {
        return this.getContentElement().getDomElement();
    }
  }
});