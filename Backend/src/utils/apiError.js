class ApiError extends Error{
    constructor(
        statuscode = 500,
        message = "something went wrong ",
        error = [],
        stack = ""

    ){
        super(message)
        this.statuscode = statuscode,
        this.statusCode = statuscode,
        this.message = message,
        this.error = error,
        this.success = false ,
        this.data = null
        

        if(stack){
            this.stack = stack
        }
        else {
            Error.captureStackTrace(this, this.constructor)
        }

    }
   
}
export {ApiError}
