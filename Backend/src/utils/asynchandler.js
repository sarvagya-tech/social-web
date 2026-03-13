const asynchandler = (asyncrequest)=>{
    return (req,res,next)=>{
        Promise.resolve(asyncrequest(req,res,next))
        .catch((err)=>next(err))
    }
}

export {asynchandler};