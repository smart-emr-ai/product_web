import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  Brain,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  HeartPulse,
  Send,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react';
import { cn } from './lib/utils';
import { trackEvent, useSectionViewTracking } from './lib/analytics';

const ANALYTICS_SECTIONS = ['hero', 'conflict', 'solution', 'customization', 'value', 'contact'];
const CONTACT_ENDPOINT = 'https://formspree.io/f/xyzkbwpg';
const COMPANY_NAME = '医联智芯智能科技（上海）有限公司';

const asset = (name: string) => `${import.meta.env.BASE_URL}${name}`;

const heroSlides = [
  {
    title: '把时间还给病人，把文书交给 AI。',
    subtitle: '由德国 AI 博士团队与三甲临床专家深度联合，为医生打造的病历生成辅助层。',
    imageWebp: asset('hero_1.webp'),
    position: 'center 10%',
    size: 'cover',
    tone: 'dark',
  },
  {
    title: '每一次自然对谈，都是一份合格病历。',
    subtitle: '实时语义理解、清洗与结构化，一键生成符合国家标准的甲级病历文书。',
    imageWebp: asset('hero_2.webp'),
    position: '120% 30%',
    size: 'auto 130%',
    tone: 'light',
  },
];

const conflictRows = [
  {
    beforeTitle: '医生在诊疗中平均点击鼠标',
    beforeMetric: '400',
    beforeSuffix: '次/小时',
    beforeCopy: '诊疗中的核心认知资源，被文书系统持续侵占。',
    afterTitle: 'AI 实时捕获，医生',
    afterMetric: '只做判断',
    afterCopy: '释放医生认知带宽，AI 捕获临床语义，医生仅需逻辑确认，将精力还给患者。',
  },
  {
    beforeTitle: '传统系统以',
    beforeMetric: '填表 / 计费',
    beforeSuffix: '为导向',
    beforeCopy: '口语表达与规范文书之间存在结构性断层，手动转译耗时且标准难统一。',
    afterTitle: '',
    afterMetric: '95%+',
    afterSuffix: '直接入库率',
    afterCopy: '基于德国 AI 团队算法和三甲临床专家指导，口语化表达自动转化为规范医学文书。',
  },
  {
    beforeTitle: '',
    beforeMetric: '医疗纠纷风险',
    beforeSuffix: '隐性累积',
    beforeCopy: '流水账式记录导致临床上下文一致性极难保证，病历合规依赖事后人工审查。',
    afterTitle: '',
    afterMetric: '100%',
    afterSuffix: '一致性自动校验',
    afterCopy: '生成文书同步深度结构化，自动进行一致性检查，将合规性前置到诊疗过程中。',
  },
];

const solutionScenarios = [
  {
    label: '场景 A：门诊',
    labelStyle: 'bg-blue-500/15 text-blue-100 border-blue-400/30',
    title: '固定语音采集盒提取',
    desc: '桌角放置会呼吸的专属录音盒。医患自然沟通，AI 自动整理为结构化病历；医生签名确认后方可入库。',
    video: asset('Demo_1.mp4'),
  },
  {
    label: '场景 B：住院查房',
    labelStyle: 'bg-cyan-500/15 text-cyan-100 border-cyan-400/30',
    title: '移动终端智能整合',
    desc: '持平板查房实时录音，系统后台静默运行，并自动融合最新 LIS/RIS 检验数据，生成连贯准确的病程记录。',
    video: asset('Demo_2.mp4'),
  },
];

const departments = [
  {
    name: '心血管内科',
    icon: HeartPulse,
    preview: ['主诉：反复胸闷心悸3年，加重伴双下肢水肿3天。', '现病史：患者3年前无明显诱因出现胸闷、心悸，多于劳累后发作。'],
  },
  {
    name: '肾内科',
    icon: Activity,
    preview: ['主诉：双下肢浮肿半年，泡沫尿1个月。', '现病史：患者半年前双下肢水肿，呈凹陷性，休息后未见明显缓解。'],
  },
  {
    name: '神经内科',
    icon: Brain,
    preview: ['主诉：突发言语不清伴右侧肢体无力4小时。', '现病史：患者4小时前安静状态下突发言语不清，右侧偏瘫。'],
  },
  {
    name: '急诊科',
    icon: Stethoscope,
    preview: ['主诉：剧烈腹痛2小时。', '现病史：患者2小时前饱餐后突发中上腹持续性绞痛，阵发性加剧。'],
  },
];

