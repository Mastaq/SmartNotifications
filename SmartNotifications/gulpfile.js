var gulp = require("gulp"),
	path = require("path"),
	merge = require("merge-stream"),
	baseExternalPath = "App/lib/",
	autoprefixer = require("autoprefixer"),
	runSequence = require("run-sequence"),
	fs = require("fs"),
	xml2js = require("xml2js"),
	settings = require("./settings.js"),
	merge = require("merge-stream");


var $ = require("gulp-load-plugins")({
	rename: {
		"gulp-main-bower-files": "mainBowerFiles",
		"gulp-typescript": "ts"
	}
});

var externaljs = [
		baseExternalPath + "jquery/dist/jquery.js",
		baseExternalPath + "angular/angular.js",
		baseExternalPath + "angular-*/**/*.js",
		baseExternalPath + "eeh-navigation/dist/eeh-navigation.js",
		baseExternalPath + "eeh-navigation/dist/eeh-navigation.tpl.js",
		baseExternalPath + "please-wait/build/please-wait.js",
		baseExternalPath + "lz-string/libs/lz-string.min.js",
		baseExternalPath + "camljs/index.js",
		baseExternalPath + "sp-list-repository/build/sp.list.repository.min.js"
];

var colorFieldExternaljs = [
		baseExternalPath + "jquery/dist/jquery.js",
		baseExternalPath + "knockout/dist/knockout.js",
		baseExternalPath + "spectrum/spectrum.js"
];

var colorFieldExternalcss = [
	baseExternalPath + "spectrum/spectrum.css"
];

var externalcss = [
	baseExternalPath + "angular-ui-select/dist/select.css",
	baseExternalPath + "animate.css/animate.css",
	baseExternalPath + "bootstrap/dist/css/bootstrap.css",
	baseExternalPath + "font-awesome/css/font-awesome.css",
	baseExternalPath + "eeh-navigation/dist/eeh-navigation.css",
	baseExternalPath + "please-wait/build/please-wait.css",
	baseExternalPath + "angular-toastr/dist/angular-toastr.css"
];

var onError = function (err) {
	console.log(err);
	this.emit("end");
};

gulp.task("bower-install", function () {
	return $.bower();
});

gulp.task("main-bower-files", ["bower-install"], function () {
	return gulp.src("./bower.json")
		.pipe($.mainBowerFiles())
		.pipe(gulp.dest("./App/lib"));
});

gulp.task("build-external-js", function () {
	var appExternal = gulp.src(externaljs)
		.pipe($.concat("sn.app.external.js"))
		.pipe(gulp.dest("App/build/"));

	var colorFieldExternal = gulp.src(colorFieldExternaljs)
		.pipe($.concat("color.field.external.js"))
		.pipe(gulp.dest("App/jslink/color-field/build"));

	return merge(appExternal, colorFieldExternal);
});

gulp.task("build-external-css", function () {
	var appExternal = gulp.src(externalcss)
		.pipe($.concat("sn.app.external.css"))
		.pipe(gulp.dest("App/build/"));

	var colorFieldExternal = gulp.src(colorFieldExternalcss)
		.pipe($.concat("color.field.external.css"))
		.pipe(gulp.dest("App/jslink/color-field/build"));

	return merge(appExternal, colorFieldExternal);
});

gulp.task("build-app", function () {
	var external = gulp.src(["./App/ng/_references.ts"])
		.pipe($.sourcemaps.init())
		.pipe($.ts({
			target: "ES5",
			outFile: "sn.app.js",
			declaration: false,
			removeComments: true
		}))
		.js
		.pipe($.sourcemaps.write({ includeContent: false, sourceRoot: "../ng" }))
		.pipe(gulp.dest("App/build/"));

	var colorField = gulp.src(["./App/jslink/color-field/_references.ts"])
		.pipe($.sourcemaps.init())
		.pipe($.ts({
			target: "ES5",
			outFile: "color.field.js",
			declaration: false,
			removeComments: true
		}))
		.js
		.pipe($.sourcemaps.write({ includeContent: false, sourceRoot: "../" }))
		.pipe(gulp.dest("App/jslink/color-field/build/"));

	return merge(external, colorField);
});

