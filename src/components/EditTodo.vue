<script>
export default {
  props: {
    editTodo: null,
  },
  data() {
    return {
      text: "",
    };
  },
  methods: {
    onSubmit(e) {
      if (!this.text) {
        alert("Please enter a todo text");
        return;
      } else {
        const editedTodo = {
          ...this.editTodo,
          text: this.text,
        };
        this.$emit("submit-edit", editedTodo);
        this.text = "";
      }
    },
  },
  created() {
    this.text = this.editTodo.text;
  },
  emits: ["submit-edit"],
}

</script>
<template>
  <form @submit.prevent="onSubmit">
    <input v-model="text" type="text" />
    <button type="submit" class="btn btn-primary">Edit Todo</button>
  </form>
</template>
