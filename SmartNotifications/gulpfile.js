var gulp = require("gulp"),
	path = require("path"),
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
		"gulp-typescript": "ts",
		"gulp-js-obfuscator" :"obfuscate"
	}
});

var isRelease = process.env.NODE_ENV === "Release";

var externaljs = [
		baseExternalPath + "jquery/dist/jquery.js",
		baseExternalPath + "angular/angular.js",
		baseExternalPath + "angular-*/**/*.js",
		baseExternalPath + "moment/moment.js",
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
		.pipe($.if(isRelease, $.uglify()))
		.pipe(gulp.dest("App/build/"));

	var colorFieldExternal = gulp.src(colorFieldExternaljs)
		.pipe($.concat("color.field.external.js"))
		.pipe($.if(isRelease, $.uglify()))
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

gulp.task("sass", function () {
	gulp.src("Content/css/**/*.scss")
		.pipe($.sass().on("error", $.sass.logError))
		.pipe($.postcss([autoprefixer({ browsers: ["last 2 versions", "ie >= 9"] })]))
		.pipe(gulp.dest("App/build"));
});

gulp.task("host-sass", function () {
	gulp.src("HostWeb/css/**/*.scss")
		.pipe($.sass().on("error", $.sass.logError))
		.pipe($.postcss([autoprefixer({ browsers: ["last 2 versions", "ie >= 9"] })]))
		.pipe(gulp.dest("HostWeb/build"));
});

gulp.task("template", function (callback) {
	fs.readFile(__dirname + "\\AppManifest.xml", function (err, data) {
		var parser = new xml2js.Parser();
		if (err) return callback(err);

		parser.parseString(data, function (err, result) {
			if (err) return callback(err);

			gulp.src("App/index.tmpl")
			.pipe($.template({ version: result.App.$.Version.replace(/\./g, ""), appUrl: result.App.$.Name, debug: !isRelease }))
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
		.pipe($.if(!isRelease, $.sourcemaps.init()))
		.pipe($.ts({
			target: "ES5",
			outFile: "sn.app.js",
			declaration: false,
			removeComments: true
		}))
		.js
		.pipe($.if(isRelease, $.uglify()))
		.pipe($.if(isRelease, $.obfuscate()))
		.pipe($.if(!isRelease, $.sourcemaps.write({ includeContent: false, sourceRoot: "../ng" })))
		.pipe(gulp.dest("App/build/"));
});

gulp.task("build-host-manage-ts", function() {
	return gulp.src(["./HostWeb/app/manage/_references.ts"])
		.pipe($.if(!isRelease, $.sourcemaps.init()))
		.pipe($.ts({
			target: "ES5",
			outFile: "sn.manage.host.js",
			declaration: false,
			removeComments: true
		}))
		.js
		.pipe($.if(isRelease, $.uglify()))
		.pipe($.if(isRelease, $.obfuscate()))
		.pipe($.if(!isRelease, $.sourcemaps.write({ includeContent: false, sourceRoot: "./app/manage" })))
		.pipe(gulp.dest("HostWeb/build/"));
});

gulp.task("build-host-scriptlink-ts", function () {
	return gulp.src(["./HostWeb/app/scriptlink/_references.ts"])
		.pipe($.if(!isRelease, $.sourcemaps.init()))
		.pipe($.ts({
			target: "ES5",
			outFile: "sn.scriptlink.js",
			declaration: false,
			removeComments: true
		}))
		.js
		.pipe($.if(isRelease, $.uglify()))
		.pipe($.if(isRelease, $.obfuscate()))
		.pipe($.if(!isRelease, $.sourcemaps.write({ includeContent: false, sourceRoot: "./app/scriptlink" })))
		.pipe(gulp.dest("HostWeb/build/"));
});

gulp.task("build-app-jslink", function () {
	return gulp.src(["./App/jslink/color-field/_references.ts"])
		.pipe($.if(!isRelease, $.sourcemaps.init()))
		.pipe($.ts({
			target: "ES5",
			outFile: "color.field.js",
			declaration: false,
			removeComments: true
		}))
		.js
		.pipe($.if(isRelease, $.uglify()))
		.pipe($.if(isRelease, $.obfuscate()))
		.pipe($.if(!isRelease, $.sourcemaps.write({ includeContent: false, sourceRoot: "../" })))
		.pipe(gulp.dest("App/jslink/color-field/build/"));
});

gulp.task("copy-elements-xml", function () {
	if (isRelease) {
		var s1 = gulp.src("HostWeb/Elements.release.xml")
			.pipe($.rename("Elements.xml"))
			.pipe(gulp.dest("HostWeb"));

		var s2 = gulp.src("App/Elements.release.xml")
			.pipe($.rename("Elements.xml"))
			.pipe(gulp.dest("App"));

		return merge(s1, s2);
	}

	var s1 = gulp.src("HostWeb/Elements.debug.xml")
			.pipe($.rename("Elements.xml"))
			.pipe(gulp.dest("HostWeb"));

	var s2 = gulp.src("App/Elements.debug.xml")
			.pipe($.rename("Elements.xml"))
			.pipe(gulp.dest("App"));

	return merge(s1, s2);

});

gulp.task("build-app-only", ["build-host-manage-ts", "build-host-scriptlink-ts", "build-app-ts", "build-app-jslink", "sass", "host-sass"]);

gulp.task("build", function (callback) {
	runSequence(["build-external-js", "build-external-css", "template", "copy-elements-xml"], ["build-app-only"], callback);
});

gulp.task("watch", function () {
	gulp.watch("App/jslink/**/*.ts", ["build-app-jslink"]);
	gulp.watch("App/ng/**/*.ts", ["build-app-ts"]);
	gulp.watch("HostWeb/app/manage/**/*.ts", ["build-host-manage-ts"]);
	gulp.watch("HostWeb/app/scriptlink/**/*.ts", ["build-host-scriptlink-ts"]);
	gulp.watch("Content/css/**/*.scss", ["sass"]);
	gulp.watch("HostWeb/css/**/*.scss", ["host-sass"]);
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
				domain: settings.domain,
				folder: "App",
				appWebUrl: "SmartNotifications",
				flatten: false
			}));
	});

	gulp.watch(["HostWeb/build/*.*", "HostWeb/template/*.html"], function(event) {
		gulp.src(event.path, { base: "HostWeb" })
			.pipe($.plumber({
				errorHandler: onError
			}))
		.pipe($.spsave({
			siteUrl: settings.siteUrl,
			username: settings.username,
			password: settings.password,
			domain: settings.domain,
			folder: "SmartNotificationsAssets"
		}));
	});

	gulp.watch(["HostWeb/app/manage/**/*.ts", "HostWeb/app/scriptlink/**/*.ts"], function (event) {
		gulp.src(event.path, { base: "HostWeb" })
			.pipe($.plumber({
				errorHandler: onError
			}))
		.pipe($.spsave({
			siteUrl: settings.siteUrl,
			username: settings.username,
			password: settings.password,
			domain: settings.domain,
			folder: "SmartNotificationsAssets",
			flatten: false
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
				domain: settings.domain,
				folder: "App",
				appWebUrl: "SmartNotifications",
				flatten: false
			}));
	});
});