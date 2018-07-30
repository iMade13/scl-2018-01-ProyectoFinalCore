firebase.initializeApp({
    apiKey: 'AIzaSyDrLGbcFwh2Lcx_o-GJbnKQGeoXDSdlh5k',
    authDomain: 'final-project-common-core.firebaseapp.com',
    projectId: 'final-project-common-core'
  });
  
  // Initialize Cloud Firestore through Firebase
  let  db = firebase.firestore();
  let empresa;
  function lang1(event) {
    let target = event.target || event.srcElement;
    empresa=event.target.innerHTML;
  }

  function guardarDatos(){
    let firstName=document.getElementById('firstName').value;
    let lastName=document.getElementById('lastName').value;
    let dni=document.getElementById('dni').value;
    let fecha = new Date().toLocaleString();
    empresa;
 
    db.collection("Residentes").add({
    first: firstName,
    last: lastName,
    run: dni,
    empresa:empresa,
    date:fecha
    }).then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
    }).catch(function(error) {
    console.error("Error adding document: ", error);
    })

    function clear(){
      document.getElementById('firstName').value='';
      document.getElementById('lastName').value='';
      document.getElementById('dni').value='';
    }
    clear();
  }

  function leerDatos(){
    let tabla=document.getElementById("tabla");
    db.collection("Residentes").onSnapshot((querySnapshot)=>{
      tabla.innerHTML='';
      querySnapshot.forEach((doc)=>{
        tabla.innerHTML +=`
        <tr>
        <td scope="row">${doc.data().first}</td>
        <td scope="row">${doc.data().last}</td>
        <td scope="row">${doc.data().run}</td>
        <td scope="row">${doc.data().empresa}</td>
        <td scope="row">${doc.data().date}</td>
        <td scope="row"><button type="button" class="btn btn-light" onclick="editarDatos('${doc.id}','${doc.data().first}','${doc.data().last}','${doc.data().run}','${doc.data().empresa}','${doc.data().date}')"><i class="fas fa-user-edit"></i></button></td>
        <td scope="row"><button type="button" class="btn btn-dark" onclick="borrarDatos('${doc.id}')"><i class="fas fa-user-times"></i></button></td>
        `
      })
    })
    tablaResidentes.style.display = 'block'
  }


  function borrarDatos(id){
    db.collection("Residentes").doc(id).delete().then(function() {
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
  }



  function editarDatos(id,firstName,lastName,dni){
    document.getElementById('firstName').value=firstName;
    document.getElementById('lastName').value=lastName;
    document.getElementById('dni').value=dni;
    empresa;
    
    let boton=document.getElementById('btnGuardar');
    boton.innerHTML="Editar";
    
    boton.onclick=function(){
  
    let  washingtonRef = db.collection("Residentes").doc(id);

    let firstName = document.getElementById('firstName').value
    let lastName = document.getElementById('lastName').value
    let dni = document.getElementById('dni').value
    empresa;
    return washingtonRef.update({

    first: firstName,
    last: lastName,
    run: dni,
    empresa:empresa

    }).then(function() {
      boton.innerHTML="Guardar";
   }).catch(function(error) {
    console.error("Error updating document: ", error);
    });}
  }

  // funcion para mostrar formulario de registro 
  function dropdown(){
    document.getElementById('registerForm').style.display="block";
    $('#menu1').collapse('hide');
  }

  function volverAHome(){
    $('#registerForm').hide();
  }

  function mostrarTabla() {
    document.getElementById('tablaPersonas').style.display="block";
   
  }

   
