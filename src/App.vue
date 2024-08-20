<script setup lang="ts">
import { ref } from 'vue'

const activeLink = ref<string>('')
console.log(activeLink.value)
</script>

<template>
    <div class="pt-8 px-10 flex justify-center gap-3 font-medium">
        <router-link
            :class="
                activeLink === ''
                    ? 'px-2 py-1 border-b-[1px] border-red-500'
                    : 'px-2 py-1'
            "
            to="/"
            @click="activeLink = ''"
            >Task</router-link
        >
        <router-link
            :class="
                activeLink === 'user'
                    ? 'px-2 py-1 border-b-[1px] border-red-500'
                    : 'px-2 py-1'
            "
            to="/user"
            @click="activeLink = 'user'"
            >User</router-link
        >
    </div>
    <router-view></router-view>
</template>
