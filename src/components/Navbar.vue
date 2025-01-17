<script setup>
    const activeClasses  = "bg-green-600 font-medium"
    const classes = "p-3 hover:bg-green-500 rounded"
</script>

<template>


    <nav class="bg-green-400 text-white py-6 px-12 flex items-center justify-between ">
        <RouterLink to="/" class="text-2xl">Todo App</RouterLink>
        <div class="space-x-12">
            <RouterLink :class="classes" :active-class="activeClasses" to="/">Todos</RouterLink>
        </div>
    </nav>
</template>