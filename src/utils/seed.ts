import type { StoreShape } from '../types';
 
const now = Date.now();
 
export const seedData: StoreShape = {
  adminPassword: undefined,
  sections: [
    {
      id: 'sec-own',
      title: '我创造的世界',
      subtitle: 'These are the worlds I have woven.',
      worldIds: ['world-echo', 'world-obsidian'],
      order: 0,
      accent: '#E9B44C',
    },
    {
      id: 'sec-pop',
      title: '流行中的世界观',
      subtitle: 'Worlds widely told across our world.',
      worldIds: ['world-middleearth', 'world-dune'],
      order: 1,
      accent: '#7AE7C7',
    },
  ],
  worlds: [
    {
      id: 'world-echo',
      title: '回响之城',
      cover:
        'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&w=1200&q=70',
      summary:
        '一座悬浮在静默之海上的城市，夜晚时建筑会低语，空气中漂浮着旧日居民的回声。',
      tags: ['高奇幻', '神秘主义', '都市'],
      accent: '#E9B44C',
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'world-obsidian',
      title: '黑曜之海',
      cover:
        'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=1200&q=70',
      summary:
        '一片由黑曜石组成的海洋，只有"潮汐之民"懂得如何在破碎的浪尖上导航。',
      tags: ['航海', '黑暗奇幻', '探索'],
      accent: '#7AE7C7',
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'world-middleearth',
      title: '中土世界',
      cover:
        'https://images.unsplash.com/photo-1465101048365-fbf0b6f295a6?auto=format&fit=crop&w=1200&q=70',
      summary:
        '托尔金笔下的史诗大陆。霍比特人、精灵、人类、矮人、巫师共同构成一段宏大叙事。',
      tags: ['史诗', '精灵', '远征'],
      accent: '#E9B44C',
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'world-dune',
      title: '沙丘 · Dune',
      cover:
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=70',
      summary:
        '弗兰克·赫伯特构建的宇宙，沙丘星阿拉基斯是一切政治、宗教与香料的核心。',
      tags: ['科幻', '政治', '沙漠'],
      accent: '#7AE7C7',
      createdAt: now,
      updatedAt: now,
    },
  ],
  items: [
    // === 回响之城 ===
    {
      id: 'i-echo-1',
      worldId: 'world-echo',
      layer: 'characters',
      title: '伊芙琳 · 聆听者',
      cover:
        'https://images.unsplash.com/photo-1531123414780-f74242c2b052?auto=format&fit=crop&w=800&q=70',
      description:
        '城市的现任"聆听者"。她能听见超过七百年前的回声，却因此无法入睡。她的瞳孔在黑夜里泛着微弱的金色。',
      tags: ['主角', '祭司', '失眠者'],
      order: 0,
    },
    {
      id: 'i-echo-2',
      worldId: 'world-echo',
      layer: 'characters',
      title: '第 42 号 回声',
      description:
        '不是一个"人"，而是一段在广场上空反复回响的对话。据传它属于两百年前在火灾中失踪的一对恋人。',
      tags: ['谜', '现象'],
      order: 1,
    },
    {
      id: 'i-echo-3',
      worldId: 'world-echo',
      layer: 'settings',
      title: '静默之海',
      cover:
        'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?auto=format&fit=crop&w=800&q=70',
      description:
        '一片无声的黑色海洋。海面永远静止，只有"回响之城"的锚链在其中投下金色倒影。',
      tags: ['地理', '神秘之地'],
      order: 0,
    },
    {
      id: 'i-echo-4',
      worldId: 'world-echo',
      layer: 'stories',
      title: '第一夜 · 醒来',
      description:
        '伊芙琳从十二年的沉睡中醒来，发现整座城市已不再认得她，而她却记得每个人的名字。',
      tags: ['开端'],
      order: 0,
    },
    {
      id: 'i-echo-5',
      worldId: 'world-echo',
      layer: 'timeline',
      title: '0 年 · 城市被建立',
      description: '第一位"聆听者"将漂浮的锚链打入静默之海，城市从海底升起。',
      tags: ['历史'],
      order: 0,
    },
    {
      id: 'i-echo-6',
      worldId: 'world-echo',
      layer: 'timeline',
      title: '742 年 · 伊芙琳苏醒',
      description: '故事开始的时间点。城市的金色钟塔连续三天三夜自行鸣响。',
      order: 1,
    },
 
    // === 黑曜之海 ===
    {
      id: 'i-obs-1',
      worldId: 'world-obsidian',
      layer: 'characters',
      title: '船长 · 塞伦',
      cover:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=70',
      description:
        '潮汐之民的"半船长"——她只有一半的船，另一半被黑曜之浪吞没。她以冷静和偶尔残忍闻名。',
      tags: ['船长', '冷酷'],
      order: 0,
    },
    {
      id: 'i-obs-2',
      worldId: 'world-obsidian',
      layer: 'settings',
      title: '潮汐之民',
      description:
        '海上民族。他们的骨密度比常人高两倍，能在黑曜之海中屏息超过两刻钟。',
      tags: ['种族', '文化'],
      order: 0,
    },
    {
      id: 'i-obs-3',
      worldId: 'world-obsidian',
      layer: 'stories',
      title: '寻找另一半',
      description:
        '塞伦在一次风暴中听到来自船另一半的呼唤——她相信自己的船仍然"活着"。',
      order: 0,
    },
 
    // === 中土世界 ===
    {
      id: 'i-me-1',
      worldId: 'world-middleearth',
      layer: 'characters',
      title: '弗罗多 · 巴金斯',
      cover:
        'https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?auto=format&fit=crop&w=800&q=70',
      description:
        '承担毁灭至尊戒使命的霍比特人。夏尔的温柔生活与末日火山的严酷形成他一生的对比。',
      tags: ['霍比特人', '持戒者'],
      order: 0,
    },
    {
      id: 'i-me-2',
      worldId: 'world-middleearth',
      layer: 'settings',
      title: '夏尔',
      description:
        '霍比特人的家园。圆形的小门、烟草味、晚宴——一个对"远方"没有多少兴趣的温柔之地。',
      tags: ['地理', '家园'],
      order: 0,
    },
 
    // === Dune ===
    {
      id: 'i-dune-1',
      worldId: 'world-dune',
      layer: 'characters',
      title: '保罗 · 厄崔迪',
      cover:
        'https://images.unsplash.com/photo-1502136969935-8d8eef54d77b?auto=format&fit=crop&w=800&q=70',
      description:
        '厄崔迪家族的继承人。在阿拉基斯沙漠上，他从贵族少年变为被预言的天选之人——却意识到自己可能是宇宙的诅咒。',
      tags: ['天选之人', '厄崔迪'],
      order: 0,
    },
    {
      id: 'i-dune-2',
      worldId: 'world-dune',
      layer: 'settings',
      title: '香料 · Melange',
      description:
        '一种只在阿拉基斯出产的物质。它延长生命、提升智慧，也是星际航行不可或缺的关键。',
      tags: ['核心资源'],
      order: 0,
    },
  ],
};