exports.DATABASE_URL = process.env.DATABASE_URL ||
    global.DATABASE_URL ||
    'mongodb://blogPoster:blogPassWord1@ds113063.mlab.com:13063/jtdb';


// exports.TEST_DATABASE_URL = (
//     process.env.TEST_DATABASE_URL ||
//     'mongodb://localhost/blogdb');


exports.PORT = process.env.PORT || 9000;


//mongoimport --db jtdb --collection blogPosts --drop --file ~/Desktop/Projects/blog/seed-data.json --host ds113063.mlab.com --port 113063  -u blogPoster -p blogPassWord1