//app.js

let express = require( 'express' );
let app = express();
//let httpServer = require( 'http' );
let server = require( 'http' ).Server( app );
//let io = require( 'socket.io' )( server);

let stream = require( './ws/stream' );
let path = require( 'path' );
let favicon = require( 'serve-favicon' );

const { Server } = require( "socket.io");
const { createClient} = require('redis');
const { createAdapter} = require('@socket.io/redis-streams-adapter');

let redisClient = createClient({ 
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
});

var cookieParser = require('cookie-parser');
//let SocketIoRedisStore = require('redis');


//error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.use(cookieParser());
//app.use(express.session({store:/*sessionStore*/redisClient, key:'jsessionid', secret: process.env.SECRET || 'secret'}));

app.use( favicon( path.join( __dirname, 'favicon.ico' ) ) );
app.use( '/assets', express.static( path.join( __dirname, 'assets' ) ) );

app.get( '/', ( req, res ) => {
    res.sendFile( __dirname + '/index.html' );
});


redisClient.connect().catch(console.error);

//io.adapter(createAdapter(redisClient));

let io = require( 'socket.io' )( server, {
    adapter: createAdapter(redisClient),
    connectionStateRecovery: {
      // sessions and packets backup duration
      maxDisconnectionDuration: 2 * 60 * 1000,
      //on successful restore, the middleware will be skipped
      skipMiddlewares: true,
    }
});

io.of('/stream').adapter.on('error', function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
});

io.of('/stream').on('connection', stream);


server.listen( 3000 );