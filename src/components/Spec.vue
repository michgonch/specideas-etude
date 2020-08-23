<template>
  <div v-if="currentSpec" class="edit-form">
    <h4>Specification</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title" v-model="currentSpec.title" />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description" v-model="currentSpec.description" />
      </div>

      <div class="form-group">
        <label>
          <strong>Status:</strong>
        </label>
        {{ currentSpec.started ? "STARTED" : "Pending" }}
      </div>
    </form>

    <button
      class="badge badge-primary mr-2"
      v-if="currentSpec.started"
      @click="updateStarted(false)"
    >Stop</button>

    <button v-else class="badge badge-primary mr-2" @click="updateStarted(true)">Start</button>

    <button class="badge badge-danger mr-2" @click="deleteSpec">Delete</button>

    <button type="submit" class="badge badge-success" @click="updateSpec">Update</button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Tutorial...</p>
  </div>
</template>

<script>
import specsService from "../services/specs";

export default {
  name: "spec",
  data() {
    return {
      currentSpec: null,
      message: "",
    };
  },
  methods: {
    getSpec(id) {
      specsService
        .get(id)
        .then((response) => {
          this.currentSpec = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateStarted(status) {
      const data = {
        id: this.currentSpec.id,
        title: this.currentSpec.title,
        description: this.currentSpec.description,
        started: status,
      };

      specsService
        .update(this.currentSpec.id, data)
        .then((response) => {
          this.currentSpec.started = status;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateSpec() {
      specsService
        .update(this.currentSpec.id, this.currentSpec)
        .then((response) => {
          console.log(response.data);
          this.message = "The Specification was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteSpec() {
      specsService
        .delete(this.currentSpec.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "specs" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getSpec(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>