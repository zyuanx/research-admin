<template>
  <div>
    <el-card shadow="hover" style="margin:5px;">
      <div slot="header">
        <span>组件列表</span>
      </div>
      <!-- 空间排布 -->
      <div class="btns-flex">
        <div class="btns-item">
          <el-button type="primary" size="small" @click="factorAdd('radio')">单选框</el-button>
        </div>
        <div class="btns-item">
          <el-button type="primary" size="small" @click="factorAdd('checkbox')">复选框</el-button>
        </div>
        <div class="btns-item">
          <el-button type="primary" size="small" @click="factorAdd('text')">短文本</el-button>
        </div>
        <div class="btns-item">
          <el-button type="primary" size="small" @click="factorAdd('textarea')">长文本</el-button>
        </div>
        <div class="btns-item">
          <el-button type="primary" size="small" @click="factorAdd('select')">下拉选择</el-button>
        </div>
        <div class="btns-item">
          <el-button type="primary" size="small" @click="factorAdd('timePicker')">时间选择</el-button>
        </div>
        <div class="btns-item">
          <el-button type="primary" size="small" @click="factorAdd('datePicker')">日期选择</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "ResearchControl",
  data() {
    return {};
  },
  methods: {
    factorAdd(control) {
      this.$emit("factor-add", control);
    }
  }
};
</script>

<style lang="scss" scoped>
.btns-flex {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  .btns-item {
    width: 48%;
    padding-bottom: 10px;
    .el-button {
      width: 100%;
    }
  }
}
</style>
