# 学生请假管理系统 · Student Leave Management System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-blue.svg)](https://expressjs.com/)

> 一个简约、现代的前后端分离学生请假系统，支持请假申请、审核、历史记录、住宿/走读分类、数据统计等功能。
>
> A minimal, modern student leave management system with a separated frontend and backend, supporting leave requests, approval, history, boarding/day-student classification, and statistics.

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
- [常见问题 · FAQ](#-常见问题--faq)
- [开源协议 · License](#-开源协议--license)

---

## 🌟 项目介绍 · Introduction

### 中文

**学生请假管理系统** 是一个轻量级、开箱即用的请假管理工具，适合中小学校、班级或培训机构使用。

**设计理念**：
- 🎯 **简约** —— 界面清爽，操作直观，无需培训即可上手
- 🚀 **轻量** —— 前端纯原生 HTML/CSS/JS，后端只需 Node.js，无需数据库
- 📱 **响应式** —— 电脑、平板、手机全适配，移动端使用卡片列表
- 🎨 **现代 UI** —— 自定义下拉框、输入框、动画过渡，视觉体验舒适
- 🔧 **易部署** —— 3 分钟即可跑起来，支持宝塔、Docker、PM2 等多种部署方式

**适用场景**：
- 班主任 / 年级组长管理班级请假
- 培训机构记录学员考勤
- 学校教务处统计请假数据
- 作为 Node.js 全栈练手项目

### English

**Student Leave Management System** is a lightweight, ready-to-use leave management tool, suitable for primary/secondary schools, classes, or training institutions.

**Design principles**:
- 🎯 **Minimal** — Clean UI, intuitive operations, no training required
- 🚀 **Lightweight** — Pure vanilla HTML/CSS/JS frontend, Node.js backend, no database needed
- 📱 **Responsive** — Works on desktop, tablet, and mobile with a card list layout on small screens
- 🎨 **Modern UI** — Custom dropdowns, inputs, and smooth animations for a comfortable experience
- 🔧 **Easy to deploy** — Runs in 3 minutes, supports BT Panel, Docker, PM2, and more

**Use cases**:
- Homeroom teachers managing class leaves
- Training institutions tracking student attendance
- School administration statistics on leave data
- As a Node.js full-stack practice project

---

## ✨ 功能特性 · Features

### 学生端 · Student Side

| 功能 | Feature | 说明 |
|------|---------|------|
| 📋 请假申请 | Leave request | 提交新请假或续假，填写原因 |
| 🕐 请假历史 | Leave history | 查看自己的所有请假记录及审核状态 |
| 🔍 双维度筛选 | Dual filtering | 按状态（已请假/未请假）和类型（住宿/走读）筛选 |
| 🖼️ 导出图片 | Export image | 一键将请假记录导出为 PNG（带版权水印） |
| 📱 移动端适配 | Mobile-friendly | 小屏自动切换为卡片列表 |
| 🔄 快速续假 | Quick extend | 表格行一键续假，无需填写表单 |

### 后台管理 · Admin Panel

| 功能 | Feature | 说明 |
|------|---------|------|
| 🔐 密码登录 | Password login | 简单密码鉴权 |
| ✅ 请假审核 | Review | 单条/批量/全部 通过或驳回 |
| 📜 历史管理 | History management | 增删改学生的请假历史 |
| 👥 学生管理 | Student management | 添加、编辑、删除学生 |
| 🏠 住宿/走读 | Boarding/Day | 学生分类，可批量切换 |
| 📊 数据统计 | Statistics | 学生总数、请假总数、待审核、全勤、人均等 |
| 🔄 批量操作 | Bulk actions | 勾选多个学生统一处理 |
| 💾 一键重置 | One-click reset | 恢复到演示数据 |

### UI 特性 · UI Features

- 🎨 全自定义下拉框和输入框（不用浏览器原生样式）
- ✨ 卡片入场、按钮悬停、图标旋转、数字滚动等动画
- 🌗 学生端浅色主题 / 后台深色主题
- 📱 完整响应式，移动端体验经过优化

---

## 🛠️ 技术栈 · Tech Stack

| 层 | 技术 | Layer | Tech |
|----|------|-------|------|
| 后端 | Node.js + Express | Backend | Node.js + Express |
| 前端 | 原生 HTML + CSS + JavaScript | Frontend | Vanilla HTML + CSS + JavaScript |
| 数据 | 内存存储（演示用） | Data | In-memory (demo) |
| 图标 | Font Awesome 6 | Icons | Font Awesome 6 |
| 字体 | Inter | Font | Inter |
| 截图 | html2canvas | Screenshot | html2canvas |
| 部署 | Nginx / PM2 / Docker | Deploy | Nginx / PM2 / Docker |

> 💡 **为什么不用数据库？** 为了降低部署门槛，当前使用内存存储。重启服务数据会重置。如需持久化，可在 `backend/data/students.js` 中替换为 MySQL / MongoDB 实现。

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
│       └── students.js        # 数据层（内存存储）
│
└── frontend/                  # 前端
    ├── index.html             # 学生端
    └── admin.html             # 后台管理
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

**方法 2**：使用 `.env` 文件（推荐）

1. 复制 `backend/.env.example` 为 `backend/.env`
2. 修改内容：

```env
PORT=3000
ADMIN_PASSWORD=your-strong-password
```

3. 修改 `server.js` 读取环境变量：

```javascript
require('dotenv').config();  // 需要先 npm install dotenv

const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
```

### 修改前端 API 地址 · Change Frontend API Base

打开 `frontend/index.html` 和 `frontend/admin.html`，找到：

```javascript
const API_BASE = 'http://localhost:3000/api';
```

**同域部署**（推荐）：

```javascript
const API_BASE = '/api';
```

**跨域部署**：

```javascript
const API_BASE = 'https://your-api-domain.com/api';
```

---

## 🚢 部署教程 · Deployment

### 方式一：本地运行 · Method 1: Run Locally

适合开发调试、内网使用。

```bash
# 克隆项目
git clone https://github.com/yourname/student-leave-system.git
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

#### 步骤 6：修改前端 API 地址

编辑 `frontend/index.html` 和 `frontend/admin.html`：

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
git clone https://github.com/yourname/student-leave-system.git
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

#### 步骤 7：修改前端 `API_BASE` 为 `/api`（同方式二）

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
```

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

### 接口列表 · Endpoints

| 方法 | Method | 路径 | Endpoint | 说明 | Description | 鉴权 |
|------|--------|------|----------|------|-------------|------|
| POST | POST | `/api/admin/login` | `/api/admin/login` | 管理员登录 | Admin login | ❌ |
| GET | GET | `/api/students` | `/api/students` | 获取所有学生 | Get all students | ❌ |
| GET | GET | `/api/students/:id` | `/api/students/:id` | 获取单个学生 | Get one student | ❌ |
| POST | POST | `/api/leave` | `/api/leave` | 提交请假/续假 | Submit leave | ❌ |
| GET | GET | `/api/stats` | `/api/stats` | 统计数据 | Statistics | ❌ |
| GET | GET | `/api/classes` | `/api/classes` | 班级列表 | Class list | ❌ |
| GET | GET | `/api/students/:id/history` | `/api/students/:id/history` | 请假历史 | Leave history | ❌ |
| POST | POST | `/api/students/:id/history` | `/api/students/:id/history` | 添加历史 | Add history | ✅ |
| PUT | PUT | `/api/students/:id/history/:hid` | `/api/students/:id/history/:hid` | 更新历史 | Update history | ✅ |
| DELETE | DELETE | `/api/students/:id/history/:hid` | `/api/students/:id/history/:hid` | 删除历史 | Delete history | ✅ |
| POST | POST | `/api/students/:id/history/:hid/review` | `/api/students/:id/history/:hid/review` | 审核记录 | Review record | ✅ |
| GET | GET | `/api/admin/pending` | `/api/admin/pending` | 待审核列表 | Pending list | ✅ |
| POST | POST | `/api/admin/students` | `/api/admin/students` | 添加学生 | Add student | ✅ |
| PUT | PUT | `/api/admin/students/:id` | `/api/admin/students/:id` | 更新学生 | Update student | ✅ |
| DELETE | DELETE | `/api/admin/students/:id` | `/api/admin/students/:id` | 删除学生 | Delete student | ✅ |
| POST | POST | `/api/admin/reset` | `/api/admin/reset` | 重置数据 | Reset data | ✅ |
| GET | GET | `/api/health` | `/api/health` | 健康检查 | Health check | ❌ |

### 请求示例 · Request Examples

**提交请假**：

```bash
curl -X POST http://localhost:3000/api/leave \
  -H "Content-Type: application/json" \
  -d '{"studentId":"s1","type":"new","reason":"感冒"}'
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

---

## ❓ 常见问题 · FAQ

<details>
<summary><b>Q1: 重启后数据丢失？</b></summary>

当前使用内存存储，**重启即重置**。如需持久化，请参考下方「扩展方向」，把 `backend/data/students.js` 替换为数据库实现。

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

前端的 `API_BASE` 还是 `http://localhost:3000/api`。手机上 `localhost` 是手机自己，改成：
```javascript
const API_BASE = '/api';
```

</details>

<details>
<summary><b>Q5: 跨域 CORS 错误？</b></summary>

推荐同域部署（前端后端同一域名）。如果必须跨域，后端已启用 `cors()`，检查 `API_BASE` 是否写成了完整域名。

</details>

<details>
<summary><b>Q6: 修改了代码但页面没变化？</b></summary>

浏览器缓存。按 `Ctrl+F5`（Windows）或 `Cmd+Shift+R`（Mac）强制刷新。或者用无痕窗口。

</details>

<details>
<summary><b>Q7: 如何修改演示数据？</b></summary>

编辑 `backend/data/students.js` 顶部的 `students` 数组，或在后台管理界面添加/编辑。

</details>

<details>
<summary><b>Q8: 支持多少个学生？</b></summary>

内存存储适合几十到几百人。上千人建议改用数据库，并加分页。

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