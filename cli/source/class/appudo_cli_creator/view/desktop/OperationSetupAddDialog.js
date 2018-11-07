/* ************************************************************************

   APPUDO CLI Creator

   https://www.appudo.com

   Copyright: 2018 Appudo UG (haftungsbeschränkt), https://www.appudo.com

   License: MIT License, https://opensource.org/licenses/MIT

   Authors: source@appudo.com

************************************************************************ */

/**
 * @asset(qx/icon/${qx.icontheme}/22/actions/dialog-apply.png)
 */
qx.Class.define("appudo_cli_creator.view.desktop.OperationSetupAddDialog",
{
  extend : qx.ui.window.Window,
  members :
  {
    __controller : null,
    __sumitFkt : null,

    openAndCenter : function(target, type) {
      this.__render(target, type);
      this.center();
      this.open();
    },

    __renderComposite : function(form, info, typeKey) {
      var valueField;
      var kindField;
      var kitem;
      var types = this.__controller.getOperationTypes();
      var type_info = types[typeKey];
      if(type_info.or) {
        var c = type_info.or;
        var r = [];
        r.length = c.length;
        for(var i = 0; i < c.length; i++) {
          var key = c[i];
          var tv = info.textValue;
          this.__renderComposite(form, info, key);
          info.textValue = tv;
          r[i] = info.submit;
        }
        info.submit = function() {
          var res = 0;
          for(var i = 0; i < r.length; i++) {
            res |= r[i]().value;
          }
          return {value:res};
        }
      }
      else
      if(type_info.cl) {
        var map = {};
        var mask = 0;
        var nn = type_info.cl;
        kindField = new qx.ui.form.SelectBox();
        kindField.setTabIndex(info.tabIndex++);   
        var pn = Object.getOwnPropertyNames(nn);
        for(var i = 0; i < pn.length; i++) {
          var k = pn[i];
          var o = nn[k];
          kitem = new qx.ui.form.ListItem(k, null, o.v);  
          kindField.add(kitem);
          mask |= o.v;
          map[o.v] = i;
        }
        if(info.textValue) {
          var v = parseInt(info.textValue) & mask;
          if(map[v] !== undefined) {
            kindField.setSelection([kindField.getChildren()[map[v]]]);
          }
        }
        form.add(kindField, typeKey);
        info.submit = function() {
          var sel = kindField.getSelection()[0];
          return {value:sel.getModel()};
        }
      }
      else
      if(type_info.ls) {
        if(info.textValue) {
          var v = parseInt(info.textValue);
          info.textValue = '' + (v >> type_info.ls.n);
        }
        this.__renderComposite(form, info, type_info.ls.v);
        var s = info.submit;
        info.submit = function() {
          return {value:s().value << type_info.ls.n};
        }
      }
      else
      if(type_info.pn) {
        var nn = type_info;
        kindField = new qx.ui.form.SelectBox();
        kindField.setTabIndex(info.tabIndex++);   
        kitem = new qx.ui.form.ListItem(nn.p, null, 0);  
        kindField.add(kitem);
        kitem = new qx.ui.form.ListItem(nn.n, null, 1);   
        kindField.add(kitem);
        form.add(kindField, typeKey);
        if(info.textValue) {
          var v = parseInt(info.textValue);
          var idx = 0;
          if(v < 0) {
            idx++;
            info.textValue = info.textValue.substr(1);
          }
          kindField.setSelection([kindField.getChildren()[idx]]);
        }
        this.__renderComposite(form, info, nn.pn);
        var s = info.submit;
        info.submit = function() {
          var v = s().value;
          var sel = kindField.getSelection()[0];
          var r = sel.getModel() == 0 ? v : -v;
          return {value:r};
        }
      } else {
        var t = type_info.t;
        if(t === undefined)
          t = -1;
        valueField = new qx.ui.form.TextField();
        valueField.setValue(info.textValue || '');

        info.submit = function() {
          return {value:valueField.getValue()};
        }
        switch(t) {
          case -1:  // any JSON
            kindField = new qx.ui.form.SelectBox();
            kindField.setTabIndex(info.tabIndex++);   
            kitem = new qx.ui.form.ListItem("String", null, 0);
            kindField.add(kitem);
            kitem = new qx.ui.form.ListItem("Boolean", null, 1);
            kindField.add(kitem);
            kitem = new qx.ui.form.ListItem("Integer", null, 2);
            kindField.add(kitem);
            kitem = new qx.ui.form.ListItem("Number", null, 3);
            kindField.add(kitem);
            if(info.currentRawType != -1) {
              kindField.setSelection([kindField.getChildren()[info.currentRawType]]);
            }
            form.add(kindField, this.tr("Value Type"));
            form.add(valueField, this.tr("Value"));
            info.submit = function() {
              var sel = kindField.getSelection()[0];
              return {value:valueField.getValue(), type:sel.getModel()};
            }
            break;
          case 0:   // String
            form.add(valueField, this.tr("String Value"));
            break;
          case 1:   // Boolean
            break;
          case 2:   // Integer
            form.add(valueField, this.tr("Integer Value"));
            break;
          case 3:   // Number
            form.add(valueField, this.tr("Number Value"));
          break;

        }
        valueField.setTabIndex(info.tabIndex++);
        if(!info.focusField)
          info.focusField = valueField;
      }
    },

    __render : function(target, type) {
      var types = this.__controller.getOperationTypes();
      var tv;
      var valueType;
      var sitem;
      var submit;
      var info = {tabIndex:1, currentRawType:-1, textValue:null};
      var getTarget = function() {
        return target;
      };
      if((type & 1) != 0) { // textField in list
        var litem = target.getLayoutParent();
        var idx = litem.getIndex();
        sitem = litem.getParent();
        tv = sitem.getCaption() + ' #' + idx;
        info.currentRawType = litem.getCurrentRawType();
        info.textValue = target.getValue();
        getTarget = function() {
          return litem;
        }
      } else 
      if((type & 2) != 0) { // textField
        sitem = target.getLayoutParent();
        tv = sitem.getCaption();
        info.currentRawType = sitem.getCurrentRawType();
        info.textValue = target.getValue();
      } else {  // list
        sitem = target.getParent();
        tv = sitem.getCaption();
        getTarget = function() {
          var li = target.addListItem();
          var rt = sitem.getRawType();
          if(rt !== undefined)
            li.setRawType(rt);
          return li;
        };
      }
      valueType = sitem.getValueType();

      var types = this.__controller.getOperationTypes();
      this.removeAll();

      var form = new qx.ui.form.Form();
  
      if(tv) {
        var tvField = new qx.ui.form.TextField();
        tvField.setTabIndex(info.tabIndex++);
        tvField.setReadOnly(true);
        tvField.setValue(tv);
        form.add(tvField, this.tr("Target"));
      }

      this.__renderComposite(form, info, valueType);
      var submit = function() {
        var target = getTarget();
        var res = info.submit();
        if(res.type !== undefined)
          target.setRawType(res.type);
        target.setValue('' + res.value);
        return true;
      }
  
      var renderedForm = new qx.ui.form.renderer.Single(form);
      this.add(renderedForm);
  
      var okButton = new qx.ui.form.Button(this.tr("Ok"), "icon/22/actions/dialog-apply.png");
      okButton.addState("default");
      renderedForm.addButton(okButton);
       
      renderedForm.addListener("keypress", function(e){
        var key = e.getKeyIdentifier().toLowerCase();
        switch(key) {
          case "enter":
            if(submit())
              this.close();
            break;
        }
      }, this);
  
      renderedForm.addListener("appear",function() {
        if(info.focusField)
          info.focusField.focus();
      }, this);
  
      okButton.addListener('execute', function() {
        if(submit())
          this.close();
      }, this);
  
      var cancelButton = new qx.ui.form.Button(this.tr("Cancel"), "icon/22/actions/dialog-cancel.png");
      renderedForm.addButton(cancelButton);
  
      cancelButton.addListener('execute', function() {
          this.close();
      }, this);
    },

    __close : function() {

    }
  },

  construct : function(controller)
  {
    var _this = this;
    this.base(arguments);
    this.__controller = controller;
    this.setModal(true);
    this.setAllowMinimize(false);
    this.setLayout(new qx.ui.layout.VBox(5));
    this.setCaption(this.tr('Add (composite) type value'));
    this.setMinWidth(400);

    this.addListener('beforeClose', this.__close, this);
    
  }
});