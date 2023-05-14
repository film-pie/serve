// 判断是否首次启动
import fs from 'fs'
try {
    fs.readFileSync('./data/lock', 'utf-8')
} catch (error) {
    // 首次打开，生成对应文件
    fs.copyFileSync('./example-file/user.json', './data/user.json');
    fs.copyFileSync('./example-file/video.json', './data/video.json');
    fs.copyFileSync('./example-file/config.json', './config.json');
    fs.writeFileSync('./data/lock', '请不要随意删除或修改此文件，此文件为安装锁。若您需要将本程序恢复出厂设置，则可以直接将此文件删除', 'utf-8')
    console.log('首次启动，已生成对应配置文件，请修改')
    process.exit(0);

}
fs.writeFileSync('./data/lock', '请不要随意删除或修改此文件，此文件为安装锁。若您需要将本程序恢复出厂设置，则可以直接将此文件删除', 'utf-8')
