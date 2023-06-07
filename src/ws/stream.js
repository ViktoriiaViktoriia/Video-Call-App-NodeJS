const stream = ( socket ) => {
    socket.on( 'subscribe', ( data ) => {
        //join a room
        socket.join( data.room );
        socket.join( data.socketId );

        //Inform other members in the room of new user's arrival
        if ( socket.adapter.rooms.has(data.room) === true ) {
            socket.to( data.room ).emit( 'new user', { socketId: data.socketId } );
        }
    } );


    socket.on( 'newUserStart', ( data ) => {
        socket.to( data.to ).emit( 'newUserStart', { sender: data.sender} );
    } );


    socket.on( 'sdp', ( data ) => {
        socket.to( data.to ).emit( 'sdp', { description: data.description, sender: data.sender } );
    } );


    socket.on( 'ice candidates', ( data ) => {
        socket.to( data.to ).emit( 'ice candidates', { candidate: data.candidate, sender: data.sender } );
    } );


    socket.on( 'chat', ( data ) => {
        socket.to( data.room ).emit( 'chat', { sender: data.sender, msg: data.msg } );
        console.log(data);
    } );

    //receive the data on the server side
    console.log('new socket connection:' + socket.id);
    socket.on('drawing', (data) => {
        
        //socket client data (x, y), socket server data (data.x, data.y)
        //server emiting data to the client
        socket.to( data.room ).emit('drawing', {
            x: data.x,
            y: data.y,
            color: data.color,
            sender: data.sender
        });

        console.log(data);
    });


    socket.on( 'typing', ( data ) => {
        socket.to( data.room ).emit( 'typing', { sender: data.sender, text: data.text} );
        console.log(data);
    } );

};

module.exports = stream;
