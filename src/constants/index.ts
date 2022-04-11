export const applicationError = {
  unsuccessfulRequest: (statusCode: number) => `Request Failed.\n
          Status Code: ${statusCode}`,
  tagParameterMissing: "Tags parameter is required",
  invalidSortBy: "SortBy parameter is invalid",
  invalidDirection: "direction parameter is invalid",
};
