const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const knex = require('knex');

const db=knex({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : 'sudha@88',
      database : 'qnagenesis'
    }
  });
app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res)=> { 
  db.select('*').from('questionstable').orderBy('qid', 'desc').then(data=>res.send(data));
 })
 app.get('/answers/:qid', (req, res)=> { 
   const id=req.params.qid;
   db('answerstable') .where({qid: id}).select('*').then(data=>res.send(data));
 })
 app.post('/Qpost',(req, res)=>{
  var insert1 = {username:req.body.user,question:req.body.question,questiondescription:req.body.details};
  db.insert(insert1).into("questionstable").then(function (qid) {
    res.send(''+qid);
  })
 })
 app.post('/Apost',(req, res)=>{
  var insert1 = {username:req.body.user,answer:req.body.answer,qid:req.body.qid};
  db.insert(insert1).into("answerstable").then(function (qid) {
    res.send(''+qid);
  })
 })
 app.post('/register',(req, res)=>{
  var insert1 = {username:req.body.user,email:req.body.email,password:req.body.password};
  db.insert(insert1).into("users").then(function (uid) {
    res.send(''+uid);
  })
 })
 app.post('/signin',(req, res)=>{
  db('users') .where({email: req.body.email,password:req.body.password}).select('username').then(data=>{
    res.send(data);
  });
 })
 app.get('/userexist/:user', (req, res)=> { 
   const user = req.params.user;
   db('users') .where({username: user}).select('uid').then(data=>res.send(data));
 })

app.listen(3001);
