/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
    const search = decodeURIComponent(url.split("?")[1]).replace(/\+/g, " ")
    if (!search) {
        return {}
    }
    const obj = {}
    const searchArr = search.split("&")
    searchArr.forEach(v => {
        const index = v.indexOf("=")
        if (index !== -1) {
            const name = v.substring(0, index)
            const val = v.substring(index + 1, v.length)
            obj[name] = val
        }
    })
    return obj
}


export function genTree(data) {
    const result = []
    if (!Array.isArray(data)) {
        return result
    }
    const map = {}
    data.forEach(item => {
        item.label = item.title
        map[item.id] = item
    })
    data.forEach(item => {
        const parent = map[item.parent]
        if (parent) {
            (parent.children || (parent.children = [])).push(item)
        } else {
            result.push(item)
        }
    })
    return result
}
