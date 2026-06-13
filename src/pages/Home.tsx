import { useMemo } from 'react';
import Hero from '../components/Hero';
import SectionBlock from '../components/SectionBlock';
import { useStore } from '../store';
 
export default function Home() {
  return <div></div>;
}
  const sections = useStore((s) => s.sections);
  const worlds = useStore((s) => s.worlds);
  const sorted = useMemo(
    () => [...sections].sort((a, b) => a.order - b.order),
    [sections],
  );
 
  return (
    <main>
      <Hero />
      <div id="sections" className="relative z-10">
        {sorted.map((sec) => (
          <SectionBlock key={sec.id} section={sec} worlds={worlds} />
        ))}
        {sections.length === 0 && (
          <div className="mx-auto mt-10 max-w-3xl px-5 text-center text-parchment-200/70">
            尚未创建区块。请前往"后台"创建第一个区块与世界观。
          </div>
        )}
      </div>
    </main>
  );
}