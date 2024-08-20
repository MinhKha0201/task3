<script lang="ts" setup>
import { usersApi } from '@/api/api'
import { fetchUser } from '@/api/fetch'
import { Task, taskColumns } from '@/components/columns/taskColumns'
import { User } from '@/types/User.type'
import { computed, onMounted, ref } from 'vue'
import DataTable from '@/components/DataTable.vue'

const usersData = ref<User[]>([])
const data = ref<User[]>([])
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
        data.value = usersData.value.map((user) => {
            return {
                ...user,
            }
        })
        isLoading.value = true
    } catch (error) {
        console.log(error)
    }
}
onMounted(fetchData)
</script>
<template lang="">
    <div v-if="isLoading" class="p-10 grid grid-cols-2 gap-4">
        <div v-for="user in usersData" :key="user.id">
            <div
                class="p-4 font-medium text-center border-[1px] mb-1 rounded-lg"
            >
                {{ user.name }}
            </div>
            <DataTable
                class="max-h-[500px] overflow-x-auto"
                :columns="taskColumns"
                :data="
                    user.apps.map((app) => {
                        return {
                            ...app,
                            status: '',
                            start_date: '',
                            due_date: '',
                            note: '',
                        }
                    })
                "
            />
        </div>
    </div>
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
</template>
