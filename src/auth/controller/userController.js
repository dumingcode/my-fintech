const userService = require('../service/userService')
const config = require('../../config')
module.exports = {
    /**
     * 存储个人自选股代码列表
     * @param {*} ctx 
     */
    async saveOptStocks(ctx) {
        ctx.session.refresh()
        let body = await userService.saveOptStocks(ctx.request.body, ctx.session.user)
        if (body.code > 0) {
            ctx.session.optStocks = null
            const optStocks = await userService.queryOptStocks(ctx.session.user)
            ctx.session.optStocks = optStocks.data
            body.data = optStocks.data
        }
        ctx.body = body
    },
    /**
     * 查询自选股代码列表
     * @param {*} ctx 
     */
    async queryOptStocks(ctx) {
        ctx.session.refresh()
        if (!ctx.session.optStocks) {
            ctx.body = await userService.queryOptStocks(ctx.session.user)
        } else {
            ctx.body = { code: 1, msg: 'ok', data: ctx.session.optStocks }
        }
    },
    /**
     * 保存网格策略参数信息
     * @param {*} ctx 
     */
    async saveOptGridInfo(ctx) {
        ctx.session.refresh()
        let body = await userService.saveOptGridInfo(ctx.request.body, ctx.session.user)
        ctx.session.optGrid = null
        const optGrid = await userService.queryOptGridInfo(ctx.session.user)
        ctx.session.optGrid = optGrid.data
        body.data = optGrid.data
        ctx.body = body
    },
    /**
     * 查询网格策略参数信息
     * @param {*} ctx 
     */
    async queryOptGridInfo(ctx) {
        ctx.session.refresh()
        if (!ctx.session.optGrid) {
            const body = await userService.queryOptGridInfo(ctx.session.user)
            ctx.body = body
        } else {
            ctx.body = { code: 1, msg: 'ok', data: ctx.session.optGrid }
        }
    },
    /**
     * 保存自选股交易数据-成本价、已补仓次数、已止盈次数
     * @param {*} ctx 
     */
    async saveOptStockDealDetail(ctx) {
        ctx.session.refresh()
        let body = await userService.saveOptStockDealDetail(ctx.request.body, ctx.session.user)
        ctx.session.stockDealDetail = null
        const stockDealDetail = await userService.queryOptStockDealDetail(ctx.session.user)
        ctx.session.stockDealDetail = stockDealDetail.data
        body.data = stockDealDetail.data
        ctx.body = body
    },
    /**
     * 删除
     * @param {*} ctx 
     */
    async delOptStockDealDetail(ctx) {
        ctx.session.refresh()
        let body = await userService.delOptStockDealDetail(ctx.request.body, ctx.session.user)
        ctx.session.stockDealDetail = null
        const stockDealDetail = await userService.queryOptStockDealDetail(ctx.session.user)
        ctx.session.stockDealDetail = stockDealDetail.data
        body.data = stockDealDetail.data
        ctx.body = body
    },
    /**
     * 查询自选股交易数据
     * @param {*} ctx 
     */
    async queryOptStockDealDetail(ctx) {
        ctx.session.refresh()
        if (!ctx.session.stockDealDetail) {
            const body = await userService.queryOptStockDealDetail(ctx.session.user)
            ctx.body = body
        } else {
            ctx.body = { code: 1, msg: 'ok', data: ctx.session.stockDealDetail }
        }
    },
    async queryStopProfitThreshold(ctx) {
        ctx.session.refresh()
        if (!ctx.session.profitThreshold) {
            const body = await userService.queryStopProfitThreshold(ctx.session.user)
            ctx.body = body
        } else {
            ctx.body = { code: 1, msg: 'ok', data: ctx.session.profitThreshold }
        }
    },
    async saveStopProfitThreshold(ctx) {
        ctx.session.refresh()
        let body = await userService.saveStopProfitThreshold(ctx.request.body, ctx.session.user)
        ctx.session.profitThreshold = null
        const profitThreshold = await userService.queryStopProfitThreshold(ctx.session.user)
        ctx.session.profitThreshold = profitThreshold.data
        body.data = profitThreshold.data
        ctx.body = body
    },
    /**
     * 存储可转债代码列表
     * @param {} ctx 
     */
    async saveOptCbs(ctx) {
        ctx.session.refresh()
        let body = await userService.saveOptCbs(ctx.request.body, ctx.session.user)
        if (body.code > 0) {
            ctx.session.optCbs = null
            const optCbs = await userService.queryOptCbs(ctx.session.user)
            ctx.session.optCbs = optCbs.data
            body.data = optCbs.data
        }
        ctx.body = body
    },
    /**
     * 查询可转债代码列表
     * @param {*} ctx 
     */
    async queryOptCbs(ctx) {
        ctx.session.refresh()
        if (!ctx.session.optCbs) {
            ctx.body = await userService.queryOptCbs(ctx.session.user)
        } else {
            ctx.body = { code: 1, msg: 'ok', data: ctx.session.optCbs }
        }
    },
    /**
     * 保存自选股转债交易数据
     * @param {*} ctx 
     */
    async saveOptCbDealDetail(ctx) {
        ctx.session.refresh()
        let body = await userService.saveOptCbDealDetail(ctx.request.body, ctx.session.user)
        ctx.session.cbDealDetail = null
        const cbDealDetail = await userService.queryOptCbDealDetail(ctx.session.user)
        ctx.session.cbDealDetail = cbDealDetail.data
        body.data = cbDealDetail.data
        ctx.body = body
    },
    /**
     * 删除转债交易数据
     * @param {*} ctx 
     */
    async delOptCbDealDetail(ctx) {
        ctx.session.refresh()
        let body = await userService.delOptCbDealDetail(ctx.request.body, ctx.session.user)
        ctx.session.cbDealDetail = null
        const cbDealDetail = await userService.queryOptCbDealDetail(ctx.session.user)
        ctx.session.cbDealDetail = cbDealDetail.data
        body.data = cbDealDetail.data
        ctx.body = body
    },
    /**
     * 查询自选转债交易数据
     * @param {*} ctx 
     */
    async queryOptCbDealDetail(ctx) {
        ctx.session.refresh()
        if (!ctx.session.cbDealDetail) {
            const body = await userService.queryOptCbDealDetail(ctx.session.user)
            ctx.body = body
        } else {
            ctx.body = { code: 1, msg: 'ok', data: ctx.session.cbDealDetail }
        }
    },
    async queryUserInfo(ctx)  {
        ctx.session.refresh()
        if (!ctx.session.userInfo) {
            const body = await userService.queryUserInfo(ctx.session.user)
            ctx.body = body
        } else {
            ctx.body = { code: 1, msg: 'ok', data: ctx.session.userInfo }
        }
    },
    // 查询用户自选股跟指数的重合量化数据信息
    async queryUserIndexSampleInfo(ctx)  {
        ctx.session.refresh()
        const body = await userService.queryUserIndexSampleInfo(ctx.session.user)
        ctx.session.optQuant = body.data
        ctx.body = body
    },
    logout(ctx) {
        let body = {
            code: 1,
            msg: 'ok',
            data: null
        }
        if (!ctx.session.user) {
            body.code = -1
            body.msg = '已退出'
            ctx.body = body
            return
        }
        ctx.session = {}
        ctx.body = body
    },
    async saveTotalStopProfitTime(ctx) {
        ctx.session.refresh()
        let body = await userService.saveTotalStopProfitTime(ctx.request.body, ctx.session.user)
        ctx.session.totalStopProfitTime = null
        const time = await userService.queryTotalStopProfitTime(ctx.session.user)
        ctx.session.totalStopProfitTime = time.data
        body.data = time.data
        ctx.body = body
    },
    async queryTotalStopProfitTime(ctx) {
        ctx.session.refresh()
        if (!ctx.session.totalStopProfitTime) {
            const body = await userService.queryTotalStopProfitTime(ctx.session.user)
            ctx.body = body
        } else {
            ctx.body = { code: 1, msg: 'ok', data: ctx.session.totalStopProfitTime }
        }
    }
}