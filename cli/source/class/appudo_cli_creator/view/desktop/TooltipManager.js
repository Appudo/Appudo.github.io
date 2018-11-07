/* ************************************************************************

   APPUDO CLI Creator

   https://www.appudo.com

   Copyright: 2018 Appudo UG (haftungsbeschränkt), https://www.appudo.com

   License: MIT License, https://opensource.org/licenses/MIT

   Authors: source@appudo.com

************************************************************************ */

qx.Mixin.define("appudo_cli_creator.view.desktop.TooltipManager", 
{ 
   members : 
   { 
     _applyCurrent : function(value, old) 
     { 
       this.base(arguments,value,old); 
       if(value) { 
        value.setRich(true); 
        value.setMaxWidth(400); 
        value.setShowTimeout(1200); 
        value.setHideTimeout(999999); 
       } 
     } 
   } 
});