const express = require('express');
const multer = require('multer');
const router = express.Router();
const MongoDb = require('../models/database');



const storage = multer.diskStorage({destination: (req,file,cb)=>{
    cb(null, './public/images/products');

},filename:(req,file,cb)=>{
    cb(null ,Date.now() + '.jpg');

}})

const upload = multer({
    storage:storage
})

router.get('/',(req ,response)=>{
    MongoDb.find().exec((err,doc)=>{

        response.render('index' ,{product:doc});
    })

})

router.get('/manage',(req ,response)=>{
    
        MongoDb.find().exec((err,doc)=>{

            response.render('manage' ,{product:doc});
        })
})
router.get('/logout', (req,res)=>{
    req.session.destroy((err)=>{
        res.redirect('/manage')
    })
})
router.get('/form',(req ,response)=>{
  
     response.render('form');
})

router.get('/:id',(req ,response)=>{
const product_id = req.params.id;

MongoDb.findOne({_id:product_id}).exec((err, doc) =>{

    response.render('product' , {product:doc});

})

})





router.get('/delete/:id' ,(req, res) =>{
        MongoDb.findByIdAndDelete(req.params.id , 
        {
            useFindAndModify:false
        }).exec(err => {
            console.log('ลบข้อมูลสำเร็จ');
                res.redirect('/manage')
        })
})

router.post('/insert',upload.single('img'),(req,res)=>{
   

        let data = new MongoDb({
            name:req.body.name,
            description:req.body.description,
        })
       MongoDb.sendProduct(data ,(err) =>{
            if(err) console.log(err);
            
            res.redirect('form')
       })
})


router.post('/edit',(req,res)=>{
    const edit_id = req.body.edit_id
 MongoDb.findOne({_id:edit_id}).exec((err, doc) =>{

    res.render('edit' , {product:doc});
    
    })
})

router.post('/update',(req ,res)=>{
    const update_id = req.body.update_id;

    const data = {
            name:req.body.name,
            description:req.body.description,
    }
  MongoDb.findByIdAndUpdate(update_id ,data ,{useFindAndModify: false}).exec((err) =>{
        res.redirect('/manage')
  })
})


router.post('/login',(req, res)=>{

    const username = req.body.username;
    const password = req.body.password;
    const time = 30000 ;
   
    if(username === 'admin' && password === '123'){

        req.session.username = username;
        req.session.password = password;
        req.session.login = true;
        req.session.cookie.maxAge = time
        res.redirect('/manage')

    }
    else{
            res.render('404')
    }
})

module.exports = router;
