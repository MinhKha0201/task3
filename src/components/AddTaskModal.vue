<script lang="ts" setup>
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus } from 'lucide-vue-next'
</script>

<template>
    <Dialog>
        <DialogTrigger as-child>
            <Button
                class="gap-2 bg-green-500 text-white hover:bg-green-600 hover:text-white"
                variant="outline"
            >
                <Plus :size="16" />
                Add task
            </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                </DialogDescription>
            </DialogHeader>
            <div class="grid gap-4 py-4">
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="name" class="text-right"> Name </Label>
                    <Input id="name" value="Pedro Duarte" class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="username" class="text-right"> Username </Label>
                    <Input id="username" value="@peduarte" class="col-span-3" />
                </div>
            </div>
            <DialogFooter>
                <Button
                    class="bg-green-500 text-white hover:bg-green-600 hover:text-white"
                    type="submit"
                >
                    Add new
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
