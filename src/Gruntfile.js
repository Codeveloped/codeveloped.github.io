module.exports = function(grunt) {

    var pkg = grunt.file.readJSON('package.json');

    grunt.initConfig({

        makeIcons: {
            ios: {
                vector: 'static/canevas.svg',
                width: 200,
                raster: [
                    { path: 'static/res/icon/android/icon-36-ldpi.png', width: 36 },
                    //{ path: 'static/res/icon/android/icon-48-mdpi.png', width: 48 },
                    //{ path: 'static/res/icon/android/icon-72-hdpi.png', width: 72 },
                    //{ path: 'static/res/icon/android/icon-96-xhdpi.png', width: 96 },
                    //
                    //{ path: 'static/res/icon/ios/icon-57.png', width: 57 },
                    //{ path: 'static/res/icon/ios/icon-72.png', width: 72 },
                    //{ path: 'static/res/icon/ios/icon-76x76.png', width: 76 },
                    //{ path: 'static/res/icon/ios/icon-57-2x.png', width: 114 },
                    //{ path: 'static/res/icon/ios/icon-120x120.png', width: 120 },
                    //{ path: 'static/res/icon/ios/icon-72-2x.png', width: 144 },
                    //{ path: 'static/res/icon/ios/icon-152x152.png', width: 152 },
                    //
                    //{ path: 'static/res/icon/windows-phone/icon-48.png', width: 48 },
                    //{ path: 'static/res/icon/windows-phone/icon-173-tile.png', width: 173 }
                ]
            }
        },


        //jsonmanifest: {
        //    src: [
        //        '*.js'
        //    ],
        //    dest: __dirname + '/static/manifest.json',
        //    options: {
        //        basePath: __dirname + '/static',
        //        exclude: [],
        //        loadall: true,
        //        files: {},
        //        load: [],
        //        root: './'
        //    }
        //},
        //
        //phonegapsplash: {
        //    all: {
        //        src: 'splashscreen.png',
        //        dest: 'static/res/screen/',
        //        options: {
        //            profiles: ['android', 'ios', 'windows-phone']
        //        }
        //    }
        //},
        //
        //app: {
        //
        //
        //}
    });

    //
    //grunt.registerMultiTask('jsonmanifest', 'Generate JSON Manifest for Hot Updates', function () {
    //    var done = this.async();
    //    var options = this.options({loadall:true, root: "./", files: {}, load: []});
    //
    //
    //    console.log(this, "\n\n",  options);
    //
    //});


    //
    //grunt.registerMultiTask('jsonmanifest', 'Generate JSON Manifest for Hot Updates', function () {
    //
    //    var options = this.options({loadall:true, root: "./", files: {}, load: []});
    //    var done = this.async();
    //
    //    var path = require('path');
    //
    //    this.files.forEach(function (file) {
    //        var files;
    //
    //        //manifest format
    //        var json = {
    //            "files": options.files,
    //            "load": options.load,
    //            "root": options.root
    //        };
    //
    //        //clear load array if loading all found assets
    //        if(options.loadall) {
    //            json.load = [];
    //        }
    //
    //        // check to see if src has been set
    //        if (typeof file.src === "undefined") {
    //            grunt.fatal('Need to specify which files to include in the json manifest.', 2);
    //        }
    //
    //        // if a basePath is set, expand using the original file pattern
    //        if (options.basePath) {
    //            files = grunt.file.expand({cwd: options.basePath}, file.orig.src);
    //        } else {
    //            files = file.src;
    //        }
    //
    //        // Exclude files
    //        if (options.exclude) {
    //            files = files.filter(function (item) {
    //                return options.exclude.indexOf(item) === -1;
    //            });
    //        }
    //
    //        // Set default destination file
    //        if (!file.dest) {
    //            file.dest = ['manifest.json'];
    //        }
    //
    //        // add files
    //        if (files) {
    //            files.forEach(function (item) {
    //
    //                var isDir = grunt.file.isDir(path.join(options.basePath, item));
    //
    //                if (!isDir)
    //                {
    //                    var hasher = require('crypto').createHash('sha256');
    //                    var filename = encodeURI(item);
    //                    var key = filename.split("-").slice(1).join('-');
    //                    json.files[key] = {};
    //                    json.files[key]['filename'] = filename;
    //                    json.files[key]['version'] = hasher.update(grunt.file.read(path.join(options.basePath, item))).digest("hex");
    //
    //                    if(options.loadall)
    //                    {
    //                        json.load.push(filename);
    //                    }
    //                }
    //            });
    //        }
    //
    //        console.log(file);
    //        //write out the JSON to the manifest files
    //        file.dest.forEach(function(f) {
    //            console.log('writing', f, json);
    //            grunt.file.write(f, JSON.stringify(json, null, 2));
    //        });
    //
    //        done();
    //    });
    //
    //});
    //grunt.loadNpmTasks('grunt-phonegapsplash');

    grunt.registerMultiTask('makeIcons', 'Create icons task', require('./grunt/icons'));




};

