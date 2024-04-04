const express = require('express');
const { blogs } = require('./model/index');
const app =express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs');

app.use(express.static('public/'))
//database connection
require('./model/index')
//jati bela pani kei kura database ma halnu chha or kei kura database sanga interact garera garnu chha vane teti bela sadhai async await use garnu parcha
app.get('/',async(req,res)=>{
    const allBlogs =await blogs.findAll();
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
app.post('/createblogs',async(req,res)=>{
    const {title,sub_title,description}=req.body;
   await blogs.create({
        title:title,
        sub_title:sub_title,
        description:description
    })
    res.redirect('/')
})
app.get('/deleteblogs/:id',async(req,res)=>{
    const {id} = req.params;
     const deletedBlogs = await blogs.destroy({
        where:{
            id:id,
        }
    });
    console.log(typeof deletedBlogs)
     if(deletedBlogs){
         res.redirect('/')
     }
})
app.get('/editblogs/:id',async(req,res)=>{
    const {id} = req.params;
    const editblogs = await blogs.findByPk(id);
    res.render('editBlog',{editblogs})
})
app.post('/updateblogs/:id',async(req,res)=>{
    const {id} = req.params;
    // first approach
    await  blogs.update(req.body,{
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
app.listen(3000,()=>{
    console.log('connected successfully');
})

// [
//     blog {
//       dataValues: {
//         id: 1,
//         title: 'hello',
//         sub_title: 'hello',
//         description: 'hello',
//         createdAt: 2024-04-03T11:01:40.000Z,
//         updatedAt: 2024-04-03T11:01:40.000Z
//       },
//       _previousDataValues: {
//         id: 1,
//         title: 'hello',
//         sub_title: 'hello',
//         description: 'hello',
//         createdAt: 2024-04-03T11:01:40.000Z,
//         updatedAt: 2024-04-03T11:01:40.000Z
//       },
//       uniqno: 1,
//       _changed: Set(0) {},
//       _options: {
//         isNewRecord: false,
//         _schema: null,
//         _schemaDelimiter: '',
//         raw: true,
//         attributes: [Array]
//       },
//       isNewRecord: false
//     },
//     blog {
//       dataValues: {
//         id: 2,
//         title: 'sfdsadf',
//         sub_title: 'fas',
//         description: 'asdfsaf',
//         createdAt: 2024-04-03T11:02:19.000Z,
//         updatedAt: 2024-04-03T11:02:19.000Z
//       },
//       _previousDataValues: {
//         id: 2,
//         title: 'sfdsadf',
//         sub_title: 'fas',
//         description: 'asdfsaf',
//         createdAt: 2024-04-03T11:02:19.000Z,
//         updatedAt: 2024-04-03T11:02:19.000Z
//       },
//       uniqno: 1,
//       _changed: Set(0) {},
//       _options: {
//         isNewRecord: false,
//         _schema: null,
//         _schemaDelimiter: '',
//         raw: true,
//         attributes: [Array]
//       },
//       isNewRecord: false
//     }
//   ]