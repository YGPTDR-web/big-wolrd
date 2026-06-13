import { ArrowUpRight, Tag } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { World } from '../types';
 
interface Props {
  world: World;
  index?: number;
  variant?: 'default' | 'feature';
}
 
export default function WorldCard({ world, index = 0, variant = 'default' }: Props) {
  const [loaded, setLoaded] = useState(false);
  const isFeature = variant === 'feature';
  const aspect = isFeature ? 'aspect-[4/5]' : 'aspect-[4/5]';
  const imgClass =
    'h-full w-full object-cover transition-all duration-[1200ms] group-hover:scale-105 group-hover:opacity-95 ' +
    (loaded ? 'opacity-80' : 'opacity-0');
 
  return (
    <Link
      to={`/world/${world.id}`}
      className={
        'group relative block overflow-hidden rounded-3xl border border-gold-400/15 transition-all duration-500 hover:-translate-y-1 hover:border-gold-400/40 hover:shadow-gold ' +
        aspect
      }
      style={{
        background:
          'linear-gradient(160deg, rgba(18,37,63,0.7), rgba(11,26,43,0.95))',
      }}
    >
      <div className="relative h-full w-full overflow-hidden">
        {!loaded && <div className="img-skeleton absolute inset-0" />}
        <img
          src={world.cover}
          alt={world.title}
          onLoad={() => setLoaded(true)}
          className={imgClass}
          style={{
            maskImage:
              'linear-gradient(180deg, black 0%, black 55%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(180deg, black 0%, black 55%, transparent 100%)',
          }}
        />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="rounded-full border border-gold-400/30 bg-ink-900/60 px-2.5 py-1 text-[10px] font-mono tracking-[0.25em] text-gold-300 backdrop-blur">
            N°{String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <div
          className="absolute right-4 top-4 text-xl"
          style={{ color: world.accent || '#E9B44C' }}
        >
          ◈
        </div>
      </div>
 
      <div className="absolute inset-x-0 bottom-0 p-5">
        <div className="flex flex-col gap-2">
          <h3 className="font-display text-2xl font-bold leading-tight text-parchment-50 md:text-[28px]">
            {world.title}
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-parchment-200/80">
            {world.summary}
          </p>
 
          {world.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              {world.tags.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="chip"
                  style={{ borderColor: (world.accent || '#E9B44C') + '55' }}
                >
                  <Tag size={10} />
                  {t}
                </span>
              ))}
            </div>
          )}
 
          <div className="mt-3 flex items-center justify-between text-xs text-parchment-200/80">
            <span className="font-mono tracking-widest opacity-80">打开档案</span>
            <span className="flex items-center gap-1 text-gold-300 transition-transform group-hover:translate-x-1">
              进入 <ArrowUpRight size={14} />
            </span>
          </div>
        </div>
      </div>
 
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: 'inset 0 0 60px rgba(233,180,76,0.12)' }}
      />
    </Link>
  );
}