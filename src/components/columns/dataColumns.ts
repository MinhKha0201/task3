import { App } from '@/types/App.type'
import { User } from '@/types/User.type'
import { ColumnDef } from '@tanstack/vue-table'
import { h, ref } from 'vue'
import DataTableCombobox from '../DataTableCombobox.vue'
import DataTableLink from '../DataTableLink.vue'
import DataTableUserCombobox from '../DataTableUserCombobox.vue'

export type Data = App & {
    status: string
    link: string
    dev: string
    dateofrequest: string
    note: string
    ver: string
}

export const createColumns = (
    data: Data[],
    users: User[],
): ColumnDef<Data>[] => [
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
            const openModal = ref<boolean>(false)
            return h('div', [
                h(DataTableCombobox, {
                    app_id: row.getValue<string>('app_id'),
                    onUpdate: (d: { app_id: string; status: string }) => {
                        const app = data.find((i) => i.app_id === d.app_id)
                        if (app) {
                            app.status = d.status
                        }
                        if (d.status === 'pending') {
                            openModal.value = true
                        }
                    },
                }),
            ])
        },
    },
    {
        accessorKey: 'link',
        header: () => h('div', { class: 'text-left' }, 'Link'),
        cell: ({ row }) => {
            return h(DataTableLink, {
                url: row.getValue<string>('link'),
                description: 'Link',
            })
        },
    },
    {
        accessorKey: 'dev',
        header: () => h('div', { class: 'text-left' }, 'Dev'),
        cell: ({ row }) => {
            return h(DataTableUserCombobox, {
                app_id: row.getValue<string>('app_id'),
                onUpdate: (updateValue: { app_id: string; name: string }) => {
                    const app = data.find(
                        (app) => app.app_id === updateValue.app_id,
                    )
                    if (app) {
                        app.dev = updateValue.name
                    }
                },
                users: users,
            })
        },
    },
    {
        accessorKey: 'dateofrequest',
        header: () => h('div', { class: 'text-left' }, 'Ngày nhận request'),
        cell: ({ row }) => h('div', row.getValue('dateofrequest')),
    },
    {
        accessorKey: 'note',
        header: () => h('div', { class: 'text-left' }, 'Note'),
        cell: ({ row }) => h('div', row.getValue('note')),
    },
    {
        accessorKey: 'ver',
        header: () => h('div', { class: 'text-left' }, 'Ngày lên ver'),
        cell: ({ row }) => h('div', row.getValue('ver')),
    },
]
