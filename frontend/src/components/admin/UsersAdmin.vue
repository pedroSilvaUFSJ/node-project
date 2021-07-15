<template>
  <div class="users-admin">
    <b-form>
      <b-form id="user-id" type="hidden" v-model="user.id" />
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Name:" label-form="user-name">
            <b-form-input
              id="user-name"
              type="text"
              v-model="user.name"
              required
              placeholder="Inform the user's name"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="E-mail:" label-form="user-email">
            <b-form-input
              id="user-email"
              type="text"
              v-model="user.email"
              required
              placeholder="Inform the user's e-mail"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-form-checkbox id="user-admin" v-model="user.admin" class="mt-3 mb-3">
        Administrador?
      </b-form-checkbox>
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Password:" label-form="user-password">
            <b-form-input
              id="user-password"
              type="password"
              v-model="user.password"
              required
              placeholder="Inform the user's password"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group
            label="Confirm the Password:"
            label-form="user-confirm-password"
          >
            <b-form-input
              id="user-confirm-password"
              type="password"
              v-model="user.confirmPassword"
              required
              placeholder="Confirm the user's password"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-button variant="primary" v-if="mode === 'save'" @click="save"
        >Save</b-button
      >
      <b-button variant="danger" v-if="mode === 'delete'" @click="save"
        >Delete</b-button
      >
      <b-button class="ml-2" @click="reset">Cancel</b-button>
      <hr />
    </b-form>
    <b-table hover striped :items="users" :fields="fields"></b-table>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "UsersAdmin",
  data: () => ({
    mode: "save",
    user: {},
    users: [],
    fields: [
      { key: "id", label: "Code", sortable: true },
      { key: "name", label: "Name", sortable: true },
      { key: "email", label: "E-mail", sortable: true },
      {
        key: "admin",
        label: "Administrator",
        sortable: true,
        formatter: (value) => (value ? "yes" : "No"),
      },
      { key: "Actions", label: "Actions" },
    ],
  }),
  methods: {
    loadUsers() {
      const url = `${baseApiUrl}/users`;
      axios.get(url).then((res) => (this.users = res.data));
    },
    reset() {
      this.mode = "save";
      this.user = {};
      this.loadUsers();
    },
    save() {
      const method = this.user.id ? "put" : "post";
      const id = this.user.id ? `/${this.user.id}` : "";
      axios[method](`${baseApiUrl}/users${id}`, this.user)
        .then((data) => {
          this.$toasted.global.defaultSuccess();
          const persistedUser = { ...this.user, id: data };
          this.users.push(persistedUser);
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.user.id;
      axios
        .delete(`${baseApiUrl}/users/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
  },
  mounted() {
    this.loadUsers();
  },
};
</script>

<style>
</style>
