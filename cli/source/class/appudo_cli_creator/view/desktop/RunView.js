/* ************************************************************************

   APPUDO CLI Creator

   https://www.appudo.com

   Copyright: 2018 Appudo UG (haftungsbeschränkt), https://www.appudo.com

   License: MIT License, https://opensource.org/licenses/MIT

   Authors: source@appudo.com

************************************************************************ */

/**
 * @asset(qx/icon/${qx.icontheme}/22/actions/edit-clear.png)
 * @asset(qx/icon/${qx.icontheme}/22/devices/network-wired.png)
 */
qx.Class.define("appudo_cli_creator.view.desktop.RunView",
{
  extend : qx.ui.container.Composite,

  members : {
    __saveBtn : null,
    __clearBtnStdin : null,
    __clearBtnStdout : null,
    __clearBtnStderr : null,
    __connectBtn : null,
    __controller : null,
    __stdinTxt : null,
    __verticalSplitPane0 : null,
    __stdin : null,
    __stdout : null,
    __stderr : null,
    __wsConnection : null,
    __server : null,
    __lines : null,
    __errorDialog : null,
    __runLbl : null,
    __history : [],
    __historyIdx : 0,
    __currentHistoryIdx : 0,
    __stdinLines : [],
    __stdoutLines : [],
    __stderrLines : [],

    __onReset : function() {
      this.__disconnect();
      var fd = this.__controller.getRawFileData();
      var d = fd['config.json'].d;
      var lines = d.lines || -1;
      var server = d.server;
      this.__connectBtn.setEnabled(server !== undefined);
      this.__server = server;
      this.__lines = lines;
    },

    __submitCommand : function() {
      var txt = this.__stdinTxt.getValue();
      if(txt && txt.length != 0) {
        var d = {t:0, d:txt};
        var msg = JSON.stringify(d);
        this.__stdoutLines.push('###################################');
        this.__updateTerm(1);
        this.__stderrLines.push('###################################');
        this.__updateTerm(2);
        this.__wsConnection.send(msg);
        this.__stdinLines.push(txt);
        this.__updateTerm(0);
        this.__stdinTxt.resetValue();
        this.__setRunning(true);

        if(this.__history[this.__currentHistoryIdx] != txt) {
          this.__history.push(txt);
          if(this.__history.length > 9000) {
            this.__history.splice(0, 1);
          }
          this.__historyIdx = this.__history.length - 1;
        }
      }
    },

    __submitData : function() {
      var _this = this;
      this.__controller.saveFileToBase64(function(d) {
        _this.__wsConnection.send('{"t":1,"d":"' + d + '"}');
      });
    },

    __submitKill : function() {
      this.__wsConnection.send('{"t":5}');
    },

    __updateHistory : function(dir) {
      if(this.__historyIdx < 0 || this.__historyIdx >= this.__history.length)
        this.__historyIdx = 0;
      this.__currentHistoryIdx = this.__historyIdx;
      this.__stdinTxt.setValue(this.__history[this.__historyIdx]);
      this.__historyIdx += dir;
    },

    __disconnect : function() {
      if(this.__wsConnection) {
        this.__wsConnection.onopen =
        this.__wsConnection.onerror =
        this.__wsConnection.onmessage =
        this.__wsConnection.onclose = function (e) {
        };
        this.__wsConnection.close();
        this.__setConnected(false);
        this.__setRunning(false);
        this.__wsConnection = null;
      }
    },

    __setRunning : function(v) {
      if(v) {
        this.__runLbl.setValue('[' + this.tr("running") + ']');
      } else {
        this.__runLbl.setValue('[' + this.tr("killed") + ']');
      }
    },

    __setConnected : function(v) {
      this.__stdinTxt.setEnabled(v);
      this.__saveBtn.setEnabled(v);
    },

    __splitLines : function(txt) {
      if("bbb".split(/b/).length === 0) {
        return txt.replace(/\r\n|\r/g, "\n").split("\n");
      } else {
        return txt.split(/\r\n|\r|\n/);
      }
    },

    clearTerm : function(type) {
      switch(type) {
        case 0:
          this.__stdinLines = [];
          this.__stdin.resetValue();
          break;
        case 1:
          this.__stdoutLines = [];
          this.__stdout.resetValue();
          break;
        case 2:
          this.__stderrLines = [];
          this.__stderr.resetValue();
          break;
        default:
          break;
      }
    },

    __updateTerm : function(type) {
      var lines;
      var txtArea;

      switch(type) {
        case 0:
          lines = this.__stdinLines;
          txtArea = this.__stdin;
          break;
        case 1:
          lines = this.__stdoutLines;
          txtArea = this.__stdout;
          break;
        case 2:
          lines = this.__stderrLines;
          txtArea = this.__stderr;
          break;
        default:
          break;
      }

      var txt = lines.join("\n");
      if(this.__lines != -1 && lines.length > this.__lines) {
        lines.splice(0, lines.length - this.__lines);
      }
      txtArea.setValue(txt);
      txtArea.getContentElement().scrollToY(txtArea.getContentElement().getDomElement().scrollHeight);
    },

    __onMessage : function(e) {
      console.log(e);
      var d;
      try {
        d = JSON.parse(e.data);
      } catch(err) {
        console.log(err);
        return;
      }
      switch(d.t) {
        case 0:
          var lines = this.__splitLines(d.d);
          this.__stdoutLines.push.apply(this.__stdoutLines, lines);
          this.__updateTerm(1);
          break;
        case 1:
          var lines = this.__splitLines(d.d);
          this.__stderrLines.push.apply(this.__stderrLines, lines);
          this.__updateTerm(2);
          break;
        case 6:
          this.__setRunning(false);
          break;
        default:
          break;
      }
    },

    __connect : function() {
      this.__disconnect();
      try {
        this.clearTerm(0);
        this.clearTerm(1);
        this.clearTerm(2);
        this.__wsConnection = new window.WebSocket(this.__server);

        var _this = this;
        this.__wsConnection.onopen = function () {
          _this.__setConnected(true);
        };
  
        this.__wsConnection.onerror = function (error) {
          _this.__errorDialog.openAndCenter(_this.tr('There was an error with the connection.'));
        };
  
        this.__wsConnection.onmessage = function (e) {
          _this.__onMessage.call(_this, e); 
        };
  
        this.__wsConnection.onclose = function (e) {
          _this.__setConnected(false);
        };
      } catch(e) {
        this.__errorDialog.openAndCenter(this.tr('There was an error with the connection.'));
      }
    }
  },

  construct : function(controller)
  {
    var _this = this;
    this.__controller = controller;
    this.base(arguments);
    this.setPaddingTop(2);

    this.setLayout(new qx.ui.layout.VBox());

    var pane = new qx.ui.container.Composite(new qx.ui.layout.VBox(3));
    var toolBar = new qx.ui.toolbar.ToolBar();
    var toolLbl = new qx.ui.basic.Label(this.tr("stdin")).set({padding:9});
    this.__runLbl = new qx.ui.basic.Label('[' + this.tr("killed") + ']').set({padding:9});

    this.__saveBtn = new qx.ui.toolbar.Button(null, "icon/22/actions/document-save.png");
    this.__saveBtn.setToolTipText(this.tr('Save data to remote'));
    this.__clearBtnStdin = new qx.ui.toolbar.Button(null, "icon/22/actions/edit-clear.png");
    this.__clearBtnStdin.setToolTipText(this.tr('Clear terminal'));
    this.__clearBtnStdout = new qx.ui.toolbar.Button(null, "icon/22/actions/edit-clear.png");
    this.__clearBtnStdout.setToolTipText(this.tr('Clear terminal'));
    this.__clearBtnStderr = new qx.ui.toolbar.Button(null, "icon/22/actions/edit-clear.png");
    this.__clearBtnStderr.setToolTipText(this.tr('Clear terminal'));
    this.__clearBtnStdin = new qx.ui.toolbar.Button(null, "icon/22/actions/edit-clear.png");
    this.__clearBtnStdin.setToolTipText(this.tr('Clear terminal'));
    this.__connectBtn = new qx.ui.toolbar.Button(null, "icon/22/devices/network-wired.png");
    this.__connectBtn.setToolTipText(this.tr('Connect to remote'));

    this.__connectBtn.addListener('execute', this.__connect, this);
    this.__saveBtn.addListener('execute', this.__submitData, this);

    toolBar.add(this.__connectBtn);
    toolBar.add(this.__saveBtn);
    toolBar.add(this.__clearBtnStdin);
    toolBar.add(toolLbl);
    toolBar.add(this.__runLbl);
    toolBar.addSpacer();

    this.__stdinTxt = new qx.ui.form.TextField();
    this.__stdin = new qx.ui.form.TextArea();
    this.__stdout = new qx.ui.form.TextArea();
    this.__stderr = new qx.ui.form.TextArea();

    this.__stdin.setReadOnly(true);
    this.__stdin.setFont('monospace'); 
    this.__stdout.setReadOnly(true);
    this.__stdout.setFont('monospace'); 
    this.__stderr.setReadOnly(true);
    this.__stderr.setFont('monospace'); 
    pane.add(toolBar);
    pane.add(this.__stdin, {flex:1});
    pane.add(this.__stdinTxt);

    this.__stdinTxt.addListener("keypress", function(e){
      var key = e.getKeyIdentifier().toLowerCase();
      switch(key) {
        case "enter":
          this.__submitCommand();
          break;
        case "up":
          this.__updateHistory(-1);
          e.preventDefault();
          break;
        case "down":
          this.__updateHistory(1);
          e.preventDefault();
          break;
      }
    }, this);

    this.__stdin.addListener('click', function() {
        this.__stdinTxt.focus();
    }, this);

    this.__verticalSplitPane0 = new qx.ui.splitpane.Pane().set({orientation:'vertical', appearance:'app-splitpane'});
    this.__verticalSplitPane0.add(pane, 0);
    this.add(this.__verticalSplitPane0, {flex:1});

    pane = new qx.ui.container.Composite(new qx.ui.layout.VBox());
    toolBar = new qx.ui.toolbar.ToolBar();
    toolLbl = new qx.ui.basic.Label(this.tr("stdout")).set({padding:9});
    toolBar.add(this.__clearBtnStdout);
    toolBar.add(toolLbl);
    pane.add(toolBar);
    pane.add(this.__stdout, {flex:1});


    this.__verticalSplitPane1 = new qx.ui.splitpane.Pane().set({orientation:'vertical', appearance:'app-splitpane'});
    this.__verticalSplitPane0.add(this.__verticalSplitPane1, 1);
    this.__verticalSplitPane1.add(pane, 1);

    pane = new qx.ui.container.Composite(new qx.ui.layout.VBox());
    toolBar = new qx.ui.toolbar.ToolBar();
    toolLbl = new qx.ui.basic.Label(this.tr("stderr")).set({padding:9});
    toolBar.add(this.__clearBtnStderr);
    toolBar.add(toolLbl);
    pane.add(toolBar);
    pane.add(this.__stderr, {flex:1});
    this.__verticalSplitPane1.add(pane, 0);

    this.__clearBtnStdin.addListener('execute', function() {
      this.clearTerm(0);
    }, this);

    this.__clearBtnStdout.addListener('execute', function() {
      this.clearTerm(1);
    }, this);

    this.__clearBtnStderr.addListener('execute', function() {
      this.clearTerm(2);
    }, this);


    this.__controller.addReset(function() {
      _this.__onReset.call(_this);
    });

    this.__controller.addSettingsChanged(function() {
      _this.__onReset.call(_this);
    });

    this.__errorDialog = new appudo_cli_creator.view.desktop.RunViewErrorDialog(this.__controller);
    this.__waitDialog = new appudo_cli_creator.view.desktop.RunViewWaitDialog(this.__controller);

    this.__setConnected(false);
  }
});