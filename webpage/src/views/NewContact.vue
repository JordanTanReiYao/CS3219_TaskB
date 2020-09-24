<template>
  <div class="container">
    <div class="new-contact">
      <form @submit.prevent="addContact">
        <fieldset>
        <legend>New Contact</legend>
        <div v-if="error" class="alert alert-dismissible alert-warning">
          <h4 class="alert-heading">Error!</h4>
          <p class="mb-0">{{error}}</p>
        </div>
        <div class="form-group row">
          <label for="title" class="col-sm-2 col-form-label">Name</label>
          <div class="col-sm-10">
            <input v-model="contact.name" type="text" class="form-control" id="name" required />
          </div>
        </div>
        <div class="form-group row">
          <label for="artist" class="col-sm-2 col-form-label">Email</label>
          <div class="col-sm-10">
            <input v-model="contact.email" type="text" class="form-control" id="email" required />
          </div>
        </div>
        <div class="form-group row">
          <label for="length" class="col-sm-2 col-form-label">Phone</label>
          <div class="col-sm-10">
            <input v-model="contact.phone" type="text" class="form-control" id="phone" />
          </div>
        </div>
        <div class="form-group row">
          <label for="bpm" class="col-sm-2 col-form-label">Gender</label>
          <div class="col-sm-10">
            <input v-model="contact.gender" type="text" class="form-control" id="gender" />
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Add New Contact</button>
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
const API_URL = 'https://cors-anywhere.herokuapp.com/https://stormy-tor-93071.herokuapp.com/api/contacts';

export default {
  name: 'home',
  data: () => ({
    error: '',
    success: '',
    contacts: [],
    contact: {
      name: '',
      email: '',
      phone: '',
      gender: '',
    },
  }),
  methods: {
    addContact() {
      fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(this.contact),
        headers: {
          'content-type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.details) {
            // there was an error...
            const error = result.details
              .map((detail) => detail.message)
              .join('. ');
            this.error = error;
          } else {
            this.error = '';
            this.success = 'New Contact created!';
            this.showMessageForm = false;
          }
        });
    },
  },
};
</script>
