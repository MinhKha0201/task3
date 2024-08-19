import TaskPage from '@/views/TaskPage.vue'
import StatisticalPage from '@/views/StatisticalPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: TaskPage,
    },
    {
        path: '/statistical',
        component: StatisticalPage,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
