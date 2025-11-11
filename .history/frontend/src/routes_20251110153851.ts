
import About from './pages/notes/index.vue'
import NotFound from './pages/notFound/index.vue'

export const routes = [
  // { path: '/', component: Home, meta: { title: 'Home' }},
  { path: '/notes', component: About, meta: { title: 'About' }},
  { path: '/:pathMatch(.*)*', component: NotFound, meta: { title: 'Page not found' }},
]
