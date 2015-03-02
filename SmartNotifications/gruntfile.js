/// <vs />
// This file in the main entry point for defining grunt tasks and using grunt plugins.
// Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409

module.exports = function (grunt) {

	var scriptsPath = "Scripts";
	var baseExternalPath = scriptsPath + "/AppExternal";

	var externalFiles = [
		baseExternalPath + "/jquery/*.js",
		baseExternalPath + "/blockui/*.js",
		baseExternalPath + "/camljs/*.js",
		baseExternalPath + "/bootstrap/js/bootstrap.js",
		baseExternalPath + "/jsencrypt/*.js",
		baseExternalPath + "/knockout/*.js"
	];

	var externalScriptsSource = "Scripts/build/smartnotif.app.external.min.js";

	grunt.initConfig({

		bower: {
			install: {
				options: {
					targetDir: baseExternalPath,
					cleanup: true,
					layout: "byComponent"
				}
			}
		},

		uglify: {
			debug: {
				options: {
					sourceMap: true
				},

				files: [
					{ src: externalFiles, dest: externalScriptsSource }
				]
			},
			release: {
				options: {
					sourceMap: false
				},

				files: [
					{ src: externalFiles, dest: externalScriptsSource }
				]
			},
			appOnly: {
				options: {
					sourceMap: true
				},

				files: []
			}
		},

		updateAppInfo: {
			debug: {},
			release: {}
		}
	});

	grunt.registerTask("debug", ["updateAppInfo:debug", "uglify:appOnly"]);
	grunt.registerTask("release", ["updateAppInfo:release", "uglify:release"]);

	// The following line loads the grunt plugins.
	// This line needs to be at the end of this this file.
	grunt.loadNpmTasks("grunt-bower-task");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-sass");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-copy");

	//custom tasks
	grunt.loadTasks("tasks");
};