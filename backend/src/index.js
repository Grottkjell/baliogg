import express from "express";
import basicAuth from "express-basic-auth";

import { Database } from "./database";

const database = new Database();

const app = express();

app.post(
    "/post",
    getBasicAuthRequestHandler(),
    (req, res) => {
        database.addPost({ text: "This is the text of a blog post!" });
        res.send("Yo, publishing dude!");
    }
);

app.get("/post", (req, res) => {
    database.getPosts().forEach(post => {
        console.log(`Post: ${post.text}`);
    });
    res.send("Yo wat!");
});

const port = 8000;
app.listen(port, () => {
    console.log(`Starting application on port ${port}`);
});

function getBasicAuthRequestHandler() {
    return basicAuth({
        users: { "emrik": "emrik" },
        challenge: true
    });
}
