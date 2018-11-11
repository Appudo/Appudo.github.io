/* ************************************************************************

   APPUDO CLI Creator

   https://www.appudo.com

   Copyright: 2018 Appudo UG (haftungsbeschränkt), https://www.appudo.com

   License: MIT License, https://opensource.org/licenses/MIT

   Authors: source@appudo.com

************************************************************************ */

qx.Class.define('appudo_cli_creator.view.desktop.SettingView',
{
  extend : qx.ui.container.Composite,

  members : {
    __controller : null,
    __currentData : null,
    __holder : null,
    __dataMap : {},

    __render : function(data) {
      var toolBar = new qx.ui.toolbar.ToolBar();
      var toolLbl = new qx.ui.basic.Label(this.tr("General Tool Settings")).set({padding:9});
      var formHolder = new qx.ui.container.Composite(new qx.ui.layout.VBox());
      toolBar.add(toolLbl);
      this.__holder = new qx.ui.container.Composite(new qx.ui.layout.VBox());
      this.__holder.add(toolBar);
      this.__holder.add(formHolder, {flex:1});
      this.add(this.__holder, {flex:1});
      this.__currentData = data;

      this.__holder.setPaddingTop(2);
      formHolder.setPadding(5);
      formHolder.setPaddingTop(10);

      var tabIndex = 1;
      var form = new qx.ui.form.Form();

      var pn = Object.getOwnPropertyNames(data);
      for(var i = 0; i < pn.length; i++) {
        var key = pn[i];
        var fkt = function() {
          var item = data[key];
          if(item.t !== undefined) {
            var value = new qx.ui.form.TextField();
            value.setMaxWidth(300);
            form.add(value, item.d);
            this.__dataMap[item.p] = value;
            value.addListener('changeValue', function(e) {
              var v = e.getData();
              if(this.__currentData) {
                switch(parseInt(item.t)) {
                  case 2:
                    v = parseInt(v);
                    break;
                }
                this.__currentData[item.p] = v;
                this.__controller.updateSettings();
              }
            }, this);
          } else
          if(item.cl) {
            var kindField = new qx.ui.form.SelectBox();
            kindField.setMaxWidth(300);
            kindField.setTabIndex(tabIndex++);   
            form.add(kindField, item.d);

            this.__dataMap[item.p] = kindField;

            kindField.addListener('changeSelection', function(e) {
              var sel_item = e.getData()[0];
              if(this.__currentData) {
                this.__currentData[item.p] = sel_item.getLabel();
                if(item.p == 'version') {
                  this.__controller.resetOperationData(this);
                }
                this.__controller.updateSettings();
              }
            }, this);

            var children = item.cl;
            for(var j = 0; j < children.length; j++) {
              var item1 = children[j];
              var cmdKind = new qx.ui.form.ListItem(item1, null, item1);
              kindField.add(cmdKind);
            }
          }
        };
        fkt.call(this);
      }
      var renderedForm = new qx.ui.form.renderer.Single(form);
      formHolder.add(renderedForm);
    },

    update : function(data) {
      this.__currentData = data.d;
      var pn = Object.getOwnPropertyNames(this.__dataMap);
      for(var i = 0; i < pn.length; i++) {
        var key = pn[i];
        var item = this.__dataMap[key];
        var v = this.__currentData[key];
        if(item) {
          if(item.getChildren && item.setSelection) {
            if(v !== undefined) {
              var children = item.getChildren();
              var j = 0;
              for(; j < children.length; j++) {
                var item1 = children[j];
                if(item1.getLabel() == v) {
                  break;
                }
              }
              item.setSelection([children[j]]);
            } else {
              item.setSelection(item.getChildren()[0]);
            }
          } else {
            if(v !== undefined) { 
              item.setValue('' + v);
            } else {
              item.resetValue();
            }
          }
        }
      }
    }
  },

  construct : function(controller)
  {
    var _this = this;
    this.base(arguments);
    this.__controller = controller;
    
    this.setLayout(new qx.ui.layout.VBox());

    this.__controller.addReset(function(from) {
      if(from != _this) {
        var fd = _this.__controller.getRawFileData();
        _this.update.call(_this, fd['config.json']);
      }
    });

    this.__controller.getConfigInfoFile(function(data) {
      _this.__render.call(_this, data);
    });
  }
});