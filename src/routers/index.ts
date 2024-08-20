import TaskPage from '@/views/TaskPage.vue'
import UserPage from '@/views/UserPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: TaskPage,
    },
    {
        path: '/user',
        component: UserPage,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
