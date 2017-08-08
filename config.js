exports.DATABASE_URL = process.env.DATABASE_URL ||
    global.DATABASE_URL ||
    'mongodb://blogPoster:blogPassWord1@ds113063.mlab.com:13063/jtdb';
exports.PORT = process.env.PORT || 8080;