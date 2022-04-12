"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
class PostService {
    constructor(request) {
        this.request = request;
    }
    getSortByOptions() {
        if (this.request.query.sortBy !== "reads" &&
            this.request.query.sortBy !== "likes" &&
            this.request.query.sortBy !== "popularity") {
            this.request.query.sortBy = "id";
        }
        if (!this.request.query.direction ||
            this.request.query.direction !== "desc") {
            this.request.query.direction = "asc";
        }
        return this.request;
    }
}
exports.PostService = PostService;
//# sourceMappingURL=post-service.js.map