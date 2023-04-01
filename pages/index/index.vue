<template>
    <view class="app-container">
        <view>
            <u-sticky>
                <view
                    style="padding: 8px;display: flex;justify-content: space-between;align-items: center;background-color: #F0F4F8;font-weight: bold;">
                    <view style="color: #303133;font-size: 12px;">物品数量：{{ total }}</view>
                    <view style="display: flex;justify-content: flex-end;align-items: center;">
                        <image @click="openSearchPop" style="width: 12px;height: 12px"
                               src="../../static/search.png"></image>
                        <view @click="openSearchPop" style="margin-left: 8px;color:#303133;font-size: 12px;">检索</view>
                    </view>
                </view>
            </u-sticky>
            <view v-for="(item, index) in list" :key="item.name" class="content">
				<view style="margin-bottom: 20rpx;">
					<TradingCard :data="item" :index="index" />
				</view>
            </view>
        </view>
        <u-loadmore v-show="total > 0" :status="status"/>
        <u-back-top :scroll-top="scrollTop" top="600"></u-back-top>

        <!-- 检索pop -->
        <u-popup :show="showSearchPop" mode="right" @close="close">
            <view style="width: 60vw;height: 100vh;display: flex;align-items: center;padding: 20rpx;">
                <u--form :model="queryParams" ref="searchForm">
					<u-form-item label="价格" labelPosition="top">
						<div>
							最低价
							<u-number-box :inputWidth="50" v-model="queryParams.min_price" />
						</div>
						<div style="margin-top: 10px;">
							最高价
							<u-number-box :inputWidth="50" v-model="queryParams.max_price" />
						</div>
					</u-form-item>
                    <u-form-item label="排序" labelPosition="top">
                        <u-radio-group v-model="queryParams.sort_by" placement="column">
							<div>
								<u-radio label="最优求购" name="buy" />
							</div>
							<div style="margin-top: 10px;">
								<u-radio label="最优寄售" name="sell" />
							</div>
                        </u-radio-group>
                    </u-form-item>
                    <u-form-item label="平台" labelPosition="top">
                        <u-checkbox-group v-model="queryParams.platforms_arr" placement="column">
							<div>
								<u-checkbox label="buff" name="buff" />
							</div>
							<div style="margin-top: 10px;">
								<u-checkbox label="igxe" name="igxe" />
							</div>
							<div style="margin-top: 10px;">
								<u-checkbox label="uuyp" name="uuyp" />
							</div>
							<div style="margin-top: 10px;">
								<u-checkbox label="c5" name="c5" />
							</div>
                        </u-checkbox-group>
                    </u-form-item>
                    <u-button type="primary" :plain="true" text="确定" @click="handleSearch()"></u-button>
                </u--form>
            </view>
        </u-popup>
    </view>
</template>

<script>
import TradingCard from '@/components/TradingCard/index.vue'
import { getTradingData } from '@/api/index'
import { commonKey } from '@/config/index.js'
import { addInvationLog } from '@/api/ucenter.js'
import { mapGetters, mapState } from 'vuex'

export default {
    name: 'indexPage',
    components: {
        TradingCard
    },
    data() {
        return {
            showSearchPop: false,
            scrollTop: 0,
            status: 'loadmore',
            total: 0,
            list: [],
            queryParams: {
                sort_by: 'buy',
                platforms_arr: ['buff', 'igxe', 'uuyp', 'c5'],
                platforms: 'buff-igxe-uuyp-c5',
                page_num: 1,
                page_size: 20,
                min_volume: 2,
                name: '',
				min_price: 1,
				max_price: 5000,
            },
        }
    },
	computed: {
		...mapGetters('user', ['isVip']),
		...mapState('user', [commonKey.USE_INFO_KEY])
	},
	async onLoad(options) {
		// 查询比例数据
		uni.showLoading({
		    title: '数据加载中'
		})
		this.list = await this.handleQueryList()
		uni.hideLoading()
		const is_followed = uni.getStorageSync('is_followed')
		if (is_followed != '1') {
			this.openQcodeModal()
		}
	},
    onPageScroll(e) {
        this.scrollTop = e.scrollTop;
    },
    methods: {
		cancel() {
			this.show = false
		},
		confirm() {
			uni.setStorageSync('is_followed', 1)
			this.show = false
		},
		openQcodeModal() {
			this.show = true
		},
		async handleAddInvationLog(data) {
			await addInvationLog(data)
		},
		closeTipModal() {
			this.show = false
			uni.setStorageSync(commonKey.TIP_MODAL, 1)
		},
        openSearchPop()
		{
            this.showSearchPop = true
        },
        close() {
            this.showSearchPop = false
        },
        handleChange() {
            this.handleQueryList()
        },
        async handleSearch() {
            this.showSearchPop = false
            uni.showLoading({
                title: '数据加载中'
            })
            // 处理参数
            this.queryParams.page_num = 1
            this.queryParams.platforms = this.queryParams.platforms_arr.join('-')
            this.list = await this.handleQueryList()
            uni.hideLoading()
        },
        async handleQueryList() {
            const {data, total_items} = await getTradingData(this.queryParams)
            this.total = total_items
            return data
        },
        async onReachBottom() {
            if (this.list.length >= this.total) {
                this.status = 'nomore';
                return;
            }
            this.status = 'loading';
            this.queryParams.page_num += 1;
            const data = await this.handleQueryList()
            this.list = [
                ...this.list,
                ...data
            ]
        },
        onShareAppMessage() {
            return {
                title: '简单挂刀、快乐挂刀',
        		path: `pages/index/index`
            }
        },
        onShareTimeline() {
            return {
                title: '简单挂刀、快乐挂刀',
        		path: `pages/index/index`
            }
        }
    }
}
</script>
<style lang="scss">
page {
    background: #f2f2f3;
}

.app-container {
	.content {
		padding: 0 30rpx;
	}
}

.u-input {
    padding: 1px 9px !important;
    background-color: #fff;
}
</style>