"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationError = void 0;
exports.applicationError = {
    unsuccessfulRequest: (statusCode) => `Request Failed.\n
          Status Code: ${statusCode}`,
    tagParameterMissing: "Tags parameter is required",
    invalidSortBy: "SortBy parameter is invalid",
    invalidDirection: "direction parameter is invalid",
};
//# sourceMappingURL=index.js.map