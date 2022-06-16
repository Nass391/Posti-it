<template>
  <h1>Postits</h1>
  <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
    <div class="card mb-4 rounded-3 border-primary">
      <h4 class="my-0 fw-normal show-clickable mb-3" @click="this.openM = true">
        ADD POSTIT
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="42"
          height="42"
          fill="currentColor"
          class="bi bi-plus-square"
          viewBox="0 0 16 16"
        >
          <path
            d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
          />
          <path
            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
          />
        </svg>
      </h4>
      <PostitModal
        @reloadData="loadData"
        v-on:close="openM = false"
        :state="state"
        :openM="openM"
      />
      <h4 v-on:click="deleteAll" class="my-0 fw-normal show-clickable">
        Delete all
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="42"
          height="42"
          fill="currentColor"
          class="bi bi-x-octagon-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"
          />
        </svg>
      </h4>
    </div>
    <div v-for="postit in results" :key="postit._id">
      <PostitInfo
        :title="postit.title"
        :id="postit._id"
        :content="postit.content"
        @reloadData="loadData"
      />
    </div>
  </div>
</template>

<script>
import PostitInfo from "@/components/PostitInfo.vue";
import PostitModal from "@/components/PostitModal.vue";

export default {
  components: {
    PostitInfo,
    PostitModal,
  },
  data: function () {
    return {
      openM: false,
      results: null,
      allIds: [],
      state: "ADD",
    };
  },
  methods: {
    loadData: function () {
      const url = "http://5.135.119.239:3090/notes";
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          return (this.results = [...data.notes]);
        });
    },

    delete: function (id) {
      const url2 = "http://5.135.119.239:3090/notes/" + id;
      fetch(url2, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          this.results = data;
        })
        .then(() => {
          this.$emit("reloadData");
        });
    },
    deleteAll: function () {
      this.results.forEach(this.deleteEach);
    },
    deleteEach: function (array) {
      this.delete(array["_id"]);
    },
  },

  mounted() {
    this.loadData();
  },
};
</script>

<style scoped>
.show-clickable {
  cursor: pointer;
}
</style>
