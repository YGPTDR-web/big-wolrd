import { ArrowLeft, Tag } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ItemCard from '../components/ItemCard';
import LayerTabs from '../components/LayerTabs';
import { useReveal } from '../hooks/useReveal';
import { getWorldItems, useStore } from '../store';
import { LAYER_DESC, LAYER_LABELS } from '../types';
import type { LayerKey } from '../types';
 
export default function WorldDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const worlds = useStore((s) => s.worlds);
  const allItems = useStore((s) => s.items);
  const world = useMemo(() => worlds.find((w) => w.id === id), [worlds, id]);
 
  const [active, setActive] = useState<LayerKey>('characters');
  const { ref: topRef, visible: topVisible } = useReveal<HTMLDivElement>();
  const { ref: listRef, visible: listVisible } = useReveal<HTMLDivElement>();
 
  const counts = useMemo(() => {
    const c: Record<LayerKey, number> = {
      characters: 0,
      settings: 0,
      stories: 0,
      timeline: 0,
      other: 0,
    };
    allItems.forEach((it) => {
      if (it.worldId === id) c[it.layer] = (c[it.layer] || 0) + 1;
    });
    return c;
  }, [allItems, id]);
 
  const items = useMemo(
    () => (id ? getWorldItems(id, active, allItems) : []),
    [id, active, allItems],
  );
 
  if (!world) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-24 text-center">
        <div className="font-display text-2xl text-parchment-100">未找到该世界观。</div>
        <p className="mt-3 text-parchment-200/70">它可能已被归档或删除。</p>
        <button
          onClick={() => navigate('/')}
          className="btn-gold mt-8"
        >
          <ArrowLeft size={16} />
          返回总览
        </button>
      </main>
    );
  }
 
  return (
    <main>
      {/* Hero Banner */}
      <section
        ref={topRef}
        className={`relative mx-auto max-w-7xl px-5 pt-8 reveal ${topVisible ? 'is-visible' : ''}`}
      >
        <div className="relative overflow-hidden rounded-[28px] border border-gold-400/15">
          <div className="relative h-[340px] md:h-[420px]">
            <img
              src={world.cover}
              alt={world.title}
              className="absolute inset-0 h-full w-full object-cover"
              style={{
                maskImage:
                  'linear-gradient(90deg, black 0%, black 50%, transparent 95%), linear-gradient(180deg, black 0%, black 45%, transparent 100%)',
                WebkitMaskImage:
                  'linear-gradient(90deg, black 0%, black 50%, transparent 95%), linear-gradient(180deg, black 0%, black 45%, transparent 100%)',
                maskComposite: 'intersect',
                WebkitMaskComposite: 'source-in',
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(11,26,43,0.2) 0%, rgba(11,26,43,0.6) 40%, rgba(11,26,43,0.95) 100%)',
              }}
            />
          </div>
 
          <div className="absolute inset-x-0 bottom-0 p-7 md:p-12">
            <div className="mb-3">
              <Link to="/" className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-gold-300 hover:text-gold-200">
                <ArrowLeft size={14} /> 返回总览
              </Link>
            </div>
            <div className="ornament mb-4">
              <span>World · 档案</span>
            </div>
            <h1
              className="font-display text-5xl font-bold leading-[1.05] md:text-7xl"
              style={{ color: world.accent || '#FBF3DF' }}
            >
              {world.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-parchment-100/85 md:text-lg">
              {world.summary}
            </p>
            {world.tags.length > 0 && (
              <div className="mt-5 flex flex-wrap items-center gap-2">
                {world.tags.map((t) => (
                  <span key={t} className="chip text-xs">
                    <Tag size={10} /> {t}
                  </span>
                ))}
              </div>
            )}
          </div>
 
          {/* 装饰符号 */}
          <div className="pointer-events-none absolute right-6 top-6 font-mono text-[10px] tracking-[0.4em] text-gold-300/70">
            MS · {new Date(world.updatedAt).toLocaleDateString('zh-CN')}
          </div>
          <div className="pointer-events-none absolute right-6 bottom-6 text-3xl text-gold-400/60 md:text-4xl">
            ✶
          </div>
        </div>
      </section>
 
      {/* Tabs + 内容 */}
      <section
        ref={listRef}
        className={`relative mx-auto max-w-7xl px-5 py-12 reveal ${listVisible ? 'is-visible' : ''}`}
      >
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <LayerTabs active={active} counts={counts} onChange={setActive} />
          <div className="text-xs tracking-[0.3em] uppercase text-parchment-200/60">
            {counts[active]} 条目 · {LAYER_LABELS[active]}
          </div>
        </div>
 
        <div className="mb-8 rounded-2xl border border-gold-400/15 bg-ink-900/40 p-4 text-sm italic text-parchment-200/75">
          「{LAYER_DESC[active]}」
        </div>
 
        {items.length === 0 ? (
          <div className="glass py-14 text-center text-parchment-200/70">
            本层暂无条目。在后台中创建你的第一条档案吧。
          </div>
        ) : active === 'timeline' ? (
          <Timeline items={items} />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((it, i) => (
              <ItemCard key={it.id} item={it} index={i} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
 
function Timeline({ items }: { items: ReturnType<typeof getWorldItems> }) {
  return (
    <div className="relative">
      <div
        className="absolute left-[18px] top-2 bottom-2 w-px"
        style={{
          background:
            'linear-gradient(180deg, rgba(233,180,76,0.7), rgba(233,180,76,0.1))',
        }}
      />
      <ul className="space-y-5">
        {items.map((it, i) => (
          <li key={it.id} className="relative pl-12">
            <span
              className="absolute left-0 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-gold-400/40 bg-ink-900 text-[11px] font-mono text-gold-300 shadow-gold"
              style={{ color: '#F2D893' }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="glass p-5">
              <div className="font-display text-xl text-parchment-50">{it.title}</div>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-parchment-200/85">
                {it.description}
              </p>
              {it.tags && it.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {it.tags.map((t) => (
                    <span key={t} className="chip">
                      <Tag size={10} />
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}