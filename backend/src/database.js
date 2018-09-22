const low = require("lowdb")
const FileSync = require("lowdb/adapters/FileSync")

export class Database {
    constructor() {
        this._db = low(new FileSync("database.json"));
        this._db.defaults({ posts: [], publishers: []}).write();
    }

    addPost({ text, imageBinary, eventDate }) {
        this._db
            .get("posts")
            .push({ text, imageBinary, eventDate, uploadDate: new Date().toISOString() })
            .write();
    }

    getPosts() {
        return this._db.get("posts").value();
    }

    getPublishers() {
        return this._db.get("publishers").value();
    }
}