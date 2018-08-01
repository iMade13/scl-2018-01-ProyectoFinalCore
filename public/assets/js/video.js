let width = 250;
let streaming = false;
let data = '';
let videoTracks = '';
let canvas = '';
let photo = '';


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
        .catch(function(e) {
            console.log("An error occurred! " + e);
        });

    video.addEventListener('canplay', function() { //canplay: detector de eventos para cuando el video comienza a funcionar
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

    //clearphoto();
}

function clearphoto() { //limpiar el cuadro de foto
    let context = canvas.getContext('2d');
    context.fillRect(0, 0, canvas.width, canvas.height);

    let data = canvas.toDataURL('images/jpeg');
    photo.setAttribute('src', data);

    takepicture();
}

function takepicture() {

    let context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height); // dibujar el fotograma del video

    data = canvas.toDataURL(); //convertirla en formato PNG
    console.log(context)
    photo.setAttribute('src', data); //muestra la imagen

    videoTracks.forEach(function(track) { track.stop() });

    video.style = 'display: none'
        //canvas.style = 'display: block'
};

window.addEventListener('load', startup, false);

function sendPhotoToStorage() {
    const ref = firebase.storage().ref('images');
    const file = data.files[0];
    const message = data;
    const name = (+new Date()) + '-' + file.name;
    const metadata = {
        contentType: 'image/jpeg'
    };
    const task = ref.child(name).putString(message, metadata);
    task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then((url) => {
            console.log(url);
            document.querySelector('img').src = url;
        })
        .catch(console.error);
}


// function sendPhotoToStorage() {
//     const message = data;
//     //     const fileName = photoFile.name;
//     const metadata = {
//         contentType: 'image/jpge'
//     };
//     ref.putString(message, 'data_url').then(function(takepicture) {
//         console.log('Uploaded a data_url string!');
//     });
//     const task = firebase.storage().refputString(message, 'data_url').then(function(snapshot) {
//         snapshot => snapshot.ref.getDownloadURL()
//             .then(url => {
//                 urlPhoto = url
//                 console.log('URL del archivo > ' + url);
//             });

//         //const uploadTask = storageRef.child('images/mountains.jpg').put(file, metadata);

//         console.log('Uploaded a data_url string!');
//     })