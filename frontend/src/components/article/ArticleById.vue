<template>
  <div class="article-by-id">
    <PageTitle
      icon="fa fa-folder-o"
      :main="article.name"
      :sub="article.description"
    />
    <div class="article-content" v-html="article.content"></div>
  </div>
</template>

<script>
import "highlightjs/styles/dracula.css";
import hljs from "highlightjs/highlight.pack";
import { baseApiUrl } from "@/global";
import axios from "axios";
import PageTitle from "../template/PageTitle.vue";
export default {
  name: "ArticleById",
  components: { PageTitle },
  data: function () {
    return {
      article: {},
    };
  },
  methods: {
    getArticle() {
      const url = `${baseApiUrl}/articles/${this.$route.params.id}`;
      axios(url).then(({ data }) => (this.article = data));
    },
  },
  mounted() {
    this.getArticle();
  },
  update() {
    document.querySelectorAll(".article-content pre").forEach((e) => {
      hljs.highlightBlock(e)
    });
  },
};
</script>

<style>
.article-by-id {
  background-color: #fff;
  border-radius: 8px;
  padding: 25px;
}
.article-content pre {
  padding: 20px;
  border-radius: 8px;
  font-size: 1.2rem;
  background-color: #1e1e1e;
  color: #fff;
}
.article-content img {
  max-width: 100%;
}
.article-content :last-child {
  margin-bottom: 0px;
}
</style>