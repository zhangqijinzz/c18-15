import { describe, expect, it } from 'vitest'
import { INITIAL_TOKENS } from '../models/brandMirrorModels'
import { resolveTokens, SCALE_LEVELS } from '../tokens/semanticTokens'

describe('semantic preview tokens', () => {
  it('maps every raw scale slot to a named semantic level in order', () => {
    const t = resolveTokens(INITIAL_TOKENS)
    expect(Object.values(t.radius)).toEqual(INITIAL_TOKENS.radiusScale)
    expect(Object.values(t.spacing)).toEqual(INITIAL_TOKENS.spacingScale)
    expect(Object.values(t.type)).toEqual(INITIAL_TOKENS.typeScale)
  })

  it('refects token edits in the resolved values', () => {
    const t = resolveTokens({
      ...INITIAL_TOKENS,
      typeScale: [10, 12, 18, 22, 30, 52],
      spacingScale: [2, 10, 16, 24, 48],
      radiusScale: [4, 10, 16, 24],
    })
    expect(t.type.caption).toBe(10)
    expect(t.type.body).toBe(18)
    expect(t.type.display).toBe(52)
    expect(t.spacing.page).toBe(48)
    expect(t.radius.container).toBe(24)
  })

  it('declares a name and usage for every scale slot so each level is unambiguous', () => {
    expect(SCALE_LEVELS.radiusScale).toHaveLength(INITIAL_TOKENS.radiusScale.length)
    expect(SCALE_LEVELS.spacingScale).toHaveLength(INITIAL_TOKENS.spacingScale.length)
    expect(SCALE_LEVELS.typeScale).toHaveLength(INITIAL_TOKENS.typeScale.length)
    Object.values(SCALE_LEVELS).forEach((levels) => {
      levels.forEach((level, index) => {
        expect(level.index).toBe(index + 1)
        expect(level.name.length).toBeGreaterThan(0)
        expect(level.usedFor.length).toBeGreaterThan(0)
      })
    })
  })
})
