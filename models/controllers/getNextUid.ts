import { getUserListData, getVideoListData } from './../getData'

export const nextVideoUid = () => {
    const data = getVideoListData()
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
    let maxuid = 0
    data.forEach((e: any) => {
        if (e.uid > maxuid) {
            maxuid = e.uid
        }
    })
    return maxuid + 1
}