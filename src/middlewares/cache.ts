import express from "express";
import { Request, Response } from "express";
import NodeCache from "node-cache";

export const cache: NodeCache = new NodeCache({ stdTTL: 60 });
export const verifyCache = (
  req: Request,
  res: Response,
  next: express.NextFunction
) => {
  try {
    const id = constructCacheId(req);
    if (cache.has(id)) {
      return res.status(200).json(cache.get(id));
    }
    return next();
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const constructCacheId = (req: Request): string => {
  const tags: string = req.query.tags.toString();
  const tagsArr: string[] = tags.split(",");
  const sort = req.query.sortBy.toString();
  const direction = req.query.direction.toString();
  tagsArr.push(sort, direction);
  const id = tagsArr.toString();
  return id;
};
