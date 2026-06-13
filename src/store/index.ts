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