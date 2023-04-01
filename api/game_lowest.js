import request from "./request";

/**
 * 查询史低
 * 
 * @param {Object} data
 */
export function getGameLowest(data) {
    return request({
        url: '/games_lowest_price',
        methods: 'get',
        data
    })
}