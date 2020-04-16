const sass = require("node-sass");
const pjson = require('./plugin.json');

module.exports = grunt => {
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    clean: ["dist"],

    copy: {
      src_to_dist: {
        cwd: "src",
        expand: true,
        src: ["**/*", "!**/*.ts", "!**/*.js", "!**/*.scss", "!img/**/*"],
        dest: "dist"
      },
      pluginDef: {
        expand: true,
        src: ["plugin.json", "README.md", "CHANGELOG.md"],
        dest: "dist"
      }
    },

    watch: {
      rebuild_all: {
        files: ["src/**/*", "plugin.json", "README.md", "CHANGELOG.md"],
        tasks: [
          "ts:default",
          "sass:build",
          "copy:src_to_dist",
          "copy:pluginDef",
        ],
        options: {
          spawn: false
        }
      }
    },

    tslint: {
      options: {
        configuration: "tslint.json"
      },
      files: {
        src: ["src/**/*.ts"]
      }
    },

    ts: {
      default: {
        tsconfig: "./tsconfig.json"
      }
    },


  });

  grunt.registerTask("test", ["run:tests", "tslint"]);

  grunt.registerTask("default", [
    "clean",
    "tslint",
    "ts:default",
    "copy:src_to_dist",
    "copy:pluginDef"
  ]);
};
