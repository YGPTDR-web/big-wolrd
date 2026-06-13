ed +2484 -36
tailwind.config.js
/workspace
+71
-6
index.html
/workspace
+9
-13
index.css
/workspace/src
+206
-7
@tailwind base;
@tailwind components;
@tailwind utilities;
 
:root {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  line-height: 1.5;
  font-weight: 400;
  color-scheme: dark;
}
 
  font-synthesis: none;
html,
body,
#root {
  min-height: 100%;
  background: #050b14;
  color: #fbf3df;
  font-family: 'Noto Serif SC', 'Source Serif 4', Georgia, serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
}
 
body {
  background:
    radial-gradient(1100px 600px at 90% -10%, rgba(233, 180, 76, 0.12), transparent 60%),
    radial-gradient(900px 500px at -10% 20%, rgba(62, 207, 164, 0.1), transparent 60%),
    radial-gradient(700px 400px at 50% 120%, rgba(27, 51, 86, 0.8), transparent 70%),
    linear-gradient(180deg, #050b14 0%, #0b1a2b 60%, #0a1623 100%);
  background-attachment: fixed;
  overflow-x: hidden;
}
 
body::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.95  0 0 0 0 0.8  0 0 0 0 0.5  0 0 0 0.05 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
  opacity: 0.8;
  z-index: 0;
}
 
body::after {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  background-image: linear-gradient(rgba(233, 180, 76, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(233, 180, 76, 0.05) 1px, transparent 1px);
  background-size: 80px 80px;
  mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
  z-index: 0;
}
 
#root {
  position: relative;
  z-index: 1;
}
 
/* ========= 通用工具类 ========= */
.glass {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.05) 0%,
    rgba(255, 255, 255, 0.02) 100%
  );
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(233, 180, 76, 0.18);
  border-radius: 18px;
}
 
.gold-line {
  position: relative;
}
.gold-line::before {
  content: '';
  position: absolute;
  left: 0;
  top: 4px;
  bottom: 4px;
  width: 3px;
  background: linear-gradient(180deg, #e9b44c 0%, #a87318 100%);
  border-radius: 2px;
  box-shadow: 0 0 12px rgba(233, 180, 76, 0.5);
}
 
.gold-text {
  background: linear-gradient(90deg, #f2d893 0%, #e9b44c 50%, #d69a2a 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
 
.btn-gold {
  @apply inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 font-medium transition-all duration-300;
  background: linear-gradient(135deg, #e9b44c 0%, #d69a2a 100%);
  color: #0b1a2b;
  box-shadow: 0 8px 24px -6px rgba(233, 180, 76, 0.5);
}
.btn-gold:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 30px -8px rgba(233, 180, 76, 0.7);
}
.btn-gold:active {
  transform: translateY(0);
}
 
.btn-ghost {
  @apply inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 font-medium transition-all duration-300;
  color: #fbf3df;
  border: 1px solid rgba(233, 180, 76, 0.35);
  background: rgba(233, 180, 76, 0.06);
}
.btn-ghost:hover {
  border-color: rgba(233, 180, 76, 0.7);
  background: rgba(233, 180, 76, 0.14);
  transform: translateY(-2px);
}
 
.chip {
  @apply inline-flex items-center gap-1.5 rounded-full border text-xs;
  padding: 0.25rem 0.75rem;
  border-color: rgba(233, 180, 76, 0.35);
  color: #f2d893;
  background: rgba(233, 180, 76, 0.06);
}
 
/* 滚动条 */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
::-webkit-scrollbar-track {
  background: #050b14;
}
::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #2a4a74, #1b3356);
  border-radius: 10px;
  border: 2px solid #050b14;
}
::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #e9b44c, #d69a2a);
}
 
/* 进场动画工具 */
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
 
/* 下划线装饰 */
.ornament {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  color: #e9b44c;
  font-family: 'Playfair Display', serif;
  letter-spacing: 0.25em;
  font-size: 0.75rem;
  text-transform: uppercase;
}
.ornament::before,
.ornament::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(233, 180, 76, 0.5), transparent);
  min-width: 24px;
}
 
/* 表单输入 */
.field {
  @apply block w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all;
  background: rgba(11, 26, 43, 0.6);
  color: #fbf3df;
  border: 1px solid rgba(233, 180, 76, 0.2);
}
.field:focus {
  border-color: rgba(233, 180, 76, 0.7);
  box-shadow: 0 0 0 3px rgba(233, 180, 76, 0.15);
}
.field::placeholder {
  color: rgba(251, 243, 223, 0.35);
}
 
textarea.field {
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
  line-height: 1.7;
}
 
