import express from 'express'
const router = express.Router()

import { getUserListData, getVideoListData } from './../getData'
import { addUserList, addVideoList, editUserList, editVideoList, delUser, delVideo } from './../writeData'
import { processUserData, processVideoData } from './../controllers/processData'

// 读取视频列表接口
router.post('/getVideoList', (req, res) => {
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

// 获取视频详细数据
router.post('/getVideo', (req, res) => {
    if (!req.body.uid || !req.body) {
        return res.send({
            status: 400,
            msg: '需要uid'
        })
    }
    const data = processVideoData(req.body.uid as any)
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

// 读取演员列表接口
router.post('/getUserList', (req, res) => {
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

// 添加视频接口
router.post('/addVideo', (req, res) => {
    // res.send(req.body)
    const need = ['title', 'info', 'src', 'img', 'user']
    if (!req.body.data || !need.every(e => req.body.data[e])) {
        return res.send({
            status: 400,
            msg: '未提供视频参数'
        })
    }
    if (req.body.before) {
        addVideoList(req.body.data, true)
    } else {
        addVideoList(req.body.data)
    }
    return res.send({
        status: 200,
        msg: '添加视频成功！'
    })

})

// 修改视频接口
router.post('/editVideo', (req: any, res: any) => {
    if (!req.body.uid) {
        return res.send({
            status: 400,
            msg: '必须提供视频uid'
        })
    }
    const need = ['title', 'info', 'src', 'img', 'user']
    if (!req.body.data || !need.every(e => req.body.data[e])) {
        return res.send({
            status: 400,
            msg: '未提供视频参数'
        })
    }
    if (editVideoList(req.body.data, req.body.uid)) {
        return res.send({
            status: 200,
            msg: '修改视频成功！'
        })
    }
    return res.send({
        status: 500,
        mgs: '数据写入失败'
    })
})

// 添加演员接口
router.post('/addUser', (req, res) => {
    // res.send(req.body)
    const need = ['uname', 'pic', 'info']
    if (!req.body.data || !need.every(e => req.body.data[e])) {
        return res.send({
            status: 400,
            msg: '未提供演员参数'
        })
    }
    addUserList(req.body.data)
    return res.send({
        status: 200,
        msg: '添加演员成功！'
    })

})

// 修改演员接口
router.post('/editUser', (req: any, res: any) => {
    if (!res.body.uid) {
        return res.send({
            status: 400,
            msg: '必须提供演员uid'
        })
    }
    const need = ['uname', 'pic', 'info']
    if (!req.body.data || !need.every(e => req.body.data[e])) {
        return res.send({
            status: 400,
            msg: '未提供演员参数'
        })
    }
    if (editUserList(req.body.data, res.body.uid)) {
        return res.send({
            status: 200,
            msg: '修改演员成功！'
        })
    }
    return res.send({
        status: 500,
        mgs: '数据写入失败'
    })
})

// 删除视频接口
router.post('/delVideo', (req, res) => {
    if (!req.body || !req.body.uid) {
        return res.send({
            status: 400,
            msg: '未提供视频参数'
        })
    }
    if (delVideo(req.body.uid)) {
        return res.send({
            status: 200,
            msg: '删除视频成功！'
        })
    }
    return res.send({
        status: 500,
        mgs: '删除视频失败'
    })
})

// 删除用户接口
router.post('/delUser', (req, res) => {
    if (!req.body || !req.body.uid) {
        return res.send({
            status: 400,
            msg: '未提供演员参数'
        })
    }
    if (delUser(req.body.uid)) {
        return res.send({
            status: 200,
            msg: '删除演员成功！'
        })
    }
    return res.send({
        status: 500,
        mgs: '删除演员失败'
    })
})



export default router