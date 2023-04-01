<template>
	<view  class="app-container">
		<view class="tool-title" @click="handleLogin">
			传家宝活动计算器
		</view>
		<view class="tool-param">
			<u-grid col="2">
				<u-grid-item>
					<view class="input">
						<u-input :customStyle="{ background: '#fff' }" placeholder="请输入现有金币" v-model="caluParams.coin" border="surround" />
					</view>
				</u-grid-item>
				<u-grid-item>
					<view class="input">
						<u-input :customStyle="{ background: '#fff' }" placeholder="请输入现有金属" v-model="caluParams.mental" border="surround" />
					</view>
				</u-grid-item>
			</u-grid>
		</view>
		<view style="margin-top: 30rpx;">
			<u-button
				type="primary"
				:customStyle="{ background: '#14274E' }"
				text="计算"
				@click="heirloomCalculator(caluParams.mental, caluParams.coin)"
			/>
		</view>
		<view class="res-content">
			<view>金属购买皮肤: <text style="color: gold;">{{ apexSkin }}</text> + <text style="color: blueviolet;">{{ epicSkin }}</text></view>
			<view>需购捆绑包: {{ bundlePackage }}</view>
			<view>另购组合包: {{ heirloomBox }}</view>
			<view>花费金属: {{ mentalCost }}</view>
			<view>剩余金属: {{ mentalResidue }}</view>
			<view>仍需金币: {{ coinBuy }}</view>
			<view>剩余金币: {{ coinResidue }}</view>
			<view>steam余额（国区）: {{ steamYuE }}</view>
		</view>
	</view>
</template>

