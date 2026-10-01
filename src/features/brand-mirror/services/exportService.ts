import type { BrandMirrorSnapshot } from '../models/brandMirrorModels'
import { RADIUS_ROLES, SPACING_ROLES, TYPE_ROLES } from '../tokens/previewTokens'

export interface BrandGuidelinesExporter {
  export(snapshot: BrandMirrorSnapshot): void
}

function formatScale(values: number[], roles: { short: string; usage: string }[]): string {
  return values.map((value, index) => `- \`${roles[index].short}\`（${roles[index].usage}）: ${value}px`).join('\n')
}

export function buildBrandGuidelinesMarkdown(snapshot: BrandMirrorSnapshot): string {
  const { tokens } = snapshot
  const versions = snapshot.versions.length === 0 ? '- 暂无保存版本' : snapshot.versions.map((version) => `- ${version.label} · ${version.createdAt.slice(0, 10)} · 主色 ${version.tokens.primary} · 辅助色 ${version.tokens.secondary}`).join('\n')
  return `# BrandMirror 品牌规范\n\n> 导出时间：${new Date().toISOString().slice(0, 10)}\n> 当前主题：${snapshot.theme}\n\n## 品牌色\n\n| 令牌 | 值 |\n| --- | --- |\n| 主色 \`primary\` | \`${tokens.primary}\` |\n| 辅助色 \`secondary\` | \`${tokens.secondary}\` |\n| 对比度 | ${snapshot.contrastRatio.toFixed(1)}:1 |\n\n## 圆角尺度（4 档：小控件 → 页面）\n\n${formatScale(tokens.radiusScale, RADIUS_ROLES)}\n\n## 间距体系（5 档：紧凑 → 页面）\n\n${formatScale(tokens.spacingScale, SPACING_ROLES)}\n\n## 字体比例（6 档：注释 → 大标题）\n\n${formatScale(tokens.typeScale, TYPE_ROLES)}\n\n## 保存版本\n\n${versions}\n\n---\n由 BrandMirror 品牌视觉实验室生成。\n`
}

export class BrowserBrandGuidelinesExporter implements BrandGuidelinesExporter {
  export(snapshot: BrandMirrorSnapshot): void {
    const content = buildBrandGuidelinesMarkdown(snapshot)
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `BrandMirror-Brand-Guidelines-${new Date().toISOString().slice(0, 10)}.md`
    link.click()
    URL.revokeObjectURL(url)
  }
}
