import express from 'express'
const router = express.Router()

import { getUserListData, getVideoListData } from './../getData'
import config from './../getConfig'

import Main from './../../app'

// 请求key
router.get('/checkPwd', (req, res) => {
    if (req.query.password == config.password) {
        return res.send({
            status: 200,
            msg: '获取秘钥成功',
            data: Main.key
        })
    }
    return res.send({
        status: 401,
        msg: '身份验证失败'
    })
})

// 读取视频列表接口
router.get('/getVideoList', (req, res) => {
    // 读取视频列表
    const data: any = getVideoListData()
    const newdata = data.filter((i: any) => i.status === 1)
    if (!data) {
        return res.send({
            status: 500,
            msg: '服务器出错'
        })
    }
    return res.send({
        status: 200,
        msg: '获取视频列表成功',
        data: newdata
    })
})

// 读取演员列表接口
router.get('/getUserList', (req, res) => {
    // 读取视频列表
    const data: any = getUserListData()
    const newdata = data.filter((i: any) => i.status === 1)
    if (!data) {
        return res.send({
            status: 500,
            msg: '服务器出错'
        })
    }
    return res.send({
        status: 200,
        msg: '获取演员列表成功',
        data: newdata
    })
})

// 获取视频详细数据
import { processUserData, processVideoData } from './../controllers/processData'
router.get('/getVideo', (req, res) => {
    if (!req.query.uid || !req.query) {
        return res.send({
            status: 400,
            msg: '需要uid'
        })
    }
    const data = processVideoData(req.query.uid as any)
    if (!data) {
        return res.send({
            status: 500,
            msg: '获取视频数据失败！'
        })
    }
    return res.send({
        status: 200,
        msg: '获取视频数据成功',
        data
    })
})

import { addVisit, addDownload } from './../writeData'
// 增加播放量接口
router.get('/addVisit', (req, res) => {
    if (!req.query || !req.query.uid) {
        return res.send({
            status: 400,
            msg: '请求错误'
        })
    }
    addVisit(req.query.uid as any)
    return res.send({
        status: 200,
        msg: '请求成功'
    })
})

// 增加下载量接口
router.get('/addDownload', (req, res) => {
    if (!req.query || !req.query.uid) {
        return res.send({
            status: 400,
            msg: '请求错误'
        })
    }
    addDownload(req.query.uid as any)
    return res.send({
        status: 200,
        msg: '请求成功'
    })
})


export default router