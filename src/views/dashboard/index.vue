<template>
  <div class="dashboard-container">
    <div class="dashboard-text">{{ username }}, Welcome!</div>
    <br/>
    <br/>
    <div style="text-align:center;border: 2px solid #eee;border-radius:20px;padding:20px;" @click="jump">
      <i class="el-icon-s-order" style="font-size: 48px;color:grey;"></i>
      <br/>
      <el-button type="text" class="dashboard-text">问卷广场</el-button>
    </div>
    <!-- <div class="dashboard-text">nickname: {{ nickname }}</div> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["username"]),
    ...mapGetters(["nickname"]),
  },
  methods:{
      jump(){
        this.$router.push('/square')
      }
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
