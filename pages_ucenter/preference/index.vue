<template>
	<view class="app-container">
		<view class="menu">
			<view class="menu-item">
				<view>默认显示详情</view>
				<u-switch v-model="value" :size="20" @change="change"></u-switch>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapMutations, mapState } from 'vuex'
	export default {
		name: 'Preference',
		data () {
			return {
				value: ''
			}
		},
		computed: {
			...mapState('user', ['setting'])
		},
		onLoad() {
			this.value = this.setting.showPrice
		},
		methods: {
			...mapMutations('user', ['SET_SETTING']),
			change() {
				this.SET_SETTING({
					showPrice: this.value
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.menu {
		padding: 0 30rpx;
	}
	.menu-item {
		padding: 60rpx 0;
		color: #252426;
		font-weight: 500;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #eee;
	}
</style>