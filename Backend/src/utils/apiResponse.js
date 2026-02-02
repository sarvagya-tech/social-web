class ApiResponse{
    constructor(
       statuscode,
       message = "succes",
       data ,
    )
    {
         this.statuscode = statuscode,
         this.message = message,
         this.data = data
        
    }
}

export{ApiResponse}