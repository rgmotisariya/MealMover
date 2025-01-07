class ApiError extends Error{
    constructor(
        statusCode , 
        message="Something went wrong",
        errors=[],
        statck=""
    ){ 
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.data=null;
        this.succsess=false;
        this.errors = errors;

        if(statck){
            this.stack = statck;
        }
        else{
            Error.captureStackTrace(this, this.constructor);
        }
        
}
} 

export default ApiError ;