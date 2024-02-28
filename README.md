# Table of contents
---
[Description](#Description)
[Technology used](<#Technology used>)
[Installation](#Installation)

# Description
---
利用Express.js作為app server實作登入系統，模擬透過session的方式儲存使用者狀態。

# Technology used
+ Node.js and Express.js
    利用Express.js及Node.js建立後端app server
+ Typescript
+ Docker
    利用docker-compose將app server、mysql、redis組合在一起，讓容器間互相溝通
+ Mysql
    儲存使用者資料
+ Redis
    作為cache儲存user的session
---

# Installation

## 1. Configuration
在當前目錄下建立一個.env檔案包含以下資訊
```.env
DB_HOST="your host"
DB_PORT="your port"
DB_USER="your user"
DB_PASSWORD="your password"
DATABASE="your database"
REDIS_URL="your redis url" //format: redis//hostname:port
```

## Database Schema

| Column Name | Data Type | Extra |
| --- | --- | --- |
| id  | INT | AUTO_INCREMENT |
| userName | VARCHAR(255) |
| password | VARCHAR(255) |

## Docker

在確保docker啟動後，進到專案資料夾輸入以下指令。

```shell
npm start && npm deploy
```

## API endpoint

```shell
localhost:3000/login
```

