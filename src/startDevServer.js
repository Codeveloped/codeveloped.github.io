require("babel-polyfill");

require("babel-core/register")({
    //only: /client/,
    presets: ["es2015", "react", "stage-0", "stage-1", "stage-2", "stage-3"]
});

require('./devServer');
