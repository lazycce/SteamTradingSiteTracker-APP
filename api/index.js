import request from "./request";

export function getTradingData(data) {
    return request({
        url: '/steam',
        methods: 'get',
        data
    })
}