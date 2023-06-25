const router = require('express').Router()
const User=require('../models/User')
const CryptoJS=require('crypto-js')
const jwt=require('jsonwebtoken')


const genKey = () => {
  //create a base-36 string that is always 30 chars long a-z0-9
  // 'an0qrr5i9u0q4km27hv2hue3ywx3uu'
  return [...Array(30)]
    .map((e) => ((Math.random() * 36) | 0).toString(36))
    .join('');
};

//getUser
router.get('/:id',async(req,res)=>{
  try {

    let user=await User.findOne({_id:req.params.id})
    res.status(200).json(user)
    
  } catch (error) {
    res.status(500).json(error)
  }

})

//register

router.post('/register',async(req,res)=>{

     const apikey=genKey()

    const newUser=new User({
        name:req.body.name,
        email:req.body.email,
        password:CryptoJS.AES.encrypt(req.body.password,'secret').toString(),
        apikey:apikey,
        images:[]
        
    })

    try{
        const savedUser=await newUser.save();
        res.status(201).json(savedUser)
    }catch(err){
        res.status(500).json(err)
    }
})

//login

router.post('/login', async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).json("Invalid credentials");
      }
  
      const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.CRYPTO_JS_SECRET).toString(CryptoJS.enc.Utf8);
      const validPassword = hashedPassword !== req.body.password;
      if (validPassword) {
        return res.status(401).json('Wrong password');
      }
      const { password, ...others } = user._doc;
      return res.status(200).json({ ...others});
    } catch (err) {
      return res.status(500).json(err);
    }
  });


  router.patch('/addimage/:id',async(req,res)=>{
    try {
      console.log(req.body.link)
      console.log(req.params.id)
      const user=await User.updateOne({_id:req.params.id},{$push:{images:req.body.link}})
      res.status(200).json(user)
      
    } catch (error) {
      res.status(500).json(error)
    }
    

  })
  
  

router.get('/verify/obj',async(req,res)=>{
    try {
        const apikey=req.query.apikey
        if(apikey){
            const userId=req.query.id
            const user = await User.findOne({ _id: userId });
            if(user.apikey===apikey){
              console.log('user verified')
                res.status(200).json(user)
            }else{
              console.log('not verified')
              res.status(401).json('not verified')

            }
            
        }else{
            console.log('not verified')
             res.status(401).json('not verified')
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports=router