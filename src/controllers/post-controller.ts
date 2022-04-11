import { IPost } from "./../interfaces/index";
import { IGetPostsRequest, ISortByRequest } from "../interfaces/index";
import { apiQueryParams } from "./../constants/validation";
import { applicationError } from "./../constants/index";
import express from "express";
import { Request, Response } from "express";
import axios from "axios";

const got = require("got");
export class PostController {
  static async getPosts(
    req: Request,
    response: Response,
    next: express.NextFunction
  ): Promise<IPost[] | Response<any, Record<string, any>>> {
    try {
      let error: any;
      let sort: any = {};
      let posts: IPost[][] = [];
      let allPosts: IPost[];

      if (!req.query.tags) {
        error = new Error(applicationError.tagParameterMissing);
        return response.status(400).json({ error: error.message });
      }
      const tags: any = req.query.tags;
      const tagsArr: string[] = tags.split(",");
      const sortArr = ["likes", "popularity", "reads"];
      const directionArr = ["desc", "asc"];
      const sortByOption = PostController.getSortByOptions(req);

      if (!sortArr.includes(sortByOption.query.sortBy.toString())) {
        error = new Error(applicationError.invalidSortBy);
        return response.status(400).json({ error: error.message });
      }

      if (!directionArr.includes(sortByOption.query.direction.toString())) {
        error = new Error(applicationError.invalidDirection);
        return response.status(400).json({ error: error.message });
      }

      if (sortByOption.query.sortBy && sortByOption.query.direction) {
        const queryResults = await PostController.getPostsData(
          tagsArr,
          sortByOption.query.sortBy,
          sortByOption.query.direction
        );
        if (queryResults && queryResults.length) {
          for (let i = 0; i < queryResults.length; i++) {
            posts.push(queryResults[i].data.posts);
          }
          allPosts = PostController.combinePosts(posts);
          allPosts = PostController.sortPosts(
            sortByOption.query.sortBy.toString(),
            sortByOption.query.direction.toString(),
            allPosts
          );
        }
      }
      return response.status(200).json(allPosts);
    } catch (error) {
      return response.status(400).json({ error });
    }
  }

  static getSortByOptions(request: Request): Request {
    if (
      request.query.sortBy !== "reads" &&
      request.query.sortBy !== "likes" &&
      request.query.sortBy !== "popularity"
    ) {
      request.query.sortBy = "id";
    }
    if (!request.query.direction || request.query.direction !== "desc") {
      request.query.direction = "asc";
    }
    return request;
  }

  static async getPostsData(
    tags: string[],
    sortBy: any,
    direction: any
  ): Promise<any[] | void> {
    let promises: any[] = [];
    let results: any[] = [];
    for (let i = 0; i < tags.length; i++) {
      promises.push(
        axios.get("https://api.hatchways.io/assessment/blog/posts", {
          params: {
            tag: tags[i],
            sortBy,
            direction,
          },
        })
      );
    }
    return Promise.all(promises)
      .then((queryResults) => {
        return queryResults;
      })
      .catch((error) => console.log(error));
  }

  static combinePosts(posts: IPost[][]): IPost[] {
    const mergedPosts = [].concat.apply([], posts);
    const filteredPosts: IPost[] = [];
    const foundId: { [id: string]: true } = {};
    for (let i = 0; i < mergedPosts.length; i++) {
      const postId = mergedPosts[i].id;
      if (!foundId[postId]) {
        filteredPosts.push(mergedPosts[i]);
        foundId[postId] = true;
      }
    }
    return filteredPosts;
  }

  static sortPosts(
    sortType: string,
    direction: string,
    posts: IPost[]
  ): IPost[] {
    if (direction === "desc") {
      switch (sortType) {
        case "likes":
          posts.sort((a: IPost, b: IPost) => (a.likes < b.likes ? 1 : -1));
          break;
        case "reads":
          posts.sort((a: IPost, b: IPost) => (a.reads < b.reads ? 1 : -1));
          break;
        case "popularity":
          posts.sort((a: IPost, b: IPost) =>
            a.popularity < b.popularity ? 1 : -1
          );
          break;
        default:
          posts.sort((a: IPost, b: IPost) => (a.id < b.id ? 1 : -1));
          break;
      }
    } else {
      switch (sortType) {
        case "likes":
          posts.sort((a: IPost, b: IPost) => (a.likes > b.likes ? 1 : -1));
          break;
        case "reads":
          posts.sort((a: IPost, b: IPost) => (a.reads > b.reads ? 1 : -1));
          break;
        case "popularity":
          posts.sort((a: IPost, b: IPost) =>
            a.popularity > b.popularity ? 1 : -1
          );
          break;
        default:
          posts.sort((a: IPost, b: IPost) => (a.id > b.id ? 1 : -1));
          break;
      }
    }
    return posts;
  }
}
