/**
 * Third party imports.
 */
import express from "express";
import basicAuth from "express-basic-auth";
import { Buffer } from "buffer";

/**
 * Application imports.
 */
import { Database } from "./database";

const app = express();
const router = express.Router();
const
    database = new Database(),
    registeredPublishers = mapPublishers(database.getPublishers()),
    port = 8000;

router.use(express.json());
router.get("/publisher/session", getBasicAuthRequestHandler(), (req, res) => {
    console.log("Logged in!");
    res.send();
});
router.post(
    "/post",
    getBasicAuthRequestHandler(),
    (req, res) => {
        const post = req.body;
        if (post.text || post.imageBinary) {
            database.addPost(post);
            res.status(201);
            res.send();
        } else {
            res.status(400);
            res.send("Post must contain either an image or text.");
        }
    }
);
router.get("/post", (req, res) => {
    res.send(database.getPosts());
});
app.use('/baliogg/api', router);
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