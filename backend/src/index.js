/**
 * Third party imports.
 */
import express from "express";
import basicAuth from "express-basic-auth";
import { Buffer } from "buffer";
import multer from "multer";
import path from "path";

/**
 * Application imports.
 */
import { Database } from "./database";

const app = express();
const router = express.Router();
const
    database = new Database(),
    registeredPublishers = mapPublishers(database.getPublishers()),
    port = 80,
    imageUploadPath = path.join(__dirname, "static/images"),
    upload = multer({ dest: imageUploadPath });

router.use(express.json());
router.get("/publisher/session", getBasicAuthRequestHandler(), (req, res) => {
    console.log("Logged in!");
    res.send();
});
router.post(
    "/post",
    getBasicAuthRequestHandler(),
    (req, res, next) => { next() }, /** The basic authentication handler does not pass along to the next handler, so it is explicitely done like this. */
    upload.any(),
    (req, res) => {
        const post = {};
        post.title = req.body.title;
        post.text = req.body.text;
        if (req.files && req.files.length) {
            post.image = req.files.map(f => f.filename);
        }
        if (post.text || post.image) {
            database.addPost(post);
            res.status(201);
            res.send();
        } else {
            res.status(400);
            res.send("Post must contain either an image or text.");
        }
    }
);
const staticContentPath = path.join(__dirname, "/static");
console.log(`Service static content at ${staticContentPath}`);
app.use("/", express.static(staticContentPath));
router.get("/post", (req, res) => {
    const { currentPageNumber, postsPerPage } = req.query;
    const
        begin = +currentPageNumber * +postsPerPage,
        end = (+currentPageNumber + 1) * +postsPerPage,
        posts = database.getPosts().sort(postUploadDateComparator),
        postsToReturn = begin < posts.length ? posts.slice(begin, end) : posts;
    res.send({
        totalNumberOfPosts: posts.length,
        posts: postsToReturn
    });
});
app.use("/baliogg/api", router);
app.use((err, req, res, next) => {
    /**
     * TODO: Do some logging to file also.
     */
    res.status(500);
    res.send(err.toString());
});
app.listen(port, () => {
    console.log(`Starting application on port ${port}`);
});

function getBasicAuthRequestHandler(challenge = true) {
    console.log("Authorizing!");
    return basicAuth({
        users: registeredPublishers,
        challenge
    });
}

function mapPublishers(publishers) {
    return publishers.reduce((accumulatedPublishers, currentPublisher) => {
        accumulatedPublishers[currentPublisher.username] = Buffer.from(currentPublisher.password, "base64").toString();
        return accumulatedPublishers;
    }, {});
}

function postUploadDateComparator(p1, p2) {
    if (p1.uploadDate && p2.uploadDate) {
        return p1.uploadDate > p2.uploadDate ? -1 : 1;
    } else {
        return 0;
    }
}