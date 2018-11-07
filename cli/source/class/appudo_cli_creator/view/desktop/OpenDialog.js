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
qx.Class.define("appudo_cli_creator.view.desktop.OpenDialog",
{
  extend : qx.ui.window.Window,
  members :
  {
    __controller : null,
    __openBtn : null,
    __errLbl : null,
    __errTxt : null,
    __errOkBtn : null,

    openAndCenter : function() {
      this.center();
      this.open();
    },

    __close : function() {
      this.__controller.resetUpload();
      this.__errLbl.setVisibility('excluded');
      this.__errTxt.setVisibility('excluded');
      this.__errOkBtn.setVisibility('excluded');
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
    this.setCaption(this.tr('Open CLI Data'));

    this.addListener('beforeClose', this.__close, this);

    var lbl = new qx.ui.basic.Label(this.tr('Progress:'));
    this.add(lbl);

    var pb = new qx.ui.indicator.ProgressBar(0, 100);
    this.add(pb);


    this.__errLbl = new qx.ui.basic.Label(this.tr('Error:'));
    this.__errTxt = new qx.ui.basic.Label(this.tr(''));
    this.__errOkBtn = new qx.ui.form.Button(this.tr('Ok'), "icon/22/actions/dialog-apply.png");
    
    this.add(this.__errLbl);
    this.add(this.__errTxt);
    this.add(this.__errOkBtn);

    this.__errLbl.setVisibility('excluded');
    this.__errTxt.setVisibility('excluded');
    this.__errOkBtn.setVisibility('excluded');
    this.__errTxt.setAlignX('center')


    var paneLayout = new qx.ui.layout.HBox().set({
      spacing: 4,
      alignX : "center"
      });
    var buttonPane = new qx.ui.container.Composite(paneLayout).set({
    paddingTop: 11
    });
    this.add(buttonPane);

    buttonPane.add(this.__errOkBtn);

    this.__errOkBtn.addListener('execute', function() {
      this.close();
    }, this);

    controller.loadSetMax = function(v) {
      pb.setMaximum(v);
    }

    controller.loadSetValue= function(v) {
      pb.setValue(v);
    }

    controller.loadOk = function() {
      _this.close();
    }

    controller.loadError = function(e) {
      _this.__errLbl.setVisibility('visible');
      _this.__errTxt.setVisibility('visible');
      _this.__errOkBtn.setVisibility('visible');
      _this.__errTxt.setValue(e || 'load error');
    }
  }
});