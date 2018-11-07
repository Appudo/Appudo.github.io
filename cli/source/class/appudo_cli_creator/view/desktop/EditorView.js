/* ************************************************************************

   APPUDO CLI Creator

   https://www.appudo.com

   Copyright: 2018 Appudo UG (haftungsbeschränkt), https://www.appudo.com

   License: MIT License, https://opensource.org/licenses/MIT

   Authors: source@appudo.com

************************************************************************ */

/**
 *
 * @asset(qx/icon/${qx.icontheme}/22/actions/document-save.png)
 */
qx.Class.define("appudo_cli_creator.view.desktop.EditorView",
{
  extend : qx.ui.container.Composite,

  members : {
    __controller : null,
    __editor : null,
    __toolBar : null,
    __holder : null,
    __currentLbl : null,
    __currentData : null,
    __justAdded : true,
    __listenerId : -1,

    update : function(data, text) {
      this.setEnabled(data != null);
      if(data != null) {
        this.__currentData = data;
        this.__justAdded = true;
        this.__editor.setValue(JSON.stringify(data, undefined, 4));
        this.__currentLbl.setValue(text);
        this.__saveBtn.setEnabled(false);
        this.__justAdded = false;
      } else {
        this.clear();
      }
    },

    clear : function(after) {
      this.__justAdded = true;
      this.__currentData = null;
      this.__editor.resetValue();
      this.__currentLbl.resetValue();
      this.__justAdded = false;
    },

    __onDataChange : function(full) {
      this.__justAdded = true;
      this.__editor.setValue(JSON.stringify(this.__currentData, undefined, 4));
      this.__justAdded = false;
    },

    __onChangeValue : function() {
      if(this.__justAdded) {
        return;
      }
      if(this.__listenerId != -1) {
        this.__editor.removeListenerById(this.__listenerId);
        this.__listenerId = -1;
      }
      this.__saveBtn.setEnabled(true);
    },

    __onSave : function() {
      var sel = this.__controller.getSelection();
      var data = this.__currentData;
      var newData;

      try {
        newData = JSON.parse(this.__editor.getValue());
      } catch(e) {
        console.log(e);
        return;
      }

      if(Array.isArray(data)) {
        data.length = 0;
        data.push.apply(data, newData);
      } else {
        var pn = Object.getOwnPropertyNames(data);
        for(var i = 0; i < pn.length; i++) {
          var key = pn[i];
          delete data[key];
        }

        Object.assign(data, newData);
      }
      this.__controller.refreshData(this);
      this.__controller.setSelection(sel);
      this.__saveBtn.setEnabled(false);
      if(this.__listenerId == -1) {
        this.__listenerId = this.__editor.addListener('changeValue', this.__onChangeValue, this);
      }
    }
  },

  construct : function(controller)
  {
    var _this = this;
    this.base(arguments);

    this.setLayout(new qx.ui.layout.VBox());
    this.setPadding(0);

    this.__saveBtn = new qx.ui.toolbar.Button(null, "icon/22/actions/document-save.png");
    this.__saveBtn.setToolTipText(this.tr('Save'));
    this.__controller = controller;
    this.__editor = new qx.ui.form.TextArea();
    this.__holder = new qx.ui.container.Composite(new qx.ui.layout.VBox());
    this.__toolBar = new qx.ui.toolbar.ToolBar();
    var toolLbl = new qx.ui.basic.Label(this.tr("Raw Command Editor")).set({padding:9});
    this.__currentLbl = new qx.ui.basic.Label('').set({padding:9});
    this.__toolBar.add(this.__saveBtn);
    this.__toolBar.add(toolLbl);
    this.__toolBar.add(this.__currentLbl);
    this.__holder.add(this.__toolBar);
    this.__holder.add(this.__editor, {flex:1});
    this.__holder.setPadding(2);
    this.__editor.setLiveUpdate(true);
    this.setEnabled(false);
    this.__listenerId = this.__editor.addListener('changeValue', this.__onChangeValue, this);

    this.add(this.__holder, {flex:1});

    this.__saveBtn.addListener('execute', this.__onSave, this);
    this.__editor.addListenerOnce('changeValue', this.__onChangeValue, this);
    this.__saveBtn.setEnabled(false);

    this.__controller.addCommandChanged(function(from, cmd, text) {
      if(from != _this) {
        _this.update.call(_this, cmd, text);
      }
    });

    this.__controller.addReset(function(from) {
      if(from != _this) {
        _this.clear.call(_this);
      }
    });

    this.__controller.addDataChanged(function(from, full) {
      if(from != _this) {
        _this.__onDataChange.call(_this, full);
      }
    });
  }
});