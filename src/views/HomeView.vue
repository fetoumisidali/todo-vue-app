
<script setup>
  import { computed, nextTick, onMounted, ref } from 'vue'
  import { useTodoStore } from '@/stores/todo'
  import TodoComponent from '@/components/TodoComponent.vue';
  import { storeToRefs } from 'pinia'
  
  const store = useTodoStore()
  const { todoList, numberOfTodos } = storeToRefs(store)
  const { addTodo, loadTodos } = store
  const todoName = ref(null)
  const inputRef = ref(null)
  const isButtonDisabled = computed(() => !todoName?.value?.trim())


  

  const add = () => {
    const value = todoName?.value?.trim()
    if (value) {
      addTodo({ "title": value, "isActive": false })
      todoName.value = ''
      nextTick(() => inputRef.value.focus())
    }
  }
  onMounted(() => {
    loadTodos()
    nextTick(() => inputRef.value.focus())
  })
  


</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-y-6  md:gap-x-3">
    <div class="space-y-2 col-span-2">
      <h1 ref="" class="text-2xl">Todo List {{ numberOfTodos }}</h1>
      <TodoComponent v-for="(todo,index) in todoList" :todo="todo" :index="index" />
    </div>
    <div class="col-span-1 space-y-3 order-first md:order-last">
      <h1 class="text-xl">add todo</h1>
      <input ref="inputRef" v-model="todoName"
        class="block px-3 py-2 focus:outline-none rounded border focus:border-black" type="text">
      <button :disabled="isButtonDisabled" @click="add"
        class="px-6 py-1.5 bg-black text-white shadow rounded hover:opacity-80 active:scale-95 disabled:opacity-50 disabled:pointer-events-none ">
        Add
      </button>
    </div>
  </div>
</template>
