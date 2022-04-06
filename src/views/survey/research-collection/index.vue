<template>
  <div>
    <research-write :research="research"></research-write>
  </div>
</template>

<script>
import ResearchWrite from "./components/ResearchWrite";
import { collectionResearch } from "@/api/survey/research";
import axios from "axios";
export default {
  name: "ResearchCollection",
  components: { ResearchWrite, },
  data() {
    return {
      research: {},
    };
  },
  created() {
    const id = this.$route.params.id;
    const token = this.$route.query.token;
    this.getUserInfo(token);
    this.retrieveResearch(id);
  },
  methods: {
    async retrieveResearch(id) {
      const res = await collectionResearch(id);
      const research = res.data.research;
      this.research = {
        title: research.title,
        description: research.description,
        config: JSON.parse(research.config),
        items: JSON.parse(research.items),
        values: JSON.parse(research.values),
        startAt: this.research.startAt,
        endAt: this.research.endAt,
        access: JSON.parse(research.access),
        once: this.research.once,
        open: this.research.once,
      };
    },
    async getUserInfo(token) {
      try {
        // const res = await axios.get("http://127.0.0.1:8080/api/user/info", {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // });
        // const data = res.data;
        // console.log(data);
        const data = {
          username: "test",
          name: "li",
          permissions: []
        }
      }
      catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>