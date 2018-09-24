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
    port = 8000,
    upload = multer({ dest: path.join(__dirname, "images") });

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
const staticContentPath = path.join(__dirname, "/images");
console.log(`Service static content at ${staticContentPath}`);
app.use("/images", express.static(staticContentPath));
router.get("/post", (req, res) => {
    res.send(database.getPosts());
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