/*
 <?xml version="1.0" encoding="UTF-8"?>
 <widget xmlns     = "http://www.w3.org/ns/widgets"
 xmlns:gap = "http://phonegap.com/ns/1.0"
 id        = "com.myapp"
 version   = "0.0.0"
 >

 <name>myapp</name>
 <description>The best project ever.</description>
 <author href="" email="paulscheltema@gmail.com"></author>

 <preference name="phonegap-version" value="cli-5.3.9" />
 <preference name="orientation"      value="portrait" />
 <preference name="target-device"    value="universal" />
 <preference name="fullscreen"       value="true" />
 <preference name="permissions"      value="none"/>

 <preference name="webviewbounce" value="true"/>
 <preference name="prerendered-icon" value="true"/>
 <preference name="ios-statusbarstyle" value="black-opaque"/>
 <preference name="detect-data-types" value="true"/>
 <preference name="exit-on-suspend" value="true"/>
 <preference name="show-splash-screen-spinner" value="true"/>
 <preference name="auto-hide-splash-screen" value="true"/>
 <preference name="EnableViewportScale" value="false"/>
 <preference name="MediaPlaybackRequiresUserAction" value="false"/>
 <preference name="AllowInlineMediaPlayback" value="true"/>
 <preference name="BackupWebStorage" value="none"/>
 <preference name="TopActivityIndicator" value="gray"/>
 <preference name="KeyboardDisplayRequiresUserAction" value="true"/>
 <preference name="HideKeyboardFormAccessoryBar" value="false"/>
 <preference name="SuppressesIncrementalRendering" value="false"/>

 <preference name="SplashScreenDelay" value="3000"/>
 <preference name="ErrorUrl" value=""/>
 <preference name="BackgroundColor" value="0x00000000"/>
 <preference name="KeepRunning" value="false"/>
 <preference name="DisallowOverscroll" value="false"/>
 <preference name="LoadingDialog" value=","/>
 <preference name="LoadUrlTimeoutValue" value="20000"/>
 <preference name="disable-cursor" value="true"/>

 <access origin="*" />

 <icon src="icon.png" />
 <icon src="www/res/icon/android/icon-36-ldpi.png"                   gap:platform="android"  gap:density="ldpi" />
 <icon src="www/res/icon/android/icon-48-mdpi.png"                   gap:platform="android"  gap:density="mdpi" />
 <icon src="www/res/icon/android/icon-72-hdpi.png"                   gap:platform="android"  gap:density="hdpi" />
 <icon src="www/res/icon/android/icon-96-xhdpi.png"                  gap:platform="android"  gap:density="xhdpi" />
 <gap:splash src="www/res/screen/android/screen-ldpi-portrait.png"   gap:platform="android"  gap:density="ldpi" />
 <gap:splash src="www/res/screen/android/screen-mdpi-portrait.png"   gap:platform="android"  gap:density="mdpi" />
 <gap:splash src="www/res/screen/android/screen-hdpi-portrait.png"   gap:platform="android"  gap:density="hdpi" />
 <gap:splash src="www/res/screen/android/screen-xhdpi-portrait.png"  gap:platform="android"  gap:density="xhdpi" />

 <icon src="www/res/icon/ios/icon-57.png" gap:platform="ios" width="57" height="57"/>
 <icon src="www/res/icon/ios/icon-72.png" gap:platform="ios" width="72" height="72"/>
 <icon src="www/res/icon/ios/icon-57-2x.png" gap:platform="ios" width="114" height="114"/>
 <icon src="www/res/icon/ios/icon-72-2x.png" gap:platform="ios" width="144" height="144"/>
 <gap:splash src="www/res/screen/ios/screen-iphone-portrait.png" gap:platform="ios" width="320" height="480"/>
 <gap:splash src="www/res/screen/ios/screen-iphone-portrait-2x.png" gap:platform="ios" width="640" height="960"/>
 <gap:splash src="www/res/screen/ios/screen-iphone-portrait-568h-2x.png" gap:platform="ios" width="640" height="1136"/>
 <gap:splash src="www/res/screen/ios/screen-ipad-portrait.png" gap:platform="ios" width="768" height="1024"/>
 <gap:splash src="www/res/screen/ios/screen-ipad-landscape.png" gap:platform="ios" width="1024" height="768"/>

 <icon src="www/res/icon/windows-phone/icon-48.png" gap:platform="winphone"/>
 <icon src="www/res/icon/windows-phone/icon-173-tile.png" gap:platform="winphone" gap:role="background"/>
 <gap:splash src="www/res/screen/windows-phone/screen-portrait.jpg" gap:platform="winphone"/>

 </widget>

 */