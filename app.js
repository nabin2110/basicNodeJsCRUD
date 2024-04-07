const express = require('express');
const bcrypt = require('bcryptjs')
const {multer,storage} = require('./middleware/multerConfig.js');
//database ma vako table lai import gareko from model
const { blogs,users } = require('./model/index');
const app =express();
const upload = multer({storage:storage})
const fs= require('fs')
//parse incoming form data
app.use(express.json()); //content-Type : application/json handle 
app.use(express.urlencoded({extended:true})) //content-Type :application/x-www-form-urlencoded handle 
app.set('view engine','ejs');

app.use(express.static('public/'))
app.use(express.static('uploads/'))
//database connection
//jati bela pani kei kura database ma halnu chha or kei kura database sanga interact garera garnu chha vane teti bela sadhai async await use garnu parcha
app.get('/',async(req,res)=>{
    const allBlogs = await blogs.findAll();
    console.log(allBlogs)
    res.render('listblogs',{blogs:allBlogs})
})
app.get(`/blogdetail/:id`,async(req,res)=>{
    const {id} = req.params;
    // yesle chai array return garcha jaslai chai for better destructuring garincha using [] bracket
    // const [singleblog] = await blogs.findAll({
    //     where:{
    //         id:id
    //     }
    // }); 
    // jaba pani hamle findByPk(id) use garcham teti bela chai data object ko form ma nai return huncha instead of array tei vayera no need to destructure here
    const singleblog = await blogs.findByPk(id)
    // console.log(singleblog)
    if(singleblog!== null){
        res.render('blogDetail',{singleblog:singleblog});
    }else{
        res.redirect('/')
    }
    // console.log(singleblog)
})
app.get('/createblogs',(req,res)=>{
    res.render('createblogs');
})

//upload.single("image") j ejs ko file ko name ma chha tei dinu parne huncha single ko vitra
app.post('/createblogs',upload.single('image'),async(req,res)=>{
    const {title,sub_title,description}=req.body;
   await blogs.create({
        title:title,
        sub_title:sub_title,
        description:description,
        image:req.file.filename
    })
    res.redirect('/')
})
app.get('/deleteblogs/:id',async(req,res)=>{
    const {id} = req.params;
    const record = await blogs.findByPk(id);
     const deletedBlogs = await blogs.destroy({
        where:{
            id:id,
        }
    });
    if(record.image){
        fs.unlink('./uploads/'+record.image,(err)=>{
            console.log(err)
        })
    }
     if(deletedBlogs){
         res.redirect('/')
     }
})
app.get('/editblogs/:id',async(req,res)=>{
    const {id} = req.params;
    const editblogs = await blogs.findByPk(id);
    res.render('editBlog',{editblogs})
})
app.post('/updateblogs/:id',upload.single('image'),async(req,res)=>{
    const {id} = req.params;
    // first approach
    const editblogs = await blogs.findByPk(id);
    let filename;
    if(req.file){
        //dynamically deleting
        fs.unlink('./uploads/'+editblogs.image,(err)=>{
                console.log('something went wrong')
            })
        filename = req.file.filename;
    }
    const {title,sub_title,description} = req.body;
    await  blogs.update({
        title,
        sub_title,
        description,
        image:filename??editblogs.image
    },{
        where:{
            id:id
        }
    })
    // const {title,sub_title,description} = req.body;
    // await blogs.update({
    //     title:title,
    //     sub_title:sub_title,
    //     description:description
    // },{
    //     where:{
    //         id:id
    //     }
    // })
    res.redirect('/')
})
app.get("/register",(req,res)=>{
        res.render('register');
});
app.post('/register',async(req,res)=>{
    const {username,email,password} = req.body;
    await users.create({
        username:username,
        email:email,
        password:bcrypt.hashSync(password,8)
    })
    res.redirect('/login')
})
app.post('/login',async(req,res)=>{
    const {email,password} = req.body;
   const emailChecked = await users.findAll({
        where:{
            email:email,
        }
    })
    if(emailChecked.length>0){
        const isMatch = bcrypt.compareSync(password,emailChecked[0].password)
        if(isMatch){
            res.redirect('/');
        }else{
            res.redirect('/login')
        }
    }else{
        res.redirect('/login')
    }   
})
//login 

app.get("/login",(req,res)=>{
    res.render('login')
})
//port 
app.listen(3000,()=>{
    console.log('connected successfully');
})