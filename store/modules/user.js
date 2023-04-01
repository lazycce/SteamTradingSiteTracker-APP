import { commonKey } from '@/config/index.js'

export default {
    namespaced: true,
    state: {
		// 个人信息
        userInfo: uni.getStorageSync(commonKey.USE_INFO_KEY) || {},
		// app 设置
		setting: uni.getStorageSync(commonKey.SETTING_KEY) || {
			showPrice: true
		}
    },
    getters: {
		isVip({ userInfo }) {
			return new Date().getTime() < userInfo.vip_end_time
		}
    },
    mutations: {
        SET_USER_INFO: (state, userInfo) => {
            state.userInfo = userInfo
			uni.setStorageSync(commonKey.USE_INFO_KEY, userInfo)
        },
		SET_SETTING: (state, setting) => {
            state.setting = setting
			uni.setStorageSync(commonKey.SETTING_KEY, setting)
        },
    },
    actions: {
	}
}