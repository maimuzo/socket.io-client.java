var __base = __dirname + '/',
    __global = '/usr/local/lib/node_modules/',
    socketio = require(__global + 'socket.io'),
    io = socketio.listen(8124),
    jschardet = require(__global + 'jschardet'),
    Iconv = require(__global + 'iconv').Iconv,
    ascii = 'abcABC123!"#',
    ascii2 = 'abcABC123!#',
    multibyteCharactors = 'あいうえお',
    multibyteCharactors2 = "あいうえお";

io.on('connection', function (socket) {
    console.log('connected.');

    socket.on('disconnect', function () {
        console.log('disconnect' + socket.client.id);
    });

    socket.on('ping', function (test_type, data) {
        console.log('---------------------------------');
        console.log('received ping, test_type: ' + test_type + ', data: ' + data);
        try{
            console.log('received ping, JSON.parse(data): ' + JSON.parse(data));
        } catch( e ){
            console.log("e: " + e);
        }

        console.log('dump ascii: ' + ascii);
        console.log('dump ascii2: ' + ascii2);
        console.log('dump multibyteCharactors: ' + multibyteCharactors);
        console.log('dump multibyteCharactors2: ' + multibyteCharactors2);
        console.log('dump data: ' + data);

        console.log('detect ascii: ');
        console.log(jschardet.detect(ascii));
        console.log('detect ascii2: ');
        console.log(jschardet.detect(ascii2));
        console.log('detect multibyteCharactors: ');
        console.log(jschardet.detect(multibyteCharactors));
        console.log('detect multibyteCharactors2: ');
        console.log(jschardet.detect(multibyteCharactors2));
        console.log('detect data: ');
        console.log(jschardet.detect(data));

        socket.emit('pong', "socket.io plain ascii", ascii);
        socket.emit('pong', "socket.io object ascii", {ascii:ascii});
        socket.emit('pong', "socket.io json ascii", JSON.stringify({ascii:ascii}));
        socket.emit('pong', "socket.io plain ascii2", ascii2);
        socket.emit('pong', "socket.io object ascii2", {ascii2:ascii2});
        socket.emit('pong', "socket.io json ascii2", JSON.stringify({ascii2:ascii2}));
        socket.emit('pong', "socket.io plain multibyteCharactors", multibyteCharactors);
        socket.emit('pong', "socket.io object multibyteCharactors", {multibyteCharactors:multibyteCharactors});
        socket.emit('pong', "socket.io json multibyteCharactors", JSON.stringify({multibyteCharactors:multibyteCharactors}));
        socket.emit('pong', "socket.io plain multibyteCharactors2", multibyteCharactors2);
        socket.emit('pong', "socket.io object multibyteCharactors2", {multibyteCharactors2:multibyteCharactors2});
        socket.emit('pong', "socket.io json multibyteCharactors2", JSON.stringify({multibyteCharactors2:multibyteCharactors2 }));
        socket.emit('pong', "return data plain", data);
        socket.emit('pong', "return data object", {data:data});
        socket.emit('pong', "return data json", JSON.stringify({data:data }));

    });
});

