import type { BrandTokens } from '../models/brandMirrorModels'
import { px, resolveTokens } from '../tokens/semanticTokens'

const componentNames = ['按钮', '输入框', '标签', '通知', '头像', '开关', '进度条', '选择器', '日期', '徽章', '卡片', '菜单', '分页', '工具提示', '筛选器', '上传', '骨架屏', '评价', '弹窗', '时间线']

export function ComponentGallery({ tokens }: { tokens: BrandTokens }) {
  return <section className="showcase-section"><div className="showcase-heading"><div><span className="eyebrow">02 / COMPONENTS</span><h2>组件样例</h2></div><span className="count-badge">{componentNames.length} 个响应中</span></div><div className="component-grid">{componentNames.map((name, index) => <ComponentCard key={name} name={name} index={index} tokens={tokens} />)}</div></section>
}

function ComponentCard({ name, index, tokens }: { name: string; index: number; tokens: BrandTokens }) {
  const t = resolveTokens(tokens)
  const variant = index % 4
  return <article className="component-card" style={{ padding: px(t.spacing.element), borderRadius: px(t.radius.card) }}><div className="sample-meta"><span className="sample-index">{String(index + 1).padStart(2, '0')}</span><span>{name}</span></div><div className="sample" style={{ paddingTop: px(t.spacing.element), gap: px(t.spacing.control) }}>
    {variant === 0 && <><button style={{ background: t.primary, borderRadius: px(t.radius.button), padding: `${px(t.spacing.control)} ${px(t.spacing.element)}`, fontSize: px(t.type.bodySmall) }}>继续探索 <span style={{ marginLeft: px(t.spacing.tight) }}>→</span></button><button className="ghost-button" style={{ borderRadius: px(t.radius.button), padding: `${px(t.spacing.control)} ${px(t.spacing.element)}`, fontSize: px(t.type.bodySmall) }}>次要操作</button></>}
    {variant === 1 && <><div className="fake-input" style={{ borderRadius: px(t.radius.control), padding: `${px(t.spacing.control)} ${px(t.spacing.element)}`, fontSize: px(t.type.bodySmall) }}>搜索品牌资产 <span style={{ fontSize: px(t.type.body) }}>⌕</span></div><div className="tag-row" style={{ gap: px(t.spacing.tight) }}><span style={{ background: `${t.primary}18`, color: t.primary, borderRadius: px(t.radius.container), padding: `${px(t.spacing.tight)} ${px(t.spacing.control)}`, fontSize: px(t.type.caption) }}>进行中</span><span className="neutral-tag" style={{ borderRadius: px(t.radius.container), padding: `${px(t.spacing.tight)} ${px(t.spacing.control)}`, fontSize: px(t.type.caption) }}>设计系统</span></div></>}
    {variant === 2 && <><div className="avatar-row" style={{ gap: px(t.spacing.control) }}><span className="avatar" style={{ background: t.secondary, width: px(2 * (t.spacing.control + t.spacing.tight)), height: px(2 * (t.spacing.control + t.spacing.tight)), fontSize: px(t.type.caption) }}>BM</span><div><strong style={{ fontSize: px(t.type.body) }}>BrandMirror</strong><small style={{ marginTop: px(t.spacing.tight), fontSize: px(t.type.caption) }}>刚刚更新视觉令牌</small></div><span className="more" style={{ fontSize: px(t.type.bodySmall) }}>•••</span></div><div className="mini-progress" style={{ marginTop: px(t.spacing.element) }}><span style={{ background: t.primary, width: `${55 + index * 2}%` }} /></div></>}
    {variant === 3 && <><div className="toggle-row" style={{ fontSize: px(t.type.bodySmall) }}><span>实时同步预览</span><span className="toggle" style={{ background: t.primary }}><i /></span></div><div className="metric-row" style={{ gap: px(t.spacing.tight) }}><strong style={{ color: t.secondary, fontSize: px(t.type.headline) }}>{index + 8}.{index}</strong><span style={{ fontSize: px(t.type.caption) }}>一致性分</span></div></>}
  </div></article>
}
