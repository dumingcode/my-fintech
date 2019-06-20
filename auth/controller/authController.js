module.exports = {
    weiboCallback(ctx) {
        try {
            console.log(ctx.state.passport)
            ctx.session.user = ctx.state.passport.body.id
            ctx.body = ctx.session.user
        } catch (error) {
            console.log(error)
            ctx.body = "error"
        }
    },
    logout(ctx) {
        try {
            ctx.session = {}
            ctx.body = '已登出'
        } catch (error) {
            console.log(error)
            ctx.body = "登出失败"
        }

    }
}