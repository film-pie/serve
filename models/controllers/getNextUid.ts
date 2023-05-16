import { getUserListData, getVideoListData } from './../getData'

export const nextVideoUid = () => {
    const data = getVideoListData()
    if (!data) return alert('获取视频列表出错！')
    let maxuid = 0
    data.forEach((e: any) => {
        if (e.uid > maxuid) {
            maxuid = e.uid
        }
    })
    return maxuid + 1
}

export const nextUserUid = () => {
    const data = getUserListData()
    if (!data) return alert('获取用户列表出错！')
    let maxuid = 0
    data.forEach((e: any) => {
        if (e.uid > maxuid) {
            maxuid = e.uid
        }
    })
    return maxuid + 1
}