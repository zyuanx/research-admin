# vue-research-admin

## 关于这个项目

> 动态问卷设计发布、数据查看下载
>
> Dynamic form, survey questionnaire frontend system. Back-end repo: [gin-research-sys](https://github.com/Pandalzy/gin-research-sys)

### Work list

-   [x] RBAC 用户管理
-   [x] 问卷创建/修改
-   [x] 问卷列表/数据下载
-   [ ] More
    -   [ ] 日志管理
    -   [ ] 系统负载
    -   [ ] 任务流

### 问卷管理

<img src="./assets/research-create.png" />

<img src="./assets/research-list.png" /><img src="./assets/research-square.png" />

<img src="./assets/record-list.png" />

### Built With

-   [vue](https://vuejs.org/)
-   [vue-admin-template](https://github.com/PanJiaChen/vue-admin-template)

## 开始使用

### 安装

1. clone the project

```sh
git clone https://github.com/Pandalzy/vue-research-admin.git
```

2. enter the project directory

```sh
cd vue-research-admin
```

3. install dependency

```sh
npm install
```

### 配置

Edit `src/util/request.js` file and modify base api.

```python
baseURL: "http://127.0.0.1:8080/api/"
```

### 运行

```sh
npm run serve
```

## License

Distributed under the MIT License. See `LICENSE` for more information.