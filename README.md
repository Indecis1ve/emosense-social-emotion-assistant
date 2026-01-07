<img width="1263" height="775" alt="image" src="https://github.com/user-attachments/assets/8f286c52-2ddd-4587-b3f9-0f66e8343022" />

<div align="center">
  <p><strong>An AI-powered social interaction assistant for everyone.</strong></p>
  <p>您的私人社交情绪向导 —— 听懂言外之意，看见情绪色彩。</p>
</div>

---

##  简介 (Introduction)

EmoSense 是一款专为视障人士及需要社交辅助的用户设计的智能应用程序。它致力于通过多模态 AI 技术，打破社交互动中的“隐形壁垒”。

当您上传对话的视频或音频时，内置的 Google Gemini AI 会基于心理学“7-38-55法则”（语言、语调、表情）进行深度分析，为您解读对方的真实情绪、潜在的讽刺意味以及未被言说的社交线索，帮助您更自信地掌控社交场合。



##  核心功能 (Features)

* **多模态深度分析 (Multimodal Analysis)**
    * 集成 Google gemini-1.5-flash 模型。
    * 支持视频与音频文件上传，全方位捕捉社交信号。
    * 7-38-55 法则应用：不仅分析文字内容，更侧重分析语调变化与面部微表情。
   
* **情绪解码与洞察 (Emotion Decoding)**
    * **主导情绪识别**：精准判断对方是快乐、犹豫、愤怒还是讽刺。
    * **言外之意解读**：AI 自动分析“潜台词”，揭示说话者真正的意图。
    * **置信度评估**：为每一个分析结论提供可信度评分。

* **无障碍友好体验 (Accessibility First)**
    * 高对比度 UI：采用 Tailwind CSS 设计的清晰界面，专为视力障碍用户优化。
    * 结构化报告：通过 AnalysisDisplay 组件清晰展示分析结果，支持屏幕阅读器。
    * 社交建议：根据分析结果，提供具体的行动指南（如“建议缓和语气”或“可以继续追问”）。
      
* **隐私与安全 (Privacy & Security)**
    * 客户端处理：API 密钥存储在本地，分析请求直接从您的设备发送至 Google。
    * 无后台留存：所有的音视频文件仅用于即时分析，不会被上传至第三方服务器保存。




##  技术栈 (Tech Stack)

* **前端框架**: React 19, TypeScript, Vite
* **样式库**: Tailwind CSS
* **AI 模型**: Google Generative AI SDK (`@google/genai`)
* **图标库**: Heroicons (Custom Components)
  


## 🚀 快速开始 (Getting Started)

### 环境要求
* Node.js (建议 v16 或更高版本)
* Google Gemini API Key ([点击这里免费申请](https://aistudio.google.com/app/apikey))
* 应用使用时请确保网络可以访问 Google 服务（可能需要 VPN）

### 1. 克隆项目
```bash
git clone https://github.com/您的用户名/emosense-social-emotion-assistant.git
```

### 2. 安装依赖

安装依赖，项目根目录下运行
```bash
npm install
```


### 3. 配置 API 密钥

在项目根目录下创建一个名为 `.env.local` 的文件，并填入您的 Google Gemini API Key：

```bash
GEMINI_API_KEY=your_api_key_here
```

### 4. 运行开发模式

启动本地开发服务器：
```bash
npm run dev
```

打开浏览器访问控制台输出的地址 （通常是 http://localhost:5173） 即可使用。


### 6. 项目结构 (Project Structure)

```markdown
emosense-social-emotion-assistant/
├── .env.local             # [需手动创建] API 密钥配置文件
├── .gitignore             # Git 忽略文件配置
├── App.tsx                # 主应用组件
├── index.html             # 网页入口 HTML
├── index.tsx              # 项目入口文件 (React DOM 挂载)
├── metadata.json          # 项目元数据
├── package.json           # 项目依赖配置
├── README.md              # 项目说明文档
├── tsconfig.json          # TypeScript 配置文件
├── types.ts               # TypeScript 类型定义
├── vite.config.ts         # Vite 配置文件
├── components/            # UI 组件文件夹
│   ├── AnalysisDisplay.tsx  # 分析结果展示组件
│   └── LoadingSpinner.tsx   # 加载状态组件
└── services/              # 服务层文件夹
    └── geminiService.ts     # Gemini AI 调用逻辑
```
##  贡献 (Contributing)

欢迎提交 Issue 或 Pull Request！ 
如果您有关于改善视障用户体验的建议，或者想添加新的情绪分析模型，请随时分享。

##  许可证 (License)

本项目采用 [MIT License](LICENSE) 开源许可证。
