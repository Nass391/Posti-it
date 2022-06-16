<template>
  <h1>Postit</h1>
  <PostitModal
    @reloadData="loadData"
    v-on:close="openM = false"
    :state="state"
    :openM="openM"
    :postitSelected="$route.params.id"
    :title2="results?.title"
    :content2="results?.content"
  />
  <div class="card mb-4 rounded-3 shadow-sm border-primary card-single">
    <div class="card-header py-3">
      <h4 class="my-0 fw-normal">{{ results?.title }}</h4>
    </div>

    <div class="home" style="overflow-y: auto">{{ results?.content[0] }}</div>
    <div class="home">id: {{ $route.params.id }}</div>
    <button
      type="button"
      class="w-32 btn btn-lg btn-primary"
      @click="this.openM = true"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-pencil-square"
        viewBox="0 0 16 16"
      >
        <path
          d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
        />
        <path
          fill-rule="evenodd"
          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
        />
      </svg>
    </button>
  </div>
</template>

<script>
import PostitModal from "@/components/PostitModal.vue";

export default {
  name: "PostitInfoView",
  components: { PostitModal },
  data: function () {
    return {
      openM: false,
      results: null,
      state: "EDIT",
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData: function () {
      const url = "http://5.135.119.239:3090/notes/" + this.$route.params.id;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.results = data.note;
        });
    },
  },
};
</script>
<style scoped>
.card-single {
  width: 300px;
  margin: 0 auto;
}
</style>
