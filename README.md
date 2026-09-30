# 学生请假管理系统 · Student Leave Management System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-blue.svg)](https://expressjs.com/)
[![Version](https://img.shields.io/badge/Version-7.0.3--Release-blue.svg)]()

> 一个简约、现代的前后端分离学生请假管理系统，支持请假申请、审核、历史记录、晚到管理、住宿/走读分类、数据统计、图片导出等功能。
>
> A minimal, modern student leave management system with separated frontend and backend, supporting leave requests, approval, history records, late arrival management, boarding/day-student classification, statistics, and image export.

---

## 📖 目录 · Table of Contents

- [项目介绍 · Introduction](#-项目介绍--introduction)
- [功能特性 · Features](#-功能特性--features)
- [技术栈 · Tech Stack](#-技术栈--tech-stack)
- [项目结构 · Project Structure](#-项目结构--project-structure)
- [快速开始 · Quick Start](#-快速开始--quick-start)
- [配置 · Configuration](#-配置--configuration)
- [部署教程 · Deployment](#-部署教程--deployment)
  - [方式一：本地运行](#方式一本地运行--method-1-run-locally)
  - [方式二：宝塔面板 + Nginx](#方式二宝塔面板--nginx--method-2-bt-panel--nginx)
  - [方式三：PM2 + Nginx](#方式三pm2--nginx--method-3-pm2--nginx)
  - [方式四：Docker](#方式四docker--method-4-docker)
- [API 文档 · API Reference](#-api-文档--api-reference)
- [数据说明 · Data Notes](#-数据说明--data-notes)
- [常见问题 · FAQ](#-常见问题--faq)
- [扩展方向 · Roadmap](#-扩展方向--roadmap)
- [开源协议 · License](#-开源协议--license)

---

## 🌟 项目介绍 · Introduction

### 中文

**学生请假管理系统** 是一个轻量级、开箱即用的请假管理工具，适合中小学校、班级或培训机构使用。系统采用前后端分离架构，前端为纯原生 HTML/CSS/JS，后端基于 Node.js + Express。

**设计理念**：
- 🎯 **简约** —— 界面清爽，操作直观，无需培训即可上手
- 🚀 **轻量** —— 前端纯原生 HTML/CSS/JS，后端只需 Node.js，无需数据库
- 📱 **响应式** —— 电脑、平板、手机全适配，移动端自动切换为卡片列表
- 🎨 **现代 UI** —— 全自定义下拉框、日期/时间选择器、动画过渡，视觉体验舒适
- 🔧 **易部署** —— 3 分钟即可跑起来，支持宝塔、Docker、PM2 等多种部署方式
- 💾 **文件持久化** —— 数据自动保存至 `db.json`，重启不丢失

**适用场景**：
- 班主任 / 年级组长管理班级请假
- 培训机构记录学员考勤
- 学校教务处统计请假与晚到数据
- 作为 Node.js 全栈练手项目

### English

**Student Leave Management System** is a lightweight, ready-to-use leave management tool, suitable for primary/secondary schools, classes, or training institutions. It adopts a separated frontend-backend architecture with vanilla HTML/CSS/JS frontend and Node.js + Express backend.

**Design principles**:
- 🎯 **Minimal** — Clean UI, intuitive operations, no training required
- 🚀 **Lightweight** — Pure vanilla frontend, Node.js backend, no database needed
- 📱 **Responsive** — Works on desktop, tablet, and mobile with card layout on small screens
- 🎨 **Modern UI** — Custom dropdowns, date/time pickers, and smooth animations
- 🔧 **Easy to deploy** — Runs in 3 minutes, supports BT Panel, Docker, PM2, and more
- 💾 **File persistence** — Data auto-saved to `db.json`, survives restarts

**Use cases**:
- Homeroom teachers managing class leaves
- Training institutions tracking student attendance
- School administration statistics on leave and late data
- As a Node.js full-stack practice project

---

## ✨ 功能特性 · Features

### 学生端 · Student Side

| 功能 | Feature | 说明 |
|------|---------|------|
| 📋 请假申请 | Leave request | 提交新请假、续假或销假，可填写原因与预计到校时间 |
| 🕐 请假历史 | Leave history | 查看自己的所有请假记录及审核状态 |
| ⏰ 晚到申请 | Late arrival request | 提交晚到申请，填写日期、时间、原因 |
| ⏰ 晚到记录 | Late records | 查看所有晚到记录及审核状态 |
| 🔍 双维度筛选 | Dual filtering | 按状态（在假/未在假）和类型（住宿/走读）筛选 |
| 🖼️ 导出图片 | Export image | 一键将请假/晚到记录导出为 PNG（带版权水印） |
| 📱 移动端适配 | Mobile-friendly | 小屏自动切换为卡片列表 |
| 🔄 快速续假/销假 | Quick extend/return | 表格行一键操作，无需填写表单 |
| 🔗 连接状态检测 | Connection check | 实时显示后端连接状态 |

### 后台管理 · Admin Panel

| 功能 | Feature | 说明 |
|------|---------|------|
| 🔐 密码登录 | Password login | 简单密码鉴权，Token 存储于 localStorage |
| ✅ 请假审核 | Leave review | 单条/批量/全部 通过或驳回 |
| ⏰ 晚到审核 | Late review | 单条/批量 通过或驳回，可标记是否到校 |
| 📜 历史管理 | History management | 增删改学生的请假历史与晚到记录 |
| 👥 学生管理 | Student management | 添加、编辑、删除学生 |
| 🏠 住宿/走读 | Boarding/Day | 学生分类，可批量切换 |
| 📊 数据统计 | Statistics | 学生总数、请假总数、晚到总数、待审核、全勤、人均等 |
| 🔄 批量操作 | Bulk actions | 勾选多个学生统一处理 |
| 💾 一键重置 | One-click reset | 重置单个学生或恢复全部演示数据 |
| 🎨 三 Tab 布局 | Three-tab layout | 学生管理 / 请假审核 / 晚到管理 |

### UI 特性 · UI Features

- 🎨 全自定义下拉框、日期选择器、时间选择器（不用浏览器原生样式）
- ✨ 卡片入场、按钮悬停、图标旋转、数字滚动、骨架屏等动画
- 📱 完整响应式，移动端体验经过优化
- 🔔 Toast 提示、自定义 Confirm/Prompt 弹窗
- 🎯 浮动面板智能定位（防穿模、自动上翻）

---

## 🛠️ 技术栈 · Tech Stack

| 层 | 技术 | Layer | Tech |
|----|------|-------|------|
| 后端 | Node.js + Express | Backend | Node.js + Express |
| 前端 | 原生 HTML + CSS + JavaScript | Frontend | Vanilla HTML + CSS + JavaScript |
| 数据 | JSON 文件存储（`db.json`） | Data | JSON file storage (`db.json`) |
| 图标 | Font Awesome 6 | Icons | Font Awesome 6 |
| 字体 | Inter | Font | Inter |
| 截图 | html2canvas | Screenshot | html2canvas |
| 部署 | Nginx / PM2 / Docker | Deploy | Nginx / PM2 / Docker |

> 💡 **数据持久化**：当前使用 JSON 文件存储（`backend/data/db.json`），重启服务数据不会丢失。如需更高性能或并发支持，可将 `students.js` 中的存储层替换为 MySQL / MongoDB。

---

## 📁 项目结构 · Project Structure

```
student-leave-system/
├── LICENSE                    # MIT 协议
├── README.md                  # 本文档
├── .gitignore                 # Git 忽略配置
│
├── backend/                   # 后端
│   ├── package.json
│   ├── server.js              # Express 服务入口
│   ├── .env.example           # 环境变量示例
│   └── data/
│       ├── students.js        # 数据层（JSON 文件存储）
│       └── db.json            # 数据文件（自动生成）
│
└── frontend/                  # 前端
    ├── index.html             # 学生端
    ├── admin.html             # 后台管理
    └── tx.png                 # 网站图标
```

---

## 🚀 快速开始 · Quick Start

### 前置要求 · Requirements

- **Node.js** ≥ 18（推荐 20 LTS）
- **npm** ≥ 9
- 或 **Docker**（可选）

### 3 步启动 · 3 Steps

```bash
# 1. 安装依赖
cd backend
npm install

# 2. 启动服务
npm start

# 3. 打开浏览器
# 学生端：http://localhost:3000/
# 后台：http://localhost:3000/admin.html
```

**默认后台密码**：`admin123`

### 开发模式 · Dev Mode

```bash
cd backend
npm run dev    # 使用 nodemon 自动重启
```

---

## ⚙️ 配置 · Configuration

### 修改端口 · Change Port

**方法 1**：编辑 `backend/server.js`

```javascript
const PORT = process.env.PORT || 3000;
```

**方法 2**：使用环境变量

```bash
PORT=8080 npm start
```

### 修改后台密码 · Change Admin Password

**方法 1**：编辑 `backend/server.js`

```javascript
const ADMIN_PASSWORD = 'your-new-password';
```

**方法 2**：使用环境变量（推荐）

```bash
ADMIN_PASSWORD=your-strong-password npm start
```

### 修改前端 API 地址 · Change Frontend API Base

打开 `frontend/index.html` 和 `frontend/admin.html`，找到：

```javascript
const API_BASE = '/api';
```

**同域部署**（推荐，默认）：保持 `/api` 不变。

**跨域部署**：

```javascript
const API_BASE = 'https://your-api-domain.com/api';
```

### 修改网站图标 · Change Favicon

替换 `frontend/tx.png` 即可。

---

## 🚢 部署教程 · Deployment

### 方式一：本地运行 · Method 1: Run Locally

适合开发调试、内网使用。

```bash
# 克隆项目
git clone https://github.com/Lruriawa/student-leave-system.git
cd student-leave-system/backend

# 安装依赖（国内镜像加速）
npm install --registry=https://registry.npmmirror.com

# 启动
npm start
```

访问 `http://localhost:3000/`

**让局域网其他设备访问**：

找到服务器的内网 IP（如 `192.168.1.100`），其他设备访问 `http://192.168.1.100:3000/`

---

### 方式二：宝塔面板 + Nginx · Method 2: BT Panel + Nginx

适合生产环境，通过域名访问。

#### 步骤 1：上传项目

用宝塔 **文件** 功能，将项目上传到 `/www/wwwroot/student-leave-system/`

#### 步骤 2：安装依赖并测试

宝塔 → **终端**：

```bash
cd /www/wwwroot/student-leave-system/backend
npm install --registry=https://registry.npmmirror.com
npm start
```

看到 `✅ 后端服务已启动: http://localhost:3000` 说明成功。按 `Ctrl+C` 停止（后面用 PM2 守护）。

#### 步骤 3：用 PM2 守护进程

宝塔 → **软件商店** → 安装 **PM2管理器** → 打开 PM2管理器：

- 项目名称：`student-leave`
- 启动文件：`/www/wwwroot/student-leave-system/backend/server.js`
- 运行目录：`/www/wwwroot/student-leave-system/backend`
- 端口：`3000`
- 点击 **启动**

#### 步骤 4：添加站点

宝塔 → **网站** → **添加站点**：

- 域名：`your-domain.com`
- 根目录：`/www/wwwroot/student-leave-system/frontend`
- PHP 版本：**纯静态**
- 其他默认

#### 步骤 5：配置反向代理

**方式 A**：用宝塔的反向代理功能

宝塔 → 网站 → `your-domain.com` → 设置 → **反向代理** → 添加：

- 代理名称：`node-api`
- 目标 URL：`http://127.0.0.1:3000`
- 发送域名：`$host`

**方式 B**：手动编辑配置（更可控）

宝塔 → 网站 → 设置 → **配置文件**，在 `server { }` 内加入：

```nginx
location ^~ /api/ {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_read_timeout 300s;
}
```

⚠️ **注意**：`proxy_pass` 末尾**不能加斜杠**，否则 `/api` 前缀会被去掉。

#### 步骤 6：确认前端 API 地址

确保 `frontend/index.html` 和 `frontend/admin.html` 中：

```javascript
const API_BASE = '/api';
```

#### 步骤 7：申请 SSL 证书

宝塔 → 网站 → 设置 → **SSL** → **Let's Encrypt** → 申请

#### 步骤 8：访问测试

| 网址 | 预期 |
|------|------|
| `https://your-domain.com/` | 学生端页面 |
| `https://your-domain.com/admin.html` | 后台管理 |
| `https://your-domain.com/api/health` | JSON `{"status":"ok"}` |

---

### 方式三：PM2 + Nginx · Method 3: PM2 + Nginx

适合没有宝塔的 Linux 服务器。

#### 步骤 1：安装 Node.js

```bash
# 使用 nvm 安装（推荐）
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20
```

#### 步骤 2：克隆项目并安装依赖

```bash
git clone https://github.com/Lruriawa/student-leave-system.git
cd student-leave-system/backend
npm install --registry=https://registry.npmmirror.com
```

#### 步骤 3：安装 PM2

```bash
npm install -g pm2
```

#### 步骤 4：启动服务

```bash
pm2 start server.js --name student-leave
pm2 save
pm2 startup  # 开机自启
```

#### 步骤 5：配置 Nginx

```bash
sudo nano /etc/nginx/sites-available/student-leave
```

粘贴：

```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /path/to/student-leave-system/frontend;
    index index.html;

    location ^~ /api/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

启用站点并重载：

```bash
sudo ln -s /etc/nginx/sites-available/student-leave /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### 步骤 6：配置 HTTPS（Let's Encrypt）

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

### 方式四：Docker · Method 4: Docker

适合快速部署、环境隔离。

#### 1. 创建 `Dockerfile`

在项目根目录创建 `Dockerfile`：

```dockerfile
FROM node:20-alpine

WORKDIR /app

# 安装后端依赖
COPY backend/package*.json ./backend/
RUN cd backend && npm install --registry=https://registry.npmmirror.com --production

# 复制源码
COPY backend/ ./backend/
COPY frontend/ ./frontend/

EXPOSE 3000

WORKDIR /app/backend
CMD ["node", "server.js"]
```

#### 2. 创建 `docker-compose.yml`

```yaml
version: '3.8'

services:
  app:
    build: .
    container_name: student-leave
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - PORT=3000
      - ADMIN_PASSWORD=your-strong-password
    volumes:
      - ./backend/data:/app/backend/data  # 持久化数据
```

> 💡 挂载 `data` 目录可保证 `db.json` 数据在容器重建后不丢失。

#### 3. 构建并运行

```bash
docker-compose up -d
```

访问 `http://your-server-ip:3000/`

#### 4. 用 Nginx 反代（可选）

参考「方式三」第 5 步，把 `proxy_pass` 指向 `http://127.0.0.1:3000`。

---

## 🔌 API 文档 · API Reference

### 鉴权 · Authentication

后台接口需要请求头：

```
x-admin-token: <管理员密码>
```

或在 URL 中携带 `?token=<管理员密码>`。

### 接口列表 · Endpoints

#### 公共接口 · Public

| 方法 | Method | 路径 | Endpoint | 说明 | Description | 鉴权 |
|------|--------|------|----------|------|-------------|------|
| POST | POST | `/api/admin/login` | `/api/admin/login` | 管理员登录 | Admin login | ❌ |
| GET | GET | `/api/students` | `/api/students` | 获取所有学生 | Get all students | ❌ |
| GET | GET | `/api/students/:id` | `/api/students/:id` | 获取单个学生 | Get one student | ❌ |
| POST | POST | `/api/leave` | `/api/leave` | 提交请假/续假/销假 | Submit leave | ❌ |
| GET | GET | `/api/stats` | `/api/stats` | 统计数据 | Statistics | ❌ |
| GET | GET | `/api/classes` | `/api/classes` | 班级列表 | Class list | ❌ |
| GET | GET | `/api/students/:id/history` | `/api/students/:id/history` | 请假历史 | Leave history | ❌ |
| POST | POST | `/api/late` | `/api/late` | 提交晚到申请 | Submit late arrival | ❌ |
| GET | GET | `/api/students/:id/late` | `/api/students/:id/late` | 晚到记录 | Late records | ❌ |
| GET | GET | `/api/health` | `/api/health` | 健康检查 | Health check | ❌ |

#### 请假历史管理 · Leave History (Admin)

| 方法 | Method | 路径 | Endpoint | 说明 | Description | 鉴权 |
|------|--------|------|----------|------|-------------|------|
| POST | POST | `/api/students/:id/history` | `/api/students/:id/history` | 添加历史 | Add history | ✅ |
| PUT | PUT | `/api/students/:id/history/:hid` | `/api/students/:id/history/:hid` | 更新历史 | Update history | ✅ |
| DELETE | DELETE | `/api/students/:id/history/:hid` | `/api/students/:id/history/:hid` | 删除历史 | Delete history | ✅ |
| POST | POST | `/api/students/:id/history/:hid/review` | `/api/students/:id/history/:hid/review` | 审核记录 | Review record | ✅ |
| POST | POST | `/api/students/:id/review-all` | `/api/students/:id/review-all` | 审核该生全部待审 | Review all pending | ✅ |
| GET | GET | `/api/admin/pending` | `/api/admin/pending` | 待审核请假列表 | Pending leave list | ✅ |
| GET | GET | `/api/admin/reviewed` | `/api/admin/reviewed` | 已审核请假列表 | Reviewed leave list | ✅ |

#### 晚到管理 · Late Records (Admin)

| 方法 | Method | 路径 | Endpoint | 说明 | Description | 鉴权 |
|------|--------|------|----------|------|-------------|------|
| POST | POST | `/api/students/:id/late` | `/api/students/:id/late` | 添加晚到 | Add late record | ✅ |
| PUT | PUT | `/api/students/:id/late/:lid` | `/api/students/:id/late/:lid` | 更新晚到 | Update late record | ✅ |
| DELETE | DELETE | `/api/students/:id/late/:lid` | `/api/students/:id/late/:lid` | 删除晚到 | Delete late record | ✅ |
| POST | POST | `/api/students/:id/late/:lid/review` | `/api/students/:id/late/:lid/review` | 审核晚到 | Review late record | ✅ |
| GET | GET | `/api/admin/late/pending` | `/api/admin/late/pending` | 待审核晚到列表 | Pending late list | ✅ |

#### 学生管理 · Student Management (Admin)

| 方法 | Method | 路径 | Endpoint | 说明 | Description | 鉴权 |
|------|--------|------|----------|------|-------------|------|
| POST | POST | `/api/admin/students` | `/api/admin/students` | 添加学生 | Add student | ✅ |
| PUT | PUT | `/api/admin/students/:id` | `/api/admin/students/:id` | 更新学生信息 | Update student | ✅ |
| DELETE | DELETE | `/api/admin/students/:id` | `/api/admin/students/:id` | 删除学生 | Delete student | ✅ |
| POST | POST | `/api/admin/students/:id/reset` | `/api/admin/students/:id/reset` | 重置该生请假 | Reset student leaves | ✅ |
| POST | POST | `/api/admin/reset` | `/api/admin/reset` | 重置全部数据 | Reset all data | ✅ |

### 请求示例 · Request Examples

**提交请假**：

```bash
curl -X POST http://localhost:3000/api/leave \
  -H "Content-Type: application/json" \
  -d '{"studentId":"s1","type":"new","reason":"感冒","expectedReturn":"14:00"}'
```

**提交晚到**：

```bash
curl -X POST http://localhost:3000/api/late \
  -H "Content-Type: application/json" \
  -d '{"studentId":"s1","date":"2025-03-20","time":"08:30","reason":"堵车"}'
```

**管理员登录**：

```bash
curl -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"password":"admin123"}'
```

**获取学生列表（带鉴权）**：

```bash
curl http://localhost:3000/api/students \
  -H "x-admin-token: admin123"
```

**审核请假记录**：

```bash
curl -X POST http://localhost:3000/api/students/s1/history/h1/review \
  -H "Content-Type: application/json" \
  -H "x-admin-token: admin123" \
  -d '{"status":"approved"}'
```

---

## 💾 数据说明 · Data Notes

### 数据结构

学生对象包含以下字段：

```javascript
{
  id: 's1',                    // 学生 ID
  name: '张明',                // 姓名
  class: '三年级1班',          // 班级
  type: 'boarding',            // 类型：boarding（住宿）/ day（走读）
  leaveCount: 2,               // 累计请假次数（自动计算）
  lastLeave: '2025-03-10',     // 最近请假日期（自动计算）
  reason: '感冒',              // 最近请假原因（自动计算）
  onLeave: false,              // 是否在假中（自动计算）
  history: [                   // 请假历史
    {
      id: 'h1',
      date: '2025-03-08',
      type: 'new',             // new（新请假）/ extend（续假）/ return（销假）
      reason: '感冒',
      status: 'approved',      // approved / rejected / pending
      expectedReturn: '14:00'  // 预计到校时间
    }
  ],
  lateRecords: [               // 晚到记录
    {
      id: 'l1',
      date: '2025-03-15',
      time: '08:20',
      reason: '路上堵车',
      status: 'approved',      // approved / rejected / pending
      recorder: '学生本人',    // 记录人
      arrived: true            // 是否到校：true / false / null
    }
  ]
}
```

### 统计逻辑

- **leaveCount**：`history` 中 `status === 'approved'` 且 `type !== 'return'` 的记录数
- **onLeave**：按日期排序后，最后一条已通过记录的类型是否为 `return`
- **晚到计数**：`lateRecords` 中 `status === 'approved'` 的记录数

### 数据存储位置

- 数据文件：`backend/data/db.json`
- 首次启动时自动从 `DEFAULT_STUDENTS` 创建
- 每次写操作自动保存

### 重置数据

- **单个学生**：后台 → 学生列表 → 重置按钮
- **全部数据**：调用 `POST /api/admin/reset` 或重启前删除 `db.json`

---

## ❓ 常见问题 · FAQ

<details>
<summary><b>Q1: 重启后数据会丢失吗？</b></summary>

**不会**。数据自动保存至 `backend/data/db.json`，重启服务后自动加载。如需重置为演示数据，删除 `db.json` 后重启，或调用 `POST /api/admin/reset`。

</details>

<details>
<summary><b>Q2: 部署后访问显示 404 / Cannot GET /</b></summary>

检查：
1. Nginx 配置里 `root` 是否指向 `frontend` 目录
2. 前端文件是否上传成功
3. 是否重启了 Nginx

</details>

<details>
<summary><b>Q3: API 请求 404 或返回 HTML？</b></summary>

Nginx 反代配置问题。检查：
1. `location ^~ /api/` 是否存在
2. `proxy_pass` 末尾**不能有** `/`
3. 保存后是否重载 Nginx
4. 直接访问 `https://your-domain.com/api/health` 测试

</details>

<details>
<summary><b>Q4: 手机访问前端页面，数据加载不出来？</b></summary>

前端的 `API_BASE` 可能还是完整域名。改成同域路径：
```javascript
const API_BASE = '/api';
```
手机上 `localhost` 是手机自己，无法访问电脑的后端。

</details>

<details>
<summary><b>Q5: 跨域 CORS 错误？</b></summary>

推荐同域部署（前端后端同一域名）。如果必须跨域，后端已启用 `cors()`，检查 `API_BASE` 是否写成了完整域名，以及后端 `cors()` 是否允许该来源。

</details>

<details>
<summary><b>Q6: 修改了代码但页面没变化？</b></summary>

浏览器缓存。按 `Ctrl+F5`（Windows）或 `Cmd+Shift+R`（Mac）强制刷新。或者用无痕窗口。

</details>

<details>
<summary><b>Q7: 如何修改演示数据？</b></summary>

编辑 `backend/data/students.js` 顶部的 `DEFAULT_STUDENTS` 数组，删除 `db.json` 后重启即可生效。或在后台管理界面直接添加/编辑。

</details>

<details>
<summary><b>Q8: 支持多少个学生？</b></summary>

JSON 文件存储适合几十到几百人。上千人建议改用数据库，并加分页。

</details>

<details>
<summary><b>Q9: 如何修改后台密码？</b></summary>

编辑 `backend/server.js` 中的 `ADMIN_PASSWORD` 常量，或通过环境变量传入：
```bash
ADMIN_PASSWORD=your-strong-password npm start
```

</details>

<details>
<summary><b>Q10: 导出的图片没有版权水印？</b></summary>

导出时会自动在表格下方显示版权页脚（`#exportFooter`），确保该元素未被 CSS 隐藏。如果自定义了样式，请保留该元素。

</details>

---

## 🎯 扩展方向 · Roadmap

- [ ] 数据库支持（MySQL / MongoDB）
- [ ] 多管理员账号 + JWT
- [ ] 请假附件上传
- [ ] 邮件 / 短信通知
- [ ] 班级维度统计图表
- [ ] 导出 Excel
- [ ] PWA 离线支持
- [ ] i18n 国际化
- [ ] 操作日志与审计
- [ ] 请假审批流（多级审批）

---

## 🤝 贡献 · Contributing

欢迎提交 Issue 和 Pull Request！

```bash
# Fork → Clone → Branch → Commit → Push → PR
git checkout -b feature/your-feature
git commit -m "feat: your feature"
git push origin feature/your-feature
```

---

## 📄 开源协议 · License

本项目采用 [MIT](LICENSE) 协议开源。

This project is licensed under the [MIT](LICENSE) License.

---

## ⭐ Star History

如果这个项目对你有帮助，欢迎点个 ⭐ Star！

If this project helps you, please give it a ⭐ Star!

---

## 📧 联系 · Contact

- 问题反馈：[GitHub Issues](https://github.com/Lruriawa/student-leave-system/issues)
- 邮箱：lruriawa@lruriawa.top

---

<p align="center">Made with ❤️ by <a href="https://lruriawa.top">Aurora.歆Official</a></p>
