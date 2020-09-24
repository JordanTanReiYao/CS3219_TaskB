<template>
  <div class="container">
    <div class="home">
      <h2>Contacts List</h2>
      <div v-if="message" class="alert alert-dismissible alert-success">
        <h4 class="alert-heading">Success!</h4>
        <p class="mb-0">{{message}} Deleted!</p>
      </div>
      <hr>
        <div v-if="loading" class="alert alert-dismissible alert-warning">
          <h4 class="alert-heading">Loading Contacts List...</h4>
        </div>
        <div v-else class="card border-primary m-3" v-for="contact in info" :key="contact._id"
          style="min-width: 20% max-width: 50%;">
          <h3 class="card-header">{{contact.name}}</h3>
          <div class="card-body">
              <h5 class="card-title">Email: {{contact.email}}</h5>
              <p class="card-text">Phone: {{contact.phone}}</p>
              <p class="card-text">Gender: {{contact.gender}}</p>
              <router-link :to="{ path: `/edit-contact/${contact._id}` }">Edit Contact</router-link>
              <button type="button" class="btn btn-danger m-2" v-on:click="clickHandler(contact)">
                Delete Contact
              </button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const API_URL = 'https://cors-anywhere.herokuapp.com/https://stormy-tor-93071.herokuapp.com/api/contacts';

export default {
  name: 'Home',
  data() {
    return {
      info: null,
      loading: true,
      message: '',
    };
  },
  mounted() {
    axios
      .get(API_URL)
      .then((response) => {
        this.info = response.data.data;
        this.loading = false;
      });
  },
  methods: {
    clickHandler(contact) {
      fetch(`${API_URL}/${contact._id}`, {
        method: 'DELETE',
      })
        .then(() => {
          this.info = this.info.filter((s) => s._id !== contact._id);
          this.message = contact.name;
        });
    },
  },
};
</script>

<style>
.card-title{
    color: blue;
}

.card-header{
    margin-top:20px;
}
</style>
