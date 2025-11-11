import Home from './pages/Home.vue'
import Notes from './pages/notes/index.vue'
import NotFound from './pages/NotFound.vue'

export const routes = [
  { path: '/', component: Home, meta: { title: 'Home' }},
  { path: '/notes', component: Notes, meta: { title: 'Notes' }},
  { path: '/:pathMatch(.*)*', component: NotFound, meta: { title: 'Page not found' }},
]
