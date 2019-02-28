module.exports = {
    crossorigins: (req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, OPTIONS, PUT, PATCH, DELETE, Authorization"
        );
        res.setHeader(
            "Access-Control-Allow-Headers",
            "X-Requested-With,content-type"
        );
        res.setHeader("Access-Control-Allow-Credentials", true);
        next();
    }
}