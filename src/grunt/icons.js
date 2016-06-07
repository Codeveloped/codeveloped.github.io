var svg = require('svg2png');
var Promise = require('bluebird');
var pn = require("pn");
var fs = require('fs');


module.exports = function () {

    var self = this;
    var done = this.async();
    var promises = [];

    this.data.raster.forEach(function (image) {

        console.log('adding image', image);

        //
        //
        //pn.readFile("source.svg")
        //    .then(svg2png)
        //    .then(buffer => fs.writeFile("dest.png", buffer))
        //    .catch(e => console.error(e));


        promises.push(new Promise(function (resolve, reject) {

            svg(self.data.vector, image.path, image.width / self.data.width, function (err) {
                if (err) {
                    console.log('An error occurred during conversion: ', err);
                    reject(err);
                } else {
                    console.log('Done creating ', image.path);
                    resolve();
                }
            });

        }));


    });

    console.log('promises#', promises.length);

    Promise.all(promises).then(function () {
        console.log('done', arguments);
        done();
    });

};

