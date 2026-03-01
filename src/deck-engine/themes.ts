// ═══════════════════════════════════════════════════════
// Pitch Deck Engine — 6套精品模板主题
// 模板市场的基础资产库
// ═══════════════════════════════════════════════════════

import type { DeckTheme } from './types'

// ── 1. 投行深色 (Goldman Dark) ──
export const themeGoldmanDark: DeckTheme = {
  id: 'goldman-dark',
  name: { zh: '投行深色', en: 'Goldman Dark' },
  description: { zh: '沉稳大气，适合机构投资人路演', en: 'Sophisticated dark theme for institutional investors' },
  preview: 'goldman-dark',
  category: 'professional',
  isPremium: false,
  colors: {
    primary: '#C9A96E',
    secondary: '#1A1A2E',
    accent: '#E8D5A3',
    background: '#0D0D1A',
    surface: '#1A1A2E',
    text: '#EAEAEA',
    textSecondary: '#9A9ABF',
    textOnPrimary: '#0D0D1A',
    gradientStart: '#0D0D1A',
    gradientEnd: '#1A1A2E',
    chartColors: ['#C9A96E', '#E8D5A3', '#8B7355', '#D4B87A', '#A68B5B', '#F0E6CC'],
  },
  fonts: {
    heading: "'Playfair Display', 'Noto Serif SC', Georgia, serif",
    body: "'Inter', 'Noto Sans SC', -apple-system, sans-serif",
    accent: "'Montserrat', 'Inter', sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  },
  layout: {
    borderRadius: '4px',
    cardStyle: 'outlined',
    headerStyle: 'left',
    coverStyle: 'gradient',
  },
}

// ── 2. 咨询清新 (McKinsey Light) ──
export const themeMcKinseyLight: DeckTheme = {
  id: 'mckinsey-light',
  name: { zh: '咨询清新', en: 'McKinsey Light' },
  description: { zh: '专业清爽，适合咨询风格的系统化展示', en: 'Clean & professional, consulting-style systematic presentation' },
  preview: 'mckinsey-light',
  category: 'professional',
  isPremium: false,
  colors: {
    primary: '#0066CC',
    secondary: '#F8FAFC',
    accent: '#00A3E0',
    background: '#FFFFFF',
    surface: '#F1F5F9',
    text: '#1E293B',
    textSecondary: '#64748B',
    textOnPrimary: '#FFFFFF',
    gradientStart: '#0066CC',
    gradientEnd: '#0088E0',
    chartColors: ['#0066CC', '#00A3E0', '#00C9A7', '#FFB800', '#FF6B6B', '#8B5CF6'],
  },
  fonts: {
    heading: "'Inter', 'Noto Sans SC', -apple-system, sans-serif",
    body: "'Inter', 'Noto Sans SC', -apple-system, sans-serif",
    accent: "'Montserrat', 'Inter', sans-serif",
    mono: "'SF Mono', 'Fira Code', monospace",
  },
  layout: {
    borderRadius: '8px',
    cardStyle: 'elevated',
    headerStyle: 'left',
    coverStyle: 'split',
  },
}

// ── 3. 科技感 (Startup Neon) ──
export const themeStartupNeon: DeckTheme = {
  id: 'startup-neon',
  name: { zh: '科技感', en: 'Startup Neon' },
  description: { zh: '炫酷渐变，适合科技/SaaS创业项目', en: 'Futuristic gradients for tech/SaaS startups' },
  preview: 'startup-neon',
  category: 'creative',
  isPremium: false,
  colors: {
    primary: '#7C3AED',
    secondary: '#0F172A',
    accent: '#06B6D4',
    background: '#020617',
    surface: '#0F172A',
    text: '#E2E8F0',
    textSecondary: '#94A3B8',
    textOnPrimary: '#FFFFFF',
    gradientStart: '#7C3AED',
    gradientEnd: '#06B6D4',
    chartColors: ['#7C3AED', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#EC4899'],
  },
  fonts: {
    heading: "'Montserrat', 'Noto Sans SC', sans-serif",
    body: "'Inter', 'Noto Sans SC', sans-serif",
    accent: "'Montserrat', 'Inter', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  layout: {
    borderRadius: '16px',
    cardStyle: 'glass',
    headerStyle: 'center',
    coverStyle: 'bold',
  },
}

// ── 4. 滴灌通品牌 (Micro Connect) ──
export const themeMicroConnect: DeckTheme = {
  id: 'micro-connect',
  name: { zh: '滴灌通品牌', en: 'Micro Connect' },
  description: { zh: '品牌标准色，适合滴灌通生态内项目', en: 'Official brand colors for Micro Connect ecosystem' },
  preview: 'micro-connect',
  category: 'brand',
  isPremium: false,
  colors: {
    primary: '#5DC4B3',
    secondary: '#0F3D36',
    accent: '#F59E0B',
    background: '#F8FFFE',
    surface: '#ECFDF5',
    text: '#1A1A1A',
    textSecondary: '#6E6E73',
    textOnPrimary: '#FFFFFF',
    gradientStart: '#0F3D36',
    gradientEnd: '#1A6B5F',
    chartColors: ['#5DC4B3', '#F59E0B', '#3D8F83', '#FCD34D', '#7DD4C7', '#D97706'],
  },
  fonts: {
    heading: "'Montserrat', 'Noto Sans SC', sans-serif",
    body: "'Inter', 'Noto Sans SC', -apple-system, sans-serif",
    accent: "'Montserrat', 'Inter', sans-serif",
    mono: "'SF Mono', monospace",
  },
  layout: {
    borderRadius: '12px',
    cardStyle: 'elevated',
    headerStyle: 'left',
    coverStyle: 'gradient',
  },
}

// ── 5. 极简主义 (Muji Minimal) ──
export const themeMujiMinimal: DeckTheme = {
  id: 'muji-minimal',
  name: { zh: '极简主义', en: 'Muji Minimal' },
  description: { zh: '大量留白，让数据自己说话', en: 'Maximum whitespace, let data speak for itself' },
  preview: 'muji-minimal',
  category: 'minimal',
  isPremium: true,
  colors: {
    primary: '#1A1A1A',
    secondary: '#F5F5F0',
    accent: '#C74632',
    background: '#FAFAF5',
    surface: '#FFFFFF',
    text: '#1A1A1A',
    textSecondary: '#8C8C8C',
    textOnPrimary: '#FFFFFF',
    gradientStart: '#1A1A1A',
    gradientEnd: '#333333',
    chartColors: ['#1A1A1A', '#C74632', '#8C8C8C', '#D4A574', '#5B5B5B', '#E8DDD3'],
  },
  fonts: {
    heading: "'Noto Serif SC', 'Playfair Display', Georgia, serif",
    body: "'Noto Sans SC', 'Inter', -apple-system, sans-serif",
    accent: "'Inter', sans-serif",
    mono: "'Source Code Pro', monospace",
  },
  layout: {
    borderRadius: '2px',
    cardStyle: 'flat',
    headerStyle: 'minimal',
    coverStyle: 'minimal',
  },
}

// ── 6. 数据密集 (Bloomberg Terminal) ──
export const themeBloomberg: DeckTheme = {
  id: 'bloomberg',
  name: { zh: '数据密集', en: 'Bloomberg Terminal' },
  description: { zh: '信息密度最大化，适合财务背景投资人', en: 'Maximum data density for finance-savvy investors' },
  preview: 'bloomberg',
  category: 'data',
  isPremium: true,
  colors: {
    primary: '#FF8700',
    secondary: '#1A1A1A',
    accent: '#00D4AA',
    background: '#000000',
    surface: '#1A1A1A',
    text: '#E0E0E0',
    textSecondary: '#888888',
    textOnPrimary: '#000000',
    gradientStart: '#000000',
    gradientEnd: '#1A1A1A',
    chartColors: ['#FF8700', '#00D4AA', '#FF4444', '#00AAFF', '#FFDD00', '#AA44FF'],
  },
  fonts: {
    heading: "'JetBrains Mono', 'Noto Sans SC', monospace",
    body: "'Inter', 'Noto Sans SC', -apple-system, sans-serif",
    accent: "'JetBrains Mono', monospace",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  },
  layout: {
    borderRadius: '4px',
    cardStyle: 'outlined',
    headerStyle: 'left',
    coverStyle: 'minimal',
  },
}

// ── 全部模板注册表 ──
export const ALL_THEMES: DeckTheme[] = [
  themeMicroConnect,
  themeGoldmanDark,
  themeMcKinseyLight,
  themeStartupNeon,
  themeMujiMinimal,
  themeBloomberg,
]

export function getThemeById(id: string): DeckTheme {
  return ALL_THEMES.find(t => t.id === id) || themeMicroConnect
}
