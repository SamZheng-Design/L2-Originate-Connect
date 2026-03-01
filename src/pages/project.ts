// Placeholder for project workspace page
import type { Lang } from '../i18n'
import { renderLayout } from '../components/layout'

export function renderProjectPage(lang: Lang, id: string): string {
  const body = `
  <main class="container" style="padding-top: 32px; min-height: 60vh;">
    <p style="color: var(--text-secondary);">Project workspace for ${id} — Coming in Phase 3</p>
  </main>
  `
  return renderLayout(lang, 'Project', body)
}
