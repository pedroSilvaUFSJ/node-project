<template>
  <div class="category-admin">
    <b-form>
      <input id="category-id" type="hidden" v-model="category.id" />
      <b-form-group label="Category Name:" label-for="category-name">
        <b-form-input
          id="category-name"
          type="text"
          v-model="category.name"
          required
          :readonly="mode === 'remove'"
          placeholder="Inform the category's name..."
        />
      </b-form-group>
      <b-form-group label="Parent Category:" label-for="category-parent">
        <b-form-select
          id="category-parent"
          :options="categories"
          v-model="category.parent_id"
          class="form-select"
          v-if="mode !== 'remove'"
        />
        <b-form-input
          v-else
          id="category-parent"
          v-model="category.path"
          readonly
        />
      </b-form-group>
      <b-button
        variant="primary"
        v-if="mode === 'save'"
        @click="save"
        class="mt-2"
      >
        Save
      </b-button>
      <b-button
        variant="danger"
        v-if="mode === 'remove'"
        @click="remove"
        class="mt-2"
      >
        Remove
      </b-button>
      <b-button class="ms-2 mt-2" @click="reset">Cancelar</b-button>
    </b-form>
    <hr />
    <b-table hover striped :items="categories" :fields="fields">
      <template #cell(actions)="data">
        <b-button
          variant="warning"
          @click="loadCategory(data.item)"
          class="me-2"
        >
          <em class="fa fa-pencil ms-2" />
        </b-button>
        <b-button variant="danger" @click="loadCategory(data.item, 'remove')">
          <em class="fa fa-trash" />
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "CategoryAdmin",
  data: function () {
    return {
      mode: "save",
      category: {},
      categories: [],
      fields: [
        { key: "id", sortable: true, label: "Code" },
        { key: "name", sortable: true },
        { key: "path", sortable: true },
        { key: "actions" },
      ],
    };
  },
  methods: {
    loadCategories() {
      const url = `${baseApiUrl}/categories`;
      axios.get(url).then((res) => {
        this.categories = res.data.map((category) => {
          return { ...category, value: category.id, text: category.path };
        });
      });
    },
    reset() {
      this.mode = "save";
      this.category = {};
      this.loadCategories();
    },
    save() {
      const method = this.category.id ? "put" : "post";
      const id = this.category.id ? `/${this.category.id}` : "";
      axios[method](`${baseApiUrl}/categories${id}`, this.category)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch((err) => {
          showError(err);
        });
    },
    remove() {
      const id = this.category.id;
      axios
        .delete(`${baseApiUrl}/categories/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadCategory(category, mode = "save") {
      this.mode = mode;
      this.category = { ...category };
    },
  },
  mounted() {
    this.loadCategories();
  },
};
</script>

<style>
</style>
