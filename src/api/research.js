import request from "@/utils/request"

// 创建调研
export function createResearch(data) {
    return request({
        url: "/research/list/",
        method: "post",
        data: data
    })
}

// 获取调研列表
export function listResearch(query) {
    return request({
        url: "/research/list/",
        method: "get",
        params: query
    })
}

// 更新调研信息
export function updateResearch(data) {
    return request({
        url: `/research/list/${data.id}/`,
        method: "patch",
        data: data
    })
}

// 获取调研问卷
export function readResearch(id) {
    return request({
        url: "/research/list/" + id + "/",
        method: "get"
    })
}

// 删除调研问卷
export function deleteResearch(id) {
    return request({
        url: "/research/list/" + id + "/",
        method: "delete"
    })
}

// 提交调研数据
export function createResearchData(data) {
    return request({
        url: "/research/data/",
        method: "post",
        data: data
    })
}

// 获取调研数据
export function listResearchData(query) {
    return request({
        url: "/research/data/",
        method: "get",
        params: query
    })
}

// 导出调研数据
export function exportResearchData(query) {
    return request({
        url: "/research/export/",
        method: "get",
        params: query,
        responseType: "blob"
    })
}
