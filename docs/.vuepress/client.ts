import { defineClientConfig } from "vuepress/client";
import ChatComparison from "./components/ChatComparison.vue";
import Clean from "./layouts/Clean.vue";

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("ChatComparison", ChatComparison);
  },
  layouts: {
    Clean,
  },
});
