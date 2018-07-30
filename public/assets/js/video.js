(function() {

<<<<<<< HEAD
    var width = 200;
=======
    var width = 220;
>>>>>>> 305dbc6b4b0d4b0b9d726d9eab0f67557e92b7db
    var streaming = false;

    var video = '';
    var canvas = '';
    var photo = '';
    var startbutton = '';
<<<<<<< HEAD
    var videoTracks = '';
=======
>>>>>>> 305dbc6b4b0d4b0b9d726d9eab0f67557e92b7db

    function startup() {
        video = document.getElementById('video');
        canvas = document.getElementById('canvas');
        photo = document.getElementById('photo');
        startbutton = document.getElementById('startbutton');

        navigator.getMedia = (navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia);

        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then(function(stream) {
                video.srcObject = stream;
                video.play();
<<<<<<< HEAD
                videoTracks = stream.getVideoTracks();
=======
>>>>>>> 305dbc6b4b0d4b0b9d726d9eab0f67557e92b7db
            })
            .catch(function(err) {
                console.log("An error occurred! " + err);
            });

        video.addEventListener('canplay', function(ev) { //canplay: detector de eventos para cuando el video comienza a funcionar 
            if (!streaming) {
                height = video.videoHeight / (video.videoWidth / width);

<<<<<<< HEAD
=======
                // Firefox currently has a bug where the height can't be read from
                // the video, so we will make assumptions if this happens.
>>>>>>> 305dbc6b4b0d4b0b9d726d9eab0f67557e92b7db
                video.setAttribute('width', width);
                video.setAttribute('height', height);
                canvas.setAttribute('width', width);
                canvas.setAttribute('height', height);
                streaming = true;
            }
        }, false);

        startbutton.addEventListener('click', function(ev) { //llamar a la función tomar foto
            takepicture();
            ev.preventDefault();
        }, false);

        clearphoto();
    }

    function clearphoto() { //limpiar el cuadro de foto
        var context = canvas.getContext('2d');
<<<<<<< HEAD
        context.fillStyle = "none";
=======
        context.fillStyle = "#fff";
>>>>>>> 305dbc6b4b0d4b0b9d726d9eab0f67557e92b7db
        context.fillRect(0, 0, canvas.width, canvas.height);

        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
    }

    function takepicture() {
        var context = canvas.getContext('2d');
        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height); // dibujar el fotograma del video

            var data = canvas.toDataURL('image/png'); //convertirla en formato PNG
            photo.setAttribute('src', data); //muestra la imagen
        } else {
            clearphoto();
        }
<<<<<<< HEAD
        videoTracks.forEach(function(track) { track.stop() });
    };

    function sendPhotoToStorage() {
        const photoFile = content.fill[0];
        const fileName = photoFile.name;
        const metadata = {
            contentType: photoFile.type
        };

        const task = firebase.storage().ref('images')
            .child(fileName)
            .put(photoFile, metadata);

        task.then(snapshot => snapshot.ref.takepicture())
            .then(photo => {
                console.log('URL del archivo > ' + photo);
            });

=======
>>>>>>> 305dbc6b4b0d4b0b9d726d9eab0f67557e92b7db
    }

    // Set up our event listener to run the startup process
    // once loading is complete.
    window.addEventListener('load', startup, false);
})();