/// <vs />
// This file in the main entry point for defining grunt tasks and using grunt plugins.
// Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409

module.exports = function (grunt) {

	var baseExternalPath = "External";

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
		updateAppInfo: {
			debug: {},
			release: {}
		}
	});

	grunt.registerTask("debug", ["updateAppInfo:debug"]);
	grunt.registerTask("release", ["updateAppInfo:release"]);

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