/* ************************************************************************

   APPUDO CLI Creator

   https://www.appudo.com

   Copyright: 2018 Appudo UG (haftungsbeschränkt), https://www.appudo.com

   License: MIT License, https://opensource.org/licenses/MIT

   Authors: source@appudo.com

************************************************************************ */

qx.Class.define("appudo_cli_creator.view.desktop.OperationSetupItem",
{
  extend : qx.ui.container.Composite,

  members : 
  {
      __parent : null,
      __controller : null,
      __isList : false,
      __currentData : null,
      __groupItems : null,
      __mainLabel : null,
      __textColor : 'text-label',
      __namePath : null,
      __enabledCheck : null,
      __valueHolder : null,
      __valueType : null,
      __groupEnabled : true,

      getController : function() {
        return this.__controller;
      },

      getParent : function() {
        return this.__parent;
      },

      isList : function() {
          return this.__isList;
      },

      getCaption : function() {
        return this.__mainLabel.getValue();
      },

      getBox : function() {
        var b = this.getBounds();
        return b ? b : {width:0, height:0};
      },

      refresh : function() {
        if(this.__isList) {
          this.__valueHolder.refresh();
        }
      },

      setGroupItems : function(items) {
        this.setGroupColor('#3f51b5');
        this.__groupItems = items;
        this.__groupItems.forEach(function(item) {
            item.setGroupColor('#3f51b5');
        });
      },

      setGroupColor : function(color) {
        this.__textColor = color;
        this.__mainLabel.setTextColor(this.__valueHolder.getEnabled() ? color : '#7b7a7e');
      },

      __setEnabled : function(v)  {
        this.__mainLabel.setTextColor(v ? this.__textColor : '#7b7a7e');
        this.__valueHolder.setEnabled(v);
        if(this.__groupItems) {
          this.setGroupEnabled(v);
        }
      },

      updateGroupEnabled : function(v)  {
        this.__groupEnabled = v;
        this.__enabledCheck.setEnabled(v);
        this.__setEnabled(v && this.getOpValue() !== undefined);
      },

      setGroupEnabled : function(v)  {
        this.__groupItems.forEach(function(item) {
          if(v == true) {
            item.setOpValue();
          } else {
            item.unesetOpValue(v);
          }
          item.updateGroupEnabled(v);
        }); 
      },

      __getOpTextValue : function(rawValue, listTypeKey, valueRawType, result) {
        var textValue = '' + rawValue;
        var types = this.__controller.getOperationTypes();
        var type_info = types[listTypeKey];
        if(type_info.or) {
          var c = type_info.or;
          for(var i = 0; i < c.length; i++) {
            var key = c[i];
            this.__getOpTextValue(textValue, key, valueRawType, result);
          }
        }
        else
        if(type_info.cl) {
          var map = {};
          var mask = 0;
          var nn = type_info.cl;  
          var pn = Object.getOwnPropertyNames(nn);
          for(var i = 0; i < pn.length; i++) {
            var k = pn[i];
            var o = nn[k];
            mask |= o.v;
            map[o.v] = i;
          }
          var v = parseInt(textValue) & mask;
          if(map[v] !== undefined) {
            var i = map[v];
            var k = pn[i];
            var o = nn[k];
            
            if(result.v.length != 0) {
              result.v += ', ';
            }

            result.v += listTypeKey + '(' + k + ')';
          }
        }
        else
        if(type_info.ls) {
          var v = parseInt(textValue);
          this.__getOpTextValue('' + (v >> type_info.ls.n), type_info.ls.v, type_info.t, result);
        }
        else
        if(type_info.pn) {
          var nn = type_info;
          var v = parseInt(textValue);
          var idx = 0;
          if(v < 0) {
            idx++;
            textValue = textValue.substr(1);
          }
          if(result.v.length != 0) {
            result.v += ', ';
          }
          if(idx == 0) {
            result.v += listTypeKey + '(' + nn.p + ')';
          } else {
            result.v += listTypeKey + '(' + nn.n + ')';
          }
          this.__getOpTextValue(textValue, nn.pn, nn.t, result);
        } else {
          var t = type_info.t;
          if(t === undefined)
            t = -1;
          if(t == -1) {
            t = this.__controller.getType(rawValue);
          }

          if(result.v.length != 0) {
            result.v += ', ';
          }

          switch(t) {
            case -1:  // undefined
              result.v += 'undefined'; 
              break;
            case 0:   // String
              result.v += '"' + textValue + '"';
              break;
            case 1:   // Boolean
              result.v += 'Bool(' + textValue + ')';
              break;
            case 2:   // Integer
              result.v += 'Integer(' + textValue + ')';
              break;
            case 3:   // Number
              result.v += 'Number(' + textValue + ')';
            break;
  
          }
        }
      },

      getOpTextValue : function(rawValue, listTypeKey, valueRawType) {
        var result = {v:''}
        this.__getOpTextValue(rawValue, listTypeKey, valueRawType, result);
        return result.v;
      },

      getOpValue : function() {
        var n = this.__namePath;
        var data = this.__currentData;
        if(Array.isArray(this.__namePath)) {
          n = this.__namePath[this.__namePath.length - 1];
          data = data[this.__namePath[0]];
        }
        return data ? data[n] : undefined;
      },
    
      unesetOpValue : function(v) {
        var n = this.__namePath;
        var data = this.__currentData;
        if(Array.isArray(this.__namePath)) {
          n = this.__namePath[this.__namePath.length - 1];
          data = data[this.__namePath[0]];
        }
        if(data) {
          delete data[n];
          this.__controller.changedData(this.__parent, false, {t:'OperationSetupItem'});
        }
      },

      getValueType : function() {
        return this.__valueType;
      },

      getRawType : function() {
        var types = this.__controller.getOperationTypes();
        var type_info = this.__valueType ? types[this.__valueType] : {t:-1};
        return type_info.t;
      },

      getCurrentRawType : function() {
        return this.__controller.getType(this.__currentData);
      },

      getValueHolder : function() {
        return this.__valueHolder;
      },

      getData : function() {
        var n = this.__namePath;
        var data = this.__currentData;
        if(Array.isArray(this.__namePath)) {
          n = this.__namePath[this.__namePath.length - 1];
          data = data[this.__namePath[0]];
          if(data === undefined) {
            data = this.__currentData[this.__namePath[0]] = {};
          }
        }
        return data[n];
      },
    
      setOpValue : function() {
        var n = this.__namePath;
        var data = this.__currentData;
        if(!this.__enabledCheck.getValue())
          return;
        if(Array.isArray(this.__namePath)) {
          n = this.__namePath[this.__namePath.length - 1];
          data = data[this.__namePath[0]];
          if(data === undefined) {
            data = this.__currentData[this.__namePath[0]] = {};
          }
        }
        var v = this.__valueHolder.getValue();
        var rawType = this.__isList ? null : this.getRawType();
        switch(rawType) {
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
          default: // list
            if(this.__isList && v === undefined) {
              v = [];
              this.__valueHolder.setCurrentData(v);
            }
            break;
        }
        data[n] = v;
        this.__controller.changedData(this.__parent, false, {t:'OperationSetupItem'});
      },

      __onCheckClick : function(e) {
        if(!this.__groupEnabled){
          e.stopPropagation();
          e.preventDefault();
        }
      },

      __onEnable : function(e) {
        var v = e.getData();
        this.__setEnabled(v);
        if(v == false) {
          this.unesetOpValue();
        } else {
          this.setOpValue();
        }
      }
  },

  construct : function(parent, op, name_path, keys, readOnly)
  {
    this.base(arguments);
    this.setLayout(new qx.ui.layout.VBox(2));
    this.__currentData = op;

    var name = Array.isArray(name_path) ? name_path[name_path.length - 1] : name_path ;
    var key = keys[name];

    this.__parent = parent;
    this.__controller = parent.getController();
    this.__isList = key.a == 1;
    this.__namePath = name_path;

    var labelTxt = key.n + ' (' + name + ')';

    this.__valueType = key.t;

    var rawType = this.getRawType();

    var isBool = rawType == 1;

    var value = this.getOpValue();
    var rawValue = value;
    var isEnabled = value !== undefined;

    if(readOnly) {
      value = this.getOpTextValue(value, key.t, this.__controller.getType(rawValue));

      if(!isEnabled && !key.m) {
        this.setVisibility('excluded');
      }
    }

    var labelHolder = new qx.ui.container.Composite(new qx.ui.layout.HBox(2));
    labelHolder.setPaddingRight(10);

    this.__mainLabel = new qx.ui.basic.Label(labelTxt);
    this.__mainLabel.setToolTipText(key.d || '');
    this.__mainLabel.setFont("bold");
    labelHolder.add(this.__mainLabel);
    if(!key.m && !readOnly) {
      this.__enabledCheck = new qx.ui.form.CheckBox();
      labelHolder.add(this.__enabledCheck);

      this.__enabledCheck.setValue(isEnabled);

      this.__enabledCheck.addListener('changeValue', this.__onEnable, this);
    } else {
      this.__enabledCheck = {getValue:function() {return true;}};
    }

    this.add(labelHolder);

    if(rawType == -1) {
      readOnly = true;
      value = 'SettingGroup';
    }

    if(key.a == 1) {
      this.__valueHolder = new appudo_cli_creator.view.desktop.OperationSetupList(this.__controller, this, rawValue, key.t, readOnly);
      this.add(this.__valueHolder, {flex:1});
    } else {
        if(readOnly) {
          this.__valueHolder = new qx.ui.basic.Label('' + value);
        } else {
          if(isBool) {
            this.__valueHolder = new qx.ui.form.CheckBox('Bool');
            this.__valueHolder.setValue(value || false);
          } else {
            this.__valueHolder = new qx.ui.form.TextField();
            this.__valueHolder.setValue('' + (isEnabled ? value : ''));
            this.__valueHolder.setPlaceholder('undefined');
          }
          this.__valueHolder.addListener('changeValue', this.setOpValue, this);
        }
        this.add(this.__valueHolder);
    }
    this.__setEnabled(isEnabled);
  }
});