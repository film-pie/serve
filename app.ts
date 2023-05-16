// 检查是否是首次使用
import './models/controllers/firstOpen'

// 读取配置文件
import getConfig from './models/getConfig'
const { port } = getConfig

// 创建key
import createKey from './models/createKey'
const key = createKey

// 使用express
import express from 'express'
const app = express()

// 跨域
import cors from 'cors'
app.use(cors())

// 解析post
import bodyParser from 'body-parser'
app.use(bodyParser.json())

// 声明路由中间件
const checkPwd = (req: any, res: any, next: Function) => {
    if (!req.body || !req.body.key || req.body.key != key) {
        return res.send({
            status: 403,
            msg: '鉴权失败'
        });
    }
    return next();
};

// 使用路由
import publicApi from './models/api/publicapi'
app.use('/api', publicApi)
import adminApi from './models/api/adminapi'
app.use('/api/admin', checkPwd, adminApi)

import './models/controllers/processData'

// 开启监听
app.listen(port, () => {
    console.log(`服务器开始监听http://localhost:${port}`);

})


export default {
    key
}

