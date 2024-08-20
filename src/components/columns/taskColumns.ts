import { App } from '@/types/App.type'
import { ColumnDef } from '@tanstack/vue-table'
import { h, ref } from 'vue'
import DataTableCombobox from '../DataTableCombobox.vue'
import Textarea from '../ui/textarea/Textarea.vue'

export type Task = App & {
    status: string
    start_date: string
    due_date: string
    note: string
}
export const taskColumns: ColumnDef<Task>[] = [
    {
        accessorKey: 'app_id',
        header: () => h('div', { class: 'hidden' }, 'ID'),
        cell: ({ row }) =>
            h('div', { class: 'hidden' }, row.getValue('app_id')),
    },
    {
        accessorKey: 'name',
        header: () => h('div', { class: 'text-left !w-[200px]' }, 'App'),
        cell: ({ row }) =>
            h('div', { class: 'w-[200px]' }, row.getValue('name')),
    },
    {
        accessorKey: 'status',
        header: () => h('div', { class: 'text-left' }, 'Request Status'),
        cell: ({ row }) => {
            const currentStatus = ref<string>(row.getValue<string>('status'))
            return h(DataTableCombobox, {
                app_id: row.getValue<string>('app_id'),
                value: currentStatus.value,
                onUpdate: (d: { app_id: string; status: string }) => {
                    currentStatus.value = d.status
                    const noteTextarea = document.getElementById(
                        `textarea-${d.app_id}`,
                    ) as HTMLTextAreaElement
                    if (noteTextarea && d.status === 'pending') {
                        noteTextarea.focus()
                    }
                },
            })
        },
    },
    {
        accessorKey: 'start_date',
        header: () => h('div', { class: 'text-left' }, 'Start date'),
        cell: ({ row }) => h('div', row.getValue('start_date')),
    },
    {
        accessorKey: 'due_date',
        header: () => h('div', { class: 'text-left' }, 'Due date'),
        cell: ({ row }) => h('div', row.getValue('due_date')),
    },
    {
        accessorKey: 'note',
        header: () => h('div', { class: 'text-left' }, 'Note'),
        cell: ({ row }) => {
            const handleFocus = (event: FocusEvent) => {}

            const handleBlur = (event: FocusEvent) => {
                const e = event.target as HTMLInputElement
                console.log(event)
                if (e.value.trim() === '') {
                    // e.focus()
                } else {
                }
            }
            return h(Textarea, {
                defaultValue: row.getValue<string>('note'),
                id: `textarea-${row.getValue('app_id')}`,
                onFocus: handleFocus,
                onBlur: handleBlur,
            })
        },
    },
]
