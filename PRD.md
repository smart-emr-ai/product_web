网站产品原型文档：智能病历产品介绍页面

## 一、 整体设计风格 (Design Identity)

- **色彩规范**：深邃医用蓝 (#004A99)、科技灰 (#F4F7F9)、极简白。
- **视觉感受**：参考讯飞医疗https://www.xunfeihealthcare.com/，采用大量留白和高清实拍场景（专业实拍风格，nano banana生成），强调专业度、信赖感。
- **核心逻辑**：首页即产品，不设过多层级，通过滚动自然完成“共鸣 -> 验证 -> 转化”。

## 二、 首页原型模块详细说明

### 1. Hero Section (首屏：核心价值)

**文案：**
交互方式：左右自动渐变滚动轮播。

文案一：

- 主标题：把时间还给病人，把文书交给 AI。
- 副标题：由德国 AI 博士团队与三甲临床专家深度联合，为医生打造的病历生成辅助层 。
- 视觉：一张半透明蒙版的医生工作图。右侧悬浮一个动态变化的“病历生成卡片”。
- **[Nano Banana 提示词]**: Professional photography, a doctor in a clean white coat working in a modern clinical setting with soft natural window light, looking attentively at a patient (out of frame). High end medical environment, cinematic lighting, medical blue and white tones, depth of field, 8k resolution, photorealistic. Overlay a semi-transparent futuristic UI card floating with clinical text.

文案二：

- 主标题：每一次自然对谈，都是一份标准病历。
- 视觉：**“漏斗图”**。漏斗顶端：大量非结构化的医患沟通语音。漏斗中部：AI 超级大脑进行语义理解、清洗与结构化。漏斗底部：输出符合国家标准的甲级病历文书。
- **[Nano Banana 提示词]**: A glowing futuristic 3D funnel diagram in a super clean white studio environment. Top of the funnel shows scattered audio wave icons, the middle shows AI neural network nodes glowing in medical blue, and the bottom outputs neat, structured medical documents. Glassmorphism style, isometric 3D, volumetric lighting, tech-medical aesthetic, highly detailed.

CTA按钮：[申请科室试用] （跳转底部分页联系表格）

### 2. 痛点剧场 (The Conflict) — 修订版
主标题： 重塑临床生产力，让医生回归诊断本质
副标题： 改变"填表计费"主导的反临床思维，将“文书负担”转变为“数据资产”
呈现形式： 3组横向对比条目，左侧为现状数据/问题，右侧为对应解决成效，中间竖线分割。左侧配灰色系+数据大字，右侧配品牌蓝系+成效数据大字，整体保持克制专业的视觉语言。

内容条目：
条目一（效率维度）

左：（主）医生在诊疗中平均点击鼠标400次/小时 （副）诊疗中的核心认知资源，被文书系统持续侵占
右：（主）AI实时捕获，医生只做判断 （副）释放医生认知带宽，AI实时捕获临床语义，医生仅需逻辑确认，将精力还给患者。

条目二（质量维度）

左：（主）传统系统以"填表"和"计费"为导向 （副） 口语表达与规范文书之间存在结构性断层，手动转译耗时且标准难以统一，将医生异化为数据录入员。
右：（主）95%+ 直接入库率 （副） 基于德国AI团队算法和三甲医院临床专家指导，口语化表达自动转化为规范医学文书，无需手动修改。

条目三（合规维度）

左：（主）医疗纠纷风险隐性累积  （副） 病历被视为文书负担而非资产。流水账式记录导致临床上下文一致性极难保证，病依赖事后人工审查历合规，
右：（主）100% 一致性自动校验 （副） 生成文书同步深度结构化。自动进行一致性检查，将合规性从“事后补救”升维至“事前预防”。


视觉规范补充：

400、95%+、100% 三个数字单独放大至 font-size: 3rem，加粗，作为每行视觉锚点
左侧数字用中性深灰 #333，右侧数字用品牌蓝 #004A99，形成隐性冷暖对比而非情绪对比
竖向分割线贯穿三条，中点放置"VS"徽章，尺寸适中，品牌蓝填充



### 3. 核心演示：双场景交互交互式 GIF (The Solution)

交互方式：目前的纯视觉背景演示，支持左右场景对比。
场景 A：门诊——固定语音采集盒 。展示：会呼吸的专属录音盒抓取并提取主诉。
场景 B：住院——手持 Pad/移动终端 。展示：后台静默与 LIS/RIS 数据整合。
**针对演示 GIF 的 [Nano Banana 提示词]**: Split screen GIF concept. Left: a highly detailed sleek black smart microphone box with a soft cyan breathing LED ring sitting on a tidy wooden doctor's desk. Right: an iPad pro displaying a clean medical UI app being held by a doctor in a hospital ward. High tech aesthetic, cinematic lighting, 8k.

### 4. 核心竞争力：深度定制化 (The Customization)

文案：每一个科室，都有自己的思维模型。
交互形式：通过点击 Tab 标签切换（如心血管内科、肾内科等），右方随动平稳展现定制化排版，并通过代码骨架屏动画凸显定制的灵活性与智能装载过程。
内容：
工作流嵌入：不改变现有 HIS 系统，作为录入层无感存在 。
个性化模板：为不同科室定制专属病历结构，支持 10+ 科室专用模板 。
数据飞轮：医生每一次微调修改，都会让系统更懂该科室的表达方式 。
安全合规：等保备案、数据安全评估。可支持私有化部署，满足三甲医院数据出域要求。

### 5. 商业价值：可量化的 ROI (The Value)

核心指标展示（用大字号加粗）：
95%+ 直接入库率（无需手动修改即可达到合规要求）。
30% - 50% 文书时间节省 。
100% 临床上下文一致性检查，降低医疗纠纷风险 。

### 6. 关于我们：(The Team)

顶尖技术基因
核心研发成员均来自德国慕尼黑工业大学人工智能领域硕博团队，长期深耕企业级复杂数据系统与前沿大语言模型微调算法，拥有千万级工业数据处理经验。

深度临床基因
产品工作流设计由国内三甲医院（肾内科等重点科室）主任医师全程深度参与指导。真正做到“为医生设计，为医疗所用”。

### 底部分页

“立即开启 3 个月低门槛试用计划”，按钮【申请试用】，底部通过卡片展示联系表单，引导转化，降低获客成本。
**技术方案：** 使用 Formspree 做免后端的表单收集服务（当前使用 action="https://formspree.io/f/xyzkbwpg"），前端仅作视觉和必填校验，后续修改 action ID 即可投入获客使用。

## 三、 页面交互逻辑 (Interaction Logic)

模块交互效果目的导航栏磨砂玻璃质感，随滚动改变背景。营造高端科技感（讯飞风）。首屏自动播放支持 6 秒定时的自然平滑滚动动画，减少用户手动点击压力。痛点对比剧场采用极简卡片和图标罗列，使用高质感的空间排版展示密集内容。科室定制化展示点击科室，无缝平滑加载内容骨架效果，直观呈现内容结构化适配能力。

## 四、 开发约定与技术栈配置 (Tech Stack)

- **框架**：React 18 + Vite
- **系统样式**：Tailwind CSS v4
- **动效库**：Framer Motion (用于首屏轮播、卡片加载及科室内容自动渐变加载效果)
- **图标**：Lucide React
- **部署就绪**：零后端设计，纯前端响应式输出，随时可作为 SSG 产物部署于各大前端云托管服务。
