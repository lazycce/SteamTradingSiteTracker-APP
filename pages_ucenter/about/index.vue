<template>
	<view class="u-content">
		<u-parse :content="content"></u-parse>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: `
					<p>本站数据均来互联网，如有侵权请联系作者</p>
				`
			}
		},
	}
</script>

<style lang="scss" scoped>
    .u-content {
        padding: 24rpx;
    }
</style>
