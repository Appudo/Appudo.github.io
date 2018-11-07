/* ************************************************************************

   APPUDO CLI Creator

   https://www.appudo.com

   Copyright: 2018 Appudo UG (haftungsbeschränkt), https://www.appudo.com

   License: MIT License, https://opensource.org/licenses/MIT

   Authors: source@appudo.com

************************************************************************ */

qx.Class.define("appudo_cli_creator.view.desktop.I18nSetup",
{
  extend : qx.ui.container.Composite,

  members : {
    __controller : null,
    __view : null,

    doReset : function() {
      this.__onSelect();
    },

    doSelect : function(path, data, kind, kindData) {
      this.__onSelect(path, data, kind, kindData);
    },

    __onSelect : function(path, nodeData, kind, kindData) {
      this.removeAll();
      var fd;
      var getData = function() {
        var data = nodeData.getData();
        var fd = null;
        if(data) {
          if(data.o) {
            fd = data.o;
          } else {
            fd = data;
          }
        }
        return fd;
      }
      if(nodeData && (fd = getData())) {
        var textField;
        var list;
        var tabIndex = 1;
        var form = new qx.ui.form.Form();

        if(kindData.h) {
          textField = new qx.ui.form.TextField();
          textField.setReadOnly(true);
          textField.setTextColor('text-disabled');
          textField.setTabIndex(tabIndex++);
          textField.setValue(kindData.h);
          form.add(textField, this.tr("Hint"));
        }
        if(kindData.d) {
          textField = new qx.ui.form.TextField();
          textField.setReadOnly(true);
          textField.setTextColor('text-disabled');
          textField.setTabIndex(tabIndex++);
          textField.setValue(kindData.d);
          form.add(textField, this.tr("Depends"));
        }

        textField = new appudo_cli_creator.view.desktop.EscapeTextField();
        textField.setTabIndex(tabIndex++);
        textField.setValue(fd.f || '');
        form.add(textField, this.tr("Format"));

        textField.addListener('changeValue', function(e) {
          fd.f = e.getData();
          this.__view.changedI18nData();
        }, this);

        if(kind != 5) {
          list = new appudo_cli_creator.view.desktop.I18nValueList(this.__controller, this.__view);
          form.add(list, this.tr("Values"));
          list.setCurrentDataHolder(fd);
          list.refresh();

          var check = new qx.ui.form.CheckBox();
          check.setValue(fd.g === true);
          form.add(check, this.tr("Global Slots"));

          check.addListener('changeValue', function(e) {
            if(e.getData()) {
              fd.g = true;
            } else {
              delete fd.g;
            }
            this.__view.changedI18nData();
          }, this);

          var undef = new appudo_cli_creator.view.desktop.I18nSetupUndefTextField(this.__view, fd, tabIndex++);
          form.add(undef, this.tr("Default Value"));

          var mt = nodeData.getMultiTree();
          if(mt && mt.length > 1)
          {
            var _this = this;
            list = new appudo_cli_creator.view.desktop.I18nMultiList(this.__controller, this.__view, mt, function() {
              fd = getData();
            });
            form.add(list, this.tr("Multi Usage"));
            var model = new qx.data.Array();
            mt.forEach(function(n) {
              var p = n.getPath();
              var label = p.join(' / ');
              var item = new appudo_cli_creator.view.desktop.I18nMultiListObject(label);
              model.push(item);
            });
            list.setModel(model);

            textField.addListener('disappear', list.onDisappear, list);
          }
        }
    
        var renderedForm = new qx.ui.form.renderer.Single(form);
        renderedForm.setPadding(20);

        this.add(renderedForm);
      } else{

      }
    }
  },

  construct : function(controller, view)
  {
    this.__controller = controller;
    this.__view = view;
    this.base(arguments);

    this.setLayout(new qx.ui.layout.VBox());

    var decorator = new qx.ui.decoration.Decorator().set({
      width : 1,
      style : "solid",
      color: "#334866"
    });

    this.setDecorator(decorator);
  }
});