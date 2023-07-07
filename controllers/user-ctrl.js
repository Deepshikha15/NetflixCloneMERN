const User=require("../mongo");
const CryptoJS=require("crypto-js")
const jwt= require("jsonwebtoken")

const userRegistration = async(req, res) => {

    const userData= new User({
        name:req.body.name,
        email:req.body.email,
        password:CryptoJS.AES.encrypt(
            req.body.password,process.env.SECRET_KEY
        ).toString(),
    });
    
    try{
        const user= await userData.save()
        return res.status(201).json(user)
    }catch(e){
        return res.status(500).json(e)
    }


    // const {name, email, password}=req.body
    // console.log("authhhhh **********",req.body)
    // const userData={
    //     name:name,
    //     email:email,
    //     password:password
    // };
    // try{
    //     const check= await User.findOne({email:email})
    //     if(check){
    //         res.json("exist")
    //     }else{
    //         res.json("notexist")
    //         await User.insertMany([userData])
    //     }
    // }catch(e){
    //     console.log("fail")
    // }

    // *******
    
    // const {name, email, password} = req.body
    // console.log("infoo==>>",name, email, password)

    // if (!req.body) {
    //     return res.status(400).json({
    //         success: false,
    //         error: 'You must provide a credentials',
    //     })
    // }

    // const record = new User(req.body)

    // if (!record) {
    //     return res.status(400).json({ success: false })
    // }

    // record.save().then(() => {
    //         return res.status(201).json({
    //             success: true,
    //             id: record.id,
    //             message: 'account created',
    //         })
    //     }).catch(error => {
    //         return res.status(400).json({
    //             error,
    //             message: 'account not created!',
    //         })
    //     })
}

const userLogin= async(req,res)=>{
    try {
        const user = await User.findOne({ name: req.body.name });
        !user && res.status(401).json("Wrong password or username");
        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const origPassword = bytes.toString(CryptoJS.enc.Utf8);

        origPassword !== req.body.password && res.status(401).json("Wrong password or username");

        const accessToken = jwt.sign(
            {id: user._id, isAdmin: user.isAdmin},
            process.env.SECRET_KEY,
            {expiresIn: "5d"}
        )

        const { password, ...other } = user._doc;
        return res.status(200).json({...other, accessToken});
    } catch (error) {
        return res.status(500).json(error);
    }
    
}



module.exports = {
    userRegistration,
    userLogin
}