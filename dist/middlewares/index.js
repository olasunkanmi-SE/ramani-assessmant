"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructCacheId = exports.verifyCache = exports.cache = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
exports.cache = new node_cache_1.default({ stdTTL: 60 });
const verifyCache = (req, res, next) => {
    try {
        const id = (0, exports.constructCacheId)(req);
        if (exports.cache.has(id)) {
            return res.status(200).json(exports.cache.get(id));
        }
        return next();
    }
    catch (error) {
        res.status(400).json({ error });
    }
};
exports.verifyCache = verifyCache;
const constructCacheId = (req) => {
    const tags = req.query.tags.toString();
    const tagsArr = tags.split(",");
    const sort = req.query.sortBy.toString();
    const direction = req.query.direction.toString();
    tagsArr.push(sort, direction);
    const id = tagsArr.toString();
    return id;
};
exports.constructCacheId = constructCacheId;
//# sourceMappingURL=index.js.map