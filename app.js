var util = require('util');
var application = require('./application');
var configReader = require('pomelo-config-reader');

var createApp = function() {
    var app = application;
    app.init();
    return app;
};

var app = createApp();

// load/watch config file's data
app.use(configReader, {
    watcher: {
        dir: __dirname + '/config/data',
        indexColumn: 1,
        nameRow: 4,
        typeRow: 2,
        ignoreRows: [1, 3],
        interval: 3000
    }
});


var cb = function() {
    var playerInitConf = null;

    var getConf = function() {
        playerInitConf = app.get('configReader').get('Tmp_player');
    };

    var printConf = function() {
        console.warn('\n', (new Date()).getTime(), ': playerInitConf = ', util.inspect(playerInitConf, {
            showHidden: false,
            depth: null
        }));
        console.warn('==============================================');
    };

    getConf();
    printConf();

    console.warn("find player record where the player id is equal to 1");
    var playerRecord = playerInitConf.findByFunc(function(ele) {
        return ele.id == 1;
    });
    console.warn('\n', (new Date()).getTime(), ': playerRecord = ', util.inspect(playerRecord, {
        showHidden: false,
        depth: null
    }));

};

//start
app.start(cb);

// Uncaught exception handler
process.on('uncaughtException', function(err) {
    console.error(' Caught exception: ' + err.stack);
});