 // Initialize Firebase
 var config = {
  apiKey: "AIzaSyBX0-sq4_BJEtji9wBXqtfFlfxhSXP4PyY",
  authDomain: "chat-ac687.firebaseapp.com",
  databaseURL: "https://chat-ac687.firebaseio.com",
  projectId: "chat-ac687",
  storageBucket: "",
  messagingSenderId: "1063673934533"
};
firebase.initializeApp(config);

const database = firebase.database();

$('button').click( function(event){
  event.preventDefault ();
  var mensaje = $('#mensaje').val() ;

  var data = { usuario: 'pablo', mensaje: mensaje };
  database.ref('chat/').push(data, function(err){
    if (err) {throw err; }
    else {
      console.info('guardamos la informacion');
      ponerMensaje(data);
      $('#mensaje').val('');
    }
  });
});

function ponerMensaje(pepito) {
  $('#caja'). append ('<p>' + pepito.usuario + ': ' + pepito.mensaje + '<p>');
}

function iterar(data) {
  for ( var chiguiro in data){
    if ( data.hasOwnProperty( chiguiro ) ){
      var element = data [ chiguiro ];
    var gato = {
     usuario: element.usuario,
     mensaje: element.mensaje
      };
      ponerMensaje(gato);
    }
  }
}


var traerMensajes = new Promise(function(res, rej) {
  var mensaje = database.ref('/chat').once('value').then(function(snapshot){
    return res ( snapshot.val() );
  });
if (!mensaje) { return rej(); }
});

traerMensajes.then(function(data) {
iterar(data);
});