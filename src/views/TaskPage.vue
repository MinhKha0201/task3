<script setup lang="ts">
// import { Button } from '@/lib/registry/new-york/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { computed, onMounted, ref } from 'vue'
import { User } from '../types/User.type'
import { Team } from '../types/Team.type'
import { fetchApp, fetchTeam, fetchUser } from '../api/fetch'
import { appsApi, teamsApi, usersApi } from '../api/api'

import DataTable from '../components/DataTable.vue'
import { createColumns, Data } from '../components/columns/dataColumns'
import AddTaskModal from '../components/AddTaskModal.vue'

const usersData = ref<User[]>([])
const teamsData = ref<Team[]>([])
const appsData = ref<Data[]>([])
const next_page_url = ref<string | null>(null)
const isLoading = ref<boolean>(false)

const fetchData = async () => {
    try {
        isLoading.value = false
        do {
            const usersRes = await fetchUser(
                next_page_url.value !== null ? next_page_url.value : usersApi,
            )
            usersData.value = [...usersData.value, ...usersRes.data]
            next_page_url.value = usersRes.next_page_url
        } while (next_page_url.value !== null)
        teamsData.value = await fetchTeam(teamsApi)
        appsData.value = (await fetchApp(appsApi)).map((app) => {
            return {
                ...app,
                status: '',
                link: 'https://www.google.com',
                dev: '',
                dateofrequest: '01/01/2024',
                note: 'tăng rev/user',
                ver: '01/01/2024',
            }
        })
        isLoading.value = true
    } catch (error) {
        console.log(error)
    }
}
onMounted(fetchData)

const columns = computed(() => createColumns(appsData.value, usersData.value))
</script>

<template>
    <div class="p-10">
        <div class="pb-10">
            <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
                <Card class="border-blue-400">
                    <CardHeader
                        class="flex flex-row items-center justify-between space-y-0 pb-2"
                    >
                        <CardTitle class="text-sm font-medium text-blue-400">
                            Product
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold text-blue-400">
                            {{
                                appsData.filter(
                                    (app) => app.status === 'product',
                                ).length
                            }}
                        </div>
                    </CardContent>
                </Card>
                <Card class="border-purple-400">
                    <CardHeader
                        class="flex flex-row items-center justify-between space-y-0 pb-2"
                    >
                        <CardTitle class="text-sm font-medium text-purple-400">
                            Request
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold text-purple-400">
                            {{
                                appsData.filter(
                                    (app) => app.status === 'request',
                                ).length
                            }}
                        </div>
                    </CardContent>
                </Card>
                <Card class="border-blue-700">
                    <CardHeader
                        class="flex flex-row items-center justify-between space-y-0 pb-2"
                    >
                        <CardTitle class="text-sm font-medium text-blue-700">
                            Open
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold text-blue-700">
                            {{
                                appsData.filter((app) => app.status === 'open')
                                    .length
                            }}
                        </div>
                    </CardContent>
                </Card>
                <Card class="border-yellow-400">
                    <CardHeader
                        class="flex flex-row items-center justify-between space-y-0 pb-2"
                    >
                        <CardTitle class="text-sm font-medium text-yellow-400">
                            Processing
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold text-yellow-400">
                            {{
                                appsData.filter(
                                    (app) => app.status === 'processing',
                                ).length
                            }}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader
                        class="flex flex-row items-center justify-between space-y-0 pb-2"
                    >
                        <CardTitle class="text-sm font-medium">
                            Pending
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">
                            {{
                                appsData.filter(
                                    (app) => app.status === 'pending',
                                ).length
                            }}
                        </div>
                    </CardContent>
                </Card>
                <Card class="border-green-400">
                    <CardHeader
                        class="flex flex-row items-center justify-between space-y-0 pb-2"
                    >
                        <CardTitle class="text-sm font-medium text-green-400">
                            Done
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold text-green-400">
                            {{
                                appsData.filter((app) => app.status === 'done')
                                    .length
                            }}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
        <div class="mb-6 flex justify-end">
            <AddTaskModal />
        </div>
        <div class="">
            <DataTable v-if="isLoading" :columns="columns" :data="appsData" />
            <div v-else class="text-center">
                <div
                    class="m-12 text-center inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                    role="status"
                >
                    <span
                        class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                        >Loading...</span
                    >
                </div>
            </div>
        </div>
    </div>
</template>
