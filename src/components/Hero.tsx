import { ArrowRight, Compass, Feather, ScrollText } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
 
export default function Hero() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section className="relative mx-auto max-w-7xl px-5 pt-14 pb-12">
      <div
        ref={ref}
        className={`relative overflow-hidden rounded-[28px] p-8 md:p-14 reveal ${
          visible ? 'is-visible' : ''
        }`}
      >
        {/* 背景装饰 */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-ink-800/60 via-ink-900/80 to-ink-950/90" />
          <div className="absolute -right-20 -top-20 h-[420px] w-[420px] rounded-full bg-gold-400/20 blur-3xl animate-drift" />
          <div className="absolute -bottom-24 -left-20 h-[360px] w-[360px] rounded-full bg-jade-400/15 blur-3xl animate-drift" />
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, rgba(233,180,76,0.08) 0 1px, transparent 1px 22px), repeating-linear-gradient(-45deg, rgba(122,231,199,0.05) 0 1px, transparent 1px 22px)',
            }}
          />
        </div>
 
        {/* 装饰符号 */}
        <div className="pointer-events-none absolute right-6 top-6 hidden md:flex flex-col items-center gap-2 opacity-80">
          <span className="text-2xl text-gold-400">✶</span>
          <span className="text-xs tracking-[0.4em] text-gold-300/70">VOL · I</span>
        </div>
        <div className="pointer-events-none absolute bottom-6 right-6 text-4xl text-gold-400/50">
          ◈
        </div>
 
        <div className="relative">
          <span className="ornament mb-6">
            <span>Worldbuilding · 档案馆</span>
          </span>
 
          <h1 className="font-display text-5xl font-bold leading-[1.05] md:text-7xl">
            <span className="block text-parchment-50">在深夜的</span>
            <span className="block gold-text italic">羊皮纸上</span>
            <span className="block text-parchment-50">创造一个宇宙。</span>
          </h1>
 
          <p className="mt-6 max-w-xl text-base leading-relaxed text-parchment-100/80 md:text-lg">
            这里收藏着我所构思的每一个世界——它们的人物、设定、片段与时间线。
            欢迎在纸页间漫步，也许有某段回声恰好也来自你。
          </p>
 
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#sections" className="btn-gold">
              开始浏览
              <ArrowRight size={16} />
            </a>
            <a href="#sections" className="btn-ghost">
              <ScrollText size={16} />
              查看目录
            </a>
          </div>
 
          {/* 特性 chips */}
          <div className="mt-10 grid max-w-xl grid-cols-1 gap-3 md:grid-cols-3">
            <Feature icon={<Feather size={16} />} title="人物志" desc="从名字到灵魂" />
            <Feature icon={<Compass size={16} />} title="设定集" desc="地理 · 政治 · 魔法" />
            <Feature icon={<ScrollText size={16} />} title="故事片段" desc="情节 · 时间线" />
          </div>
        </div>
      </div>
    </section>
  );
}
 
function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-gold-400/15 bg-ink-900/40 px-4 py-3">
      <span className="text-gold-400">{icon}</span>
      <div>
        <div className="text-sm font-medium text-parchment-50">{title}</div>
        <div className="text-xs text-parchment-200/70">{desc}</div>
      </div>
    </div>
  );
}