"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const validation_1 = require("./../constants/validation");
const index_1 = require("./../constants/index");
const axios_1 = __importDefault(require("axios"));
const got = require("got");
class PostController {
    static getPosts(req, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let error;
                let sort = {};
                let posts = [];
                let allPosts;
                if (!req.query.tags) {
                    error = new Error(index_1.applicationError.tagParameterMissing);
                    return response.status(400).json(error.message);
                }
                const tags = req.query.tags;
                const tagsArr = tags.split(",");
                if (tagsArr.indexOf(validation_1.apiQueryParams.science || validation_1.apiQueryParams.tech) === -1 ||
                    tagsArr.length > 2) {
                    error = new Error(index_1.applicationError.invalidTag);
                    return response.status(400).json(error.message);
                }
                const sortByOption = PostController.getSortByOptions(req);
                if (sortByOption.query.sortBy && sortByOption.query.direction) {
                    const queryResults = yield PostController.getPostsData(tagsArr, sortByOption.query.sortBy, sortByOption.query.direction);
                    if (queryResults && queryResults.length) {
                        for (let i = 0; i < queryResults.length; i++) {
                            posts.push(queryResults[i].data.posts);
                        }
                        allPosts = PostController.combinePosts(posts);
                        allPosts = PostController.sortPosts(sortByOption.query.sortBy, sortByOption.query.direction, allPosts);
                    }
                }
                return allPosts;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    static getSortByOptions(request) {
        if (request.query.sortBy !== "reads" &&
            request.query.sortBy !== "likes" &&
            request.query.sortBy !== "popularity") {
            request.query.sortBy = "id";
        }
        if (!request.query.direction || request.query.direction !== "desc") {
            request.query.direction = "asc";
        }
        return request;
    }
    static getPostsData(tags, sortBy, direction) {
        return __awaiter(this, void 0, void 0, function* () {
            let promises = [];
            let results = [];
            for (let i = 0; i < tags.length; i++) {
                promises.push(axios_1.default.get("https://api.hatchways.io/assessment/blog/posts", {
                    params: {
                        tag: tags[i],
                        sortBy,
                        direction,
                    },
                }));
            }
            return Promise.all(promises)
                .then((queryResults) => {
                return queryResults;
            })
                .catch((error) => console.log(error));
        });
    }
    static combinePosts(posts) {
        const mergedPosts = [].concat.apply([], posts);
        const filteredPosts = [];
        const foundId = {};
        for (let i = 0; i < mergedPosts.length; i++) {
            const postId = mergedPosts[i].id;
            if (!foundId[postId]) {
                filteredPosts.push(mergedPosts[i]);
                foundId[postId] = true;
            }
        }
        return filteredPosts;
    }
    static sortPosts(sortType, direction, posts) {
        if (direction === "desc") {
            switch (sortType) {
                case "likes":
                    posts.sort((a, b) => (a.likes < b.likes ? 1 : -1));
                    break;
                case "reads":
                    posts.sort((a, b) => (a.reads < b.reads ? 1 : -1));
                    break;
                case "popularity":
                    posts.sort((a, b) => a.popularity < b.popularity ? 1 : -1);
                    break;
                default:
                    posts.sort((a, b) => (a.id < b.id ? 1 : -1));
                    break;
            }
        }
        else {
            switch (sortType) {
                case "likes":
                    posts.sort((a, b) => (a.likes > b.likes ? 1 : -1));
                    break;
                case "reads":
                    posts.sort((a, b) => (a.reads > b.reads ? 1 : -1));
                    break;
                case "popularity":
                    posts.sort((a, b) => a.popularity > b.popularity ? 1 : -1);
                    break;
                default:
                    posts.sort((a, b) => (a.id > b.id ? 1 : -1));
                    break;
            }
        }
        return posts;
    }
}
exports.PostController = PostController;
//# sourceMappingURL=post-controller.js.map