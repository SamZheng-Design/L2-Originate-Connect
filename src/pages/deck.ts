// Placeholder for Pitch Deck preview page
import type { Lang } from '../i18n'
import { renderLayout } from '../components/layout'

export function renderDeckPage(lang: Lang, id: string): string {
  const body = `
  <main class="container" style="padding-top: 32px; min-height: 60vh;">
    <p style="color: var(--text-secondary);">Pitch Deck preview for ${id} — Coming in Phase 4</p>
  </main>
  `
  return renderLayout(lang, 'Pitch Deck', body)
}
