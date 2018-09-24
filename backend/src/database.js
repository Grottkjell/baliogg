import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import path from "path";

export class Database {
    constructor() {
        const databasePath = path.join(__dirname, "database.json");
        console.log(`Attempting to read from data from ${databasePath}`);
        this._db = low(new FileSync(databasePath));
        this._db.defaults({ posts: [], publishers: [] }).write();
    }

    addPost({ title, text, image, eventDate }) {
        this._db
            .get("posts")
            .push({ title, text, image, eventDate, uploadDate: new Date().toISOString() })
            .write();
    }

    getPosts() {
        return this._db.get("posts").value();
    }

    getPublishers() {
        return this._db.get("publishers").value();
    }
}