(function() {

    var width = 320;
    var streaming = false;

    var video = '';
    var canvas = '';
    var photo = '';
    var startbutton = '';
    var videoTracks = '';

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
                videoTracks = stream.getVideoTracks();
            })
            .catch(function(err) {
                console.log("An error occurred! " + err);
            });

        video.addEventListener('canplay', function(ev) { //canplay: detector de eventos para cuando el video comienza a funcionar 
            if (!streaming) {
                height = video.videoHeight / (video.videoWidth / width);

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
        context.fillStyle = "#fff";
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
        videoTracks.forEach(function(track) { track.stop() });
    };

    function sendPhotoToStorage() {
        const photoFile = data[0];
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

    }

    // Set up our event listener to run the startup process
    // once loading is complete.
    window.addEventListener('load', startup, false);
})();