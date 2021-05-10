import request from "@/utils/request"

export function listResearch(query) {
    return request({
        url: "/api/research",
        method: "get",
        params: query
    })
}
export function retrieveResearch(id) {
    return request({
        url: `/api/research/${id}`,
        method: "get"
    })
}
export function createResearch(data) {
    return request({
        url: "/api/research",
        method: "post",
        data: data
    })
}
export function updateResearch(id, data) {
    return request({
        url: `/api/research/${id}`,
        method: "put",
        data
    })
}



// 删除调研问卷
export function deleteResearch(id) {
    return request({
        url: `/api/research/${id}`,
        method: "delete"
    })
}

// 提交调研数据
export function createResearchData(data) {
    return request({
        url: "/api/research/data/",
        method: "post",
        data: data
    })
}

// 获取调研数据
export function listResearchData(query) {
    return request({
        url: "/api/research/data/",
        method: "get",
        params: query
    })
}

// 导出调研数据
export function exportResearchData(query) {
    return request({
        url: "/api/research/export/",
        method: "get",
        params: query,
        responseType: "blob"
    })
}
