export interface IpingResponse {
  success: boolean;
}

export interface ISortByRequest {
  query: {
    sortBy: string;
    direction: string;
  };
}

export interface IGetPostsRequest extends ISortByRequest {
  id: number;
  reads: number;
  likes: number;
  popularity: number;
}

export interface IPost {
  id: number;
  author: string;
  authorId: number;
  likes: number;
  popularity: number;
  reads: number;
  tags: string[];
}
