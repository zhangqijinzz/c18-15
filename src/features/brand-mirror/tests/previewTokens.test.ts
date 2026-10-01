import { describe, expect, it } from 'vitest'
import { INITIAL_TOKENS } from '../models/brandMirrorModels'
import {
  RADIUS_ROLES,
  SPACING_STEP,
  SPACING_ROLES,
  TYPE_ROLES,
  previewStyleVars,
} from '../tokens/previewTokens'

describe('preview token mapping', () => {
  it('keeps one semantic role per scale step', () => {
    expect(RADIUS_ROLES).toHaveLength(INITIAL_TOKENS.radiusScale.length)
    expect(SPACING_ROLES).toHaveLength(INITIAL_TOKENS.spacingScale.length)
    expect(TYPE_ROLES).toHaveLength(INITIAL_TOKENS.typeScale.length)
    const roles = [...RADIUS_ROLES, ...SPACING_ROLES, ...TYPE_ROLES]
    expect(roles.every((role) => role.short.length > 0 && role.usage.length > 0)).toBe(true)
  })

  it('exposes every radius, spacing and type step as a CSS variable', () => {
    const vars = previewStyleVars(INITIAL_TOKENS) as Record<string, string>
    INITIAL_TOKENS.radiusScale.forEach((value, index) => {
      expect(vars[`--r${index + 1}`]).toBe(`${value}px`)
    })
    INITIAL_TOKENS.spacingScale.forEach((value, index) => {
      expect(vars[`--s${index + 1}`]).toBe(`${value}px`)
    })
    INITIAL_TOKENS.typeScale.forEach((value, index) => {
      expect(vars[`--t${index + 1}`]).toBe(`${value}px`)
    })
    // 语义下标与数组档位保持一致
    expect(vars[`--s${SPACING_STEP.section + 1}`]).toBe(`${INITIAL_TOKENS.spacingScale[SPACING_STEP.section]}px`)
  })
})
