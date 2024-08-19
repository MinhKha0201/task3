<script setup lang="ts">
import { ref } from 'vue'
import { Check, ChevronsUpDown } from 'lucide-vue-next'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { SelectEvent } from 'node_modules/radix-vue/dist/Combobox/ComboboxItem'
import { AcceptableValue } from 'node_modules/radix-vue/dist/shared/types'

type Prop = {
    app_id: string
    onUpdate: Function
}

defineProps<Prop>()
const emit = defineEmits(['update:value'])

export type Status = {
    value: string
    label: string
}

const statuses = [
    { value: 'request', label: 'Request' },
    { value: 'processing', label: 'Processing' },
    { value: 'done', label: 'Done' },
    { value: 'product', label: 'Product' },
    { value: 'open', label: 'Open' },
    { value: 'pending', label: 'Pending' },
]

const open = ref(false)
const value = ref('')
</script>

<template>
    <Popover v-model:open="open">
        <PopoverTrigger as-child>
            <Button
                variant="outline"
                role="combobox"
                :aria-expanded="open"
                :class="
                    value === 'request'
                        ? 'w-[150px] justify-between bg-purple-400 hover:bg-purple-500 text-white hover:text-white'
                        : value === 'processing'
                          ? 'w-[150px] justify-between bg-yellow-400 hover:bg-yellow-500 text-white hover:text-white'
                          : value === 'done'
                            ? 'w-[150px] justify-between bg-green-400 hover:bg-green-500 text-white hover:text-white'
                            : value === 'product'
                              ? 'w-[150px] justify-between bg-blue-400 hover:bg-blue-500 text-white hover:text-white'
                              : value === 'open'
                                ? 'w-[150px] justify-between bg-blue-700 hover:bg-blue-800 text-white hover:text-white'
                                : 'w-[150px] justify-between bg-white'
                "
            >
                {{
                    value
                        ? statuses.find(
                              (status: Status) => status.value === value,
                          )?.label
                        : 'Select status'
                }}
                <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
        </PopoverTrigger>
        <PopoverContent class="w-[200px] p-0">
            <Command>
                <CommandInput class="h-9" placeholder="Search status..." />
                <CommandEmpty>No status found.</CommandEmpty>
                <CommandList>
                    <CommandGroup>
                        <CommandItem
                            v-for="status in statuses"
                            :key="status.value"
                            :value="status.value"
                            @select="
                                (ev: SelectEvent<AcceptableValue>) => {
                                    if (typeof ev.detail.value === 'string') {
                                        value = ev.detail.value
                                    }
                                    onUpdate({
                                        app_id: app_id,
                                        status: ev.detail.value,
                                    })
                                    open = false
                                }
                            "
                        >
                            {{ status.label }}
                            <Check
                                :class="
                                    cn(
                                        'ml-auto h-4 w-4',
                                        value === status.value
                                            ? 'opacity-100'
                                            : 'opacity-0',
                                    )
                                "
                            />
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        </PopoverContent>
    </Popover>
</template>
