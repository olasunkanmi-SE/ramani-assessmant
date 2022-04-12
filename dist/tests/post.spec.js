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
Object.defineProperty(exports, "__esModule", { value: true });
const post_controller_1 = require(".././controllers/post-controller");
describe("post controller", () => {
    let responseObject;
    let mockNext = jest.fn();
    test("Should return filtered posts", () => __awaiter(void 0, void 0, void 0, function* () {
        const request = {
            query: {
                tags: "science",
                direction: "asc",
                sortBy: "likes",
            },
        };
        const response = {
            json: jest.fn().mockImplementation((result) => {
                responseObject = result;
            }),
            status: function (responseStatus) {
                expect(responseStatus).toEqual(200);
                return this;
            },
        };
        yield post_controller_1.PostController.getPosts(request, response, mockNext);
        expect(responseObject.posts).toHaveLength;
    }));
    test("Should throw tags parameter error", () => __awaiter(void 0, void 0, void 0, function* () {
        const request = {
            query: {
                direction: "asc",
                sortBy: "likes",
            },
        };
        const response = {
            json: jest.fn().mockImplementation((result) => {
                responseObject = result;
            }),
            status: function (responseStatus) {
                expect(responseStatus).toEqual(400);
                return this;
            },
        };
        yield post_controller_1.PostController.getPosts(request, response, mockNext);
        expect(responseObject.error).toBe("Tags parameter is required");
    }));
});
//# sourceMappingURL=post.spec.js.map