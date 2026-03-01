// ═══════════════════════════════════════════════════════
// API Routes — Placeholder for Phase 5
// ═══════════════════════════════════════════════════════

import { Hono } from 'hono'
import { mockProjects } from './mock-data'

export const apiRoutes = new Hono()

// GET /api/projects
apiRoutes.get('/projects', (c) => {
  return c.json({ success: true, projects: mockProjects })
})

// GET /api/projects/:id
apiRoutes.get('/projects/:id', (c) => {
  const id = c.req.param('id')
  const project = mockProjects.find(p => p.id === id)
  if (!project) return c.json({ success: false, error: 'Not found' }, 404)
  return c.json({ success: true, project })
})

// POST /api/projects — Placeholder
apiRoutes.post('/projects', async (c) => {
  return c.json({ success: true, message: 'Coming in Phase 5' })
})

// POST /api/projects/:id/process — Placeholder
apiRoutes.post('/projects/:id/process', async (c) => {
  return c.json({ success: true, message: 'AI processing coming in Phase 5' })
})

// POST /api/projects/:id/publish — Placeholder
apiRoutes.post('/projects/:id/publish', async (c) => {
  return c.json({ success: true, message: '已发布到筛选池（Demo 演示）' })
})

// POST /api/projects/:id/share — Placeholder
apiRoutes.post('/projects/:id/share', async (c) => {
  const id = c.req.param('id')
  return c.json({ success: true, shareLink: `https://mc.link/p/${id}` })
})
