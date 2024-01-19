<script>
export default {
  data() {
    return {
      text: "",
    };
  },
  methods: {
    onSubmit(e) {
      if (!this.text) {
        alert("Please enter a todo");
        return;
      } else {
        const newTodo = {
        //   id: Math.floor(Math.random() * 100000),
          text: this.text,
          complete: false,
          date: new Date().toDateString(),
          dateCompleted: null,
        }
        this.$emit("add-todo", newTodo);
        this.text = "";
      }
    },
  },
}
</script>
<template>
  <form @submit.prevent="onSubmit">
    <input v-model="text" type="text" />
    <button type="submit" class="btn btn-primary">Add Todo</button>
  </form>
</template>
