'use strict';
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });

let url = "smtps://madeleine1302@gmail.com:" + encodeURIComponent('Made..Zule..1303') + "@smtp.gmail.com:465";
let transporter = nodemailer.createTransport(url);

exports.enviarEmail = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        let remitente = '"IF Blanco - Recoleta"';
        let asunto = /*request.body*/ 'Notificación de Visitante';
        let destinatarios = /*request.body*/ 'carla@laboratoria.la, yasnaret.soto@usach.cl'; // lista de e-mails destinatarios separados por ,
        let corpo = /*request.body*/ '';
        let corpoHtml = `<span>Estimados Laboratoria,<span>
        </br>Se le notifica que Paula Montiel se ha presentado en nuestra recepción para dirigirse a sus oficinas.
        </br>
        Sin más ha que hacer referencia, 
        </br>
        Saludos,
        Conserjeria IF.
        ` /*request.body['corpoHtml']*/
        let email = {
            from: remitente,
            to: destinatarios,
            subject: asunto,
            text: corpo,
            html: corpoHtml
        };

        transporter.sendMail(email, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Mensagem %s enviada: %s', info.messageId, info.response);
        });
        //response.send("Hello from Firebase!");
    });
});