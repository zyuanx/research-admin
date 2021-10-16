<template>
  <el-row style="min-width:1000px;">
    <!-- 左侧控件选择区 -->
    <el-col :span="6">
      <research-control @factor-add="factorAdd"></research-control>
    </el-col>
    <!-- 中间问卷展示区域 -->
    <el-col :span="10">
      <research-design v-model="research" @set-edit-index="setEditIndex"></research-design>
    </el-col>
    <!-- 右侧属性设置 -->
    <el-col :span="8">
      <research-attribute v-model="research" :editIndex="editIndex"></research-attribute>
    </el-col>
  </el-row>
</template>

<script>
import ResearchControl from "./components/ResearchControl";
import ResearchDesign from "./components/ResearchDesign";
import ResearchAttribute from "./components/ResearchAttribute";

export default {
  name: "ResearchCreate",
  components: {
    ResearchControl,
    ResearchDesign,
    ResearchAttribute,
  },
  data() {
    return {
      fieldCount: 1,
      editIndex: 0,
      editFieldId: "field1",
      editFactor: "text",
      research: {
        title: "调研标题",
        desc: "同学你好，看到这个问卷说明你收到了我们的低电量推送提醒，目前为测试阶段，您的宝贵意见将是我们进步的动力，感谢对微生活的关注和支持，相信在我们共同努力下能够一起度过美好的时光，祝学业有成，加油！",
        once: 1,
        detail: [
          {
            fieldId: "field1",
            factor: "text",
            defaultValue: "",
            label: "标题1",
            placeholder: "输入内容",
          },
        ],
        fieldsValue: { field1: "" },
        rules: {
          field1: [
            {
              required: true,
              message: "请输入内容",
              trigger: "blur",
            },
          ],
        },
      },
    };
  },
  methods: {
    // 添加控件
    factorAdd(factor) {
      const fieldId = "field" + ++this.fieldCount;
      let factorItem = {
        fieldId: fieldId,
        factor: factor,
        label: "标题" + this.fieldCount,
      };
      let ruleItem = [];
      if (factor === "radio") {
        factorItem.required = true;
        factorItem.options = [
          { label: "选项1", value: "值1" },
          { label: "选项2", value: "值2" },
        ];
        ruleItem[0] = {
          required: true,
          message: "请选择一个值",
          trigger: "change",
        };
      } else if (factor === "checkbox") {
        factorItem.options = [
          { label: "选项1", value: "值1" },
          { label: "选项2", value: "值2" },
        ];
        ruleItem[0] = {
          type: "array",
          required: true,
          message: "请至少选择一个",
          trigger: "change",
        };
      } else if (factor === "text") {
        factorItem.label = "单行文本";
        factorItem.placeholder = "提示文字";
        ruleItem[0] = {
          required: true,
          message: "请输入内容",
          trigger: "blur",
        };
      } else if (factor === "textarea") {
        factorItem.placeholder = "提示文字";
        factorItem.rows = 3;
        ruleItem[0] = {
          required: true,
          message: "请输入内容",
          trigger: "blur",
        };
      } else if (factor === "select") {
        factorItem.placeholder = "请选择";
        factorItem.options = [
          { label: "选项1", value: "值1" },
          { label: "选项2", value: "值2" },
        ];
        ruleItem[0] = {
          required: true,
          message: "请选择一个选项",
          trigger: "change",
        };
      } else if (factor === "timePicker") {
        ruleItem[0] = {
          required: true,
          message: "请选择时间",
          trigger: "change",
        };
      } else if (factor === "datePicker") {
        ruleItem[0] = {
          required: true,
          message: "请选择日期",
          trigger: "change",
        };
      }
      if (factor === "checkbox") {
        this.$set(this.research.fieldsValue, fieldId, []);
      } else {
        this.$set(this.research.fieldsValue, fieldId, "");
      }
      console.log(factorItem);
      console.log(ruleItem);
      this.research.detail.push(factorItem);
      // 对象数据动态添加
      this.$set(this.research.rules, fieldId, ruleItem);
    },
    // 设置编辑组件index
    setEditIndex(editIndex) {
      this.editIndex = editIndex;
      this.editFieldId = this.research.detail[editIndex].fieldId;
    },
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
</style>
