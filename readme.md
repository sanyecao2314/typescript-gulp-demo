I'll be upfront - getting TypeScript building is frustrating, especially the first time. I'm starting to get the hang of it, but keep finding myself running in to brick walls with no help. This post will help guide you in opening the doors to the world of TypeScript (and I'm pretty sure you'll love it).

### First things first: NPM packages

You are going to need to install 5 packages. Shortcut: 
* *npm install --save-dev gulp-typescript* - gulp-typescript does the actual transpilation of TypeScript to JavaScript.
* *npm install --save-dev tslint* - gulp-tslint uses this as a dependency, so you'll need it.
* *npm install --save-dev gulp-tslint* - gulp-tslint is a linting package to help enforce style guides and keep your code clean.
* *npm install --save systemjs* - SystemJS is a module loader that can load ES6, AMD, and CommonJS modules. there's a few options here, so feel free to explore alternatives.
* *npm install --save es6-shim* - Not all browsers support everything SystemJS needs to operate. This package includes all the shims you'll need.
* *npm install --save-dev gulp-concat* - gulp-concat concatonates JavaScript files together. You'll need this for SystemJS and ES6-Shim.

### Setting up the TypeScript configuration

#### tsconfig.json

Tsconfig.json is an object of configurations for how the TypeScript build should work. This should live in the same level as your gulpfile.js. Here is a tsconfig.json that I've been using that will get you moving:

    {
        "compilerOptions": {
            "target": "es5",
            "module": "system",
            "moduleResolution": "node",
            "experimentalDecorators": true,
            "removeComments": false
        },
        "exclude": [
          "node_modules"
        ]
    }
    
With this configuration, we are using SystemJS module loader, allowing for @Decorators, stripping comments, and transpiling to ES5. You can find more info on this on [typescriptlang.org](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).

#### tslint.json

Tslint.json tells tslint what styles to follow. There are a ton of arguments available for this that you can see on the [project Github](https://github.com/palantir/tslint). [Check out this gist for an example of a tslint that I'm using.](https://gist.github.com/KerryRitter/4af3038549cc62f0bea6827c0cab1277)

### Gulp builds

We are going to add new tasks to the gulpfile. This is configured to take all TypeScript files from the "ts" folder and transpile the output (and SystemJS dependencies) to "www/js".

#### Linting the TypeScript
    gulp.task("lint:ts", function() {
        return gulp.src("ts/**/*.ts")
            .pipe(tslint({
                formatter: "verbose"
            }))
            .pipe(tslint.report())
    });

#### Compiling the TypeScript to JavaScript
    var tsProject = ts.createProject("tsconfig.json", {
        outFile: "app.js"
    });
    gulp.task("compile:ts", ["lint:ts"], function() {
        return tsProject.src()
            .pipe(ts(tsProject))
            .js
            .pipe(gulp.dest("www/js"));
    });

#### Concatonating SystemJS dependencies
If you have an existing JS concatonation build, you can of course just include these modules to it. But if you don't, you'll need these three files.

    gulp.task("concat:js", function() {
        return gulp.src([
            "node_modules/systemjs/dist/system.js",
            "node_modules/systemjs/dist/system-polyfills.js",
            "node_modules/es6-shim/es6-shim.js"
        ])
        .pipe(concat("lib.js"))
        .pipe(gulp.dest("www/js"));
    });
    
    
### Loading the modules with SystemJS

After you've run your transpilation and concatonation tasks, you're now ready to add the scripts to your page. Add the following to the bottom of your HTML:

    <script src="js/lib.js"></script>
    <script src="js/app.js"></script>
    <script>
    System.import("app")
        .then(function() {
            console.info("System.import was successful.");
        })
        .catch(function(response) {
            console.error("Error in System.import, could not bootstrap.", response);
        });
    </script>
    
### All done!

Now that wasn't so bad was it? ... Okay, there was a bit involved. But that's in the past now. Time to enjoy TypeScript.