import request from "@/utils/request"

// 创建调研
export function createResearch(data) {
    return request({
        url: "/api/research/list",
        method: "post",
        data: data
    })
}