const contactItems = [
  {
    title: '商务咨询',
    desc: '提交需求后 24 小时内响应',
    icon: Send,
  },
  {
    title: '科室演示',
    desc: '按门诊、住院场景准备方案',
    icon: CalendarCheck,
  },
  {
    title: '部署咨询',
    desc: '支持私有化与院内合规对接',
    icon: ShieldCheck,
  },
];

export default function App() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [solutionIndex, setSolutionIndex] = useState(0);
  const [activeDepartment, setActiveDepartment] = useState(0);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useSectionViewTracking(ANALYTICS_SECTIONS);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroIndex((current) => (current + 1) % heroSlides.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, []);

  const activeHero = heroSlides[heroIndex];
  const activeScenario = solutionScenarios[solutionIndex];
  const activeDept = departments[activeDepartment];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <nav className="fixed top-0 z-50 w-full border-b border-white/20 bg-white/80 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-6">
          <a href="#hero" className="flex items-center gap-2" data-umami-event="brand-click">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500">
              <Activity className="h-5 w-5 text-white" />
            </span>
            <span className="text-lg font-bold tracking-tight text-primary-600 sm:text-xl">
              MediCore<span className="hidden font-normal text-slate-400 sm:inline"> 智能病历</span>
            </span>
          </a>

          <div className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
            <a href="#conflict" className="transition-colors hover:text-primary-500">痛点解决</a>
            <a href="#solution" className="transition-colors hover:text-primary-500">核心场景</a>
            <a href="#customization" className="transition-colors hover:text-primary-500">深度定制</a>
            <a href="#contact" className="transition-colors hover:text-primary-500">联系我们</a>
          </div>

          <a
            href="#contact"
            data-umami-event="cta-click"
            data-umami-event-location="navbar"
            className="rounded-full bg-primary-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-primary-600"
          >
            申请试用
          </a>
        </div>
      </nav>

      <section id="hero" className="relative flex min-h-[92vh] items-center overflow-hidden bg-slate-950 pt-24">
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={heroIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-no-repeat"
              style={{
                backgroundImage: `url("${activeHero.imageWebp}")`,
                backgroundPosition: activeHero.position,
                backgroundSize: activeHero.size,
                backgroundColor: activeHero.tone === 'light' ? '#ffffff' : '#0f172a',
              }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,25,70,0.96)] via-[rgba(0,30,80,0.68)] to-[rgba(0,30,80,0.08)]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-16">
          <div className="max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={heroIndex}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              >
                <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {activeHero.title}
                </h1>
                <p className="mb-8 text-lg leading-relaxed text-blue-100/90">
                  {activeHero.subtitle}
                </p>
                <a
                  href="#contact"
                  data-umami-event="cta-click"
                  data-umami-event-location="hero"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-primary-500 px-8 py-4 text-lg font-medium text-white transition hover:bg-primary-600"
                >
                  申请科室试用
                  <ArrowRight className="h-5 w-5" />
                </a>
              </motion.div>
            </AnimatePresence>

            <div className="mt-12 flex gap-2">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.title}
                  onClick={() => {
                    setHeroIndex(index);
                    trackEvent('hero-slide-select', { slide: index + 1 });
                  }}
                  className={cn(
                    'h-1.5 rounded-full transition-all',
                    index === heroIndex ? 'w-12 bg-white' : 'w-8 bg-white/30 hover:bg-white/50',
                  )}
                  aria-label={`切换到首屏 ${index + 1}`}
                  aria-pressed={index === heroIndex}
                />
              ))}
            </div>
          </div>
        </div>

        {heroIndex === 0 && (
          <motion.div
            className="absolute bottom-[10%] right-[6%] z-20 hidden w-[360px] rounded-lg border border-white/20 bg-slate-950/45 p-6 text-left shadow-2xl backdrop-blur-xl lg:block"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-5 flex items-center gap-3 border-b border-white/10 pb-4">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-300 shadow-[0_0_10px_rgba(125,211,252,0.8)]" />
              <p className="text-sm font-semibold tracking-wide text-white">结构化病历生成中</p>
            </div>
            <div className="space-y-3 font-mono text-sm leading-relaxed text-blue-50/90">
              <p>识别临床上下文逻辑...</p>
              <p>映射 HIS 系统标准字段...</p>
              <p className="font-medium text-blue-200">生成临床甲级病历。</p>
            </div>
          </motion.div>
        )}
      </section>

      <section id="conflict" className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              重塑临床生产力，让医生回归诊断本质
            </h2>
            <p className="text-lg text-slate-500">
              改变“填表计费”主导的反临床思维，将“文书负担”转变为“数据资产”。
            </p>
          </div>

          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-lg border border-slate-100 bg-white">
            <div className="absolute left-0 top-0 hidden h-full w-1/2 bg-stone-50 md:block" />
            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-slate-200 md:block" />
            <div className="absolute left-1/2 top-1/2 z-10 hidden h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-primary-600 text-sm font-bold tracking-widest text-white shadow-lg md:flex">
              VS
            </div>

            <div className="relative z-10 space-y-12 px-6 py-10 md:px-10 md:py-14">
              {conflictRows.map((row) => (
                <div key={`${row.beforeMetric}-${row.afterMetric}`} className="grid gap-8 md:grid-cols-2 md:gap-24">
                  <div className="md:text-right">
                    <h3 className="mb-3 text-xl font-semibold leading-relaxed text-slate-800">
                      {row.beforeTitle}
                      <strong className="mx-1 text-2xl font-black tracking-tight text-stone-700 md:text-3xl">
                        {row.beforeMetric}
                      </strong>
                      {row.beforeSuffix}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-500">{row.beforeCopy}</p>
                  </div>
                  <div>
                    <h3 className="mb-3 text-xl font-semibold leading-relaxed text-slate-800">
                      {row.afterTitle}
                      <strong className="mx-1 text-2xl font-black tracking-tight text-primary-600 md:text-3xl">
                        {row.afterMetric}
                      </strong>
                      {row.afterSuffix}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-600">{row.afterCopy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="solution" className="relative overflow-hidden bg-slate-900 py-24 text-white">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">无缝融入每一种临床场景</h2>
            <p className="text-lg text-slate-400">极简硬件集成，无需改变现有工作流。</p>
          </div>

          <div className="relative flex min-h-[520px] items-center overflow-hidden rounded-lg border border-slate-700 bg-slate-800/55 p-6 backdrop-blur-sm md:p-12">
            <button
              onClick={() => {
                setSolutionIndex((current) => (current - 1 + solutionScenarios.length) % solutionScenarios.length);
                trackEvent('solution-slide-prev');
              }}
              className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-600 bg-slate-800 text-white transition hover:bg-slate-700 md:left-5"
              aria-label="上一个场景"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={() => {
                setSolutionIndex((current) => (current + 1) % solutionScenarios.length);
                trackEvent('solution-slide-next');
              }}
              className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-600 bg-slate-800 text-white transition hover:bg-slate-700 md:right-5"
              aria-label="下一个场景"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeScenario.title}
                initial={{ opacity: 0, x: 42 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -42 }}
                transition={{ duration: 0.35 }}
                className="grid w-full items-center gap-10 px-8 md:grid-cols-2 md:px-12"
              >
                <div className="text-center md:text-left">
                  <span className={cn('mb-6 inline-flex rounded-full border px-4 py-1.5 text-sm font-medium', activeScenario.labelStyle)}>
                    {activeScenario.label}
                  </span>
                  <h3 className="mb-5 text-3xl font-semibold leading-tight md:text-4xl">{activeScenario.title}</h3>
                  <p className="mx-auto max-w-lg text-base leading-relaxed text-slate-300 md:mx-0 md:text-lg">
                    {activeScenario.desc}
                  </p>
                </div>

                <div className="relative min-h-[320px] overflow-hidden rounded-lg border border-slate-700 bg-slate-950 shadow-2xl md:min-h-[430px]">
                  <video
                    key={activeScenario.video}
                    src={activeScenario.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 rounded-lg shadow-[inset_0_0_60px_18px_rgba(2,6,23,0.52)]" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section id="customization" className="bg-slate-50 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              每一个科室，都有自己的思维模型。
            </h2>
            <p className="mb-10 text-lg leading-relaxed text-slate-600">
              系统集成在现有医疗信息系统中，高度适应科室特定的术语体系与中西医模板格式。
            </p>

            <div className="space-y-6">
              {[
                ['无感工作流嵌入', '不推翻现有 HIS 系统，作为录入层插件静默运作，转化成本低。'],
                ['专属数据飞轮', '每一次病历修改都会沉淀科室表达习惯，让 AI 随诊疗风格深度进化。'],
                ['三甲级私有底座', '支持私有云部署、等保备案与院内数据安全要求。'],
              ].map(([title, copy]) => (
                <div key={title} className="flex gap-4">
                  <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-100">
                    <span className="h-2 w-2 rounded-full bg-primary-500" />
                  </span>
                  <div>
                    <h3 className="mb-1 font-semibold text-slate-800">{title}</h3>
                    <p className="text-sm leading-relaxed text-slate-500">{copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white p-6 shadow-xl">
            <div className="flex gap-3 overflow-x-auto pb-4">
              {departments.map((dept, index) => {
                const Icon = dept.icon;

                return (
                  <button
                    key={dept.name}
                    onClick={() => {
                      setActiveDepartment(index);
                      trackEvent('department-select', { department: dept.name });
                    }}
                    className={cn(
                      'inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition',
                      activeDepartment === index
                        ? 'bg-primary-500 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
                    )}
                    aria-pressed={activeDepartment === index}
                  >
                    <Icon className="h-4 w-4" />
                    {dept.name}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 min-h-[250px] rounded-lg border border-slate-100 bg-slate-50 p-6 font-mono text-sm leading-relaxed text-slate-700 shadow-inner">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDept.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-4">
                    <span className="font-semibold text-primary-600">模板自动适配：{activeDept.name}</span>
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-600">结构化校验通过</span>
                  </div>
                  {activeDept.preview.map((line) => {
                    const [label, copy] = line.split('：');

                    return (
                      <p key={line} className="mb-3">
                        <strong className="text-slate-600">{label}：</strong>
                        <span className="text-slate-800">{copy}</span>
                      </p>
                    );
                  })}
                  <div className="mt-8 space-y-2 opacity-30">
                    <div className="h-2 w-full rounded-full bg-slate-300" />
                    <div className="h-2 w-4/5 rounded-full bg-slate-300" />
                    <div className="h-2 w-2/3 rounded-full bg-slate-300" />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <section id="value" className="border-t border-slate-100 bg-white py-24">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-2">
          <div>
            <h2 className="mb-8 text-2xl font-bold text-slate-950">核心商业价值</h2>
            <div className="space-y-4">
              {[
                ['95%+', '直接入库率', '无感完成合规标准，无需二次手动修改'],
                ['50%', '文书时间节省', '从每日录入降至重点核对'],
                ['100%', '一致性机审校验', '事前预防上下文矛盾，降低内控及纠纷风险'],
              ].map(([metric, title, copy]) => (
                <div key={metric} className="flex items-center gap-6 rounded-lg border border-slate-100 bg-slate-50 p-6">
                  <div className="w-28 flex-shrink-0 text-4xl font-black tracking-tight text-primary-600 md:w-32 md:text-5xl">
                    {metric}
                  </div>
                  <p className="font-medium text-slate-700">
                    {title}
                    <span className="mt-1 block text-xs font-normal leading-relaxed text-slate-500">{copy}</span>
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-right text-xs tracking-wide text-slate-400">* 基于试点科室真实数据测量</p>
          </div>

          <div className="relative flex min-h-[520px] flex-col overflow-hidden">
            <h2 className="relative z-10 mb-8 text-2xl font-bold text-slate-950">我们的团队</h2>
            <div className="relative z-10 space-y-8 border-l-2 border-slate-100 pl-6">
              <div className="relative">
                <span className="absolute -left-[33px] top-1 h-4 w-4 rounded-full border-4 border-primary-500 bg-white" />
                <h3 className="text-lg font-bold text-slate-800">顶尖技术背景</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  核心研发成员来自德国慕尼黑工业大学人工智能领域硕博团队，长期深耕企业级复杂数据系统与前沿大语言模型微调算法。
                </p>
              </div>
              <div className="relative">
                <span className="absolute -left-[33px] top-1 h-4 w-4 rounded-full border-4 border-primary-500 bg-white" />
                <h3 className="text-lg font-bold text-slate-800">深度临床基因</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  产品工作流设计由国内三甲医院重点科室主任医师全程参与指导，真正做到为医生设计、为医疗所用。
                </p>
              </div>
            </div>
            <img
              src={asset('munich_silhouette.webp')}
              alt=""
              width="640"
              height="640"
              loading="lazy"
              decoding="async"
              className="pointer-events-none absolute bottom-0 right-[-8%] z-0 w-[95%] max-w-none translate-y-[28%] opacity-[0.11] mix-blend-multiply"
            />
          </div>
        </div>
      </section>

      <footer id="contact" className="border-t border-slate-800 bg-slate-900 pb-10 pt-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-16 overflow-hidden rounded-lg bg-primary-600 p-8 text-center text-white shadow-2xl md:p-14">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">开启 3 个月低门槛试用计划</h2>
            <p className="mx-auto mb-8 max-w-xl text-lg text-primary-100">
              提交您的专业信息，我们的临床实施顾问将会在 24 小时内与您取得联系，安排专属演示方案。
            </p>

            <div className="mb-8 grid gap-3 text-left sm:grid-cols-3">
              {contactItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="rounded-lg border border-white/15 bg-white/10 p-4">
                    <Icon className="mb-3 h-5 w-5 text-white" />
                    <p className="mb-1 text-sm font-semibold">{item.title}</p>
                    <p className="text-xs leading-relaxed text-primary-100/85">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            {formStatus === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mx-auto max-w-md rounded-lg border border-white/20 bg-white/10 p-10 text-center backdrop-blur"
              >
                <h3 className="mb-2 text-xl font-bold text-white">提交成功</h3>
                <p className="text-sm text-primary-100">我们的临床实施顾问将在 24 小时内与您联系，请保持电话畅通。</p>
                <button
                  onClick={() => setFormStatus('idle')}
                  className="mt-6 text-xs text-white/70 underline underline-offset-2 transition hover:text-white"
                >
                  重新提交
                </button>
              </motion.div>
            ) : (
              <form
                className="mx-auto max-w-md space-y-4"
                onSubmit={async (event) => {
                  event.preventDefault();
                  setFormStatus('loading');

                  const formData = new FormData(event.currentTarget);

                  try {
                    const response = await fetch(CONTACT_ENDPOINT, {
                      method: 'POST',
                      body: formData,
                      headers: { Accept: 'application/json' },
                    });
                    const nextStatus = response.ok ? 'success' : 'error';
                    setFormStatus(nextStatus);
                    trackEvent('contact-form-submit', { status: nextStatus });
                  } catch {
                    setFormStatus('error');
                    trackEvent('contact-form-submit', { status: 'error' });
                  }
                }}
              >
                <input type="hidden" name="subject" value="MediCore 官网试用申请" />
                <input
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="您的姓名"
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-5 py-3 font-medium text-white placeholder-white/55 transition focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <input
                  type="text"
                  name="hospital"
                  required
                  placeholder="所属医院及科室"
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-5 py-3 font-medium text-white placeholder-white/55 transition focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <input
                  type="tel"
                  name="phone"
                  required
                  autoComplete="tel"
                  placeholder="联系电话"
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-5 py-3 font-medium text-white placeholder-white/55 transition focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                {formStatus === 'error' && (
                  <p className="text-center text-sm text-red-200">提交失败，请检查网络连接后重试。</p>
                )}
                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  data-umami-event="contact-submit-click"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-white py-4 text-lg font-bold text-primary-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {formStatus === 'loading' ? '提交中...' : '立即联系我们'}
                  {formStatus !== 'loading' && <Send className="h-5 w-5" />}
                </button>
                <p className="mt-4 text-xs text-primary-200/70">
                  * 表单提交后会进入 MediCore 官网咨询通道，仅用于试用沟通。
                </p>
              </form>
            )}
          </div>

          <div className="flex flex-col items-center justify-between border-t border-slate-800 pt-8 text-sm text-slate-500 md:flex-row">
            <div className="mb-4 flex items-center gap-2 md:mb-0">
              <Activity className="h-4 w-4 text-slate-400" />
              <span className="font-bold text-slate-400">MediCore | 智能病历生成辅助系统</span>
            </div>
            <p>© {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
