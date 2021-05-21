const veryfyToken = async (req, res, next)=>{
    const token = req.headers["x-access-token"];

    console.log(token);
    next();
}

module.exports = veryfyToken;