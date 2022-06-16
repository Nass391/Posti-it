<template>
  <Teleport to="body" class="modal">
    <div v-show="openM" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h3 v-if="state == 'ADD'">ADD postit here!</h3>
            <h3 v-if="state == 'EDIT'">EDIT your postit!</h3>
          </div>
          <div>
            <p>Title:{{ title }}</p>

            <input v-model="title" placeholder="..." />

            <textarea v-model="content" />
            <div>
              <button v-if="state == 'ADD'" @click="sendPostit">Post!</button>
              <button v-if="state == 'EDIT'" @click="editPostit">Edit!</button>
              <button @click="this.$emit('close')">close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
import axios from "axios";
export default {
  props: {
    openM: Boolean,
    state: String,
    postitSelected: String,
    title2: String,
    content2: Array,
  },
  data() {
    return {
      title: "",
      content: "",
    };
  },
  watch: {
    // whenever question changes, this function will run
    title2: function () {
      this.title = this.title2;
      this.content = this.content2;
    },
  },
  methods: {
    editPostit: async function () {
      console.log("zzzzzzz EDIT POSTIT!");
      const url3 = "http://5.135.119.239:3090/notes/" + this.postitSelected;
      /*const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "NicoA",
          content: ["bgbgbg"],
        }),
      };
      await fetch(url3, requestOptions);*/

      await axios({
        method: "PUT",
        url: url3,
        data: {
          title: this.title,
          content: this.content,
        },
        headers: { "Content-Type": "application/json; charset=utf-8" },
      });
      this.$emit("reloadData");
      this.$emit("close");
    },
    sendPostit: function () {
      const url = "http://5.135.119.239:3090/notes/";

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: this.title,
          content: this.content,
        }),
      };
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then(() => {
          this.$emit("reloadData");
        })
        .then(this.$emit("close"))
        .then((this.title = ""))
        .then((this.content = ""));
    },
  },
};
</script>

<style scoped>
.show-clickable {
  cursor: pointer;
}
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 100%;
  margin-left: -150px;
  display: initial;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 400px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}
</style>
