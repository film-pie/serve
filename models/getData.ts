import fs from 'fs'

const readFile = (file: string) => {
  if (file == 'video') {
    try {
      const data = fs.readFileSync('./data/video.json', 'utf-8')
      const fileitem = JSON.parse(data)
      return fileitem
    } catch (err) {
      console.log('读取视频列表出错')
      console.log(err)
      return null
    }
  }
  if (file == 'user') {
    try {
      const data = fs.readFileSync('./data/user.json', 'utf-8')
      const fileitem = JSON.parse(data)
      return fileitem
    } catch (err) {
      console.log('读取演员列表出错')
      console.log(err)
      return null
    }
  }
  console.log('出现了内部错误，无法解析readFile参数')
}

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
    | {
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
export const getVideoListData = (): Video[] => {
  return readFile('video')
}

export const getUserListData = (): User[] => {
  return readFile('user')
}
