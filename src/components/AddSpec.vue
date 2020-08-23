<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="spec.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="spec.description"
          name="description"
        />
      </div>

      <button @click="saveSpec" class="btn btn-success">Save</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newSpec">Add</button>
    </div>
  </div>
</template>

<script>
import specsService from "../services/specs";

export default {
  name: "add-spec",
  data() {
    return {
      spec: {
        id: null,
        title: "",
        description: "",
        started: false,
      },
      submitted: false,
    };
  },
  methods: {
    saveSpec() {
      const data = {
        title: this.spec.title,
        description: this.spec.description,
      };

      specsService
        .create(data)
        .then((response) => {
          this.spec.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newSpec() {
      this.submitted = false;
      this.spec = {};
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>