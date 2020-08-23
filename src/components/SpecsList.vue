<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by title" v-model="title" />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="searchTitle">Search</button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Specs List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(spec, index) in specs"
          :key="index"
          @click="setActiveSpec(spec, index)"
        >{{ spec.title }}</li>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="currentSpec">
        <h4>Spec</h4>
        <div>
          <label>
            <strong>Title:</strong>
          </label>
          {{ currentSpec.title }}
        </div>
        <div>
          <label>
            <strong>Description:</strong>
          </label>
          {{ currentSpec.description }}
        </div>
        <div>
          <label>
            <strong>Status:</strong>
          </label>
          {{ currentSpec.started ? "STARTED" : "Pending" }}
        </div>

        <a class="badge badge-warning" :href="'/specs/' + currentSpec.id">Edit</a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Spec...</p>
      </div>
    </div>
  </div>
</template>

<script>
import specsService from "../services/specs";

export default {
  name: "specs-list",
  data() {
    return {
      specs: [],
      currentSpec: null,
      currentIndex: -1,
      title: "",
    };
  },
  methods: {
    retrieveSpecs() {
      specsService
        .getAll()
        .then((response) => {
          this.specs = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveSpecs();
      this.currentSpec = null;
      this.currentIndex = -1;
    },

    setActiveSpec(spec, index) {
      this.currentSpec = spec;
      this.currentIndex = index;
    },

    searchTitle() {
      specsService
        .findByTitle(this.title)
        .then((response) => {
          this.specs = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveSpecs();
  },
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>