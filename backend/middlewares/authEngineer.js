import jwt from 'jsonwebtoken'

//Engineer authentication middleware
const authEngineer = async(req,res,next)=>{
    try{
      const{etoken}= req.headers
      if(!etoken){
        return res.json({success:false, message:'Not Authorized Login Again'})
      }
      const token_decode = jwt.verify(etoken,process.env.JWT_SECRET)

    //   if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
    //     return res.json({success:false, message:'Not Authorized Login Again'})


    //   }
    req.engId = token_decode.id
      //callback function
      next()
    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export default authEngineer