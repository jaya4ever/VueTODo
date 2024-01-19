<script>
import ToDoList from "./components/ToDoList.vue";
import AddTodo from "./components/AddTodo.vue";
import EditTodo from "./components/EditTodo.vue";
export default {
  components: {
    ToDoList,
    AddTodo,
    EditTodo,
  },
  data() {
    return {
      todos: [],
      editMode: false,
      editTodo: null,
      endpoint: "http://localhost:4000/todos/",
    };
  },
  computed: {
    totalTodos() {
      return this.todos.length;
    },
    pendingTodos() {
      return this.todos.filter((todo) => {return !todo.complete}).length;
    },
    completedTodos() {
      return this.todos.filter((todo) => {return todo.complete}).length;
    },
  },
  methods: {
    async deleteTodo(todoId) {
      if (confirm("Are you sure you want to delete this todo?")) {
        const response = await fetch(this.endpoint + todoId, {
          method: "DELETE",
        });
        response.status === 200
          ? (this.todos = this.todos.filter((todo) => todo.id !== todoId))
          : alert("There was an error deleting this todo");
      }
    },
    async addTodo(todo) {
      const response = await fetch(this.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      const data = await response.json();
      this.todos = [...this.todos, data];
    },
    handleEdit(todo) {
      this.editMode = true;
      this.editTodo = todo;
    },
    async submitEdit(editedTodo) {
      const response = await fetch(this.endpoint + editedTodo.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedTodo),
      });
      this.todos = this.todos.map((todo) => (todo.id === editedTodo.id ? { ...todo, text: editedTodo.text } : todo));
      this.editMode = false;
      this.editTodo = null;
    },
    async fetchTodos() {
      const response = await fetch(this.endpoint);
      const data = await response.json();
      return data;
    },
    async toggleComplete(todo) {
      todo.complete = !todo.complete;
      todo.dateCompleted = new Date().toDateString();
      const response = await fetch(this.endpoint + todo.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      const data = await response.json();
      this.todos = this.todos.map((temptodo) => (temptodo.id === todo.id ? { ...temptodo, complete: data.complete, dateCompleted: data.dateCompleted } : temptodo));
    },
  },
  async created() {
    const todos = await this.fetchTodos();
    this.todos = todos;
  },
  // created() {
  //   this.todos = [];
  // },
};
</script>
<template>
  <div>
    <EditTodo v-if="editMode" :editTodo="editTodo" @submit-edit="submitEdit" :key="editTodo.id" />
    <AddTodo v-else @add-todo="addTodo" />
    <br />
    <h4>Total Todos:{{ totalTodos }} | Pending: {{ pendingTodos }} | Completed: {{ completedTodos }}</h4>
    <br />
    <ToDoList :todos="todos" @delete-todo="deleteTodo" @edit-todo="handleEdit"
    @toggle-complete="toggleComplete" />
  </div>
</template>
