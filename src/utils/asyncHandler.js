const asyncHandler = (fn)=> async(req,res,next) =>{
    try {
        return await fn(res,req,next);
     } catch (error) {
       return res.status(error.status || 500).json({
            sucess: false,
            message: error.message,
        }) 
     }
}

export {asyncHandler}