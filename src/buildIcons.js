var exec = require('child_process').exec;
var path = require('path');
var config = require('./app/platforms/ios/Stadjerspas Groningen/Images.xcassets/AppIcon.appiconset/Contents.json');

var sourceIcon = path.join(__dirname, './static/res/icon.png');
var iosPath = path.join(__dirname, './static/res/icon/ios/');

var cmd, scale, size, width, height;


config.images.forEach(function (imageSetting) {
    if (imageSetting.filename) {

        if (imageSetting.scale) {
            scale = parseInt(imageSetting.scale, 10);
        } else {
            scale = 1;
        }

        size = imageSetting.size.split('x');
        width = parseInt(size[0], 10) * scale;
        height = parseInt(size[1], 10) * scale;

        cmd = [
            'convert', sourceIcon,
            '-resize', width + 'x' + height,
            iosPath + imageSetting.filename
        ].join(' ');

        console.log(cmd);
        exec(cmd);
    }
});

