import axios from "axios";

export class AuthorizationService {
    constructor() {
    }

    static async isAuthourized() {
        return axios.get("/baliogg/api/publisher/session")
            .then(() => true)
            .catch(() => false);
    }

    static async login(username, password) {
        return axios.post("/baliogg/api/publisher/session", { username, password });
    }
}