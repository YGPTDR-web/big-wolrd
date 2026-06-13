import { useReveal } from '../hooks/useReveal';
import { getSectionWorlds } from '../store';
import type { Section, World } from '../types';
import WorldCard from './WorldCard';
 
interface Props {
  section: Section;
  worlds: World[];
}
 
export default function SectionBlock({ section, worlds }: Props) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const sectionWorlds = getSectionWorlds(section, worlds);
 
  return (
    <section
      ref={ref}
      className={`relative mx-auto max-w-7xl px-5 py-10 reveal ${visible ? 'is-visible' : ''}`}
      id={section.id}
    >
      <div className="mb-8 flex items-end justify-between gap-4">
        <div className="pl-5 gold-line">
          <div className="ornament mb-2">
            <span>Section · {String(section.order + 1).padStart(2, '0')}</span>
          </div>
          <h2
            className="font-display text-3xl font-bold leading-tight md:text-5xl"
            style={{ color: section.accent || '#FBF3DF' }}
          >
            {section.title}
          </h2>
          {section.subtitle && (
            <p className="mt-2 max-w-2xl text-sm italic text-parchment-200/70 md:text-base">
              {section.subtitle}
            </p>
          )}
        </div>
        <div className="hidden md:block text-xs tracking-[0.3em] uppercase text-parchment-200/60">
          {sectionWorlds.length} 份档案
        </div>
      </div>
 
      {sectionWorlds.length === 0 ? (
        <div className="glass flex items-center justify-center gap-3 px-8 py-14 text-sm text-parchment-200/70">
          <span>本区块尚未添加任何世界观。</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sectionWorlds.map((w, i) => (
            <div
              key={w.id}
              className="relative"
              style={{
                transform: i % 2 === 0 ? 'translateY(0)' : 'translateY(24px)',
              }}
            >
              <WorldCard world={w} index={i} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}