import { ref, computed , watch } from 'vue'
import { defineStore } from 'pinia'



export const useTodoStore = defineStore('todos', () => {



  const todoList = ref([])
  const numberOfTodos = computed(() => todoList.value.length)

  function loadTodos() {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      todoList.value = JSON.parse(savedTodos)
    }
  }
  function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todoList.value))
  }
  watch(
    todoList,
    () => {
      saveTodos()
    },
    { deep: true }
  )

  function addTodo(todo) {
    todoList.value.unshift(todo)
    console.log('Here We Go...')
  }

  function deleteTodo(index){
    todoList.value.splice(index,1)
  }

  return { todoList, numberOfTodos, addTodo ,loadTodos , deleteTodo}
})
