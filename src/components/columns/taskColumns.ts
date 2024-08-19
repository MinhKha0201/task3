import { App } from '@/types/App.type'
import { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'

export type Task = App & {
    status: string
    start_date: string
    due_date: string
    note: string
}
export const taskColumns = (data: Task[]): ColumnDef<Task>[] => [
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
        header: () => h('div', { class: 'text-left' }, 'Status'),
        cell: ({ row }) => h('div', row.getValue('status')),
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
        cell: ({ row }) => h('div', row.getValue('note')),
    },
]
