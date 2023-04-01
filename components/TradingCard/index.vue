<template>
    <view class="trading">
        <view class="card">
            <view class="title" @click="copyName(data.name)">
                {{ index + 1 }}.{{ data.name }}
                <view
                    class="type-tag"
                    :style="{ backgroundColor: data.game === 'csgo' ? '#409EFF' : '#E6A23C' }"
                >{{ data.game }}
                </view>
				<text style="font-weight: lighter;color: coral;">复制</text>
            </view>
            <view class="content">
                <view style="display: flex;padding: 8px 0;">
                    <view>当日成交量：{{ data.count_in_24 }}</view>
                    <view style="margin-left: 30px;">最低售价：{{ toRound(data[`${data.best_platform}_price`]) }}({{ data.best_platform.toLocaleUpperCase() }})</view>
                </view>
                <view style="display: flex;justify-content: space-between">
                    <view>
                        <view>
                            最优寄售比
                        </view>
                        <view class="r" style="color: #67C23A;">
                            {{ toRound(data.optimal_sell_ratio) }}
                        </view>
                    </view>
                    <view>
                        <view>
                            最优求购比
                        </view>
                        <view class="r" style="color: #F56C6C;">
                            {{ toRound(data.optimal_buy_ratio) }}
                        </view>
                    </view>
                    <view>
                        <view>
                            稳定求购比
                        </view>
                        <view class="r" style="color: #F56C6C;">
                            {{ toRound(data.safe_buy_ratio) }}
                        </view>
                    </view>
                </view>
            </view>
            <view class="footer">
                <view>更新时间：{{ formatTime(data.age) }}</view>
				<view @click="showMore = !showMore" style="display: flex;align-items: center;">
					{{ showMore ? '收缩' : '展开' }}
					<u-icon :name="showMore ? 'arrow-down': 'arrow-right'" color="#909399" size="12"></u-icon>
				</view>
            </view>
        </view>
		<view class="detail" v-if="showMore">
			<view style="display: flex;">
				<view style="flex:1;text-align: center">BUFF价格:{{ toRound(data.buff_price )}}</view>
				<view style="flex:1;text-align: center">IGXE价格:{{ toRound(data.igxe_price) }}</view>
			</view>
            <view style="display: flex">
                <view style="flex:1;text-align: center">C5价格:{{ toRound(data.c5_price) }}</view>
                <view style="flex:1;text-align: center">UUYP价格:{{ toRound(data.uuyp_price) }}</view>
            </view>
            <view style="display: flex">
                <view style="flex: 1;text-align: center">STEAM最高求购价:{{ toRound(data.steam_buy_price) }}</view>
                <view style="flex: 1;text-align: center">STEAM最低寄售价:{{ toRound(data.steam_sell_price) }}</view>
            </view>
		</view>
	</view>
</template>

<script>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

import { mapState } from 'vuex';

export default {
    name: 'TradingCard',
    props: {
        data: Object,
		index: Number
    },
	data () {
		return {
			showMore: false,
			showSearchPop: false
		}
	},
	computed: {
		...mapState('user', ['setting'])
	},
	mounted() {
		this.showMore = this.setting.showPrice
	},
    methods: {
		copyName(name) {
			uni.setClipboardData({
			    data: name,
			    success: () => {
			        uni.showToast({
			            title: '饰品名称复制成功'
			        })
			    }
			})
		},
        formatTime(age) {
            const relativeTime = require('dayjs/plugin/relativeTime')
            const updateLocale = require('dayjs/plugin/updateLocale')
            dayjs.extend(relativeTime)
            dayjs.extend(updateLocale)
            dayjs.updateLocale('en', {
                relativeTime: {
                    past: "%s前",
                    s: '几秒',
                    m: "1 分钟",
                    mm: "%d 分钟",
                    h: "1 小时",
                    hh: "%d 小时",
                    d: "1 天",
                    dd: "%d 天",
                    M: "1 月",
                    MM: "%d 月",
                    yy: "%d 年"
                }
            })
            const time = new Date().getTime() - age * 1000
            return dayjs(time).fromNow()
        },
        toRound(num) {
            //  Number.EPSILON 增加准确度
            return !num || Number(num) > 9999 ? '无' : Math.round((num + Number.EPSILON) * 1000) / 1000
        },
    }
}
</script>
<style lang="scss">
	.trading {
		.card {
			background-color: #fff;
			font-size: 12px;
			line-height: 18px;
			margin-bottom: 20rpx;
			box-shadow: 0 0 0 2px rgba(45,140,240,.2);
			box-shadow: 0 3px 8px 0 rgba(0,0,0,.03);
			border-radius: 3px;
		}
		.title {
			padding: 30rpx;
			color: #303133;
			font-size: 14px;
			font-weight: bold;
		}
		.type-tag {
			display: inline-block;
			border-radius: 4px;
			color: #fff;
			line-height: 12px;
			font-size: 12px;
			padding: 1px 8px;
		}
		.footer {
			color: #909399;
			border-top: 1px solid #eee;
			padding: 10rpx 30rpx;
			display: flex;
			justify-content: space-between;
		}
		.content {
			padding:0 30rpx 30rpx;
			color: #606266;
		}
		.detail {
			color: #606266;
			font-size: 12px;
            margin-bottom: 40rpx;
		}
		.r {
			text-align: center;
		}
	}
</style>