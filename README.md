# File Pie 服务端主仓库

[主仓库](https://github.com/film-pie/serve) | [后台](https://github.com/film-pie/admin) | [web](https://github.com/film-pie/web)

## 启动服务器

```
yarn start
```

使用npm

```
npm run start
```

## 数据格式

### 数据信息

uid：数据唯一标识号

status：数据状态

数据状态说明：`-1`被删除、`0`状态未知、`1`状态正常

仅状态为1的数据会被公开，其他状态的数据无法被获取，包括后台

### 视频列表数据信息

`/data/video.json`

```
{
    "uid": 1, // 唯一识别号
    "status":1, // 视频状态
    "title": "芒种", // 视频标题
    "info": "登上微博热搜的芒种是什么意思？知道真相的我...", // 视频简介
    "visit": 119, // 视频浏览量
    "download": 514, // 视频下载量
    "score": 1919810, // 视频平分(此数据内容将来会更改)
    "src": "https://cloud.alongw.cn/f/xWFq/%E6%B5%8B%E8%AF%951.mp4", // 视频url
    "img": "/img/banner.png", // 视频封面
    "user": [ // 视频参演列表
        {
            "uid": 0, // 参演人的唯一识别号UID
            "works": "摸鱼的" // 参演角色
        },
        {
            "uid": 1,
            "works": "演员"
        }
    ]
}
```

### 用户列表数据

`/data/user.json`

```
{
    "uid": 1, // 用户唯一识别号UID
    "status": 1, // 用户状态
    "uname": "张三", // 用户显示名称
    "pic": "/img/banner.png", // 用户显示头图
    "info": "专业摸鱼" // 用户显示简介
}
```

### 配置文件详细

`config.json`

```
{
    "port": 10086, // 监听端口
    "password": "admin123", // 登录密码
    "str": "alongw" // 用于加密key的字符串
}
```



## 接口详细

### 公共接口

请求方式：GET

请求路径：/api

#### 请求视频列表

`/getVideoList`

成功服务器响应

```
{        
    status: 200,
    msg: '获取视频列表成功',
    data: data
}
```

失败服务器响应

```
{
	status: 500,
    msg: '服务器出错'
}
```

#### 请求用户列表

`/getUserList`

成功服务器响应

```
{        
    status: 200,
    msg: '获取演员列表成功',
    data: data
}
```

失败服务器响应

```
{
	status: 500,
    msg: '服务器出错'
}
```

#### 请求视频详细数据

`/getVideo`

需传参

```
{
	uid: 视频的唯一uid（数值型）
}
```

成功服务器响应

```
{
	status: 200,
    msg: '获取视频数据成功',
    data: {}
}
```

失败服务器响应

```
{
	status: 500,
    msg: '获取视频数据失败！'
}
```

```
{
	status: 400,
    msg: '需要uid'
}
```

获取视频详细数据与获取视频列表的区别：视频详细数据会包含演员的所有信息，而视频列表仅包含uid和职位

#### 增加视频播放量

`/addVisit`

需传参

```
{
	uid: 视频唯一uid（数值型）
}
```

成功服务器返回

```
{
	status: 200,
    msg: '请求成功'
}
```

失败服务器返回

```
{
	status: 400,
    msg: '请求错误'
}
```

#### 增加视频下载量

`/addDownload`

需传参

```
{
	uid: 视频唯一uid（数值型）
}
```

成功服务器返回

```
{
	status: 200,
    msg: '请求成功'
}
```

失败服务器返回

```
{
	status: 400,
    msg: '请求错误'
}
```

#### 请求key

`/checkPwd`

请求参数

```
{
	password: "password"
}
```

成功服务器响应

```
{
	status: 200,
    msg: '获取秘钥成功',
    data: key
}
```

失败服务器响应

```
{
	status: 401,
    msg: '身份验证失败'
}
```

### 后台接口

请求方式：POST

请求路径：/api/admin

请求参数：

```
{
	key: "key"
}
```

#### 请求视频列表

`/getVideoList`

成功服务器响应

```
{        
    status: 200,
    msg: '获取视频列表成功',
    data: {data}
}
```

失败服务器响应

```
{
	status: 500,
    msg: '服务器出错'
}
```

#### 请求视频详细数据

`/getVideo`

需传参

```
{
	uid: 视频的唯一uid（数值型）
}
```

成功服务器响应

```
{
	status: 200,
    msg: '获取视频数据成功',
    data: {}
}
```

失败服务器响应

```
{
	status: 500,
    msg: '获取视频数据失败！'
}
```

```
{
	status: 400,
    msg: '需要uid'
}
```

获取视频详细数据与获取视频列表的区别：视频详细数据会包含演员的所有信息，而视频列表仅包含uid和职位

#### 请求用户列表

`/getUserList`

成功服务器响应

```
{        
    status: 200,
    msg: '获取演员列表成功',
    data: {data}
}
```

失败服务器响应

```
{
	status: 500,
    msg: '服务器出错'
}
```

#### 添加视频

`/addVideo`

需传参

```
{
	before: true（布尔值，视频是否添加在最前面，不传默认false）,
	data: {
		title: "视频名",
		info: "视频简介",
		src: "视频url",
		img: "视频头图url",
		user: [
			{
				uid: 演员uid（数值型）,
				works: "演员职位"
			},
			{
				uid: 演员uid（数值型）,
				works: "演员职位"
			},
			{
				.....
			}
		]
	}
}
```

成功服务器返回

```
{
    "status": 200,
    "msg": "添加视频成功！"
}
```

失败服务器返回

```
{
    "status": 400,
    "msg": "未提供演员参数"
}
```

#### 修改视频

`/editVideo`

需传参

```
{
	uid: 需要修改视频的uid（数值型）,
	data: {
		title: "视频名",
		info: "视频简介",
		src: "视频url",
		img: "视频头图url",
		user: [
			{
				uid: 演员uid（数值型）,
				works: "演员职位"
			},
			{
				uid: 演员uid（数值型）,
				works: "演员职位"
			},
			{
				.....
			}
		]
	}
}
```

成功服务器返回

```
{
    "status": 200,
    "msg": "修改视频成功！"
}
```

失败服务器返回

```
{
    "status": 400,
    "msg": "未提供视频参数"
}
```

```
{
	status: 400,
    msg: '必须提供视频uid'
}
```

```
{
	status: 500,
    mgs: '数据写入失败'
}
```

注：数据写入失败，可能是因为提供了错误的uid

#### 删除视频

`/delVideo`

需传参

```
{
	uid: 需要删除视频的uid（数值型）
}
```

成功服务器返回

```
{
	status: 200,
    msg: '删除视频成功！'
}
```

失败服务器返回

```
{
	status: 400,
    msg: '未提供视频参数'
}
```

```
{
	status: 500,
    mgs: '删除视频失败'
}
```

注：删除失败，可能是因为提供了错误的uid

#### 添加用户

`/addUser`

需传参

```
{
	data: {
		uname: "演员名",
		pic: "演员头图url",
		info: "演员简介"
	}
}
```

成功服务器返回

```
{
    "status": 200,
    "msg": "添加演员成功！"
}
```

失败服务器返回

```
{
    "status": 400,
    "msg": "未提供演员参数"
}
```

#### 修改用户

`/editUser`

需传参

```
{
	uid: 要修改用户的uid（数值型）,
	data: {
		uname: "演员名",
		pic: "演员头图url",
		info: "演员简介"
	}
}
```

成功服务器返回

```
{
    "status": 200,
    "msg": "修改演员成功！"
}
```

失败服务器返回

```
{
    "status": 400,
    "msg": "未提供演员参数"
}
```

```
{
	status: 400,
    msg: '必须提供演员uid'
}
```

```
{
	status: 500,
    mgs: '数据写入失败'
}
```

注：数据写入失败，可能是因为提供了错误的uid

#### 删除用户

`/delUser`

需传参

```
{
	uid: 需要删除用户的uid（数值型）
}
```

成功服务器返回

```
{
	status: 200,
    msg: '删除演员成功！'
}
```

失败服务器返回

```
{
	status: 400,
    msg: '未提供演员参数'
}
```

```
{
	status: 500,
    mgs: '删除演员失败'
}
```

注：删除失败，可能是因为提供了错误的uid
