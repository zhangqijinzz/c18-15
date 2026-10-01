import type { CSSProperties } from 'react'
import type { BrandTokens } from '../models/brandMirrorModels'

export interface ScaleRole {
  /** 短名：面板、版本卡片等空间紧张处使用 */
  short: string
  /** 用途说明：鼠标悬停在尺度编号上时展示 */
  usage: string
}

/**
 * 每一档尺度的语义在全应用保持一致：
 * 面板编号、令牌搜索、版本卡片、导出规范与预览消费的是同一份定义，
 * 修改某一档时，所有使用该档的位置会一起变化，不会只改到单个值。
 */
export const RADIUS_ROLES: ScaleRole[] = [
  { short: '小控件', usage: '标签、输入框、图表元素' },
  { short: '按钮', usage: '按钮与基础容器圆角' },
  { short: '面板', usage: '卡片与浮层面板圆角' },
  { short: '页面', usage: '页面容器与弹窗圆角' },
]

export const SPACING_ROLES: ScaleRole[] = [
  { short: '紧凑', usage: '图标与文字等紧邻元素之间' },
  { short: '控件', usage: '标签、按钮内边距与小间隙' },
  { short: '卡片', usage: '卡片内边距与组件间距' },
  { short: '区块', usage: '区块之间的间距' },
  { short: '页面', usage: '页面与卡片的整体留白' },
]

export const TYPE_ROLES: ScaleRole[] = [
  { short: '注释', usage: '标签、辅助说明等最小字号' },
  { short: '正文', usage: '按钮、输入框、导航与正文' },
  { short: '强调', usage: '用户名、品牌标识等强调文本' },
  { short: '标题', usage: '区块标题与数据卡数字' },
  { short: '展示', usage: '关键指标等展示数字' },
  { short: '大标题', usage: '页面主标题' },
]

/** 尺度档位的语义下标，供预览组件按用途取令牌，避免裸写魔法索引 */
export const RADIUS_STEP = { control: 0, button: 1, panel: 2, page: 3 } as const
export const SPACING_STEP = { tight: 0, control: 1, card: 2, section: 3, page: 4 } as const
export const TYPE_STEP = { caption: 0, body: 1, emphasis: 2, title: 3, display: 4, hero: 5 } as const

/**
 * 把整套令牌转成 CSS 自定义属性，挂在预览容器上。
 * 组件/页面/版本卡片样式统一消费这些变量，因此字号与间距调整会实时同步。
 * 版本卡片可在自身节点再挂一份自己版本的变量，覆盖继承值用于 A/B 对比。
 */
export function previewStyleVars(tokens: BrandTokens): CSSProperties {
  const vars: Record<string, string> = {}
  tokens.radiusScale.forEach((value, index) => {
    vars[`--r${index + 1}`] = `${value}px`
  })
  tokens.spacingScale.forEach((value, index) => {
    vars[`--s${index + 1}`] = `${value}px`
  })
  tokens.typeScale.forEach((value, index) => {
    vars[`--t${index + 1}`] = `${value}px`
  })
  return vars as CSSProperties
}
