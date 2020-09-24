<template>
  <div class="container">
    <div v-if="loading" class="alert alert-dismissible alert-warning">
      <h4 class="alert-heading">Loading Contacts List...</h4>
    </div>
    <div v-else class="edit-contact">
      <form @submit.prevent="editContact">
        <fieldset>
        <legend>Edit Contact</legend>
        <div v-if="error" class="alert alert-dismissible alert-warning">
          <h4 class="alert-heading">Error!</h4>
          <p class="mb-0">{{error}}</p>
        </div>
        <div class="form-group row">
          <label for="name" class="col-sm-2 col-form-label">Name</label>
          <div class="col-sm-10">
            <input v-model="contact.name" type="text" class="form-control" id="name" required />
          </div>
        </div>
        <div class="form-group row">
          <label for="email" class="col-sm-2 col-form-label">Email</label>
          <div class="col-sm-10">
            <input v-model="contact.email" type="text" class="form-control" id="email" required />
          </div>
        </div>
        <div class="form-group row">
          <label for="phone" class="col-sm-2 col-form-label">Phone</label>
          <div class="col-sm-10">
            <input v-model="contact.phone" type="text" class="form-control" id="phone" />
          </div>
        </div>
        <div class="form-group row">
          <label for="gender" class="col-sm-2 col-form-label">Gender</label>
          <div class="col-sm-10">
            <input v-model="contact.gender" type="text" class="form-control" id="gender" />
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Update Contact</button>
        </fieldset>
      </form>
      <hr />
      <div v-if="success" class="alert alert-dismissible alert-success">
        <h4 class="alert-heading">Success!</h4>
        <p class="mb-0">{{success}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const API_URL = 'https://cors-anywhere.herokuapp.com/https://stormy-tor-93071.herokuapp.com/api/contacts';

export default {
  name: 'home',
  data: () => ({
    error: '',
    success: '',
    loading: true,
    contacts: [],
    contact: {
      name: '',
      email: '',
      phone: 0,
      gender: 0,
      id: null,
    },
  }),
  mounted() {
    this.contact.id = this.$route.params.id.toString();
    axios
      .get(`${API_URL}/${this.contact.id}`)
      .then((response) => {
        const res = response.data.data;
        this.contact.name = res.name;
        this.contact.email = res.email;
        this.contact.phone = res.phone;
        this.contact.gender = res.gender;
        this.loading = false;
      });
  },
  methods: {
    editContact() {
      fetch(`${API_URL}/${this.contact.id}`, {
        method: 'PATCH',
        body: JSON.stringify(this.contact),
        headers: {
          'content-type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.details) {
            //if there was an error...
            const error = result.details
              .map((detail) => detail.message)
              .join('. ');
            this.error = error;
          } else {
            this.error = '';
            this.success = 'Contact Details Updated!';
            this.showMessageForm = false;
          }
        });
    },
  },
};
</script>
