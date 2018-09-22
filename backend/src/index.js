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
const database = new Database();

app.use(express.json());

app.post(
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

app.get("/post", (req, res) => {
    res.send(database.getPosts());
});

const port = 8000;
app.listen(port, () => {
    console.log(`Starting application on port ${port}`);
});

function getBasicAuthRequestHandler() {
    console.log("Authorizing!");
    return basicAuth({
        users: mapPublishers(database.getPublishers()),
        challenge: true
    });
}

function mapPublishers(publishers) {
    return publishers.reduce((accumulatedPublishers, currentPublisher) => {
        accumulatedPublishers[currentPublisher.username] = Buffer.from(currentPublisher.password, "base64").toString();
        return accumulatedPublishers;
    }, {});
}