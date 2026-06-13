import {
  ArrowDownAZ,
  ArrowUpAZ,
  Download,
  GripVertical,
  Pencil,
  Plus,
  Save,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useStore } from '../store';
import { LAYER_LABELS } from '../types';
import type { Item, LayerKey, Section, World } from '../types';
 
type Tab = 'sections' | 'worlds' | 'items' | 'data';
 
// 极简哈希（只做前端防误改，并不安全）
function hash(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return 'pwh_' + String(h);
}
 
export default function Admin() {
  const password = useStore((s) => s.adminPassword);
  const setPassword = useStore((s) => s.setPassword);
  const [input, setInput] = useState('');
  const [setupMode, setSetupMode] = useState(!password);
  const [authed, setAuthed] = useState(false);
 
  const [tab, setTab] = useState<Tab>('sections');
 
  useEffect(() => {
    if (!password) setSetupMode(true);
  }, [password]);
 
  if (!authed) {
    return (
      <main className="mx-auto max-w-lg px-5 py-20">
        <div className="glass p-8">
          <div className="ornament mb-4">
            <span>Admin · 后台</span>
          </div>
          <h1 className="font-display text-3xl font-bold gold-text">
            {setupMode ? '设置你的密码' : '请输入密码'}
          </h1>
          <p className="mt-3 text-sm text-parchment-200/80">
            {setupMode
              ? '首次进入需设置密码。之后再次进入后台时请输入相同的密码。'
              : '输入你在本地设置的密码以继续。仅前端校验，请勿复用重要密码。'}
          </p>
 
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="密码"
            className="field mt-6"
            onKeyDown={(e) => {
              if (e.key === 'Enter') submit();
            }}
          />
          <button className="btn-gold mt-4 w-full justify-center" onClick={submit}>
            <Save size={16} /> {setupMode ? '设置并进入' : '继续'}
          </button>
 
          {!setupMode && (
            <button
              className="mt-3 block w-full text-xs text-parchment-200/60 underline hover:text-gold-300"
              onClick={() => {
                if (confirm('重置将清空所有数据并重新设置密码。继续？')) {
                  useStore.getState().resetData();
                  setSetupMode(true);
                  setInput('');
                }
              }}
            >
              忘记密码？清空并重置
            </button>
          )}
        </div>
      </main>
    );
  }
 
  return (
    <main className="mx-auto max-w-7xl px-5 py-8">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="ornament mb-2">
            <span>Administration</span>
          </div>
          <h1 className="font-display text-3xl font-bold gold-text md:text-4xl">
            档案管理员工作台
          </h1>
          <p className="mt-1 text-sm text-parchment-200/80">
            在此处组织你的区块、世界观与条目。所有修改实时保存到本地浏览器。
          </p>
        </div>
        <button
          onClick={() => setAuthed(false)}
          className="btn-ghost text-sm"
        >
          <X size={14} /> 退出
        </button>
      </header>
 
      {/* Tabs */}
      <nav className="mb-6 flex flex-wrap gap-2">
        <AdminTab current={tab} onChange={setTab} id="sections" label="区块" />
        <AdminTab current={tab} onChange={setTab} id="worlds" label="世界观" />
        <AdminTab current={tab} onChange={setTab} id="items" label="分层条目" />
        <AdminTab current={tab} onChange={setTab} id="data" label="导入 / 导出" />
      </nav>
 
      {tab === 'sections' && <SectionManager />}
      {tab === 'worlds' && <WorldManager />}
      {tab === 'items' && <ItemManager />}
      {tab === 'data' && <DataPanel />}
    </main>
  );
 
  function submit() {
    if (setupMode) {
      if (!input || input.length < 2) {
        alert('请输入至少 2 位的密码');
        return;
      }
      setPassword(hash(input));
      setInput('');
      setAuthed(true);
    } else {
      if (hash(input) === password) {
        setInput('');
        setAuthed(true);
      } else {
        alert('密码不正确');
      }
    }
  }
}
 
