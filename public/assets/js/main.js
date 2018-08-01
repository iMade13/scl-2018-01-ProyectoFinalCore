firebase.initializeApp({
    apiKey: 'AIzaSyDrLGbcFwh2Lcx_o-GJbnKQGeoXDSdlh5k',
    authDomain: 'final-project-common-core.firebaseapp.com',
    projectId: 'final-project-common-core'
});

// Initialize Cloud Firestore through Firebase
let db = firebase.firestore();
let empresa;

function lang1(event) {
    let target = event.target || event.srcElement;
    empresa = event.target.innerHTML;
}

function guardarDatos() {
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let correo = document.getElementById('correo').value;
    let fecha = new Date().toLocaleString();
    let photo = document.getElementById('photo').value;
    empresa;

    db.collection("Visitantes").add({
        first: firstName,
        last: lastName,
        email: correo,
        empresa: empresa,
        date: fecha
            // photo:photo

    }).then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    }).catch(function(error) {
        console.error("Error adding document: ", error);
    })

    document.getElementById('alert').style.display = "block";

    function clear() {
        document.getElementById('firstName').value = '';
        document.getElementById('lastName').value = '';
        document.getElementById('correo').value = '';
        document.getElementById('photo').value = '';
    }
    clear()
    sendPhotoToStorage();
}

function leerDatos() {
    let tabla = document.getElementById("tabla");
    db.collection("Visitantes").onSnapshot((querySnapshot) => {
        tabla.innerHTML = '';
        querySnapshot.forEach((doc) => {
            tabla.innerHTML += `
        <tr>
        <td scope="row">${doc.data().first}</td>
        <td scope="row">${doc.data().last}</td>
        <td scope="row">${doc.data().email}</td>
        <td scope="row">${doc.data().empresa}</td>
        <td scope="row">${doc.data().date}</td>
        <td scope="row"><button type="button" class="btn btn-light" onclick="editarDatos('${doc.id}','${doc.data().first}','${doc.data().last}','${doc.data().email}','${doc.data().empresa}','${doc.data().date}')"><i class="fas fa-user-edit"></i></button></td>
        <td scope="row"><button type="button" class="btn btn-dark" onclick="borrarDatos('${doc.id}')"><i class="fas fa-user-times"></i></button></td>
        `
        })
    })
    tablaVisitantes.style.display = 'block'
}


function borrarDatos(id) {
    db.collection("Visitantes").doc(id).delete().then(function() {}).catch(function(error) {
        console.error("Error removing document:", error);
    });
}

function editarDatos(id, firstName, lastName, dni) {
    document.getElementById('firstName').value = firstName;
    document.getElementById('lastName').value = lastName;
    document.getElementById('correo').value = correo;
    empresa;

    let boton = document.getElementById('btnGuardar');
    boton.innerHTML = "Editar";

    boton.onclick = function() {

        let washingtonRef = db.collection("Visitantes").doc(id);
        let firstName = document.getElementById('firstName').value
        let lastName = document.getElementById('lastName').value
        let correo = document.getElementById('correo').value
        empresa;
        return washingtonRef.update({

            first: firstName,
            last: lastName,
            email: correo,
            empresa: empresa

        }).then(function() {
            boton.innerHTML = "Guardar";
        }).catch(function(error) {
            console.error("Error updating document: ", error);
        });
    }
}

// funcion para mostrar formulario de registro 
function registroVisitantes() {
    $('#inicioContainer').hide()
    document.getElementById('registerVisitantesForm').style.display = "block";
    $('#menu1').collapse('hide');
}

function volverAHome() {
    $('#registerVisitantesForm').hide();
}

function mostrarTabla() {
    $('#registerVisitantesForm').hide();
    document.getElementById("tablaPersonas").style.display = "block";
}

function inicio() {
    document.getElementById("inicioContainer").style.display = "block";
}

// funcionamiento reloj
(function() {
    var actualizarHora = function() {
        // Obtenemos la fecha actual, incluyendo las horas, minutos, segundos, dia de la semana, dia del mes, mes y año;
        var fecha = new Date(),
            horas = fecha.getHours(),
            ampm,
            minutos = fecha.getMinutes(),
            segundos = fecha.getSeconds(),
            diaSemana = fecha.getDay(),
            dia = fecha.getDate(),
            mes = fecha.getMonth(),
            year = fecha.getFullYear();

        // Accedemos a los elementos del DOM para agregar mas adelante sus correspondientes valores
        var pHoras = document.getElementById('horas'),
            pAMPM = document.getElementById('ampm'),
            pMinutos = document.getElementById('minutos'),
            pSegundos = document.getElementById('segundos'),
            pDiaSemana = document.getElementById('diaSemana'),
            pDia = document.getElementById('dia'),
            pMes = document.getElementById('mes'),
            pYear = document.getElementById('year');


        // Obtenemos el dia se la semana y lo mostramos
        var semana = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
        pDiaSemana.textContent = semana[diaSemana];

        // Obtenemos el dia del mes
        pDia.textContent = dia;

        // Obtenemos el Mes y año y lo mostramos
        var meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
        pMes.textContent = meses[mes];
        pYear.textContent = year;

        // Cambiamos las hora de 24 a 12 horas y establecemos si es AM o PM

        if (horas >= 12) {
            horas = horas - 12;
            ampm = 'PM';
        } else {
            ampm = 'AM';
        }

        // Detectamos cuando sean las 0 AM y transformamos a 12 AM
        if (horas == 0) {
            horas = 12;
        }

        // Si queremos mostrar un cero antes de las horas ejecutamos este condicional
        // if (horas < 10){horas = '0' + horas;}
        pHoras.textContent = horas;
        pAMPM.textContent = ampm;

        // Minutos y Segundos
        if (minutos < 10) { minutos = "0" + minutos; }
        if (segundos < 10) { segundos = "0" + segundos; }

        pMinutos.textContent = minutos;
        pSegundos.textContent = segundos;
    };

    actualizarHora();
    var intervalo = setInterval(actualizarHora, 1000);
}())