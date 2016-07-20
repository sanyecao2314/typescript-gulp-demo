var gulp = require("gulp");
var tslint = require("gulp-tslint");
var ts = require("gulp-typescript");
var concat = require("gulp-concat");

gulp.task("default", ["compile:ts", "concat:js"]);

gulp.task("lint:ts", function() {
    return gulp.src("ts/**/*.ts")
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report())
});

var tsProject = ts.createProject("tsconfig.json", {
    outFile: "app.js"
});
gulp.task("compile:ts", ["lint:ts"], function() {
    return tsProject.src()
        .pipe(ts(tsProject))
        .js
        .pipe(gulp.dest("www/js"));
});

gulp.task("concat:js", function() {
    return gulp.src([
        "node_modules/systemjs/dist/system.js",
        "node_modules/systemjs/dist/system-polyfills.js",
        "node_modules/es6-shim/es6-shim.js"
    ])
    .pipe(concat("lib.js"))
    .pipe(gulp.dest("www/js"));
});