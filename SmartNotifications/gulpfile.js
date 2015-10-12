var gulp = require("gulp"),
	path = require("path"),
	merge = require("merge-stream"),
	baseExternalPath = "App/lib/",
	autoprefixer = require("autoprefixer"),
	runSequence = require("run-sequence"),
	fs = require("fs"),
	xml2js = require("xml2js"),
	settings = require("./settings.js");

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
		baseExternalPath + "eeh-navigation/dist/eeh-navigation.tpl.js"
];

var externalcss = [
	baseExternalPath + "angular-ui-select/dist/select.css",
	baseExternalPath + "animate.css/animate.css",
	baseExternalPath + "bootstrap/dist/css/bootstrap.css",
	baseExternalPath + "font-awesome/css/font-awesome.css",
	baseExternalPath + "eeh-navigation/dist/eeh-navigation.css"
];

gulp.task("bower-install", function () {
	return $.bower();
});

gulp.task("main-bower-files", ["bower-install"], function () {
	return gulp.src("./bower.json")
		.pipe($.mainBowerFiles())
		.pipe(gulp.dest("./App/lib"));
});

gulp.task("build-external-js", function () {
	return gulp.src(externaljs)
		.pipe($.concat("sn.app.external.js"))
		.pipe(gulp.dest("App/build/"));
});

gulp.task("build-external-css", function () {
	return gulp.src(externalcss)
		.pipe($.concat("sn.app.external.css"))
		.pipe(gulp.dest("App/build/"));
});

gulp.task("build-app-starter", function () {
	return gulp.src("App/ng/app.ts")
		.pipe($.ts({
			target: "ES5"
		}))
		.js
		.pipe(gulp.dest("App/build/"));
});

gulp.task("build-app", function () {
	return gulp.src(["./App/ng/**/*.ts", "!App/ng/app.ts"])
		.pipe($.sourcemaps.init())
		.pipe($.ts({
			target: "ES5",
			outFile: "sn.app.js",
			declaration: false,
			removeComments: true
		}))
		.js
		.pipe($.sourcemaps.write({ includeContent: false, sourceRoot: "../" }))
		.pipe(gulp.dest("App/build/"));
});

gulp.task("sass", function () {
	gulp.src("Content/css/**/*.scss")
		.pipe($.sass().on("error", $.sass.logError))
		.pipe($.postcss([autoprefixer({ browsers: ["last 2 versions", "ie >= 9"] })]))
		.pipe(gulp.dest("App/build"));
});

gulp.task("ts", function () {
	return gulp.src("App/ng/**/*.ts")
		.pipe($.ts({
			target: "ES5",
			declaration: false
		}))
		.pipe(gulp.dest("App/js"));
});

gulp.task("template", function (callback) {
	fs.readFile(__dirname + "\\AppManifest.xml", function (err, data) {
		var parser = new xml2js.Parser();
		if (err) return callback(err);

		parser.parseString(data, function (err, result) {
			if (err) return callback(err);

			gulp.src("Pages/index.tmpl")
			.pipe($.template({ version: result.App.$.Version, appUrl: result.App.$.Name }))
			.pipe($.rename("index.html"))
			.pipe(gulp.dest("Pages"))
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

gulp.task("build-app-only", function (callback) {
	runSequence("build-app-starter", ["build-app", "sass"], callback);
});

gulp.task("debug", function (callback) {
	runSequence(["build-external-js", "build-external-css", "template"], "build-app-starter", ["build-app", "sass"], callback);
});

gulp.task("watch", function () {
	gulp.watch("App/ng/**/*.ts", ["ts", "build-app-only"]);
	gulp.watch("Content/css/**/*.scss", ["sass"]);
	gulp.watch("Pages/index.tmpl", ["template"]);

	gulp.watch(["Pages/index.html"], function (event) {
		return gulp.src(event.path, { base: "Pages" })
			.pipe($.spsave({
				siteUrl: settings.siteUrl,
				username: settings.username,
				password: settings.password,
				folder: "Pages",
				appWebUrl: "SmartNotifications",
				flatten: false,
				log: false
			}));
	});

	gulp.watch(["App/ng/**/*.ts", "App/build/*.*", "App/templates/**/*.html", "App/sp/*.js"], function (event) {
		console.log(event.path);
		gulp.src(event.path, { base: "App" })
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