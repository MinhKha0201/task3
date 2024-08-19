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
import { User } from '@/types/User.type'

type Prop = {
    app_id: string
    onUpdate: Function
    users: User[]
}

defineProps<Prop>()

const open = ref(false)
const user_id = ref<number>(0)
</script>

<template>
    <Popover v-model:open="open">
        <PopoverTrigger as-child>
            <Button
                class="w-[150px] overflow-hidden flex justify-between"
                variant="outline"
                role="combobox"
                :aria-expanded="open"
            >
                {{
                    user_id
                        ? users.find((user: User) => user.id === user_id)?.name
                        : 'Select user'
                }}
                <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
        </PopoverTrigger>
        <PopoverContent class="w-[200px] p-0">
            <Command>
                <CommandInput class="h-9" placeholder="Search user..." />
                <CommandEmpty>No status found.</CommandEmpty>
                <CommandList>
                    <CommandGroup>
                        <CommandItem
                            v-for="user in users"
                            :key="user.id"
                            :value="user.name"
                            @select="
                                (ev: SelectEvent<AcceptableValue>) => {
                                    user_id = user.id
                                    onUpdate({
                                        app_id: app_id,
                                        name: ev.detail.value,
                                    })
                                    open = false
                                }
                            "
                        >
                            {{ user.name }}
                            <Check
                                :class="
                                    cn(
                                        'ml-auto h-4 w-4',
                                        user_id === user.id
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
