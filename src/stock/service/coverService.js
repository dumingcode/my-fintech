const http = require('../../util/http')
const config = require('../../config')
const iconv = require('iconv-lite');
const redisUtil = require('../../util/redisUtil')

function isIntNum(val) {
    var regPos = /^\d+$/; // 非负整数
    if (regPos.test(val)) {
        return true;
    } else {
        return false;
    }
}
module.exports = {
    /**
     * 实时调用获取sina实时股价
     * @param {*} formData 
     */
    async fetchSinaStock(formData) {
        let codes = formData.codes
        codes = codes.replace(/，/g, ",")
        let codeArr = codes.split(',')
        let param = ''
        codeArr.forEach(code => {
            if (isIntNum(code) && (code.startsWith('6') || code.startsWith('11') || code.startsWith('50') || code.startsWith('51')) && code.length == 6) {
                param += `sh${code},`
            } else if (isIntNum(code) && (code.startsWith('0') || code.startsWith('3') || code.startsWith('12') || code.startsWith('16')) && code.length == 6) {
                param += `sz${code},`
            }
        });
        if (!param) {
            throw new Error("输入股票代码错误!");
        }
        param = param.replace(/(.*)[,]$/, '$1');
        let lxrData = await http.get(`http://hq.sinajs.cn/list=${param}`, _responseType = 'arraybuffer')
        const buf = Buffer.alloc(lxrData.data.length, lxrData.data, 'binary')
        let retData = iconv.decode(buf, 'GBK')
        let retArr = retData.split(';')
        let jsonArr = []
        retArr.forEach(data => {
            let arr = data.split('=')
            let codeStr = arr[0]


            if (arr[1]) {
                let str = arr[1].substr(1)
                let ret = {}
                ret['name'] = str.split(',')[0]
                ret['code'] = codeStr.substr(codeStr.length - 6)
                ret['open'] = parseFloat(str.split(',')[1])
                ret['close'] = parseFloat(str.split(',')[2])
                ret['price'] = parseFloat(str.split(',')[3])
                ret['high'] = parseFloat(str.split(',')[4])
                ret['low'] = parseFloat(str.split(',')[5])
                ret['time'] = `${str.split(',')[30]} ${str.split(',')[31]}`
                jsonArr.push(ret)
            }
        })
        // console.log(jsonArr)

        return jsonArr
    },
    //查询对应股票一年最低价 codes样例 600030,600001
    async queryStockYearLowPrice(formData) {
        if (!formData) { return null }
        let codes = formData.codes
        if (!codes) { return null }
        let stocks = codes.split(',')
        let promiseArr = []
        for (let i = 0; i < stocks.length; i++) {
            promiseArr.push(redisUtil.redisHGet(config.redisStoreKey.yearLowStockSet, stocks[i]))
        }
        return Promise.all(promiseArr).then(function (values) {

            return values.filter(value => { return value != null }).map((jsonStr) => {
                let json = JSON.parse(jsonStr)
                let retObj = {
                    'code': json['code'],
                    'name': json['name'],
                    'citiV1': json['citiV1'],
                    'citiV2': json['citiV2'],
                    'gz2': json['gz2'] ? json['gz2'] : '',
                    'gz3': json['gz3'] ? json['gz3'] : '',
                    'low': json['low'],
                    'lowGenDate': json['lowGenDate'],
                    'ma20': json['ma20']
                }
                console.log(retObj)
                return JSON.stringify(retObj)
            })
        });

    }




}