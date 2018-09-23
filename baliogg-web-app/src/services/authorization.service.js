import axios from "axios";

export class AuthorizationService {
    constructor() {
    }

    static async getOrCreateSession() {
        return axios.get("/baliogg/api/publisher/session")
            .then(() => true)
            .catch(() => false);
    }
}