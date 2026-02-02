const asynchandler = (asyncrequest)=>{
    return (req,res,next)=>{
        Promise.resolve(asynchandler(req,res,next))
        promise.catch((err)=>next(err))
    }
}