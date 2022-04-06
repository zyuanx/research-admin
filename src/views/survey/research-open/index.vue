<template>
  <div style="padding:5px;">
    <el-result v-if="finish" icon="success" title="提交成功" subTitle="请关闭此页面">
    </el-result>
    <research-write v-else :research="research" @submit="submitForm"></research-write>
  </div>
</template>

<script>
import ResearchWrite from "@/components/Research/ResearchWrite";
import { retrieveOpenResearch } from "@/api/survey/research";
import { createOpenRecord } from "@/api/survey/record";
export default {
  name: "ResearchOpen",
  components: { ResearchWrite, },
  data() {
    return {
      research: {},
      researchID: 0,
      finish: false,
    };
  },
  created() {
    const id = this.$route.params.id;
    this.researchID = parseInt(id);
    this.retrieveResearch(id);
  },
  methods: {
    async retrieveResearch(id) {
      const res = await retrieveOpenResearch(id);
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
    async submitForm() {
      const payload = {
        researchID: this.researchID,
        values: JSON.stringify(this.research.values)
      };
      const res = await createOpenRecord(payload);
      this.finish = true;
    },
    close() {
      window.opener = null;
      window.open("about:blank", "_top").close();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>