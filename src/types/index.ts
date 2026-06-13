export type LayerKey = 'characters' | 'settings' | 'stories' | 'timeline' | 'other';
 
export interface Section {
  id: string;
  title: string;
  subtitle?: string;
  worldIds: string[];
  accent?: string;
  order: number;
}
 
export interface World {
  id: string;
  title: string;
  cover: string;
  summary: string;
  tags: string[];
  accent?: string;
  createdAt: number;
  updatedAt: number;
}
 
export interface Item {
  id: string;
  worldId: string;
  layer: LayerKey;
  title: string;
  cover?: string;
  description: string;
  tags?: string[];
  order: number;
}
 
export interface StoreShape {
  sections: Section[];
  worlds: World[];
  items: Item[];
  adminPassword?: string;
}
 
export const LAYER_LABELS: Record<LayerKey, string> = {
  characters: '人物志',
  settings: '设定集',
  stories: '故事片段',
  timeline: '时间线',
  other: '其它档案',
};
 
export const LAYER_DESC: Record<LayerKey, string> = {
  characters: '世界观中的主要与次要人物，他们的身份、动机、与他人的纠葛。',
  settings: '地理、政治、文化、魔法体系、种族与社会结构的核心设定。',
  stories: '重要事件、片段故事、或关键的情节转折点。',
  timeline: '按时间顺序排列的重大事件。',
  other: '暂时无法归类的笔记、灵感、草稿。',
};