/* 图片加载占位 */
.img-skeleton {
  background: linear-gradient(
    90deg,
    rgba(233, 180, 76, 0.08) 0%,
    rgba(233, 180, 76, 0.2) 50%,
    rgba(233, 180, 76, 0.08) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 2.4s ease-in-out infinite;
}
 
/* 选择文本颜色 */
::selection {
  background: rgba(233, 180, 76, 0.4);
  color: #0b1a2b;
}
index.ts
/workspace/src/types
+55
-0
seed.ts
/workspace/src/utils
+220
-0
index.ts
/workspace/src/store
+163
-0
import { create } from 'zustand';
import type { Item, LayerKey, Section, StoreShape, World } from '../types';
import { seedData } from '../utils/seed';
 
const STORAGE_KEY = 'arcanum-worlds:v1';
 
function loadFromStorage(): StoreShape | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoreShape;
    if (!parsed.sections || !parsed.worlds || !parsed.items) return null;
    return parsed;
  } catch {
    return null;
  }
}
 
function saveToStorage(shape: StoreShape) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(shape));
  } catch {
    // ignore
  }
}
 
function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;
}
 
interface Store extends StoreShape {
  // section
  addSection: (input: Omit<Section, 'id' | 'order'>) => void;
  updateSection: (id: string, patch: Partial<Section>) => void;
  deleteSection: (id: string) => void;
  reorderSections: (ids: string[]) => void;
 
  // world
  addWorld: (input: Omit<World, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateWorld: (id: string, patch: Partial<World>) => void;
  deleteWorld: (id: string) => void;
 
  // item
  addItem: (input: Omit<Item, 'id' | 'order'>) => void;
  updateItem: (id: string, patch: Partial<Item>) => void;
  deleteItem: (id: string) => void;
 
  // admin
  setPassword: (pw: string) => void;
  resetData: () => void;
  importData: (data: StoreShape) => void;
}
 
const initial: StoreShape = loadFromStorage() ?? seedData;
 
export const useStore = create<Store>((set, get) => ({
  ...initial,
 
  addSection: (input) => {
    const s: Section = { id: uid('sec'), order: get().sections.length, ...input };
    const sections = [...get().sections, s];
    set({ sections });
    saveToStorage(get());
  },
  updateSection: (id, patch) => {
    const sections = get().sections.map((s) => (s.id === id ? { ...s, ...patch } : s));
    set({ sections });
    saveToStorage(get());
  },
  deleteSection: (id) => {
    const sections = get().sections.filter((s) => s.id !== id);
    set({ sections });
    saveToStorage(get());
  },
  reorderSections: (ids) => {
    const byId = new Map(get().sections.map((s) => [s.id, s]));
    const sections = ids
      .map((id, i) => {
        const s = byId.get(id);
        return s ? { ...s, order: i } : null;
      })
      .filter(Boolean) as Section[];
    set({ sections });
    saveToStorage(get());
  },
 
  addWorld: (input) => {
    const now = Date.now();
    const id = uid('world');
    const w: World = { id, createdAt: now, updatedAt: now, ...input };
    const worlds = [...get().worlds, w];
    set({ worlds });
    saveToStorage(get());
    return id;
  },
  updateWorld: (id, patch) => {
    const worlds = get().worlds.map((w) =>
      w.id === id ? { ...w, ...patch, updatedAt: Date.now() } : w,
    );
    set({ worlds });
    saveToStorage(get());
  },
  deleteWorld: (id) => {
    const worlds = get().worlds.filter((w) => w.id !== id);
    const items = get().items.filter((it) => it.worldId !== id);
    const sections = get().sections.map((s) => ({
      ...s,
      worldIds: s.worldIds.filter((w) => w !== id),
    }));
    set({ worlds, items, sections });
    saveToStorage(get());
  },
 
  addItem: (input) => {
    const count = get().items.filter(
      (i) => i.worldId === input.worldId && i.layer === input.layer,
    ).length;
    const item: Item = { id: uid('it'), order: count, ...input };
    const items = [...get().items, item];
    set({ items });
    saveToStorage(get());
  },
  updateItem: (id, patch) => {
    const items = get().items.map((i) => (i.id === id ? { ...i, ...patch } : i));
    set({ items });
    saveToStorage(get());
  },
  deleteItem: (id) => {
    const items = get().items.filter((i) => i.id !== id);
    set({ items });
    saveToStorage(get());
  },
 
  setPassword: (pw) => {
    set({ adminPassword: pw });
    saveToStorage(get());
  },
  resetData: () => {
    set({ ...seedData });
    saveToStorage(seedData);
  },
  importData: (data) => {
    set({ ...data });
    saveToStorage(data);
  },
}));
 
export function getSectionWorlds(section: Section, worlds: World[]): World[] {
  const order = new Map(section.worldIds.map((id, i) => [id, i]));
  return worlds
    .filter((w) => section.worldIds.includes(w.id))
    .sort((a, b) => (order.get(a.id) ?? 999) - (order.get(b.id) ?? 999));
}
 
export function getWorldItems(
  worldId: string,
  layer: LayerKey,
  items: Item[],
): Item[] {
  return items
    .filter((i) => i.worldId === worldId && i.layer === layer)
    .sort((a, b) => a.order - b.order);
}
useReveal.ts
/workspace/src/hooks
+26
-0
import { useEffect, useRef, useState } from 'react';
 
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
 
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
 
  return { ref, visible };
}