<template>
  <div style="padding: 5px;">
    <!-- 问卷基础信息 -->
    <div class="center-basic">
      <h3>{{ research.title }}</h3>
      <p>{{ research.description }}</p>
    </div>
    <el-form :model="research.values" v-bind="research.config" ref="researchRef">
      <transition-group name="drag" class="drag-list">
        <div
          v-for="(item, index) in research.items"
          :key="item.fieldID"
          :class="[editIndex === index ? 'bg-select' : '', dragIndex === index ? 'bg-drag' : '', 'center-form']"
          draggable
          @dragenter="dragenter($event, index)"
          @dragstart="dragstart(index)"
          @dragend="dragend(index)"
          @dragover="dragover($event, index)"
          @click="setEditIndex(index)"
        >
          <!-- 控件元素 -->
          <el-form-item :label="item.label" :prop="item.fieldID" :rules="item.rules">
            <!-- <span slot="error">Label for the slot</span> -->
            <!--单选框-->
            <el-radio-group v-if="item.factor === 'radio'" v-model="research.values[item.fieldID]">
              <el-radio
                v-for="(item2, index2) in item.options"
                :key="index2"
                :label="item2.value"
              >{{ item2.label }}</el-radio>
            </el-radio-group>
            <!--复选框-->
            <el-checkbox-group
              v-else-if="item.factor === 'checkbox'"
              v-model="research.values[item.fieldID]"
            >
              <el-checkbox
                v-for="(item2, index2) in item.options"
                :key="index2"
                :label="item2.value"
              >{{ item2.label }}</el-checkbox>
            </el-checkbox-group>
            <!--短文本-->
            <el-input
              v-else-if="item.factor === 'text'"
              :placeholder="item.placeholder"
              v-model="research.values[item.fieldID]"
              clearable
            ></el-input>
            <!-- 多行文本 -->
            <el-input
              v-else-if="item.factor === 'textarea'"
              type="textarea"
              :rows="item.rows"
              :placeholder="item.placeholder"
              v-model="research.values[item.fieldID]"
            ></el-input>
            <!-- 下拉选择 -->
            <el-select
              v-else-if="item.factor === 'select'"
              v-model="research.values[item.fieldID]"
              clearable
              :placeholder="item.placeholder"
            >
              <el-option
                v-for="(item2, index2) in item.options"
                :key="index2"
                :label="item2.label"
                :value="item2.value"
              ></el-option>
            </el-select>
            <!-- 开关 -->
            <el-switch
              v-else-if="item.factor === 'switch'"
              v-model="research.values[item.fieldID]"
              :active-value="item.activeValue"
              :inactive-value="item.inactiveValue"
            ></el-switch>
            <!-- 时间值 -->
            <el-time-picker
              v-else-if="item.factor === 'timePicker'"
              v-model="research.values[item.fieldID]"
              value-format="hh-mm-ss"
              :placeholder="item.placeholder"
            ></el-time-picker>
            <!-- 日期值 -->
            <el-date-picker
              v-else-if="item.factor === 'datePicker'"
              v-model="research.values[item.fieldID]"
              value-format="yyyy-hh-dd"
              :placeholder="item.placeholder"
            ></el-date-picker>
          </el-form-item>
        </div>
      </transition-group>
    </el-form>
    <div style="text-align:center;margin-top: 5px;">
      <el-button type="primary" size="medium">提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResearchDesign",
  model: {
    prop: "research",
    event: "change"
  },
  props: {
    research: Object,
    editIndex: Number,
  },
  data() {
    return {
      dragIndex: -1,
    };
  },
  methods: {
    setEditIndex: function (editIndex) {
      this.$emit("set-edit-index", editIndex);
    },
    shuffle() {
      this.research.items = this.$shuffle(this.research.items);
    },
    dragstart(index) {
      this.dragIndex = index;
    },
    dragend(index) {
      this.dragIndex = -1;
    },
    dragenter(e, index) {
      e.preventDefault();
      // 避免源对象触发自身的dragenter事件
      if (this.dragIndex !== index) {
        const source = this.research.items[this.dragIndex];
        this.research.items.splice(this.dragIndex, 1);
        this.research.items.splice(index, 0, source);
        // 排序变化后目标对象的索引变成源对象的索引
        this.dragIndex = index;
      }
    },
    dragover(e) {
      e.preventDefault();
    },
    // submitForm(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       // this.confirmEdit();
    //     } else {
    //       console.log("error submit!!");
    //       return false;
    //     }
    //   });
    // },

  }
};
</script>

<style lang="scss" scoped>
// 调研基本信息
.center-basic {
  padding: 10px;

  h3 {
    text-align: center;
  }
  p {
    font-size: 14px;
    color: #909399;
    text-indent: 2em;
    padding: 5px;
  }
}
// 选中控件
.drag-list {
  // .drag-move {
  //   transition: transform 0.3s;
  // }
  .bg-select {
    border-top: 2px solid #3498db;
    background-color: #f2f6fc;
  }

  .bg-drag {
    border: 1.5px dashed #909399;
  }
  .center-form {
    cursor: move;
    padding: 5px;
    margin-top: 2px;
    border-radius: 5px;
    &:hover {
      background-color: #f2f6fc;
    }
  }
}
</style>
