import request from "@/utils/request"

// 获取调研问卷
export function readResearch(id) {
    return request({
        url: `/api/research/list/${id}`,
        method: "get"
    })
}

// 提交调研数据
export function createResearchData(data) {
    return request({
        url: "/api/research/data",
        method: "post",
        data: data
    })
}