# Recipe App

一个全栈菜谱应用，可以浏览、搜索菜肴并查看详细的食材和步骤。

## 技术栈

| 层    | 技术                                  |
| ----- | ------------------------------------- |
| 前端  | React 19 + TypeScript + Tailwind CSS 4 |
| 后端  | Node.js + Express (TypeScript)        |
| 数据库 | MySQL 8.0                             |
| 构建  | Vite 8                                |

## 快速开始

### 前置要求

- Node.js >= 18
- MySQL 8.0

### 1. 安装依赖

```bash
# 根目录（用于 concurrently 一键启动）
npm install

# 前端
cd client && npm install

# 后端
cd server && npm install
```

### 2. 创建数据库

```bash
mysql -u root -p
```

```sql
CREATE DATABASE IF NOT EXISTS recipe_app
  DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE recipe_app;

CREATE TABLE dishes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  description VARCHAR(500) NOT NULL
);

CREATE TABLE ingredients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  dish_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  amount VARCHAR(50) NOT NULL,
  FOREIGN KEY (dish_id) REFERENCES dishes(id)
);

CREATE TABLE steps (
  id INT AUTO_INCREMENT PRIMARY KEY,
  dish_id INT NOT NULL,
  step_number INT NOT NULL,
  instruction VARCHAR(500) NOT NULL,
  FOREIGN KEY (dish_id) REFERENCES dishes(id)
);
```

### 3. 配置数据库连接

编辑 `server/src/database.ts`，修改 MySQL 连接信息：

```ts
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'your_password',  // 改为你的密码
  database: 'recipe_app',
  waitForConnections: true,
  connectionLimit: 10,
});
```

### 4. 启动开发服务器

```bash
npm run dev
```

这会同时启动：
- **前端** → http://localhost:5173
- **后端** → http://localhost:3001

也可单独启动：

```bash
npm run client:dev   # 仅前端
npm run server:dev   # 仅后端
```

## API

| 方法   | 路径                  | 说明         |
| ------ | --------------------- | ------------ |
| GET    | `/api/dishes`         | 获取所有菜肴 |
| GET    | `/api/dishes?search=` | 按菜名搜索   |
| GET    | `/api/dishes/:id`     | 获取菜肴详情 |

## 项目结构

```
recipe-app/
├── client/                    # 前端 (Vite + React + Tailwind)
│   └── src/
│       ├── components/        # SearchBox, DishCard, PopularDishes
│       ├── pages/             # HomePage, DetailPage
│       ├── services/api.ts    # API 请求封装
│       ├── types/index.ts     # TypeScript 类型定义
│       ├── App.tsx            # 路由定义
│       ├── main.tsx           # 入口
│       └── index.css          # Tailwind 入口
├── server/                    # 后端 (Express + MySQL)
│   └── src/
│       ├── index.ts           # 服务入口 (端口 3001)
│       ├── database.ts        # MySQL 连接池
│       └── routes/dishes.ts   # API 路由
├── package.json               # 根配置，一键启动脚本
└── PROJECT_SUMMARY.txt        # 项目详细说明
```