function AdminTab({
  current,
  onChange,
  id,
  label,
}: {
  current: Tab;
  onChange: (t: Tab) => void;
  id: Tab;
  label: string;
}) {
  const active = current === id;
  return (
    <button
      onClick={() => onChange(id)}
      className={`rounded-full px-5 py-2 text-sm transition-all ${
        active
          ? 'bg-gradient-to-r from-gold-400 to-gold-500 text-ink-900 shadow-gold'
          : 'border border-gold-400/25 bg-ink-900/40 text-parchment-200 hover:border-gold-400/60 hover:text-gold-300'
      }`}
    >
      {label}
    </button>
  );
}
 
// ==================== 区块管理 ====================
 
function SectionManager() {
  const sections = useStore((s) => s.sections);
  const worlds = useStore((s) => s.worlds);
  const addSection = useStore((s) => s.addSection);
  const updateSection = useStore((s) => s.updateSection);
  const deleteSection = useStore((s) => s.deleteSection);
  const reorder = useStore((s) => s.reorderSections);
 
  const [editing, setEditing] = useState<Section | null>(null);
 
  const sorted = useMemo(
    () => [...sections].sort((a, b) => a.order - b.order),
    [sections],
  );
 
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm text-parchment-200/70">
          共 {sorted.length} 个区块 · 首页按顺序展示
        </div>
        <div className="flex gap-2">
          <button
            onClick={() =>
              reorder([...sorted].reverse().map((s) => s.id))
            }
            className="btn-ghost text-xs"
          >
            <ArrowUpAZ size={14} /> 倒序
          </button>
          <button
            onClick={() =>
              setEditing({
                id: '',
                title: '',
                subtitle: '',
                worldIds: [],
                order: sections.length,
              })
            }
            className="btn-gold text-sm"
          >
            <Plus size={14} /> 新建区块
          </button>
        </div>
      </div>
 
      <div className="grid gap-3 md:grid-cols-2">
        {sorted.map((s) => (
          <div
            key={s.id}
            className="glass flex items-start justify-between gap-3 p-4"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-gold-300">
                  #{String(s.order + 1).padStart(2, '0')}
                </span>
                <h3 className="truncate font-display text-lg text-parchment-50" style={{ color: s.accent }}>
                  {s.title || '未命名区块'}
                </h3>
              </div>
              {s.subtitle && (
                <p className="mt-1 text-xs italic text-parchment-200/70">
                  {s.subtitle}
                </p>
              )}
              <div className="mt-2 flex flex-wrap gap-1.5">
                {s.worldIds.length === 0 ? (
                  <span className="text-xs text-parchment-200/50">尚未添加世界观</span>
                ) : (
                  s.worldIds.map((wid) => {
                    const w = worlds.find((x) => x.id === wid);
                    return (
                      <span key={wid} className="chip text-[11px]">
                        {w ? w.title : '(已删除)'}
                      </span>
                    );
                  })
                )}
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button
                onClick={() => setEditing(s)}
                className="btn-ghost px-3 py-1.5 text-xs"
              >
                <Pencil size={12} /> 编辑
              </button>
              <button
                onClick={() => {
                  if (confirm(`删除区块「${s.title}」？`)) deleteSection(s.id);
                }}
                className="rounded-full border border-red-400/30 bg-red-500/10 px-3 py-1.5 text-xs text-red-300 hover:bg-red-500/20"
              >
                <Trash2 size={12} /> 删除
              </button>
            </div>
          </div>
        ))}
      </div>
 
      {editing && (
        <SectionEditor
          initial={editing}
          worlds={worlds}
          onClose={() => setEditing(null)}
          onSave={(data) => {
            if (editing.id) updateSection(editing.id, data);
            else addSection(data);
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}
 
function SectionEditor({
  initial,
  worlds,
  onClose,
  onSave,
}: {
  initial: Section;
  worlds: World[];
  onClose: () => void;
  onSave: (data: Omit<Section, 'id' | 'order'> & { order?: number }) => void;
}) {
  const [title, setTitle] = useState(initial.title);
  const [subtitle, setSubtitle] = useState(initial.subtitle || '');
  const [accent, setAccent] = useState(initial.accent || '#E9B44C');
  const [worldIds, setWorldIds] = useState<string[]>(initial.worldIds);
 
  function toggle(wid: string) {
    setWorldIds((cur) =>
      cur.includes(wid) ? cur.filter((x) => x !== wid) : [...cur, wid],
    );
  }
 
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/80 p-4 backdrop-blur">
      <div className="glass w-full max-w-2xl p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl text-parchment-50">
            {initial.id ? '编辑区块' : '新建区块'}
          </h3>
          <button onClick={onClose} className="btn-ghost px-3 py-1.5 text-xs">
            <X size={14} /> 关闭
          </button>
        </div>
 
        <div className="mt-4 grid gap-3">
          <LabeledInput label="标题" value={title} onChange={setTitle} placeholder="如：我创造的世界" />
          <LabeledInput label="副标题 (可选)" value={subtitle} onChange={setSubtitle} placeholder="英文/引文" />
          <div>
            <label className="mb-1 block text-xs tracking-widest uppercase text-gold-300">
              主题色
            </label>
            <div className="flex flex-wrap items-center gap-2">
              {['#E9B44C', '#7AE7C7', '#F27EB8', '#B68CE0', '#F5B673', '#FBF3DF'].map(
                (c) => (
                  <button
                    key={c}
                    onClick={() => setAccent(c)}
                    className={`h-8 w-8 rounded-full border-2 transition ${
                      accent === c ? 'border-parchment-50 scale-110' : 'border-transparent'
                    }`}
                    style={{ background: c }}
                  />
                ),
              )}
              <input
                type="color"
                value={accent}
                onChange={(e) => setAccent(e.target.value)}
                className="h-8 w-14 cursor-pointer rounded border border-gold-400/30 bg-ink-900"
              />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-xs tracking-widest uppercase text-gold-300">
              包含的世界观（点击多选）
            </label>
            <div className="max-h-56 overflow-auto rounded-xl border border-gold-400/15 bg-ink-900/40 p-2">
              {worlds.length === 0 ? (
                <div className="p-4 text-center text-xs text-parchment-200/60">
                  请先在"世界观"标签页中创建世界观。
                </div>
              ) : (
                <div className="grid gap-2 sm:grid-cols-2">
                  {worlds.map((w) => {
                    const selected = worldIds.includes(w.id);
                    return (
                      <button
                        type="button"
                        key={w.id}
                        onClick={() => toggle(w.id)}
                        className={`flex items-center gap-2 rounded-xl border p-2 text-left text-sm transition ${
                          selected
                            ? 'border-gold-400/70 bg-gold-400/10 text-gold-200'
                            : 'border-gold-400/15 bg-ink-900/30 text-parchment-200 hover:border-gold-400/40'
                        }`}
                      >
                        <span
                          className="flex h-6 w-6 items-center justify-center rounded-full text-[10px]"
                          style={{
                            background: selected ? '#E9B44C' : 'rgba(233,180,76,0.1)',
                            color: selected ? '#0B1A2B' : '#E9B44C',
                          }}
                        >
                          {selected ? '✓' : <GripVertical size={12} />}
                        </span>
                        <span className="truncate">{w.title}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="mt-2 text-[11px] text-parchment-200/50">
              已选 {worldIds.length} 个世界观。在区块中展示的顺序与选择顺序一致。
            </div>
          </div>
        </div>
 
        <div className="mt-6 flex items-center justify-end gap-2">
          <button onClick={onClose} className="btn-ghost text-sm">
            取消
          </button>
          <button
            onClick={() => {
              if (!title.trim()) {
                alert('请填写标题');
                return;
              }
              onSave({ title: title.trim(), subtitle: subtitle.trim() || undefined, accent, worldIds });
            }}
            className="btn-gold text-sm"
          >
            <Save size={14} /> 保存
          </button>
        </div>
      </div>
    </div>
  );
}
 
// ==================== 世界观管理 ====================
 
function WorldManager() {
  const worlds = useStore((s) => s.worlds);
  const addWorld = useStore((s) => s.addWorld);
  const updateWorld = useStore((s) => s.updateWorld);
  const deleteWorld = useStore((s) => s.deleteWorld);
  const [editing, setEditing] = useState<World | null>(null);
  const [sort, setSort] = useState<'desc' | 'asc'>('desc');
 
  const sorted = useMemo(() => {
    const arr = [...worlds];
    arr.sort((a, b) => (sort === 'desc' ? b.updatedAt - a.updatedAt : a.updatedAt - b.updatedAt));
    return arr;
  }, [worlds, sort]);
 
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm text-parchment-200/70">
          共 {worlds.length} 个世界观
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setSort((s) => (s === 'desc' ? 'asc' : 'desc'))}
            className="btn-ghost text-xs"
          >
            {sort === 'desc' ? <ArrowDownAZ size={14} /> : <ArrowUpAZ size={14} />}
            {sort === 'desc' ? '最新在前' : '最早在前'}
          </button>
          <button
            onClick={() =>
              setEditing({
                id: '',
                title: '',
                summary: '',
                cover: '',
                tags: [],
                createdAt: 0,
                updatedAt: 0,
              })
            }
            className="btn-gold text-sm"
          >
            <Plus size={14} /> 新建世界观
          </button>
        </div>
      </div>
 
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {sorted.map((w) => (
          <div key={w.id} className="glass overflow-hidden">
            <div className="relative h-32">
              <img
                src={w.cover}
                alt={w.title}
                className="h-full w-full object-cover"
                style={{
                  maskImage: 'linear-gradient(180deg, black, black 60%, transparent)',
                  WebkitMaskImage: 'linear-gradient(180deg, black, black 60%, transparent)',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ink-900/90" />
              <div className="absolute bottom-2 left-3 font-display text-lg text-parchment-50" style={{ color: w.accent }}>
                {w.title || '未命名'}
              </div>
            </div>
            <div className="p-4">
              <p className="line-clamp-2 text-xs text-parchment-200/80">{w.summary}</p>
              {w.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {w.tags.slice(0, 4).map((t) => (
                    <span key={t} className="chip text-[11px]">
                      {t}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-4 flex items-center justify-end gap-2">
                <button
                  onClick={() => setEditing(w)}
                  className="btn-ghost px-3 py-1.5 text-xs"
                >
                  <Pencil size={12} /> 编辑
                </button>
                <button
                  onClick={() => {
                    if (confirm(`删除世界观「${w.title}」及其所有条目？`)) {
                      deleteWorld(w.id);
                    }
                  }}
                  className="rounded-full border border-red-400/30 bg-red-500/10 px-3 py-1.5 text-xs text-red-300 hover:bg-red-500/20"
                >
                  <Trash2 size={12} /> 删除
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
 
      {editing && (
        <WorldEditor
          initial={editing}
          onClose={() => setEditing(null)}
          onSave={(data) => {
            if (editing.id) updateWorld(editing.id, data);
            else addWorld(data);
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}
 
function WorldEditor({
  initial,
  onClose,
  onSave,
}: {
  initial: World;
  onClose: () => void;
  onSave: (data: Omit<World, 'id' | 'createdAt' | 'updatedAt'>) => void;
}) {
  const [title, setTitle] = useState(initial.title);
  const [summary, setSummary] = useState(initial.summary);
  const [cover, setCover] = useState(initial.cover);
  const [tagsStr, setTagsStr] = useState(initial.tags.join(', '));
  const [accent, setAccent] = useState(initial.accent || '#E9B44C');
 
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/80 p-4 backdrop-blur">
      <div className="glass w-full max-w-2xl p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl text-parchment-50">
            {initial.id ? '编辑世界观' : '新建世界观'}
          </h3>
          <button onClick={onClose} className="btn-ghost px-3 py-1.5 text-xs">
            <X size={14} /> 关闭
          </button>
        </div>
 
        <div className="mt-4 grid gap-3">
          <LabeledInput label="标题" value={title} onChange={setTitle} placeholder="如：回响之城" />
          <div>
            <label className="mb-1 block text-xs tracking-widest uppercase text-gold-300">简介</label>
            <textarea
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="field"
              placeholder="一两句话描绘这个世界的核心…"
            />
          </div>
          <LabeledInput
            label="封面图 URL"
            value={cover}
            onChange={setCover}
            placeholder="https://..."
          />
          <div className="flex items-center gap-4">
            <div className="rounded-xl border border-gold-400/20 bg-ink-900/40 p-3">
              <div className="mb-2 text-[10px] tracking-widest uppercase text-gold-300">预览</div>
              <div
                className="h-24 w-40 rounded-lg object-cover"
                style={{
                  backgroundImage: `url(${cover})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </div>
            <div className="flex-1">
              <label className="mb-2 block text-xs tracking-widest uppercase text-gold-300">
                标签（逗号分隔）
              </label>
              <input
                value={tagsStr}
                onChange={(e) => setTagsStr(e.target.value)}
                placeholder="奇幻, 神秘主义, 都市"
                className="field"
              />
              <div className="mt-3">
                <label className="mb-2 block text-xs tracking-widest uppercase text-gold-300">
                  主题色
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  {['#E9B44C', '#7AE7C7', '#F27EB8', '#B68CE0', '#F5B673'].map((c) => (
                    <button
                      key={c}
                      onClick={() => setAccent(c)}
                      className={`h-8 w-8 rounded-full border-2 transition ${
                        accent === c ? 'border-parchment-50 scale-110' : 'border-transparent'
                      }`}
                      style={{ background: c }}
                    />
                  ))}
                  <input
                    type="color"
                    value={accent}
                    onChange={(e) => setAccent(e.target.value)}
                    className="h-8 w-14 rounded border border-gold-400/30 bg-ink-900"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
 
        <div className="mt-6 flex items-center justify-end gap-2">
          <button onClick={onClose} className="btn-ghost text-sm">
            取消
          </button>
          <button
            onClick={() => {
              if (!title.trim()) {
                alert('请填写标题');
                return;
              }
              const tags = tagsStr
                .split(/[,，]/)
                .map((t) => t.trim())
                .filter(Boolean);
              onSave({
                title: title.trim(),
                summary: summary.trim(),
                cover: cover.trim() || 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=1200&q=60',
                tags,
                accent,
              });
            }}
            className="btn-gold text-sm"
          >
            <Save size={14} /> 保存
          </button>
        </div>
      </div>
    </div>
  );
}
 
// ==================== 条目管理 ====================
 
function ItemManager() {
  const worlds = useStore((s) => s.worlds);
  const items = useStore((s) => s.items);
  const addItem = useStore((s) => s.addItem);
  const updateItem = useStore((s) => s.updateItem);
  const deleteItem = useStore((s) => s.deleteItem);
 
  const [worldId, setWorldId] = useState<string | null>(worlds[0]?.id || null);
  const [layer, setLayer] = useState<LayerKey>('characters');
  const [editing, setEditing] = useState<Item | null>(null);
 
  useEffect(() => {
    if (!worldId && worlds.length > 0) setWorldId(worlds[0].id);
  }, [worlds, worldId]);
 
  const current = useMemo(() => {
    if (!worldId) return [];
    return items
      .filter((i) => i.worldId === worldId && i.layer === layer)
      .sort((a, b) => a.order - b.order);
  }, [worldId, items, layer]);
 
  const curWorld = worlds.find((w) => w.id === worldId);
 
  return (
    <div>
      <div className="mb-4 grid gap-3 md:grid-cols-[1fr_1fr_auto]">
        <select
          value={worldId || ''}
          onChange={(e) => setWorldId(e.target.value || null)}
          className="field"
        >
          {worlds.length === 0 && <option value="">（尚无世界观）</option>}
          {worlds.map((w) => (
            <option key={w.id} value={w.id}>
              {w.title}
            </option>
          ))}
        </select>
        <select
          value={layer}
          onChange={(e) => setLayer(e.target.value as LayerKey)}
          className="field"
        >
          {(['characters', 'settings', 'stories', 'timeline', 'other'] as LayerKey[]).map(
            (k) => (
              <option key={k} value={k}>
                {LAYER_LABELS[k]}
              </option>
            ),
          )}
        </select>
        <button
          disabled={!worldId}
          onClick={() =>
            setEditing({
              id: '',
              worldId: worldId!,
              layer,
              title: '',
              description: '',
              tags: [],
              cover: '',
              order: current.length,
            })
          }
          className="btn-gold text-sm disabled:opacity-40"
        >
          <Plus size={14} /> 新建条目
        </button>
      </div>
 
      <div className="mb-3 text-sm text-parchment-200/70">
        {curWorld ? (
          <>
            当前：<span className="gold-text font-semibold">{curWorld.title}</span> · {LAYER_LABELS[layer]} · {current.length} 条
          </>
        ) : (
          '请先创建世界观。'
        )}
      </div>
 
      <div className="grid gap-3 md:grid-cols-2">
        {current.map((it, i) => (
          <div key={it.id} className="glass flex items-start justify-between gap-3 p-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-gold-300">#{String(i + 1).padStart(2, '0')}</span>
                <h4 className="truncate font-display text-lg text-parchment-50">
                  {it.title || '(未命名)'}
                </h4>
              </div>
              <p className="mt-2 line-clamp-3 whitespace-pre-wrap text-xs text-parchment-200/80">
                {it.description}
              </p>
              {it.tags && it.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {it.tags.map((t) => (
                    <span key={t} className="chip text-[11px]">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={() => setEditing(it)} className="btn-ghost px-3 py-1.5 text-xs">
                <Pencil size={12} /> 编辑
              </button>
              <button
                onClick={() => {
                  if (confirm(`删除条目「${it.title}」？`)) deleteItem(it.id);
                }}
                className="rounded-full border border-red-400/30 bg-red-500/10 px-3 py-1.5 text-xs text-red-300 hover:bg-red-500/20"
              >
                <Trash2 size={12} /> 删除
              </button>
            </div>
          </div>
        ))}
        {current.length === 0 && (
          <div className="md:col-span-2 glass py-14 text-center text-parchment-200/70">
            还没有条目。创建你的第一条吧。
          </div>
        )}
      </div>
 
      {editing && (
        <ItemEditor
          initial={editing}
          onClose={() => setEditing(null)}
          onSave={(data) => {
            if (editing.id) updateItem(editing.id, data);
            else addItem(data);
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}
 
function ItemEditor({
  initial,
  onClose,
  onSave,
}: {
  initial: Item;
  onClose: () => void;
  onSave: (data: Omit<Item, 'id' | 'order'> & { order?: number }) => void;
}) {
  const [title, setTitle] = useState(initial.title);
  const [description, setDescription] = useState(initial.description);
  const [cover, setCover] = useState(initial.cover || '');
  const [tagsStr, setTagsStr] = useState((initial.tags || []).join(', '));
  const [layer, setLayer] = useState<LayerKey>(initial.layer);
 
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/80 p-4 backdrop-blur">
      <div className="glass w-full max-w-2xl p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl text-parchment-50">
            {initial.id ? '编辑条目' : '新建条目'}
          </h3>
          <button onClick={onClose} className="btn-ghost px-3 py-1.5 text-xs">
            <X size={14} /> 关闭
          </button>
        </div>
 
        <div className="mt-4 grid gap-3">
          <LabeledInput label="标题" value={title} onChange={setTitle} placeholder="如：伊芙琳 · 聆听者" />
          <div>
            <label className="mb-1 block text-xs tracking-widest uppercase text-gold-300">
              分层
            </label>
            <select
              value={layer}
              onChange={(e) => setLayer(e.target.value as LayerKey)}
              className="field"
            >
              {(['characters', 'settings', 'stories', 'timeline', 'other'] as LayerKey[]).map(
                (k) => (
                  <option key={k} value={k}>
                    {LAYER_LABELS[k]}
                  </option>
                ),
              )}
            </select>
          </div>
          <LabeledInput label="封面图 URL（可选）" value={cover} onChange={setCover} placeholder="https://..." />
          <div>
            <label className="mb-1 block text-xs tracking-widest uppercase text-gold-300">描述 / 正文</label>
            <textarea
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="field"
              placeholder="写入人物的介绍、设定细节或故事片段…"
            />
          </div>
          <LabeledInput
            label="标签（逗号分隔，可选）"
            value={tagsStr}
            onChange={setTagsStr}
            placeholder="主角, 祭司"
          />
        </div>
 
        <div className="mt-6 flex items-center justify-end gap-2">
          <button onClick={onClose} className="btn-ghost text-sm">
            取消
          </button>
          <button
            onClick={() => {
              if (!title.trim()) {
                alert('请填写标题');
                return;
              }
              const tags = tagsStr
                .split(/[,，]/)
                .map((t) => t.trim())
                .filter(Boolean);
              onSave({
                worldId: initial.worldId,
                layer,
                title: title.trim(),
                description: description.trim(),
                cover: cover.trim() || undefined,
                tags,
              });
            }}
            className="btn-gold text-sm"
          >
            <Save size={14} /> 保存
          </button>
        </div>
      </div>
    </div>
  );
}
 
// ==================== 导入/导出 ====================
 
function DataPanel() {
  const state = useStore();
  const [importText, setImportText] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
 
  function exportJSON() {
    const data = {
      sections: state.sections,
      worlds: state.worlds,
      items: state.items,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `arcanum-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
 
  function importJSON() {
    try {
      const parsed = JSON.parse(importText);
      if (!parsed.sections || !parsed.worlds || !parsed.items) {
        throw new Error('结构不正确');
      }
      if (!confirm('导入将覆盖当前所有数据。确认继续？')) return;
      state.importData({
        sections: parsed.sections,
        worlds: parsed.worlds,
        items: parsed.items,
      });
      alert('导入成功');
      setImportText('');
    } catch (err) {
      alert('导入失败：JSON 无法解析或结构不正确');
    }
  }
 
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div className="glass p-5">
        <div className="ornament mb-3">
          <span>Export</span>
        </div>
        <h3 className="font-display text-xl text-parchment-50">导出为 JSON</h3>
        <p className="mt-2 text-sm text-parchment-200/80">
          将当前所有区块、世界观、条目导出为可读的 JSON 文件。可用于备份、迁移或与他人共享。
        </p>
        <button onClick={exportJSON} className="btn-gold mt-5 text-sm">
          <Download size={14} /> 下载 JSON
        </button>
      </div>
 
      <div className="glass p-5">
        <div className="ornament mb-3">
          <span>Import</span>
        </div>
        <h3 className="font-display text-xl text-parchment-50">从 JSON 导入</h3>
        <p className="mt-2 text-sm text-parchment-200/80">
          粘贴之前导出的 JSON 文本，或选择文件读取。导入将覆盖当前数据。
        </p>
        <textarea
          rows={8}
          value={importText}
          onChange={(e) => setImportText(e.target.value)}
          className="field mt-3 font-mono text-xs"
          placeholder={'{\n  "sections": [],\n  "worlds": [],\n  "items": []\n}'}
        />
        <div className="mt-3 flex gap-2">
          <input
            type="file"
            accept="application/json"
            ref={fileRef}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => setImportText(String(reader.result || ''));
              reader.readAsText(file);
            }}
          />
          <button onClick={() => fileRef.current?.click()} className="btn-ghost text-sm">
            <Upload size={14} /> 选择文件
          </button>
          <button onClick={importJSON} className="btn-gold text-sm">
            <Save size={14} /> 导入并覆盖
          </button>
        </div>
      </div>
 
      <div className="glass p-5 md:col-span-2">
        <h3 className="font-display text-lg text-parchment-50">数据概览</h3>
        <p className="mt-2 text-sm text-parchment-200/80">
          区块 {state.sections.length} · 世界观 {state.worlds.length} · 条目 {state.items.length}
        </p>
        <button
          onClick={() => {
            if (confirm('清空并恢复到示例数据？当前所有内容将丢失。')) {
              state.resetData();
            }
          }}
          className="btn-ghost mt-3 text-sm"
        >
          重置为示例数据
        </button>
      </div>
    </div>
  );
}
 
// ==================== 小组件 ====================
 
function LabeledInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs tracking-widest uppercase text-gold-300">
        {label}
      </label>
      <input
        className="field"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}