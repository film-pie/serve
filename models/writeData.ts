import fs from 'fs'
// 读取信息
import { getUserListData, getVideoListData } from './getData'
// 获取下一位UID
import { nextUserUid, nextVideoUid } from './controllers/getNextUid'

export const addVideoList = (data: any, before = false) => {
    try {
        const oldvideolist = getVideoListData()
        data.uid = nextVideoUid()
        data.status = 1
        data.visit = 0
        data.download = 0
        data.score = 0
        if (before) {
            oldvideolist.unshift(data)
        } else {
            oldvideolist.push(data)
        }
        const newVideolist = JSON.stringify(oldvideolist)
        fs.writeFileSync('./data/video.json', newVideolist, 'utf-8')
    } catch (error) {
        console.log('写入视频文件失败！')
        console.log(error)

    }

}

export const addUserList = (data: any) => {
    try {
        const olduserlist = getUserListData()
        data.uid = nextUserUid()
        data.status = 1
        olduserlist.push(data)
        const newUserlist = JSON.stringify(olduserlist)
        fs.writeFileSync('./data/user.json', newUserlist, 'utf-8')
    } catch (error) {
        console.log('写入用户文件失败！')
        console.log(error)

    }

}

export const editUserList = (data: any, uid: Number) => {
    try {
        const olduserlist = getUserListData()
        // const edititem = olduserlist.find((e: any) => e.uid == uid)
        let res = false
        olduserlist.forEach((e: any) => {
            if (e.uid == uid) {
                e.uname = data.uname
                e.pic = data.pic
                e.info = data.info
                return res = true
            }
        })
        if (res) {
            const newUserlist = JSON.stringify(olduserlist)
            fs.writeFileSync('./data/user.json', newUserlist, 'utf-8')
            return true
        }
        return false
    } catch (error) {
        console.log('写入用户文件失败！')
        console.log(error)
    }
}

export const editVideoList = (data: any, uid: Number) => {
    try {
        const oldvideolist = getVideoListData()
        let res = false
        oldvideolist.forEach((e: any) => {
            if (e.uid == uid) {
                e.title = data.title
                e.info = data.info
                e.src = data.src
                e.img = data.img
                e.user = data.user
                return res = true
            }
        })
        if (res) {
            const newUserlist = JSON.stringify(oldvideolist)
            fs.writeFileSync('./data/video.json', newUserlist, 'utf-8')
            return true
        }
        return false
    } catch (error) {
        console.log('写入视频数据文件失败！')
        console.log(error)
    }
}

export const delUser = (uid: number) => {
    try {
        const olduserlist = getUserListData()
        let status = false
        olduserlist.forEach((e: any) => {
            if (e.uid == uid) {
                e.status = -1
                return status = true
            }
        })
        if (status) {
            const newUserlist = JSON.stringify(olduserlist)
            fs.writeFileSync('./data/user.json', newUserlist, 'utf-8')
            return true
        }
        return false
    } catch (error) {
        console.log('修改用户列表出错');
        console.log(error);
    }
}

export const delVideo = (uid: number) => {
    try {
        const oldVideolist = getVideoListData()
        let status = false
        oldVideolist.forEach((e: any) => {
            if (e.uid == uid) {
                e.status = -1
                return status = true
            }
        })
        if (status) {
            const newUserlist = JSON.stringify(oldVideolist)
            fs.writeFileSync('./data/video.json', newUserlist, 'utf-8')
            return true
        }
        return false
    } catch (error) {
        console.log('修改视频列表出错');
        console.log(error);
    }
}