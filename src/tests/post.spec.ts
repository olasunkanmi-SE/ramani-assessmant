import { IPost } from "./../interfaces/index";
import { NextFunction, Request, Response } from "express";
import { PostController } from ".././controllers/post-controller";

describe("post controller", () => {
  let responseObject: { error: string; posts: IPost[] };
  let mockNext: NextFunction = jest.fn();

  test("Should return filtered posts", async () => {
    const request = {
      query: {
        tags: "science",
        direction: "asc",
        sortBy: "likes",
      },
    } as any as Request;

    const response = {
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
      status: function (responseStatus: any) {
        expect(responseStatus).toEqual(200);
        return this;
      },
    } as any as Response;

    await PostController.getPosts(request, response, mockNext);
    expect(responseObject.posts).toHaveLength;
  });

  test("Should throw tags parameter error", async () => {
    const request = {
      query: {
        direction: "asc",
        sortBy: "likes",
      },
    } as any as Request;

    const response = {
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
      status: function (responseStatus: any) {
        expect(responseStatus).toEqual(400);
        return this;
      },
    } as any as Response;

    await PostController.getPosts(request, response, mockNext);
    expect(responseObject.error).toBe("Tags parameter is required");
  });
});
