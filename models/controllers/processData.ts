import { getUserListData, getVideoListData } from '../getData'

// 处理视频数据
export const processVideoData = (videouid: number) => {
    // 获取视频数据
    const olddata: any = getVideoListData()
    if (!olddata) {
        console.log('处理数据时获取视频数据失败！');
        return null
    }
    // 筛选被删除的数据
    const nodeldata = olddata.filter((i: any) => i.status === 1)
    // 判断视频数据是否正确获取
    // 通过videouid获取具体的视频数据 具体需要的视频数据
    const videoInfo = nodeldata.find((e: any) => {
        if (e.uid == videouid) {
            return e
        }
    })
    // 判断是否有这个数据
    if (!videoInfo) {
        return null
    }
    // 将用户数据渲染至视频数据中
    // 获取用户数据
    const userdata = processUserData()
    // 处理user数据
    const newuserdata = videoInfo.user.map((e: any) => {
        // 通过e.uid 查找相关的用户数据 然后将相关的用户数据加入 userInfo就是具体用户的信息
        const userInfo = userdata.find((el: any) => {
            if (el.uid == e.uid) return el
        })
        // 用户信息不能为空
        if (!userInfo) {
            console.log('处理数据时无法找到有效用户！无法找到视频对应演员！');
            return null
        }
        // 将userInfo中的数据 加入视频的用户列表数据
        e.uname = userInfo.uname
        e.pic = userInfo.pic
        e.info = userInfo.info
        return e
    })
    // 处理评分数据，将评分渲染为平均值
    // 评分总和 videoInfo.score
    let sum = 0
    videoInfo.score.forEach((e: any) => {
        sum += e
    })
    // 平均值
    const score = sum / videoInfo.score.length
    // 使用新的数组覆盖旧的数组
    videoInfo.user = newuserdata
    videoInfo.score = score
    return videoInfo
}


// 处理用户数据
export const processUserData = () => {
    // 获取用户数据
    const olddata: any = getUserListData()
    // 筛选被删除的数据
    const nodeldata = olddata.filter((i: any) => i.status === 1)
    return nodeldata
}
