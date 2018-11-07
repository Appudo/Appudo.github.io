/* ************************************************************************

   APPUDO CLI Creator

   https://www.appudo.com

   Copyright: 2018 Appudo UG (haftungsbeschränkt), https://www.appudo.com

   License: MIT License, https://opensource.org/licenses/MIT

   Authors: source@appudo.com

************************************************************************ */

qx.Class.define("appudo_cli_creator.view.desktop.OperationSetupListItem",
{
  extend : qx.ui.container.Composite,

  members : {
      __parent : null,
      __indexLabel : null,
      __valueHolder : null,
      __index : -1,      

      getData : function() {
        return this.__parent.getData();
      },

      getList : function() {
        return this.__parent.getValueHolder();
      },

      setIndex : function(idx) {
        this.__index = idx;
        this.__indexLabel.setValue('#' + idx + ':');
      },

      getIndex : function() {
        return this.__index;
      },

      getCurrentRawType : function() {
        return this.__parent.getController().getType(this.__parent.getData()[this.__index]);
      },

      onDataChange : function() {
        var v = this.__valueHolder.getValue();
        switch(this.getRawType()) {
          case -1: // SettingGroup
            return;
          case 0: // String
            break;
          case 1: // Bool
            v = v == 'true';
            break;
          case 2: // Integer
            v = parseInt(v);
            break;
          case 3: // Number
            v = parseFloat(v);
            break;
          default:
            break;
        }
        this.__parent.getData()[this.__index] = v;
        this.__parent.getController().changedData(this.__parent.getParent(), false, {t:'OperationSetupItem'});
    },

    getParent : function() {
      return this.__parent;
    }
  },

  construct : function(value, parent, rawType, readOnly)
  {
    this.__parent = parent;
    this.base(arguments);
    this.setLayout(new qx.ui.layout.HBox().set({alignY:'bottom'}));
    this.__indexLabel = new qx.ui.basic.Label();
    this.__valueHolder = readOnly ? new qx.ui.basic.Label() : new qx.ui.form.TextField();
    this.add(this.__indexLabel);
    this.add(this.__valueHolder, {flex:1});
    this.setPadding(0);
    this.__valueHolder.setHeight(26);
    this.__valueHolder.setPadding(4);
    this.__indexLabel.setHeight(26);
    this.__indexLabel.setPadding(4);


    this.setRawType(rawType !== undefined ? rawType : 0);

    this.bind("value", this.__valueHolder, "value");
    if(!readOnly) {
      this.__valueHolder.addListener('changeValue', this.onDataChange, this);
      this.addListener('changeRawType', this.onDataChange, this);
    } else {
      this.bind("value", this.__valueHolder, "toolTipText");
    }

    if(value != null) {
      this.setValue(value);
    }
  },

  properties :
  {
    value :
    {
      check : "String",
      event : "changeValue",
      nullable : true
    },

    rawType :
    {
      check : "Integer",
      event : "changeRawType",
      nullable : false
    }
  }
});
