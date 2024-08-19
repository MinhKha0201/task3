<script setup lang="ts">
import { Badge } from '@/components/ui/badge'

type Prop = {
    url: string
    description: string
}

defineProps<Prop>()
</script>

<template>
    <Badge class="bg-slate-400 p-0 hover:bg-slate-500">
        <a :href="url" class="block px-2 py-1 rounded-full">{{ url }}</a>
    </Badge>
</template>
