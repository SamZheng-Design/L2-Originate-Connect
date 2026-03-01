import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { designTokensCSS } from './design-tokens'
import { renderNavbar } from './components/navbar'
import { renderFooter } from './components/footer'
import { renderToast } from './components/toast'
import { renderModal } from './components/modal'
import { getLang, tt, TEXT } from './i18n'
import { renderHomePage } from './pages/home'
import { renderProjectPage } from './pages/project'
import { renderDeckPage } from './pages/deck'
import { renderTemplateMarketPage } from './pages/template-market'
import { renderLoginPage } from './pages/login'
import { apiRoutes } from './api'

const app = new Hono()

// CORS for API
app.use('/api/*', cors())

// Mount API routes
app.route('/api', apiRoutes)

// ============ Page Routes ============

// Login / Register
app.get('/login', (c) => {
  const lang = getLang(c)
  return c.html(renderLoginPage(lang))
})

// Home - Project list
app.get('/', (c) => {
  const lang = getLang(c)
  return c.html(renderHomePage(lang))
})

// Project workspace
app.get('/project/:id', (c) => {
  const lang = getLang(c)
  const id = c.req.param('id')
  return c.html(renderProjectPage(lang, id))
})

// Pitch Deck fullscreen preview (supports ?theme=xxx&framework=xxx)
app.get('/project/:id/deck', (c) => {
  const lang = getLang(c)
  const id = c.req.param('id')
  const theme = c.req.query('theme') || undefined
  const framework = c.req.query('framework') || undefined
  return c.html(renderDeckPage(lang, id, theme, framework))
})

// Template Market — 模板市场
app.get('/templates', (c) => {
  const lang = getLang(c)
  return c.html(renderTemplateMarketPage(lang))
})

export default app
