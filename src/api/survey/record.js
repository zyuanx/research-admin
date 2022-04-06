import request from "@/utils/request";

export function listRecord(query) {
  return request({
    url: "/api/record",
    method: "get",
    params: query,
  });
}

export function retrieveRecord(id) {
  return request({
    url: `/api/record/${id}`,
    method: "get",
  });
}
export function createRecord(data) {
  return request({
    url: "/api/record",
    method: "post",
    data: data,
  });
}

export function filledRecord(id) {
  return request({
    url: `/api/record/filled/${id}`,
    method: "get",
  });
}


export function createOpenRecord(data) {
  return request({
    url: "/api/record/open",
    method: "post",
    data: data,
  });
}

export function listOpenRecord(query) {
  return request({
    url: "/api/record/open",
    method: "get",
    params: query,
  });
}