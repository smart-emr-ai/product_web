import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HeartPulse, 
  Stethoscope, 
  Brain, 
  Activity,
  ArrowRight,
  Send,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from './lib/utils';



export default function App() {
  const [activeDepartment, setActiveDepartment] = useState(0);
  const [heroIndex, setHeroIndex] = useState(0);
  const [solutionIndex, setSolutionIndex] = useState(0);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const solutionScenarios = [
    {
      label: "场景 A：门诊",
      labelStyle: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      title: "固定语音采集盒提取",
      desc: <>桌角放置会呼吸的专属录音盒。医生陈述：<span className="text-slate-200 italic">“患者反复头痛三天”</span>，右侧屏幕自动填入“主诉”一栏。支持一句话纠错微调。</>,
      prompt: "[Nano Banana Prompt]: highly detailed sleek black smart microphone box with a soft cyan breathing LED ring sitting on a tidy wooden doctor's desk. High tech aesthetic, cinematic lighting, 8k."
    },
    {
      label: "场景 B：住院查房",
      labelStyle: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      title: "移动终端智能整合",
      desc: "持 Pad 查房实时录音，系统后台静默运行，并自动融合最新 LIS/RIS 检验数据，生成连贯准确的病程记录。",
      prompt: "[Nano Banana Prompt]: an iPad pro displaying a clean medical UI app being held by a doctor in a hospital ward. High tech aesthetic, cinematic lighting, 8k."
    }
  ];

  const handleNextSolution = () => {
    setSolutionIndex((prev) => (prev + 1) % solutionScenarios.length);
  };

  const handlePrevSolution = () => {
    setSolutionIndex((prev) => (prev - 1 + solutionScenarios.length) % solutionScenarios.length);
  };

  // Auto-playing hero carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % 2);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const heroContent = [
    {
      title: "把时间还给病人，把文书交给 AI。",
      subtitle: "由德国 AI 博士团队与三甲临床专家深度联合，为医生打造的病历生成辅助层。",
      visualPrompt: "[Nano Banana Prompt]: Professional photography, a doctor in a clean white coat working in a modern clinical setting with soft natural window light, looking attentively at a patient (out of frame). High end medical environment, cinematic lighting, medical blue and white tones, depth of field, 8k resolution, photorealistic. Overlay a semi-transparent futuristic UI card floating with clinical text.",
      image: "/hero_1.png",
      bgPosition: "center 10%",
      bgSize: "cover",
      bgColor: "#0f172a",
      uiType: "card"
    },
    {
      title: "每一次自然对谈，都是一份标准病历。",
      subtitle: "实时语义理解、清洗与结构化，一键生成符合国家标准的甲级病历文书。",
      visualPrompt: "[Nano Banana Prompt]: A glowing futuristic 3D funnel diagram in a super clean white studio environment. Top of the funnel shows scattered audio wave icons, the middle shows AI neural network nodes glowing in medical blue, and the bottom outputs neat, structured medical documents. Glassmorphism style, isometric 3D, volumetric lighting, tech-medical aesthetic, highly detailed.",
      image: "/hero_2.png",
      bgPosition: "120% 30%",
      bgSize: "auto 130%",
      bgColor: "#ffffff",
      uiType: "none"
    }
  ];

  const departments = [
    { name: '心血管内科', icon: HeartPulse, preview: "主诉：反复胸闷心悸3年，加重伴双下肢水肿3天。\n现病史：患者3年前无明显诱因出现胸闷、心悸，多于劳累后发作..." },
    { name: '肾内科', icon: Activity, preview: "主诉：双下肢浮肿半年，泡沫尿1个月。\n现病史：患者半年前双下肢水肿，呈凹陷性，休息后未见明显缓解..." },
    { name: '神经内科', icon: Brain, preview: "主诉：突发言语不清伴右侧肢体无力4小时。\n现病史：患者4小时前安静状态下突发言语不清，右侧偏瘫..." },
    { name: '急诊科', icon: Stethoscope, preview: "主诉：剧烈腹痛2小时。\n现病史：患者2小时前饱餐后突发中上腹持续性绞痛，阵发性加剧，向腰背部放射..." },
  ];

  return (
    <div className="font-sans text-slate-800 bg-slate-50 min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-white/20 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center">
              <Activity className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-primary-600">MediAI<span className="text-slate-400 font-normal">.doc</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#hero" className="hover:text-primary-500 transition-colors">首页</a>
            <a href="#conflict" className="hover:text-primary-500 transition-colors">痛点解决</a>
            <a href="#solution" className="hover:text-primary-500 transition-colors">核心场景</a>
            <a href="#customization" className="hover:text-primary-500 transition-colors">深度定制</a>
            <a href="#contact" className="hover:text-primary-500 transition-colors">联系我们</a>
          </div>
          <a href="#contact" className="px-5 py-2 rounded-full bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition-transform hover:scale-105 active:scale-95">
            申请试用
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden min-h-[90vh] lg:min-h-[100vh] flex items-center bg-slate-900">
        
        {/* Full Bleed Background Images with Crossfade */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={heroIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 bg-no-repeat transition-colors duration-700"
              style={{ 
                backgroundImage: `url(${heroContent[heroIndex].image})`,
                backgroundPosition: heroContent[heroIndex].bgPosition,
                backgroundSize: heroContent[heroIndex].bgSize || 'cover',
                backgroundColor: heroContent[heroIndex].bgColor || 'transparent'
              }}
            />
          </AnimatePresence>
          {/* Deep Blue Gradient Mask: Left opaque, Right transparent */}
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-[rgba(0,25,70,0.95)] via-[rgba(0,30,80,0.65)] to-[rgba(0,30,80,0.1)] pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-20 w-full">
          <div className="max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={heroIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] text-white mb-6 tracking-tight">
                  {heroContent[heroIndex].title}
                </h1>
                <p className="text-lg text-blue-100/90 leading-relaxed mb-8 font-light">
                  {heroContent[heroIndex].subtitle}
                </p>
                <a href="#contact" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary-500 text-white font-medium text-lg hover:bg-primary-600 transition-all hover:shadow-[0_0_20px_rgba(0,74,153,0.5)] gap-2 group border border-white/10">
                  申请科室试用
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            </AnimatePresence>

            {/* Carousel Indicators */}
            <div className="flex gap-2 mt-12">
              {heroContent.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setHeroIndex(idx)}
                  className={cn(
                    "w-12 h-1.5 rounded-full transition-all duration-300",
                    idx === heroIndex ? "bg-white" : "bg-white/30 hover:bg-white/50"
                  )}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Floating AI Generation Card - Bottom Right (1/3) with Glassmorphism */}
        <div className="absolute right-[5%] lg:right-[15%] bottom-[5%] lg:bottom-[15%] z-30 hidden md:block">
          <AnimatePresence mode="wait">
            {heroContent[heroIndex].uiType === 'card' && (
              <motion.div 
                key="card-1"
                className="bg-[rgba(0,15,35,0.4)] backdrop-blur-xl border border-white/20 p-6 lg:p-8 rounded-2xl w-80 lg:w-[420px] text-left shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/10">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                  <div className="text-sm font-semibold text-white tracking-wide">结构化病历生成中...</div>
                </div>
                <div className="space-y-4 font-mono text-sm text-blue-50/90 leading-relaxed font-light">
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "100%", opacity: 1 }}
                    transition={{ delay: 0.5, duration: 2, ease: "linear" }}
                    className="overflow-hidden whitespace-nowrap block"
                  >
                    <span className="text-blue-400 mr-2">▶</span>深度识别临床上下文逻辑...
                  </motion.div>
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "100%", opacity: 1 }}
                    transition={{ delay: 2.5, duration: 1.5, ease: "linear" }}
                    className="overflow-hidden whitespace-nowrap block"
                  >
                    <span className="text-blue-400 mr-2">▶</span>自动映射 HIS 系统标准化字段...
                  </motion.div>
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "100%", opacity: 1 }}
                    transition={{ delay: 4.0, duration: 1.0, ease: "linear" }}
                    className="overflow-hidden whitespace-nowrap block text-blue-300 font-medium"
                  >
                    <span className="text-blue-400 mr-2">▶</span>生成临床甲级病历。
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Conflict Section (痛点剧场) */}
      <section id="conflict" className="py-20 md:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">重塑临床生产力，让医生回归诊断本质</h2>
            <p className="text-slate-500 text-lg">改变“填表计费”主导的反临床思维，将“文书负担”转变为“数据资产”</p>
          </div>

          <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden py-10 md:py-16 px-4 md:px-0">
            {/* Left background representing the past/pain */}
            <div className="absolute left-0 top-0 bottom-0 w-full md:w-1/2 bg-stone-50/50 md:bg-stone-50/80 z-0" />
            
            {/* Continuous Vertical midline */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2 hidden md:block z-0" />
            
            {/* VS Badge absolutely centered in the whole block */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex w-14 h-14 bg-primary-600 rounded-full shadow-lg items-center justify-center text-white font-bold tracking-widest border-4 border-white">
              VS
            </div>

            <div className="space-y-16 md:space-y-20 relative z-10">
              
              {/* Row 1 / Efficiency */}
              <div className="grid md:grid-cols-2 gap-8 md:gap-24 relative items-center">
                {/* Left */}
                <div className="text-left md:text-right flex flex-col justify-center px-6 md:px-0">
                  <h3 className="text-xl font-semibold text-slate-800 mb-3 leading-[1.6]">
                    医生在诊疗中平均点击鼠标
                    <strong className="text-2xl md:text-3xl font-black text-[#5C4033] mx-1 align-baseline tracking-tight">400</strong>
                    次/小时
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">诊疗中的核心认知资源，被文书系统持续侵占。</p>
                </div>
                {/* Right */}
                <div className="text-left flex flex-col justify-center px-6 md:px-0">
                  <h3 className="text-xl font-semibold text-slate-800 mb-3 leading-[1.6]">
                    AI实时捕获，医生
                    <strong className="text-2xl md:text-3xl font-black text-primary-600 mx-1 align-baseline tracking-tight">只做判断</strong>
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">释放医生认知带宽，AI实时捕获临床语义，医生仅需逻辑确认，将精力还给患者。</p>
                </div>
              </div>

              {/* Row 2 / Quality */}
              <div className="grid md:grid-cols-2 gap-8 md:gap-24 relative items-center">
                {/* Left */}
                <div className="text-left md:text-right flex flex-col justify-center px-6 md:px-0 order-2 md:order-1">
                  <h3 className="text-xl font-semibold text-slate-800 mb-3 leading-[1.6]">
                    传统系统以
                    <strong className="text-2xl md:text-3xl font-black text-[#5C4033] mx-1 align-baseline tracking-tight">"填表"</strong>
                    和 
                    <strong className="text-2xl md:text-3xl font-black text-[#5C4033] mx-1 align-baseline tracking-tight">"计费"</strong>
                    为导向
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">口语表达与规范文书之间存在结构性断层，手动转译耗时且标准难统一，将医生异化为数据录入员。</p>
                </div>
                {/* Right */}
                <div className="text-left flex flex-col justify-center px-6 md:px-0 order-1 md:order-2">
                  <h3 className="text-xl font-semibold text-slate-800 mb-3 leading-[1.6]">
                    <strong className="text-2xl md:text-3xl font-black text-primary-600 mr-1 align-baseline tracking-tight">95%+</strong>
                    直接入库率
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">基于德国AI团队算法和三甲医院临床专家指导，口语化表达自动转化为规范医学文书，无需手动修改。</p>
                </div>
              </div>

              {/* Row 3 / Compliance */}
              <div className="grid md:grid-cols-2 gap-8 md:gap-24 relative items-center">
                {/* Left */}
                <div className="text-left md:text-right flex flex-col justify-center px-6 md:px-0 order-2 md:order-1">
                  <h3 className="text-xl font-semibold text-slate-800 mb-3 leading-[1.6]">
                    <strong className="text-2xl md:text-3xl font-black text-[#5C4033] mr-1 align-baseline tracking-tight">医疗纠纷风险</strong>
                    隐性累积
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">病历被视为文书负担而非资产。流水账式记录导致临床上下文一致性极难保证，病历合规依赖事后人工审查。</p>
                </div>
                {/* Right */}
                <div className="text-left flex flex-col justify-center px-6 md:px-0 order-1 md:order-2">
                  <h3 className="text-xl font-semibold text-slate-800 mb-3 leading-[1.6]">
                    <strong className="text-2xl md:text-3xl font-black text-primary-600 mr-1 align-baseline tracking-tight">100%</strong>
                    一致性自动校验
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">生成文书同步深度结构化。自动进行一致性检查，将合规性从“事后补救”升维至“事前预防”。</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Solution Demo (双场景交互) */}
      <section id="solution" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          {/* Subtle grid pattern */}
          <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">无缝融入每一种临床场景</h2>
            <p className="text-slate-400 text-lg">极简硬件集成，无需改变现有工作流</p>
          </div>

          <div className="w-full bg-slate-800/50 border border-slate-700 rounded-3xl p-6 md:p-12 mb-16 relative backdrop-blur-sm min-h-[500px] flex items-center justify-center">
             
             {/* Slider Controls */}
             <button 
                onClick={handlePrevSolution}
                className="absolute left-2 md:-left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-slate-800 border border-slate-600 rounded-full flex items-center justify-center text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500 z-20 shadow-xl transition-all hover:scale-110"
             >
                <ChevronLeft className="w-6 h-6" />
             </button>
             
             <button 
                onClick={handleNextSolution}
                className="absolute right-2 md:-right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-slate-800 border border-slate-600 rounded-full flex items-center justify-center text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500 z-20 shadow-xl transition-all hover:scale-110"
             >
                <ChevronRight className="w-6 h-6" />
             </button>

             <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
               <AnimatePresence mode="wait">
                 <motion.div
                   key={solutionIndex}
                   initial={{ opacity: 0, x: 50 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -50 }}
                   transition={{ duration: 0.4 }}
                   className="w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 px-4 md:px-8"
                 >
                    {/* Text Area */}
                    <div className="flex-1 space-y-6 text-center md:text-left">
                       <div className={cn("inline-flex items-center px-4 py-1.5 rounded-full border text-sm font-medium", solutionScenarios[solutionIndex].labelStyle)}>
                         {solutionScenarios[solutionIndex].label}
                       </div>
                       <h3 className="text-3xl md:text-4xl font-semibold leading-tight">{solutionScenarios[solutionIndex].title}</h3>
                       <p className="text-slate-400 leading-relaxed text-base md:text-lg max-w-lg mx-auto md:mx-0">
                         {solutionScenarios[solutionIndex].desc}
                       </p>
                    </div>

                    {/* Image Placeholder Area */}
                    <div className="flex-1 w-full min-h-[350px] md:min-h-[450px] bg-slate-900 rounded-2xl flex flex-col items-center justify-center p-6 border border-slate-700 shadow-2xl relative group overflow-hidden">
                        <div className="text-sm font-medium text-slate-500 mb-6 px-4 py-1 rounded-full border border-slate-700 bg-slate-800 shadow-inner z-10 w-max">
                            Visual Animation Placeholder
                        </div>
                        <p className="text-slate-400 text-xs text-center border border-dashed border-slate-700 p-6 rounded-xl font-mono leading-relaxed max-w-sm z-10 bg-slate-900/80 backdrop-blur">
                            {solutionScenarios[solutionIndex].prompt}
                        </p>
                        {/* Soft visual glow matching scenario color */}
                        <div className={cn(
                          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 blur-[100px] opacity-20 pointer-events-none rounded-full transition-colors duration-1000",
                          solutionIndex === 0 ? "bg-blue-500" : "bg-purple-500"
                        )} />
                    </div>
                 </motion.div>
               </AnimatePresence>
             </div>
             
             {/* Pagination Dots */}
             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
               {solutionScenarios.map((_, i) => (
                 <button
                   key={i}
                   onClick={() => setSolutionIndex(i)}
                   className={cn(
                     "w-2.5 h-2.5 rounded-full transition-all focus:outline-none",
                     i === solutionIndex ? "bg-white w-8" : "bg-slate-600 hover:bg-slate-400"
                   )}
                   aria-label={`Go to slide ${i + 1}`}
                 />
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* Customization (深度定制化) */}
      <section id="customization" className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">每一个科室，都有自己的思维模型。</h2>
              <p className="text-slate-600 text-lg mb-10 leading-relaxed">
                我们不改变您的工作习惯。系统集成在现有医疗信息系统中，高度适应科室特定的术语体系与中西医模板格式。
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-primary-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">无感工作流嵌入</h4>
                    <p className="text-slate-500 text-sm">不推翻现有传统 HIS 系统，作为其录入层插件静默运作，转化成本极低。</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-primary-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">专属数据飞轮</h4>
                    <p className="text-slate-500 text-sm">每一次对病历的更改，都是在完成一次临床思维的同步。系统会实时沉淀您的表达习惯，让 AI 随您的诊疗风格深度进化</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-primary-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">三甲级私有底座</h4>
                    <p className="text-slate-500 text-sm">支持私有云部署方案，等保备案通过，满足三甲医院严苛的数据出域合规要求。</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-32 bg-primary-500/5 rounded-full blur-3xl z-0" />
              
              <div className="relative z-10 flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
                {departments.map((dept, index) => {
                  const Icon = dept.icon;
                  return (
                    <button
                      key={dept.name}
                      onClick={() => setActiveDepartment(index)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                        activeDepartment === index 
                          ? "bg-primary-500 text-white shadow-md"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {dept.name}
                    </button>
                  );
                })}
              </div>

              <div className="relative z-10 mt-6 bg-slate-50 rounded-2xl p-6 border border-slate-100 font-mono text-sm leading-relaxed text-slate-700 min-h-[250px] shadow-inner">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeDepartment}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200">
                      <span className="font-semibold text-primary-600">模板自动适配: {departments[activeDepartment].name}</span>
                      <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full animate-pulse">✓ 结构化校验通过</span>
                    </div>
                    {departments[activeDepartment].preview.split('\n').map((line, i) => (
                      <p key={i} className="mb-2">
                        {line.includes('：') ? (
                          <>
                            <strong className="text-slate-600">{line.split('：')[0]}：</strong>
                            <span className="text-slate-800">{line.split('：')[1]}</span>
                          </>
                        ) : line}
                      </p>
                    ))}
                    <div className="mt-8 pt-4 space-y-2 opacity-30">
                      <div className="h-2 w-full bg-slate-300 rounded-full" />
                      <div className="h-2 w-4/5 bg-slate-300 rounded-full" />
                      <div className="h-2 w-2/3 bg-slate-300 rounded-full" />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ROI & Team Elements */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          
          {/* ROI */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-slate-900">核心商业价值 (ROI)</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-100/80">
                <div className="w-28 md:w-32 flex-shrink-0">
                  <span className="text-5xl font-black text-primary-600 tracking-tight">95<span className="text-3xl">% +</span></span>
                </div>
                <p className="text-slate-600 font-medium">直接入库率<br/><span className="text-xs text-slate-500 font-normal mt-1 block">无感完成合规标准，无需二次手动修改</span></p>
              </div>
              <div className="flex items-center gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-100/80">
                <div className="w-28 md:w-32 flex-shrink-0">
                  <span className="text-5xl font-black text-primary-600 tracking-tight">50<span className="text-3xl">%</span></span>
                </div>
                <p className="text-slate-600 font-medium">文书时间节省<br/><span className="text-xs text-slate-500 font-normal mt-1 block">从每日2小时录入降至仅需核对</span></p>
              </div>
              <div className="flex items-center gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-100/80">
                <div className="w-28 md:w-32 flex-shrink-0">
                  <span className="text-5xl font-black text-primary-600 tracking-tight">100<span className="text-3xl">%</span></span>
                </div>
                <p className="text-slate-600 font-medium">一致性机审校验<br/><span className="text-xs text-slate-500 font-normal mt-1 block">事前预防上下文矛盾，大幅降低内控及纠纷风险</span></p>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-4 text-right pr-2 tracking-wide">* 基于试点科室真实数据测量</p>
          </div>

          {/* Team */}
          <div className="flex flex-col justify-start h-full relative group">
            <h3 className="text-2xl font-bold mb-8 text-slate-900 relative z-10">我们的团队</h3>
            <div className="space-y-8 relative pl-6 border-l-2 border-slate-100 z-10">
              <div className="relative">
                <div className="absolute -left-[33px] top-1 w-4 h-4 rounded-full bg-white border-4 border-primary-500" />
                <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  顶尖技术背景
                </h4>
                <p className="mt-2 text-slate-600 leading-relaxed text-sm">
                  核心研发成员均来自德国慕尼黑工业大学人工智能领域硕博团队，长期深耕企业级复杂数据系统与前沿大语言模型微调算法，拥有千万级工业数据处理经验。
                </p>
              </div>
              <div className="relative">
                <div className="absolute -left-[33px] top-1 w-4 h-4 rounded-full bg-white border-4 border-primary-500" />
                <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  深度临床基因
                </h4>
                <p className="mt-2 text-slate-600 leading-relaxed text-sm">
                  产品工作流设计由国内三甲医院（肾内科等重点科室）主任医师全程深度参与指导。真正做到“为医生设计，为医疗所用”。
                </p>
              </div>
            </div>

            {/* Munich Skyline Watermark */}
            <div className="mt-6 md:mt-auto relative w-full flex-grow min-h-[160px] md:min-h-[240px] overflow-hidden pointer-events-none z-0">
                <img 
                   src="/munich_silhouette.png?v=5" 
                   alt="Munich Skyline Watermark" 
                   className="absolute bottom-0 right-[-10%] md:right-[-5%] w-[110%] md:w-[90%] max-w-none opacity-[0.11] mix-blend-multiply transition-transform duration-1000 origin-bottom group-hover:scale-[1.04] translate-y-[28%]" 
                />
            </div>
          </div>
        </div>
      </section>

      {/* Footer & Contact Form */}
      <footer id="contact" className="bg-slate-900 border-t border-slate-800 pt-20 pb-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-primary-600 rounded-3xl p-10 md:p-16 text-center text-white mb-20 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">开启 3 个月低门槛试用计划</h2>
            <p className="text-primary-100 mb-10 max-w-xl mx-auto relative z-10 text-lg">
              提交您的专业信息，我们的临床实施顾问将会在 24 小时内与您取得联系，安排专属演示方案。
            </p>
            
            {/* Contact Form via Web3Forms */}
            {formStatus === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md mx-auto relative z-10 bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-10 text-center"
              >
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-white mb-2">提交成功！</h3>
                <p className="text-primary-100 text-sm">我们的临床实施顾问将在 24 小时内与您联系，请保持电话畅通。</p>
                <button
                  onClick={() => setFormStatus('idle')}
                  className="mt-6 text-xs text-white/50 hover:text-white transition-colors underline underline-offset-2"
                >重新提交</button>
              </motion.div>
            ) : (
              <form
                className="max-w-md mx-auto relative z-10 space-y-4"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setFormStatus('loading');
                  const formData = new FormData(e.currentTarget);
                  formData.append('access_key', '08e647fa-8372-4420-8260-46892d8c9993');
                  try {
                    const res = await fetch('https://api.web3forms.com/submit', {
                      method: 'POST',
                      body: formData,
                    });
                    const data = await res.json();
                    setFormStatus(data.success ? 'success' : 'error');
                  } catch {
                    setFormStatus('error');
                  }
                }}
              >
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="您的姓名"
                  className="w-full px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all font-medium"
                />
                <input
                  type="text"
                  name="hospital"
                  required
                  placeholder="所属医院及科室"
                  className="w-full px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all font-medium"
                />
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="联系电话"
                  className="w-full px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all font-medium"
                />
                {formStatus === 'error' && (
                  <p className="text-red-300 text-sm text-center">提交失败，请检查网络连接后重试。</p>
                )}
                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="w-full py-4 rounded-xl bg-white text-primary-600 font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {formStatus === 'loading' ? '提交中...' : '立即联系我们'}
                  {formStatus !== 'loading' && <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                </button>
                <p className="text-xs text-primary-200/60 font-mono mt-4">
                  * 本表单经 Web3Forms 安全加密接入，提交即送达专属邮箱通道。
                </p>
              </form>
            )}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between text-slate-500 text-sm border-t border-slate-800 pt-8">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
               <Activity className="w-4 h-4 text-slate-400" />
               <span className="font-bold text-slate-400">MediAI | 医用级专业辅助</span>
            </div>
            <p>© {new Date().getFullYear()} MediAI Team. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
