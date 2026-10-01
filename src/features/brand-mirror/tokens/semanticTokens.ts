import type { BrandTokens } from '../models/brandMirrorModels'

/**
 * 三套尺度的档位定义集中在这里维护：
 * 每一档对应什么语义、最终被预览里的哪些部位消费，都以 SCALE_LEVELS 为准。
 * 预览组件只允许通过 resolveTokens 的结果取值，不再各自硬编码数组下标。
 */
export type ScaleField = 'radiusScale' | 'spacingScale' | 'typeScale'

export interface ScaleLevel {
  /** 档位序号（从 1 开始，与面板输入框、令牌搜索里展示的序号一致） */
  index: number
  /** 档位名称，用于面板每一档输入框下方的说明 */
  name: string
  /** 这一档具体作用在预览的哪些部位，用于输入框 title 提示 */
  usedFor: string
}

export const SCALE_LEVELS: Record<ScaleField, ScaleLevel[]> = {
  radiusScale: [
    { index: 1, name: '控件', usedFor: '输入框、小标签、图表柱、版本预览按钮' },
    { index: 2, name: '按钮', usedFor: '主按钮、次要按钮、面板小卡片' },
    { index: 3, name: '卡片', usedFor: '组件卡片、版本卡片' },
    { index: 4, name: '容器', usedFor: '整页样例、装饰图形、胶囊标签' },
  ],
  spacingScale: [
    { index: 1, name: '紧排', usedFor: '标签间隙、图标与文字间距、统计数字上下留白' },
    { index: 2, name: '控件内', usedFor: '按钮/标签/输入框内边距、头像与侧栏条目间距' },
    { index: 3, name: '元素间', usedFor: '组件卡片与统计卡内边距、行间距、图表内边距' },
    { index: 4, name: '分组', usedFor: '版本卡片、仪表盘侧栏与主区域边距、统计区/图表组间距、落地页 CTA' },
    { index: 5, name: '页面', usedFor: '整页样例边距、侧栏宽度（3 倍）、主要区块间距（落地页标题区取 2 倍）' },
  ],
  typeScale: [
    { index: 1, name: '标注', usedFor: '角标、标签、统计说明、时间等辅助小字' },
    { index: 2, name: '正文小', usedFor: '按钮、输入框、导航、开关等控件文字' },
    { index: 3, name: '正文', usedFor: '组件标题、正文段落、侧栏文字' },
    { index: 4, name: '小标题', usedFor: '仪表盘问候语、侧栏品牌字' },
    { index: 5, name: '大标题', usedFor: '关键指标数字' },
    { index: 6, name: '展示', usedFor: '落地页主标题' },
  ],
}

/** 预览消费的语义令牌：名称与 SCALE_LEVELS 的语义一一对应 */
export interface SemanticTokens {
  primary: string
  secondary: string
  radius: {
    control: number
    button: number
    card: number
    container: number
  }
  spacing: {
    tight: number
    control: number
    element: number
    group: number
    page: number
  }
  type: {
    caption: number
    bodySmall: number
    body: number
    title: number
    headline: number
    display: number
  }
}

export function resolveTokens(tokens: BrandTokens): SemanticTokens {
  const [control, button, card, container] = tokens.radiusScale
  const [tight, spacingControl, element, group, page] = tokens.spacingScale
  const [caption, bodySmall, body, title, headline, display] = tokens.typeScale
  return {
    primary: tokens.primary,
    secondary: tokens.secondary,
    radius: { control, button, card, container },
    spacing: { tight, control: spacingControl, element, group, page },
    type: { caption, bodySmall, body, title, headline, display },
  }
}

export const px = (value: number): string => `${value}px`
