const nodemailer = require("nodemailer");
var cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');
const token = '1311231028:AAEKKXJkKGbpzPVuo5tFPLxs';
var bodyParser = require('body-parser');
const chatId='-3321353215';
const bot = new TelegramBot(token, {polling: true});

var bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(function(req,res,next){
res.header("Access-Control-Allow-Origin","*");
res.header("Access-Control-Allow-Method", "POST, GET, OPTIONS");
res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
next()
});

app.post('/sendMessage', function (req, res){
  try{ 
     let name=req.body.name;
     let phone=req.body.phone;
     let comment=req.body.comment;
     
     if((typeof name !== 'undefined')&&(typeof phone !=='undefined')&&(typeof comment !=='undefined')){
         let headerMail="Сообщение с сайта";
         let message ="<b>Клиент:</b>"+name+",\n<b>Телефон:</b>"+phone+",\n<b>Комментарий:</b>"+comment;
         bot.sendMessage(chatId,message,{parse_mode: 'HTML'});  
         sendMail(headerMail,message,"manager@mail.com",false).catch(console.error);

         message ="<b>Уважаемый/ая "+name+"!</b>\n<br><br> Ваше обращение принято в работу.\n<br>Для ознакомления прикладываем к письму наши коммерческие предложения.\n<br>";
         headerMail ="Название фирмы (коммерческое предложение)";
         sendMail(headerMail,text,email,true).catch(console.error);
         
         res.status(200).json({'status':200,'message':'Выполнено успешно'});
      }
      else{
        res.status(400).json({'status':400,'message':'Сервер не понимает запрос из-за неверного синтаксиса'});
      }
  }
  catch(e){
    console.log(e);
    res.status(400).json({'status':400,'message':'Сервер не понимает запрос из-за неверного синтаксиса'});
  }
});

async function sendMail(headerMail,text,email,isClient){
  var attachments = [];
   let transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true, 
    auth: {
      user: "email_user", 
      pass: "email_password" 
    }
  });
  if(isClient==true){
     attachments = [{ filename: 'price.pdf', path: __dirname + '/pdf/price.pdf', contentType: 'application/pdf' }];
   }
   let info = await transporter.sendMail({
    from: 'email', 
    to: email, 
    subject: headerMail, 
    attachments: attachments,
    html:  html 
    });
 } 


app.listen(3000);

