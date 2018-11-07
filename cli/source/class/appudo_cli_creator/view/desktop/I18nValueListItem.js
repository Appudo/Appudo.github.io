/* ************************************************************************

   APPUDO CLI Creator

   https://www.appudo.com

   Copyright: 2018 Appudo UG (haftungsbeschränkt), https://www.appudo.com

   License: MIT License, https://opensource.org/licenses/MIT

   Authors: source@appudo.com

************************************************************************ */

qx.Class.define("appudo_cli_creator.view.desktop.I18nValueListItem",
{
  extend : qx.ui.container.Composite,

  members : {
      __parent : null,
      __indexLabel : null,
      __valueHolder : null,
      __check : null,
      __index : -1,      

      getData : function() {
        return this.__parent.getData();
      },

      getList : function() {
        return this.__parent.getList();
      },

      setRawValue : function(v) {
        this.__check.setValue(v);
      },

      setIndex : function(idx) {
        this.__index = idx;
        this.__indexLabel.setValue('#' + idx + ':');
      },

      getIndex : function() {
        return this.__index;
      },

      onDataChange : function() {
        var v = this.__valueHolder.getValue();
        var c = this.__check.getValue();

        var cv = this.__parent.getData()[this.__index];

        if(!c) {
            v = parseInt(v);
        }

        if(cv !== v) {
          this.__parent.getData()[this.__index] = v;
          this.__parent.getParent().changedI18nData();
        }
      },

      getParent : function() {
        return this.__parent;
      },

      select : function() {
        this.setDecorator(this.__parent.getMarkedItemDecorator());
        this.__indexLabel.setTextColor("text-selected");
      },

      unselect : function() {
        this.setDecorator(this.__parent.getItemDecorator());
        this.__indexLabel.setTextColor("text-label");
      }
  },

  construct : function(value, parent)
  {
    this.__parent = parent;
    this.base(arguments);
    this.setLayout(new qx.ui.layout.HBox().set({alignY:'bottom'}));
    this.__indexLabel = new qx.ui.basic.Label();
    this.__valueHolder = new appudo_cli_creator.view.desktop.EscapeTextField();
    this.__check = new qx.ui.form.CheckBox();
    this.add(this.__indexLabel);
    this.add(this.__valueHolder, {flex:1});
    this.add(this.__check);
    this.setPadding(0);
    this.__valueHolder.setHeight(26);
    this.__valueHolder.setPadding(4);
    this.__indexLabel.setHeight(26);
    this.__indexLabel.setPadding(4);
    this.__check.setPaddingLeft(5);
    this.__check.setPaddingRight(5);

    this.bind("value", this.__valueHolder, "value");
    this.__check.addListener('changeValue', this.onDataChange, this);
    this.__valueHolder.addListener('changeValue', this.onDataChange, this);

    if(value != null) {
      this.setValue(value);
    }

    this.addListener('click', function() {
      this.__parent.selectItem(this);
    }, this);
  },

  properties :
  {
    value :
    {
      check : "String",
      event : "changeValue",
      nullable : true
    }
  }
});
