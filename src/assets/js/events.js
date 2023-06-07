import helpers from './helpers.js';

window.addEventListener( 'load', () => {
    //When the chat icon is clicked
    document.querySelector( '#toggle-chat-pane' ).addEventListener( 'click', ( e ) => {
        let chatElem = document.querySelector( '#chat-pane' );
        let mainSecElem = document.querySelector( '#main-section' );

        if ( chatElem.classList.contains( 'chat-opened' ) ) {
            chatElem.setAttribute( 'hidden', true );
            mainSecElem.classList.remove( 'col-md-9' );
            mainSecElem.classList.add( 'col-md-12' );
            chatElem.classList.remove( 'chat-opened' );
        }

        else {
            chatElem.attributes.removeNamedItem( 'hidden' );
            mainSecElem.classList.remove( 'col-md-12' );
            mainSecElem.classList.add( 'col-md-9' );
            chatElem.classList.add( 'chat-opened' );
        }

        //remove the 'New' badge on chat icon (if any) once chat is opened.
        setTimeout( () => {
            if ( document.querySelector( '#chat-pane' ).classList.contains( 'chat-opened' ) ) {
                helpers.toggleChatNotificationBadge();
            }
        }, 300 );

        e.preventDefault(); 
    } );

    //When the whiteboard icon is clicked
    document.querySelector( '#toggle-whiteboard' ).addEventListener( 'click', ( e ) => {
        let boardElem = document.querySelector( '#whiteboard' );
        let mainSecElem = document.querySelector( '#main-section' );

        if ( boardElem.classList.contains( 'board-opened' ) ) {
            boardElem.setAttribute( 'hidden', true );
            mainSecElem.classList.remove( 'col-md-9' );
            mainSecElem.classList.add( 'col-md-12' );
            boardElem.classList.remove( 'board-opened' );
        }

        else {
            boardElem.attributes.removeNamedItem( 'hidden' );
            mainSecElem.classList.remove( 'col-md-12' );
            mainSecElem.classList.add( 'col-md-9' );
            boardElem.classList.add( 'board-opened' );
        }

        e.preventDefault(); 
        
    } );

    //When the users (participants) icon is clicked
    document.querySelector( '#users-list' ).addEventListener( 'click', ( e ) => {
        let userslistElem = document.querySelector( '#users' );
        let mainSecElem = document.querySelector( '#main-section' );

        if ( userslistElem.classList.contains( 'userslist-opened' ) ) {
            userslistElem.setAttribute( 'hidden', true );
            mainSecElem.classList.remove( 'col-md-9' );
            mainSecElem.classList.add( 'col-md-12' );
            userslistElem.classList.remove( 'userslist-opened' );
        }

        else {
            userslistElem.attributes.removeNamedItem( 'hidden' );
            mainSecElem.classList.remove( 'col-md-12' );
            mainSecElem.classList.add( 'col-md-9' );
            userslistElem.classList.add( 'userslist-opened' );
        }

        e.preventDefault(); 
        
    } );
    
    //when paint brush button is clicked
    document.querySelector( '#toggle-draw' ).addEventListener( 'click', ( e ) => {
        let colorSelection = document.querySelector( '#selectColor' );

        if ( colorSelection.classList.contains( 'opened' ) ) {
            colorSelection.setAttribute( 'hidden', true );
            colorSelection.classList.remove( 'opened' );
        }
        else {
            colorSelection.attributes.removeNamedItem( 'hidden' );
            colorSelection.classList.add( 'opened' );
        };

        let canvasWhiteBoard = document.querySelector( '#canvas-board' );
        let textArea = document.querySelector( '#whiteboard-input-text' );

        if ( canvasWhiteBoard.classList.contains( 'opened' ) ) {
            canvasWhiteBoard.setAttribute( 'hidden', true );
            canvasWhiteBoard.classList.remove( 'opened' );
            textArea.attributes.removeNamedItem( 'hidden' );
            textArea.classList.add( 'opened' );
        }
        else {
            canvasWhiteBoard.attributes.removeNamedItem( 'hidden' );
            canvasWhiteBoard.classList.add( 'opened' );
            textArea.setAttribute( 'hidden', true );
        };

        e.preventDefault(); 

    } );
    
    
    
    //When the video frame is clicked. This will enable picture-in-picture
    document.getElementById( 'local' ).addEventListener( 'click', () => {
        if ( !document.pictureInPictureElement ) {
            document.getElementById( 'local' ).requestPictureInPicture()
                .catch( error => {
                    // Video failed to enter Picture-in-Picture mode.
                    console.error( error );
                } );
        }

        else {
            document.exitPictureInPicture()
                .catch( error => {
                    // Video failed to leave Picture-in-Picture mode.
                    console.error( error );
                } );
        }
    } );
    
    //function to copy text link into the clipboard
    async function copyToClipboard(textroomlink) {
        try {
          await navigator.clipboard.writeText(textroomlink);
          alert("Copied successfully!"); 
        } catch (e) {
          alert("Failed to copy!"); 
        }
    };
    
    //set value to the copy link input
    function setValue(e, valueToSet) {    
        let element = document.getElementById("copy-link-input");
        element.value = valueToSet;
       
        e.preventDefault(); 
    };
    
    //copy room link 
    document.querySelectorAll('.copy-link').forEach((copyLinkContainer) => {
        //input field to get a room link
        const inputField = copyLinkContainer.querySelector('.copy-link-input');

        //copy button
        const copyButton = copyLinkContainer.querySelector('.copy-link-button');
        
        //Use 'addEventListener' method on 'focus' event: select input field
        inputField.addEventListener("focus", () => inputField.select());

        //Use 'addEventListener' method on 'click' event   
        copyButton.addEventListener("click", () => {
            //variable to hold a roomlink value 
            const roomlinkvalue = inputField.value.toString();
            
            //input field selected
            inputField.select();

            //using method to copy room link (text) into the clipboard
            copyToClipboard(roomlinkvalue);
            
        });
    });

    //start button 
    document.getElementById('start-meeting').style.display = 'none';

    //function to get button visible
    function showStartBtn(e, url) { 
        let startBtn = document.getElementById('start-meeting');
        startBtn.style.display = 'block'; 

        startBtn.addEventListener("click", () => {
            Object.assign(document.createElement('a'), {
                target: '_self',
                rel: 'noopener noreferrer',
                href: url,
            }).click();
        });
        e.preventDefault(); 
    }; 

    
    //When the 'Create room" is button is clicked
    document.getElementById( 'create-room' ).addEventListener( 'click', ( e ) => {
        e.preventDefault();

        let roomName = document.querySelector( '#room-name' ).value;
        let yourName = document.querySelector( '#your-name' ).value;


        if ( roomName && yourName ) {
            //remove error message, if any
            document.querySelector('#err-msg').innerText = "";

            //save the user's name in sessionStorage
            sessionStorage.setItem( 'username', yourName );

            //create room link
            let roomLink = `${ location.origin }?room=${ roomName.trim().replace( ' ', '_' ) }_${ helpers.generateRandomString() }`;
            
            //set a room link value to the copy-link-input field
            setValue(e, roomLink);
            
            alert("Room successfully created.");  // display alert message

            //start a meeting button
            showStartBtn(e, roomLink);
            
            //empty the values
            document.querySelector( '#room-name' ).value = '';
            document.querySelector( '#your-name' ).value = '';
        }

        else {
            document.querySelector('#err-msg').innerText = "All fields are required";
        }
    } );


    //When the 'Enter room' button is clicked. (when someone joins using the copy link)
    document.getElementById( 'enter-room' ).addEventListener( 'click', ( e ) => {
        e.preventDefault();

        let name = document.querySelector( '#username' ).value;

        if ( name ) {
            //remove error message, if any
            document.querySelector('#err-msg-username').innerText = "";

            //save the user's name in sessionStorage
            sessionStorage.setItem( 'username', name );

            //reload room
            location.reload();
        }

        else {
            document.querySelector('#err-msg-username').innerText = "Please input your name";
        }
    } );


    document.addEventListener( 'click', ( e ) => {
        if ( e.target && e.target.classList.contains( 'expand-remote-video' ) ) {
            helpers.maximiseStream( e );
        }

        else if ( e.target && e.target.classList.contains( 'mute-remote-mic' ) ) {
            helpers.singleStreamToggleMute( e );
        }
    } );


    document.getElementById( 'closeModal' ).addEventListener( 'click', () => {
        helpers.toggleModal( 'recording-options-modal', false );
    } );
} );
