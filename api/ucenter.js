import request from "./request";

/**
 * 登录
 * @param {Object} data
 */
export function login(data) {
    return request({
        url: '/login',
        method: 'post',
        data
    })
}

/**
 * 增加会员
 * @param {Object} data
 */
export function addVip(data) {
	return request({
		url: '/add_vip',
		method: 'post',
		data
	})
}

/**
 * 添加邀请记录
 * @param {Object} data
 */
export function addInvationLog(data) {
	return request({
		url: '/invite',
		method: 'post',
		data
	})
}