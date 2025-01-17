<script setup>
    import { useTodoStore } from '@/stores/todo'

    const store = useTodoStore()

    const { deleteTodo } = store

    const props = defineProps ({
        todo:Object,
        index:Number
    })

    const handleDelete = () => deleteTodo(props.index)

    
    
</script>

<template>
    <div class="p-6 shadow rounded flex justify-between">
        <h3 class="text-xl">{{ props.todo.title }}</h3>
        <div class="space-x-3">
            <button @click="handleDelete" class="px-3 py-1.5 text-white bg-red-500  rounded hover:opacity-90">delete</button>
            <input :checked="props.todo.isActive"  type="checkbox">
        </div>
    </div>
</template>