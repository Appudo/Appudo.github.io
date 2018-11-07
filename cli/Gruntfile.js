// requires
var util = require('util');
var qx = require("../../qooxdoo-release_5_0_3/tool/grunt");

// grunt
module.exports = function(grunt) {
  var config = {

    generator_config: {
      let: {
      }
    },

    common: {
      "APPLICATION" : "appudo_cli_creator",
      "QOOXDOO_PATH" : "../../qooxdoo-release_5_0_3",
      "LOCALES": ["en"],
      "QXTHEME": "appudo_cli_creator.theme.Theme"
    }
  };

  var mergedConf = qx.config.mergeConfig(config);
  grunt.initConfig(mergedConf);

  qx.task.registerTasks(grunt);
};
