import fs from 'fs'

// 定义数据格式
interface Video {
    uid: number
    status: number
    title: string
    info: string
    visit: number
    download: number
    score: number
    src: string
    img: string
    user:
    {
        uid: number
        works: string
    }[]
    | User[]
}

interface User {
    uid: number
    status: number
    uname: string
    pic: string
    info: string
}

const readFile = (file: 'video' | 'user') => {
    let path
    if (file == 'video') {
        path = './data/video.json'
    } else {
        path = './data/user.json'
    }
    try {
        const data = fs.readFileSync(path, 'utf-8')
        if (!data) {
            console.log('读取文件列表出错');
            return null
        }
        const oldlist = JSON.parse(data)
        return oldlist
    } catch (err) {
        console.log('读取文件列表出错');
        console.log(err);
        return null
    }
}

export const getVideoListData = (): Video[] | null => {
    return readFile('video')
}

export const getUserListData = (): User[] | null => {
    return readFile('user')
}

export const getUserInfo = (uid: number) => {
    const oldlist = getUserListData()
    if (!oldlist) {
        return console.log('写入数据失败！');
    }
    const data = oldlist.find((i: any) => i.uid == uid)
    return data
}

