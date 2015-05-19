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
        idx: 'id',
        interval: 3000,
        nameRow: 1,
        typeRow: 3,
        ignoreRows: [2, 4],
        indexColumn: 1
    }
});


var cb = function() {
    var heroInitConf = null;

    var getConf = function() {
        heroInitConf = app.get('configReader').get('Heroinit');
    };

    var printConf = function() {
        console.warn('\n', (new Date()).getTime(), ': heroInitConf = ', util.inspect(heroInitConf, {
            showHidden: false,
            depth: null
        }));
        console.warn('==============================================');
    };

    getConf();
    printConf();

    console.warn("find hero record where the hero id is equal to 1");
    var heroRecord = heroInitConf.findByFunc(function(ele) {
        return ele.heroId == 1;
    });
    console.warn('\n', (new Date()).getTime(), ': heroRecord = ', util.inspect(heroRecord, {
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