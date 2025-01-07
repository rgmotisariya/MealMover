//  fuction fpr wrap any fuction direct using using via importing insted of use try catcH and async manualy

const asyncHndler =(fn)=> async (req,res,next)=>{
    try {
        await fn(req,res,next)
        } catch (error) {
            res.status(err.code||500).json({
                success:false,
                message:err.message
            })
            }
            
}

export { asyncHndler }