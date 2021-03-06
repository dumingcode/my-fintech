var Redis = require('ioredis')
const config = require('../config')
const redisConfig = config.redis

module.exports = {
    async redisHGet(key, field) {
        let redis = new Redis(redisConfig)
        let result = await redis.hget(key, field)
        await redis.disconnect()
        return result
    },
    async redisSet(key, value) {
        let redis = new Redis(redisConfig)
        let result = await redis.set(key, value)
        await redis.disconnect()
        return result
    },
    async redisSetEx(key, value, exMode, maxAge) {
        let redis = new Redis(redisConfig)
        let result = await redis.set(key, value, exMode, maxAge)
        await redis.disconnect()
        return result
    },
    async redisGet(key) {
        let redis = new Redis(redisConfig)
        let result = await redis.get(key)
        await redis.disconnect()
        return result
    },
    async redisDel(key) {
        let redis = new Redis(redisConfig)
        let result = await redis.del(key)
        await redis.disconnect()
        return result
    },
    redisSmembers(key) {
        let redis = new Redis(redisConfig)
        return redis.smembers(key).then((val) => {
            return val
        }).then((val) => {
            redis.disconnect()
            return val
        }).catch((err) => {
            console.log(err)
            return null
        })
    }
}