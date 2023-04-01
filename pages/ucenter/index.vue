<template>
	<view class="ucenter-container">
		<u-navbar :placeholder="true" bgColor="transparent">
			<view slot="left">我的</view>
		</u-navbar>
		<view class="user-info">
			<u-avatar class="user-avatar" @click="handleLogin" :src="userInfo.avatar" size="50" shape="circle" />
			<view class="nickname">
				<view>{{ userInfo.nickname || '请登录' }}</view>
				<view v-if="userInfo.vip_end_time" class="vip-tip">vip:{{ formatVipDate(userInfo.vip_end_time/1000) }}</view>
			</view>
			<view class="title" v-if="userInfo.title === 1">站点元老</view>
		</view>
		<view class="menu first">
			<view class="menu-item" @click="goto('/pages/tools/index')">
				<view class="content">
					<image class="icon" src='../../static/icons/compute.png'></image>
					<view>Apex计算器</view>
				</view>
				<u-icon name="arrow-right" color="#909399" size="18"></u-icon>
			</view>
			<view class="menu-item" @click="goto('/pages_ucenter/preference/index')">
				<view class="content">
					<image class="icon" src='../../static/icons/setting.png'></image>
					<view>偏好设置</view>
				</view>
				<u-icon name="arrow-right" color="#909399" size="18"></u-icon>
			</view>
			<view class="menu-item">
				<view class="content">
					<image class="icon" src='../../static/icons/share.png'></image>
					<view>分享给好友</view>
					<button open-type="share" class="share-btn">分享给好友</button>
				</view>
				<u-icon name="arrow-right" color="#909399" size="18"></u-icon>
			</view>
		</view>
		<view class="divide"></view>
		<view class="menu second">
			<view class="menu-item" @click="goto('/pages_ucenter/about/index')">
				<view class="content">
					<image class="icon" src='../../static/icons/about.png'></image>
					<view>关于我们</view>
				</view>
				<u-icon name="arrow-right" color="#909399" size="18"></u-icon>
			</view>
		</view>
		<div class="bottom-tip">
			<view>Support From Null_42</view>
		</div>
	</view>
</template>

<script>
	import { login } from '@/api/ucenter.js'
	import { commonKey } from '@/config/index.js'
	import { addVip } from '@/api/ucenter.js'
	import { mapMutations, mapState } from 'vuex'
	import dayjs from "dayjs";
	
	export default {
		name: 'UCenter',
		data () {
			return {
			}
		},
		computed: {
			...mapState('user', ['userInfo'])
		},
		methods: {
			...mapMutations('user', ['SET_USER_INFO']),
			goto(url) {
				uni.navigateTo({
					url: url
				})
			},
			handleLogin() {
				const _this = this
				uni.login({
					async success(result) {
						uni.getUserInfo({
							async success(res) {
								const { avatarUrl, nickName, gender } = res.userInfo
								// 登录
								uni.showLoading({
									title: '登录中'
								})
								const obj = await login({
									js_code: result.code,
									nickName: '小饼干',
									avatarUrl,
									gender
								})
								uni.hideLoading()
								_this.SET_USER_INFO(obj)
							}
						})
					}
				})
			},
		},
		onShareAppMessage() {
		    return {
		        title: '简单挂刀、快乐挂刀',
				path: `pages/index/index?code=${this.userInfo.openid}`
		    }
		},
		onShareTimeline() {
		    return {
		        title: '简单挂刀、快乐挂刀',
				path: `pages/index/index?code=${this.userInfo.openid}`
		    }
		}
	}
</script>

<style lang="scss">
	page {
		background-image: linear-gradient(to bottom, #cedcfc 0%, #fff 30%);
	}
	.ucenter-container {
		.user-info {
			padding: 30rpx 30rpx 50rpx;
			display: flex;
			align-items: center;
			.nickname {
				font-size: 36rpx;
				font-weight: 500;
				color: #303133;
				margin-left: 20rpx;
			}
			.vip-tip {
				font-size: 24rpx;
				color: #909399;
			}
			.title {
				font-size: 26rpx;
				background-color: #ffa237;
				border-radius: 28rpx 0 0 28rpx;
				padding: 10rpx 40rpx;
				color: #fff;
				position: absolute;
				right: -10rpx;
			}
			.u-avatar__image--circle {
				border: 4rpx solid #fff;
			}
		}
		.menu {
			margin-top: 10rpx;
			padding: 0 30rpx;
			color: #444444;
			.icon {
				width: 44rpx;
				height: 44rpx;
				margin-right: 20rpx;
			}
			.menu-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 30rpx 0;
				.content {
					display: flex;
					align-items: center;
				}
			}
		}
		.first {
			background-color: (to bottom, #f3f5f9 0%, #fff 100%);
		}
		.second {
			background-color: #fff
		}
		.share-btn {
			position: absolute;
			left: 0;
			background-color: transparent;
			color: transparent;
			right: 0;
			z-index: 2000;
		}
		.share-btn::after{
			border: none;
		}
		.bottom-tip {
			position: fixed;
			bottom: 5rpx;
			right: 0;
			left: 0;
			font-size: 12px;
			text-align: center;
			color: #909399;
		}
		.divide {
			height: 20rpx;
			background-color: #f6f8f7;
		}
	}
</style>