import request from "@/utils/request";

export function listResearch(query) {
  return request({
    url: "/api/research",
    method: "get",
    params: query,
  });
}
export function retrieveResearch(id) {
  return request({
    url: `/api/research/${id}`,
    method: "get",
  });
}

export function retrieveOpenResearch(id) {
  return request({
    url: `/api/research/open/${id}`,
    method: "get",
  });
}

export function createResearch(data) {
  return request({
    url: "/api/research",
    method: "post",
    data: data,
  });
}
export function updateResearch(id, data) {
  return request({
    url: `/api/research/${id}`,
    method: "put",
    data,
  });
}

export function deleteResearch(id) {
  return request({
    url: `/api/research/${id}`,
    method: "delete",
  });
}

export function listResearchSquare(query) {
  return request({
    url: "/api/research/square",
    method: "get",
    params: query,
  });
}

export function exportRecord(id) {
  return request({
    url: `/api/research/export/${id}`,
    method: "get",
    responseType: "blob",
  });
}