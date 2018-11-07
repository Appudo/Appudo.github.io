/* ************************************************************************

   APPUDO CLI Creator

   https://www.appudo.com

   Copyright: 2018 Appudo UG (haftungsbeschränkt), https://www.appudo.com

   License: MIT License, https://opensource.org/licenses/MIT

   Authors: source@appudo.com

************************************************************************ */

qx.Class.define("appudo_cli_creator.view.desktop.VarSlotsSetting",
{
  extend : qx.ui.container.Composite,

  members : {
    __parent : null
  },

  construct : function(parent)
  {
    this.base(arguments);
    this.__parent = parent;

    this.setLayout(new qx.ui.layout.VBox(5));
    this.setPadding(0);
    this.setHeight(100);

    var holder0 = new qx.ui.container.Composite();
    holder0.setLayout(new qx.ui.layout.HBox(5).set({
      alignX : "right"
    }));
    this.add(holder0);
    var selectUsed = new qx.ui.form.Button(this.tr("Select Used"));
    holder0.add(selectUsed);
    var slots = new appudo_cli_creator.view.desktop.VarSlotsSettingList(parent, 0);
    this.add(slots, {flex:1});

    selectUsed.addListener('execute', function(e) {
      slots.selectUsed();
    }, this);

    var holderA = new qx.ui.container.Composite();
    holderA.setLayout(new qx.ui.layout.HBox(5).set({
      alignX : "right"
    }));
    var selectAll = new qx.ui.form.Button(this.tr("Select All"));
    var selectNone = new qx.ui.form.Button(this.tr("Select None"));
    holderA.add(selectAll);
    holderA.add(selectNone);

    selectAll.addListener('execute', function() {
      slots.selectAll();
    }, this);
    selectNone.addListener('execute', function() {
      slots.selectNone();
    }, this);
    this.add(holderA);

    var operations = new appudo_cli_creator.view.desktop.VarSlotsSettingList(parent, 1);
    this.add(operations, {flex:1});
    var holderB = new qx.ui.container.Composite();
    holderB.setLayout(new qx.ui.layout.HBox(5).set({
      alignX : "right"
    }));
    selectAll = new qx.ui.form.Button(this.tr("Select All"));
    selectNone = new qx.ui.form.Button(this.tr("Select None"));
    holderB.add(selectAll);
    holderB.add(selectNone);

    selectAll.addListener('execute', function() {
      operations.selectAll();
    }, this);
    selectNone.addListener('execute', function() {
      operations.selectNone();
    }, this);
    this.add(holderB);

    parent.setLists(slots, operations);
  }
});