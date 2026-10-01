import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { cloneTokens } from '../domain/brandRules'
import { INITIAL_TOKENS, type BrandTokens } from '../models/brandMirrorModels'
import { ComponentGallery } from '../preview-gallery/ComponentGallery'
import { PageGallery } from '../preview-gallery/PageGallery'
import { VersionCompare } from '../versioning/VersionCompare'
import type { BrandMirrorSnapshot } from '../models/brandMirrorModels'

function snapshotWith(tokens: BrandTokens): BrandMirrorSnapshot {
  return {
    status: 'ready',
    tokens,
    theme: 'studio',
    versions: [
      { id: 'a', label: 'Version A', tokens: cloneTokens(tokens), createdAt: '2024-01-01T00:00:00.000Z' },
      { id: 'b', label: 'Version B', tokens: cloneTokens(tokens), createdAt: '2024-01-02T00:00:00.000Z' },
    ],
    compareMode: false,
    activeVersionId: 'b',
    contrastRatio: 4,
    contrastWarning: false,
    message: '',
  }
}

describe('preview galleries react to spacing and type tokens', () => {
  it('component gallery re-renders spacing and font sizes from tokens', () => {
    const baseline = renderToStaticMarkup(<ComponentGallery tokens={INITIAL_TOKENS} />)
    const resized: BrandTokens = {
      ...cloneTokens(INITIAL_TOKENS),
      spacingScale: [8, 16, 24, 36, 56],
      typeScale: [18, 20, 24, 30, 44, 60],
    }
    const changed = renderToStaticMarkup(<ComponentGallery tokens={resized} />)
    // 按钮字号 = 字体 2（bodySmall），卡片内边距 = 间距 3（element）
    expect(baseline).toContain('font-size:14px')
    expect(changed).toContain('font-size:20px')
    expect(changed).toContain('padding:24px')
    expect(changed).not.toEqual(baseline)
  })

  it('page gallery re-renders page padding, display font and radii from tokens', () => {
    const resized: BrandTokens = {
      ...cloneTokens(INITIAL_TOKENS),
      radiusScale: [3, 9, 15, 25],
      spacingScale: [6, 10, 18, 28, 44],
      typeScale: [13, 15, 19, 23, 34, 58],
    }
    const markup = renderToStaticMarkup(<PageGallery tokens={resized} />)
    // 落地页边距 = 间距 5（page）；主标题 = 字体 6（display）；页面圆角 = 圆角 4（container）
    expect(markup).toContain('padding:44px')
    expect(markup).toContain('font-size:58px')
    expect(markup).toContain('border-radius:25px')
  })

  it('version card labels font by level (字体 N) and shows spacing alongside', () => {
    const markup = renderToStaticMarkup(<VersionCompare snapshot={snapshotWith(INITIAL_TOKENS)} onSave={() => undefined} onToggle={() => undefined} onExport={() => undefined} />)
    expect(markup).toContain('字体 3 · 16px')
    expect(markup).toContain('间距 3 · 12px')
    expect(markup).toContain('圆角 2 · 12px')
    // 版本预览里有真实字号文字，而不是与字体令牌无关的纯色块
    expect(markup).toContain('品牌标题文字')
  })
})
