
<script setup>
  import { computed, nextTick, onMounted, ref } from 'vue'
  import { useTodoStore } from '@/stores/todo'
  import TodoComponent from '@/components/TodoComponent.vue';
  import { storeToRefs } from 'pinia'
  import { usePagination } from '@/composables/usePages';
  const store = useTodoStore()
  const { todoList, numberOfTodos } = storeToRefs(store)
  const { addTodo, loadTodos ,deleteAllTodos } = store
  const todoName = ref(null)
  const inputRef = ref(null)
  const isButtonDisabled = computed(() => !todoName?.value?.trim())
  const isDeleteAllButtonDisabled = computed(() => numberOfTodos.value === 0)



  const { currentPage, totalPages, paginatedItems, goToPage } = usePagination(todoList, 5)

  const add = () => {
    const value = todoName?.value?.trim()
    if (value) {
      addTodo({ "title": value, "isActive": false })
      todoName.value = ''
      nextTick(() => {
        inputRef.value.focus()
        currentPage.value = 1
      })
    }
  }
  onMounted(() => {
    loadTodos()
    nextTick(() => inputRef.value.focus())
  })
  
  const nextPage = (() => goToPage(currentPage.value+1))
  const previousPage = (() => goToPage(currentPage.value-1))
  


</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-y-6  md:gap-x-3">
    <div class="space-y-2 col-span-2">
      <div class="flex justify-between">
        <h1 class="text-2xl">Todo List</h1>
        <button :disabled="isDeleteAllButtonDisabled" @click="deleteAllTodos"
          class="px-6 py-2 bg-red-500 text-white rounded hover:opacity-80 disabled:pointer-events-none disabled:opacity-50">Delete
          All</button>
      </div>
      <TodoComponent v-for=" (todo,index) in paginatedItems" :todo="todo" :index="index" />
      <div v-if="totalPages > 1" class="flex justify-between mt-6">
        <button @click="previousPage" :disabled="currentPage === 1"
          class="px-3 py-2 bg-green-500 text-white rounded hover:opacity-80 shadow disabled:opacity-50">
          Previous
        </button>
        <span>page {{ currentPage }} of {{ totalPages }} with {{ numberOfTodos }} total items</span>
        <button @click="nextPage(currentPage+1)" :disabled="currentPage === totalPages"
          class="px-3 py-2 bg-green-500 text-white rounded hover:opacity-80 shadow disabled:opacity-50">
          Next
        </button>
      </div>
    </div>
    <form class="col-span-1 space-y-3 order-first md:order-last">
      <h1 class="text-xl">add todo</h1>
      <input ref="inputRef" v-model="todoName"
        class="block px-3 py-2 focus:outline-none rounded border focus:border-black" type="text">
      <button :disabled="isButtonDisabled" @click.prevent="add"
        class="px-6 py-1.5 bg-black text-white shadow rounded hover:opacity-80 active:scale-95 disabled:opacity-50 disabled:pointer-events-none ">
        Add
      </button>
    </form>
  </div>
</template>