gulp.task("sass", function () {
	gulp.src("Content/css/**/*.scss")
		.pipe($.sass().on("error", $.sass.logError))
		.pipe($.postcss([autoprefixer({ browsers: ["last 2 versions", "ie >= 9"] })]))
		.pipe(gulp.dest("App/build"));
});

gulp.task("template", function (callback) {
	fs.readFile(__dirname + "\\AppManifest.xml", function (err, data) {
		var parser = new xml2js.Parser();
		if (err) return callback(err);

		parser.parseString(data, function (err, result) {
			if (err) return callback(err);

			gulp.src("App/index.tmpl")
			.pipe($.template({ version: result.App.$.Version.replace(/\./g, ""), appUrl: result.App.$.Name }))
			.pipe($.rename("index.html"))
			.pipe(gulp.dest("App"))
			.on("end", function () { callback(); });

		});

	});
});

gulp.task("spsave", ["ts", "build-app-only"], function () {
	return gulp.src(["App/build/*.*"])
		.pipe($.spsave({
			siteUrl: settings.siteUrl,
			username: settings.username,
			password: settings.password,
			folder: "App/build",
			appWebUrl: "SmartNotifications",
			flatten: true
		}));
});

gulp.task("build-app-ts", function () {
	return gulp.src(["./App/ng/_references.ts"])
		.pipe($.sourcemaps.init())
		.pipe($.ts({
			target: "ES5",
			outFile: "sn.app.js",
			declaration: false,
			removeComments: true
		}))
		.js
		.pipe($.sourcemaps.write({ includeContent: false, sourceRoot: "../ng" }))
		.pipe(gulp.dest("App/build/"));
});

gulp.task("build-app-jslink", function () {
	return gulp.src(["./App/jslink/color-field/_references.ts"])
		.pipe($.sourcemaps.init())
		.pipe($.ts({
			target: "ES5",
			outFile: "color.field.js",
			declaration: false,
			removeComments: true
		}))
		.js
		.pipe($.sourcemaps.write({ includeContent: false, sourceRoot: "../" }))
		.pipe(gulp.dest("App/jslink/color-field/build/"));
});

gulp.task("build-app-only", ["build-app", "sass"]);

gulp.task("debug", function (callback) {
	runSequence(["build-external-js", "build-external-css", "template"], ["build-app", "sass"], callback);
});

gulp.task("watch", function () {
	gulp.watch("App/jslink/**/*.ts", ["build-app-jslink"]);
	gulp.watch("App/ng/**/*.ts", ["build-app-ts"]);
	gulp.watch("Content/css/**/*.scss", ["sass"]);
	gulp.watch("App/index.tmpl", ["template"]);

	gulp.watch(["App/index.html"], function (event) {
		return gulp.src(event.path, { base: "App" })
			.pipe($.plumber({
				errorHandler: onError
			}))
			.pipe($.spsave({
				siteUrl: settings.siteUrl,
				username: settings.username,
				password: settings.password,
				folder: "App",
				appWebUrl: "SmartNotifications",
				flatten: false,
				log: false
			}));
	});

	gulp.watch(["App/ng/**/*.ts", "App/build/*.*", "App/templates/**/*.html", "App/sp/*.js", "App/jslink/**/*.*"], function (event) {
		gulp.src(event.path, { base: "App" })
			.pipe($.plumber({
				errorHandler: onError
			}))
			.pipe($.spsave({
				siteUrl: settings.siteUrl,
				username: settings.username,
				password: settings.password,
				folder: "App",
				appWebUrl: "SmartNotifications",
				flatten: false
			}));
	});
});