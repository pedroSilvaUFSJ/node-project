<template>
  <div class="article-admin">
    <b-form>
      <input id="article-id" type="hidden" v-model="article.id" />
      <b-form-group label="Article Name:" label-for="article-name">
        <b-form-input
          id="article-name"
          type="text"
          v-model="article.name"
          required
          :readonly="mode === 'remove'"
          placeholder="Inform the article's name..."
        />
      </b-form-group>
      <b-form-group
        label="Article Description:"
        label-for="article-description"
      >
        <b-form-input
          id="article-description"
          type="text"
          v-model="article.description"
          required
          :readonly="mode === 'remove'"
          placeholder="Inform the article's description..."
        />
      </b-form-group>
      <b-form-group
        label="Image (URL):"
        label-for="article-imageURL"
        v-if="mode !== 'remove'"
      >
        <b-form-input
          id="article-imageURL"
          type="text"
          v-model="article.imageURL"
          required
          placeholder="Inform the article's image URL..."
        />
      </b-form-group>
      <b-form-group
        v-if="mode !== 'remove'"
        label="Article Category:"
        label-for="article-category"
      >
        <b-form-select
          id="article-parent"
          :options="categories"
          v-model="article.category_id"
          class="form-select"
        />
      </b-form-group>
      <b-form-group label="Article Author:" label-for="article-author">
        <b-form-select
          id="article-author"
          :options="users"
          v-model="article.user_id"
          :disabled="mode === 'remove'"
          class="form-select"
        />
      </b-form-group>
      <b-form-group
        v-if="mode !== 'remove'"
        label="Content:"
        label-for="article-content"
      >
        <VueEditor
          v-model="article.content"
          placeholder="Inform the article content"
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
    <b-table hover striped :items="articles" :fields="fields">
      <template #cell(actions)="data">
        <b-button
          variant="warning"
          @click="loadArticle(data.item)"
          class="me-2"
        >
          <em class="fa fa-pencil ms-2" />
        </b-button>
        <b-button variant="danger" @click="loadArticle(data.item, 'remove')">
          <em class="fa fa-trash" />
        </b-button>
      </template>
    </b-table>
    <b-pagination
      size="md"
      v-model="page"
      :total-rows="count"
      :per-page="limit"
    />
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "ArticleAdmin",
  components: { VueEditor },
  data: function () {
    return {
      mode: "save",
      article: {},
      articles: [],
      categories: [],
      users: [],
      page: 1,
      limit: 0,
      count: 0,
      fields: [
        { key: "id", sortable: true, label: "Code" },
        { key: "name", sortable: true },
        { key: "description", sortable: true },
        { key: "actions" },
      ],
    };
  },
  methods: {
    loadCategories() {
      const url = `${baseApiUrl}/categories`;
      axios.get(url).then((res) => {
        this.categories = res.data.map(({ id: value, path: text }) => ({
          value,
          text,
        }));
      });
    },
    loadUsers() {
      const url = `${baseApiUrl}/users`;
      axios.get(url).then((res) => {
        this.users = res.data.map(({ id: value, name, email }) => ({
          value,
          text: `${name} - ${email}`,
        }));
      });
    },
    loadArticles() {
      const url = `${baseApiUrl}/articles?page=${this.page}`;
      axios.get(url).then(({ data: { data: res, count, limit } }) => {
        this.articles = res.map((article) => ({
          ...article,
          value: article.id,
          text: article.path,
        }));
        this.count = count;
        this.limit = limit;
      });
    },
    reset() {
      this.mode = "save";
      this.article = {};
      this.loadArticles();
    },
    save() {
      const method = this.article.id ? "put" : "post";
      const id = this.article.id ? `/${this.article.id}` : "";
      axios[method](`${baseApiUrl}/articles${id}`, this.article)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch((err) => {
          showError(err);
        });
    },
    remove() {
      const id = this.article.id;
      axios
        .delete(`${baseApiUrl}/articles/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadArticle(article, mode = "save") {
      this.mode = mode;
      axios.get(`${baseApiUrl}/articles/${article.id}`).then((res) => {
        this.article = { ...res.data };
      });
    },
  },
  watch: {
    page() {
      this.loadArticles();
    },
  },
  mounted() {
    this.loadArticles();
    this.loadCategories();
    this.loadUsers();
  },
};
</script>

<style>
.form-group {
  margin-top: 10px;
}
</style>
