const User=require("../mongo");
const CryptoJS=require("crypto-js")


const updateUser=async(req, res) => {
    console.log("req====> ",req)
    if(req.user.id === req.params.id && req.user.isAdmin ){
        console.log("updateUser",req.user.id, req.params.id);
        if(req.body.password){
            req.body.password = CryptoJS.AES.encrypt(req.body.password,process.env.SECRET_KEY).toString();
        }

        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true});
            console.log("updateUser",updateUser);
            return res.status(200).json(updatedUser);
        } catch (error) {
            return res.status(500).json(error);
        }
    } else {
        return res.status(403).json("You are not authorized to update other users account");
    }
}

const deleteUser=async(req, res) => {
    if(req.user.id === req.params.id || req.user.isAdmin){
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted...");
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("You are not authorized to delete other users account");
    }
}

const getUser=async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...other } = user._doc;
        res.status(200).json(other);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getAllUser=async(req, res) => {
    const query = req.query.new;
    // console.log("query",query,req.user );
        if(req.user.isAdmin){
            try {
                const users = query ? 
                await User.find().sort({ _id: -1}).limit(5) : 
                await User.find();
                res.status(200).json(users);
            } catch (error) {
                res.status(500).json(error);
            }
        } else {
            res.status(403).json("You are not authorized to see all users");
        
    }

    // if (req.user.isAdmin) {
    //     try {
    //         const users = await User.find();
    //         res.status(200).json(users.reverse());
    //     } catch (err) {
    //         res.status(500).json(err);
    //     }
    // } else {
    //     res.status(403).json("You are not authorized to see all users");
    // }
}

const getUserStat=async(req, res) => {
    try {
        const data = await User.aggregate([
            { $project: { month: { $month: "$createdAt" }}},
            { $group: { _id: "$month", total: { $sum: 1 }}}
        ]);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
}
module.exports={
    updateUser,
    deleteUser,
    getUser,
    getAllUser,
    getUserStat
}

