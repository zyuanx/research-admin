import request from "@/utils/request"



// 获取调研列表
export function listResearch(query) {
    return request({
        url: "/api/research",
        method: "get",
        params: query
    })
}
// 创建调研
export function createResearch(data) {
    return request({
        url: "/api/research",
        method: "post",
        data: data
    })
}
// 更新调研信息
export function updateResearch(id, data) {
    return request({
        url: `/api/research/${id}`,
        method: "put",
        data
    })
}

// 获取调研问卷
export function readResearch(id) {
    return request({
        url: `/api/research/${id}`,
        method: "get"
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
