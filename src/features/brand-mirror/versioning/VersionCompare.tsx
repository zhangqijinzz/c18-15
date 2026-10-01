import { cloneTokens } from '../domain/brandRules'
import type { BrandMirrorSnapshot } from '../models/brandMirrorModels'
import { RADIUS_ROLES, SPACING_ROLES, TYPE_ROLES, previewStyleVars, RADIUS_STEP, SPACING_STEP, TYPE_STEP } from '../tokens/previewTokens'

export function VersionCompare({ snapshot, onSave, onToggle, onExport }: { snapshot: BrandMirrorSnapshot; onSave: () => void; onToggle: () => void; onExport: () => void }) {
  const versions = snapshot.versions.slice(-2)
  const hasCompare = versions.length === 2
  return <section className="version-section"><div className="showcase-heading"><div><span className="eyebrow">04 / VERSIONS</span><h2>版本对比</h2></div><div className="version-actions"><button className="export-button" type="button" onClick={onExport}>↓ 导出品牌规范</button><button className="secondary-button" type="button" onClick={onSave}>＋ 保存当前版本</button><button className="primary-button" type="button" disabled={!hasCompare} onClick={onToggle}>{snapshot.compareMode ? '退出对比' : '打开对比视图'} <span>↗</span></button></div></div>{hasCompare ? <div className="version-cards">{versions.map((version) => <VersionCard key={version.id} label={version.label} tokens={version.tokens} active={snapshot.activeVersionId === version.id} />)}</div> : <div className="version-empty"><div className="empty-icon">A/B</div><div><strong>保存两个版本，开始对照</strong><p>先保存当前状态作为 Version A，再调整令牌并保存 Version B。</p></div><span className="empty-arrow">→</span></div>}</section>
}

function VersionCard({ label, tokens, active }: { label: string; tokens: BrandMirrorSnapshot['tokens']; active: boolean }) {
  const preview = cloneTokens(tokens)
  return <div className={`version-card ${active ? 'active' : ''}`} style={previewStyleVars(preview)}><div className="version-card-head"><span>{label}</span><small>{active ? '当前版本' : '历史版本'}</small></div><div className="version-preview" style={{ background: preview.secondary, borderRadius: preview.radiusScale[RADIUS_STEP.panel] }}><div className="version-preview-top" style={{ background: preview.primary }} /><div className="version-preview-copy"><i /><i /><i /></div><span className="version-preview-button" style={{ background: preview.primary, borderRadius: preview.radiusScale[RADIUS_STEP.control] }} /></div><div className="version-swatch-row"><span style={{ background: preview.primary }} /><span style={{ background: preview.secondary }} /><span>{RADIUS_ROLES[RADIUS_STEP.button].short} {preview.radiusScale[RADIUS_STEP.button]}px</span><span>{SPACING_ROLES[SPACING_STEP.section].short} {preview.spacingScale[SPACING_STEP.section]}px</span><span>{TYPE_ROLES[TYPE_STEP.body].short} {preview.typeScale[TYPE_STEP.body]}px</span></div></div>
}
