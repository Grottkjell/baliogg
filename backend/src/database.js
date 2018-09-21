const low = require("lowdb")
const FileSync = require("lowdb/adapters/FileSync")

export class Database {
    constructor() {
        this._db = low(new FileSync("database.json"));
        this._db.defaults({ posts: [], user: {}, count: 0 }).write();
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
}