require('dotenv').config();
const express = require('express');
const router = require('./router/myrouter');
const ejs = require('ejs');
const app = express();
const path = require('path')
const session  = require('express-session')

 


app.set('view engine','ejs')
app.set('views', path.join(__dirname,'views'))


app.use(express.urlencoded({extended: false}));
app.use(session({ 
    secret: 'mysession',
    resave:false,
    saveUninitialized:false
}))
app.use(router);
//app.use(express.static(path.join(__dirname, 'views')))
app.use(express.static(path.join(__dirname,'public')))

app.listen(8080, ()=>{
    console.log('Running....');   
})


































// function a(){
    
// // const http = require('http');
// // const fs = require('fs')
// // const url = require('url')

// // const pathIndex = fs.readFileSync(`${__dirname}/templates/index.html`,'utf-8')
// // const pathProduct = fs.readFileSync(`${__dirname}/templates/product1.html`,'utf-8')
// // const pathProduct2 = fs.readFileSync(`${__dirname}/templates/product2.html`,'utf-8')
// // const pathProduct3 = fs.readFileSync(`${__dirname}/templates/product3.html`,'utf-8')

// // const server = http.createServer((req ,res)=>{
// //    //const pathUrl = req.url;

// // const {pathname, query } = url.parse(req.url,true)
// // //console.log(url.parse(req.url,true)); 
    
    

// //     if(pathname === "/" || pathname === "index"){
// //         res.end(pathIndex)

// //     }else if(pathname === "/product"){
// //         if(query.id === '1'){
// //             res.end(pathProduct)
// //         }else if(query.id === '2'){
// //             res.end(pathProduct2)
// //         }else if(query.id === '3'){
// //             res.end(pathProduct3)
// //         }
// //     }else{
// //         res.writeHead(404)
// //         res.end('<h1>Null</h1>')
// //     }

// // })

// // server.listen(8080,() =>{
// //         console.log('server is running...');
// // })
// }

