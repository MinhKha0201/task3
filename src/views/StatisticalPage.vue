<script lang="ts" setup>
import { usersApi } from '@/api/api'
import { fetchUser } from '@/api/fetch'
import { Task, taskColumns } from '@/components/columns/taskColumns'
import { User } from '@/types/User.type'
import { computed, onMounted, ref } from 'vue'

const usersData = ref<User[]>([])
const data = ref<Task[]>([])
const next_page_url = ref<string | null>(null)
const fetchData = async () => {
    try {
        do {
            const usersRes = await fetchUser(
                next_page_url.value !== null ? next_page_url.value : usersApi,
            )
            usersData.value = [...usersData.value, ...usersRes.data]
            next_page_url.value = usersRes.next_page_url
        } while (next_page_url.value !== null)
        // data.value = usersData.value.map((user) => {
        //     return {
        //         ...user.apps,
        //         status: '',
        //         start_date: '',
        //         due_date: '',
        //         note: '',
        //     }
        // })
    } catch (error) {
        console.log(error)
    }
}
onMounted(fetchData)

// const columns = computed(() => taskColumns())
</script>
<template lang="">
    <div class="p-10">statistical</div>
</template>
