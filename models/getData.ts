import fs from 'fs'

const readFile = (file: string) => {
    if (file == 'video') {
        try {
            const data = fs.readFileSync('./data/video.json', 'utf-8')
            const oldlist = JSON.parse(data)
            return oldlist
        } catch (err) {
            console.log('读取视频列表出错');
            console.log(err);
            return null
        }

    }
    if (file == 'user') {
        try {
            const data = fs.readFileSync('./data/user.json', 'utf-8')
            const oldlist = JSON.parse(data)
            return oldlist
        } catch (err) {
            console.log('读取演员列表出错');
            console.log(err);
            return null
        }

    }
    console.log('出现了内部错误，无法解析readFile参数')
}

export const getVideoListData = () => {
    return readFile('video')
}

export const getUserListData = () => {
    return readFile('user')
}