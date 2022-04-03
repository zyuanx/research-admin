<template>
  <div>
    <el-card shadow="hover" style="margin: 5px">
      <div slot="header">
        <span>调研设置</span>
      </div>
      <el-form
        size="small"
        label-width="80px"
        label-position="left"
        :model="research"
        ref="basicSettingsRef"
      >
        <el-form-item label="问卷标题" prop="title">
          <el-input placeholder="输入问卷标题" v-model="research.title" clearable></el-input>
        </el-form-item>
        <el-form-item label="问卷描述" prop="description">
          <el-input type="textarea" :rows="6" placeholder="请输入问卷描述内容" v-model="research.description"></el-input>
        </el-form-item>
        <el-form-item label="表单大小">
          <el-radio-group v-model="research.config.size">
            <el-radio-button label="large">大</el-radio-button>
            <el-radio-button label="medium">中</el-radio-button>
            <el-radio-button label="small">小</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="标签对齐">
          <el-radio-group v-model="research.config.labelPosition">
            <el-radio-button label="left">左对齐</el-radio-button>
            <el-radio-button label="right">右对齐</el-radio-button>
            <el-radio-button label="top">顶部对齐</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="标签宽度">
          <el-input type="text" v-model="research.config.labelWidth"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" prop="startAt">
          <el-date-picker v-model="research.startAt" type="datetime" placeholder="选择开始时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endAt">
          <el-date-picker v-model="research.endAt" type="datetime" placeholder="选择结束时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="重复填写">
          <el-radio-group v-model="research.once">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="开放填写">
          <el-radio-group v-model="research.open">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="谁可填写">
          <el-select
            v-model="research.access"
            multiple
            filterable
            allow-create
            placeholder="请选择谁可填写"
            style="width:100%;"
          >
            <el-option
              v-for="item in accessOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "ResearchSetting",
  model: {
    prop: "research",
    event: "change",
  },
  props: {
    research: Object,
    editIndex: Number,
  },
  data() {
    return {
      accessOptions: [{
        value: '2021',
        label: '2021'
      }, {
        value: '一班',
        label: '一班'
      },]
    };
  },
}
</script>

<style lang="scss" scoped>
</style>