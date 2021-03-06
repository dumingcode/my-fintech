const industryService = require('../service/industryService')
module.exports = {
    //查询中信一级行业明细
    async queryCitiFstIndustryInfo(ctx) {
        let body = {
            code: 1,
            msg: 'ok',
            data: null
        }
        let data = await industryService.queryCitiFstIndustryInfo()
        if (!data) {
            body.code = -1
            body.msg = 'data is null'
        } else {
            body.data = data
        }
        ctx.body = body
    },
    //查询中信二级行业明细
    async queryCitiSndIndustryInfo(ctx) {
        let body = {
            code: 1,
            msg: 'ok',
            data: null
        }
        let data = await industryService.queryCitiSndIndustryInfo()
        if (!data) {
            body.code = -1
            body.msg = 'data is null'
        } else {
            body.data = data
        }
        ctx.body = body
    },
    //查询国证二级行业明细
    async queryGzSndIndustryInfo(ctx) {
        let body = {
            code: 1,
            msg: 'ok',
            data: null
        }
        let data = await industryService.queryGzSndIndustryInfo()
        if (!data) {
            body.code = -1
            body.msg = 'data is null'
        } else {
            body.data = data
        }
        ctx.body = body
    },
    //查询国证三级行业明细
    async queryGzTrdIndustryInfo(ctx) {
        let body = {
            code: 1,
            msg: 'ok',
            data: null
        }
        let data = await industryService.queryGzTrdIndustryInfo()
        if (!data) {
            body.code = -1
            body.msg = 'data is null'
        } else {
            body.data = data
        }
        ctx.body = body
    }


}