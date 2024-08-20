<script setup lang="ts">
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import DialogClose from './ui/dialog/DialogClose.vue'
import Button from './ui/button/Button.vue'
</script>

<template>
    <Dialog>
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                </DialogDescription>
            </DialogHeader>

            <DialogFooter>
                <DialogClose
                    ><Button type="submit"> Save changes </Button></DialogClose
                >
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
