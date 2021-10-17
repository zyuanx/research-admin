<template>
  <div>
    <reserach-write :research="research"></reserach-write>
  </div>
</template>

<script>
import ReserachWrite from "./components/ResearchWrite";
import { retrieveResearch } from "@/api/survey/research";
export default {
  components: { ReserachWrite },
  data() {
    return {
      research: {},
    };
  },
  created() {
    const id = this.$route.params.id;
    const res = retrieveResearch(id).then((res) => {
      this.research = res.data.research;
    });
  },
};
</script>

<style lang="scss" scoped>
</style>