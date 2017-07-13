const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


const {
    BlogPosts
} = require('./models');

// we're going to add some posts to blogPosts
// so there's some data to look at
BlogPosts.create(
    'How to start a blog', "James Timberlake", `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum molestie molestie mattis. Proin maximus lectus libero, nec posuere tortor venenatis sodales. Cras venenatis, nibh eget porttitor malesuada, urna magna sodales lorem, id vestibulum risus magna et leo. Duis sagittis accumsan sem at malesuada. Nullam at sem at nisi ornare tincidunt. Praesent vulputate libero quam, egestas tristique dui tempor vel. Ut sagittis ornare mi nec viverra. Sed placerat auctor sapien. Suspendisse bibendum enim eu est rhoncus, ac consectetur ante interdum. Quisque placerat, nisi in varius tristique, lacus eros euismod lorem, vel accumsan ipsum arcu vel erat.
        Etiam pulvinar ipsum nulla, non interdum orci rhoncus eget.Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.In nec tempus metus.In ultricies facilisis odio, eget venenatis ex fermentum eu.Donec ac cursus mauris.Pellentesque sagittis, est et rutrum feugiat, nibh justo sodales orci, a pulvinar nunc urna eget lacus.Mauris volutpat turpis suscipit lacus consectetur, ac pretium enim pellentesque.Fusce rutrum tortor urna, quis iaculis nunc cursus et.Vivamus non felis eget urna venenatis dictum.In vehicula neque id fermentum hendrerit.Fusce finibus vitae velit sed vestibulum.Aliquam sed volutpat eros, ut commodo arcu.Maecenas a lectus risus.Donec erat metus, gravida vitae nisi at, fermentum ornare magna.Nullam eget pretium tellus.Duis tristique, urna nec blandit luctus, nunc ex pharetra lacus, sed ultricies quam lectus in nibh.Ut fermentum ultricies ipsum, sed congue turpis eleifend posuere.Proin non justo id ipsum suscipit venenatis id at massa.Proin nec ipsum nec massa fermentum accumsan.Curabitur nec erat eget justo iaculis efficitur.In ex turpis, lacinia aliquam fringilla at, dignissim ut tortor.Cras eget pulvinar nibh, at rutrum odio.Donec a pretium dolor.Aenean porttitor urna nibh, eu mattis velit posuere vel.Pellentesque tincidunt at nisi eu aliquet.Maecenas et fermentum felis.Vivamus sodales, dui elementum luctus fringilla, metus eros maximus turpis, sit amet aliquet odio risus vel metus.Suspendisse finibus ultricies purus at cursus.Maecenas eleifend lectus sed ex cursus porta.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi facilisis porttitor lacinia.Quisque in tincidunt quam.Pellentesque tempor dapibus accumsan.Suspendisse felis quam, placerat et vehicula et, egestas eget lacus.Mauris mauris turpis, porta nec condimentum sollicitudin, ultrices sit amet tortor.In sed viverra lacus, eu viverra mi.Morbi sed tempor magna, et interdum sapien.Sed imperdiet nibh sit amet quam varius lobortis.Quisque tortor lacus, pulvinar at metus et, sagittis ullamcorper elit.Donec sit amet placerat tortor, sit amet blandit diam.Donec id quam urna.
        `, "7 / 12 / 17 ");


// send back JSON representation of all blog posts
// on GET requests to root
router.get('/', (req, res) => {
    res.json(BlogPosts.get());
});


// when new post is added, ensure has required fields. if not,
// log error and return 400 status code with hepful message.
// if okay, add new item, and return it with a status 201.
router.post('/', jsonParser, (req, res) => {
    // ensure `Title`, 'Auther' and `Content` are in request body
    const requiredFields = ['title', 'author', 'content'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message);
        }
    }
    const item = BlogPosts.create(req.body.title, req.body.author, req.body.content);
    res.status(201).json(item);
});

// Delete posts (by id)!
router.delete('/:id', (req, res) => {
    BlogPosts.delete(req.params.id);
    console.log(`Deleted post #: \`${req.params.ID}\``);
    res.status(204).end();
});

// when PUT request comes in with updated posts, ensure has
// required fields. also ensure that post id in url path, and
// post id in updated item object match. if problems with any
// of that, log error and send back status code 400. otherwise
// call `blogPost.updateItem` with updated post.
router.put('/:id', jsonParser, (req, res) => {
    const requiredFields = ['title', 'author', 'content', 'id'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message);
        }
    }
    if (req.params.id !== req.body.id) {
        const message = (
            `Request path id (${req.params.id}) and request body id `
            `(${req.body.id}) must match`);
        console.error(message);
        return res.status(400).send(message);
    }
    console.log(`Updating blog post # \`${req.params.id}\``);
    const updatedItem = BlogPosts.update({
        id: req.params.id,
        title: req.body.title,
        author: req.body.author,
        content: req.body.content
    });
    res.status(204).json(updatedItem);
})

module.exports = router;