import { Request } from "express";

export class PostService {
  constructor(private readonly request: Request) {}
  getSortByOptions(): Request {
    if (
      this.request.query.sortBy !== "reads" &&
      this.request.query.sortBy !== "likes" &&
      this.request.query.sortBy !== "popularity"
    ) {
      this.request.query.sortBy = "id";
    }
    if (
      !this.request.query.direction ||
      this.request.query.direction !== "desc"
    ) {
      this.request.query.direction = "asc";
    }
    return this.request;
  }
}
