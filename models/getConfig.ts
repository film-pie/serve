import fs from 'fs'
// 读取配置文件
const fileitem = fs.readFileSync('./config.json', 'utf-8')
const config = JSON.parse(fileitem)
// 导出配置文件
export default config