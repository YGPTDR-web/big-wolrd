import { LAYER_LABELS } from '../types';
import type { LayerKey } from '../types';
 
interface Props {
  active: LayerKey;
  counts: Record<LayerKey, number>;
  onChange: (k: LayerKey) => void;
}
 
const ORDER: LayerKey[] = ['characters', 'settings', 'stories', 'timeline', 'other'];
 
export default function LayerTabs({ active, counts, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {ORDER.map((k) => {
        const isActive = active === k;
        return (
          <button
            key={k}
            type="button"
            onClick={() => onChange(k)}
            className={`relative rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
              isActive
                ? 'bg-gradient-to-r from-gold-400 to-gold-500 text-ink-900 shadow-gold'
                : 'border border-gold-400/25 bg-ink-900/40 text-parchment-200 hover:border-gold-400/60 hover:text-gold-300'
            }`}
          >
            <span>{LAYER_LABELS[k]}</span>
            <span
              className={`ml-2 rounded-full px-2 py-0.5 text-[10px] ${
                isActive
                  ? 'bg-ink-900/30 text-ink-900'
                  : 'bg-gold-400/10 text-gold-300'
              }`}
            >
              {counts[k]}
            </span>
          </button>
        );
      })}
    </div>
  );
}