<script>
	export default{
		data () {
			return {
                caluParams: {
					mental: null,
					coin: null
				},
                // 可购皮肤-金
				apexSkin: 0,
                // 可购皮肤-紫
				epicSkin: 0,
                // 需购捆绑包
                bundlePackage: '',
                // 另购组合包
                heirloomBox: 0,
                // 花费金属
                mentalCost: 0,
                // 剩余金属
                mentalResidue: 0,
                // 仍需金币
                coinBuy: 0,
                // 剩余金币
                coinResidue: 0,
                // steam余额（国区）
                steamYuE: 0
			}
		},
		
		methods: {
			heirloomCalculator(mental, coin) {
				if (mental < 800) {
                    this.apexSkin = 0
                    this.epicSkin = 0
                    this.bundlePackage = "大 + 小"
                    this.heirloomBox = 12
                    this.mentalCost = 0
                    this.mentalResidue = mental
                    this.coinBuy = 15900 - coin
                    if (this.coinBuy < 0) {
                        this.coinBuy = 0 
                    }
                    this.coinResidue = coin - 15900
                    if (this.coinResidue < 0) {
                        this.coinResidue = 0 
                    }
                 }else if (mental < 19200) {
                    const heirloomBoxMentalNum = parseInt(mental / 800)
                    this.apexSkin = 0
                    this.epicSkin = heirloomBoxMentalNum
                    this.bundlePackage = "大 + 小"
                    this.heirloomBox = 12 - heirloomBoxMentalNum
                    this.mentalCost = 800 * heirloomBoxMentalNum
                    this.mentalResidue = mental - (800 * heirloomBoxMentalNum)
                    this.coinBuy = 7500 + (700 * (12 - heirloomBoxMentalNum)) - coin
                    if (this.coinBuy < 0) {
                        this.coinBuy = 0 
                    }
                    this.coinResidue = coin - 7500 - (700 * (12 - heirloomBoxMentalNum))
                    if (this.coinResidue < 0) {
                        this.coinResidue = 0 
                    }
                 }else if (mental < 28800) {
                    const heirloomBoxMentalNum = parseInt((mental - 9600) / 2400)
                    this.apexSkin = heirloomBoxMentalNum
                    this.epicSkin = 12
                    this.bundlePackage = "大"
                    this.heirloomBox = 4 - heirloomBoxMentalNum
                    this.mentalCost = 2400 * heirloomBoxMentalNum + 9600
                    this.mentalResidue = mental - (2400 * heirloomBoxMentalNum + 9600)
                    this.coinBuy = 5000 + (700 * (4 - heirloomBoxMentalNum)) - coin
                    if (this.coinBuy < 0) {
                        this.coinBuy = 0 
                    }
                    this.coinResidue = coin - 5000 - (700 * (4 - heirloomBoxMentalNum))
                    if (this.coinResidue < 0) {
                        this.coinResidue = 0 
                    }
                 }else if (mental < 38400) {
                    const heirloomBoxMentalNum = parseInt((mental - 9600) / 2400)
                    this.apexSkin = heirloomBoxMentalNum
                    this.epicSkin = 12
                    this.bundlePackage = "小"
                    this.heirloomBox = 0
                    this.mentalCost = 2400 * heirloomBoxMentalNum + 9600
                    this.mentalResidue = mental - (2400 * heirloomBoxMentalNum + 9600)
                    this.coinBuy = 2500 - coin
                    if (this.coinBuy < 0) {
                        this.coinBuy = 0 
                    }
                    this.coinResidue = coin - 2500
                    if (this.coinResidue < 0) {
                        this.coinResidue = 0 
                    }
                 }else {
                    this.apexSkin = 12
                    this.epicSkin = 12
                    this.bundlePackage = "无需购买"
                    this.heirloomBox = 0
                    this.mentalCost = 38400
                    this.mentalResidue = mental - 38400
                    this.coinBuy = 0
                    this.coinResidue = coin
                 }
                 // 新加国区购买金币部分
                 if (this.coinBuy > 0) {
                    let rest = this.coinBuy
                    let money = 0
                    let five = 0
                    let four = 0
                    let three = 0
                    let two = 0
                    let one = 0
                    let half = 0
                    while (rest > 0) {
                        if (rest >= 11500) {
                            money = money + 498
                            rest = rest - 11500
                            five = five + 1
                        }else if (rest > 4850){
                            money = money + 298
                            rest = rest - 6700
                            four = four + 1
                        }else if (rest > 3150){
                            money = money + 238
                            rest = rest - 4350
                            three = three + 1
                        }else if (rest >= 2000){
                            money = money + 138
                            rest = rest - 2150
                            two = two + 1
                        }else if (rest >= 1000){
                            money = money + 68
                            rest = rest - 1000
                            one = one + 1     
                        }else {
                            money = money + 34
                            rest = rest - 500
                            half = half + 1
                        }
                    }
                    this.steamYuE = "需购"
                    if (five > 0) {
                        this.steamYuE = this.steamYuE + five + "个498，"
                    }
                    if (four > 0) {
                        this.steamYuE = this.steamYuE + four + "个298，"
                    }
                    if (three > 0) {
                        this.steamYuE = this.steamYuE + three + "个238，"
                    }
                    if (two > 0) {
                        this.steamYuE = this.steamYuE + two + "个138，"
                    }
                    if (one > 0) {
                        this.steamYuE = this.steamYuE + one + "个68，"
                    }
                    if (half > 0) {
                        this.steamYuE = this.steamYuE + half + "个34,"
                    }
                    if (money >= 380) {
                        money = money * 0.9 + 38
                        this.steamYuE = this.steamYuE + "充值金额超过380先购买38一个月EAPLAY，购买金币享受10%折扣,"
                    }
                    this.steamYuE = this.steamYuE + "共计需" + money + "￥steam余额"
                     if (rest < 0) {
                        rest = -rest;
                        this.steamYuE = this.steamYuE + "，剩余" + rest + "金币";
                    }
                 }else {
                    this.steamYuE = "无需购买"
                 }
			}
		}
	}
</script>
<style lang="scss">
	.app-container {
		padding: 30rpx;
		.tool-title {
			padding: 6px 0;
			text-align: center;
			font-size: 16px;
			font-weight: bold;
			background-color: #F1F6F9;
		}
		.tool-param {
			margin-top: 30rpx;
		}
		.input {
			background-color: #EBEBEB;
			padding: 20rpx;
		}
		.res-content {
			padding: 20rpx;
			margin-top: 60rpx;
			background-color: #EBEBEB;
		}
	}
</style>