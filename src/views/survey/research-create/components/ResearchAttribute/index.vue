<template>
  <div>
    <el-card shadow="hover" style="margin: 5px">
      <div slot="header">
        <span>组件属性</span>
      </div>
      <el-form label-width="80px" size="small">
        <h4 style="text-align: center">组件基本属性</h4>
        <el-form-item label="字段id">
          <el-input :disabled="true" v-model="editFieldId" clearable></el-input>
        </el-form-item>
        <el-form-item label="标题">
          <el-input placeholder="请输入标题" v-model="research.items[editIndex].label" clearable></el-input>
        </el-form-item>
        <el-form-item label="默认值">
          <!-- {{defaultValue}} -->
          <el-input v-model="defaultValue" placeholder="控件内设置默认值" clearable></el-input>
        </el-form-item>
        <el-form-item
          v-if="editFactor === 'text' || editFactor === 'textarea' || editFactor === 'select'"
          label="占位提示"
        >
          <el-input placeholder="请输入占位提示" v-model="research.items[editIndex].placeholder" clearable></el-input>
        </el-form-item>
        <el-form-item v-if="editFactor === 'textarea'" label="行数">
          <el-input-number v-model="research.items[editIndex].rows" :min="2" :max="10"></el-input-number>
        </el-form-item>
        <el-form-item v-if="editFactor === 'switch'" label="开启值">
          <el-input placeholder="请输入开启值" v-model="research.items[editIndex].activeValue" clearable></el-input>
        </el-form-item>
        <el-form-item v-if="editFactor === 'switch'" label="关闭值">
          <el-input
            placeholder="请输入关闭值"
            v-model="research.items[editIndex].inactiveValue"
            clearable
          ></el-input>
        </el-form-item>
        <div v-if="editFactor === 'radio' || editFactor === 'checkbox' || editFactor === 'select'">
          <h4 style="text-align: center">选项</h4>
          <div
            v-for="(option, index) in research.items[editIndex].options"
            :key="index"
            class="options"
          >
            <i class="el-icon-s-operation"></i>
            <el-input
              placeholder="选项名"
              v-model="research.items[editIndex].options[index].label"
              size="small"
              style="margin: 0 5px"
            ></el-input>
            <el-input
              placeholder="选项值"
              v-model="research.items[editIndex].options[index].value"
              size="small"
              style="margin: 0 5px"
            ></el-input>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              circle
              @click="deleteOption(editIndex, index)"
            ></el-button>
          </div>
          <div class="options">
            <el-button type="text" icon="el-icon-circle-plus" @click="addOption(editIndex)">添加选项</el-button>
          </div>
        </div>
        <!-- 开关不需要 -->
        <div v-if="editFactor !== 'switch'">
          <h4 style="text-align: center">组件验证规则</h4>
          <el-form-item label="是否必填">
            <el-switch v-model="research.items[editIndex].rules[0].required"></el-switch>
          </el-form-item>
          <el-form-item label="规则提示">
            <el-input
              placeholder="输入内容"
              v-model="research.items[editIndex].rules[0].message"
              clearable
            ></el-input>
          </el-form-item>
        </div>
        <h4 style="text-align: center">更多</h4>
        <el-form-item label="展示条件">
          <el-tag
            type="warning"
            style="margin-right: 5px;"
          >{{ research.items[editIndex].display ? research.items[editIndex].display.length : 0 }}个条件</el-tag>
          <el-button
            type="text"
            size="medium"
            @click="setDisplay(research.items[editIndex].fieldId)"
          >设置</el-button>
        </el-form-item>
        <div style="text-align: center; padding: 5px">
          <el-button type="danger" size="medium" @click="deleteFactor(editIndex)">删除组件</el-button>
        </div>
      </el-form>
    </el-card>
    <el-dialog title="展示条件设置" :visible.sync="displayDialog" width="50%">
      <el-cascader-panel
        :props="{ multiple: true }"
        :options="displayOptions"
        v-model="research.items[editIndex].display"
      ></el-cascader-panel>
      <span slot="footer" class="dialog-footer">
        <el-button @click="displayDialog = false">取 消</el-button>
        <el-button type="primary" @click="displayDialog = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Message } from "element-ui";
export default {
  name: "ResearchAttribute",
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
      displayDialog: false,
      val: [],
      displayOptions: []
    };
  },
  methods: {
    // 删除组件
    deleteFactor(editIndex) {
      if (this.research.items.length === 1) {
        Message({
          message: "调研至少要有一个组件",
          type: "error",
          duration: 1000,
          offset: 200,
        });
        return;
      }
      const fieldId = this.research.items[this.editIndex].fieldId;
      this.$delete(this.research.values, fieldId); // 删除值
      if (editIndex === 0) {
        this.$emit('set-edit-index', 0);
      } else {
        this.$emit('set-edit-index', editIndex - 1);
      }

      this.research.items.splice(editIndex, 1);
    },
    // 删除选项
    deleteOption: function (editIndex, index) {
      const editFactor = this.research.items[this.editIndex].factor;
      const fieldId = this.research.items[this.editIndex].fieldId;
      if (editFactor === "checkbox") {
        this.research.values[fieldId] = [];
      } else {
        this.research.values[fieldId] = "";
      }
      this.research.items[editIndex].options.splice(index, 1);
    },
    // 添加选项
    addOption: function (editIndex) {
      this.research.items[editIndex].options.push({
        label: "",
        value: "",
      });
    },
    // 获取选项展示条件
    getDisplay() {
      const id = this.research.items[this.editIndex].fieldId;
      const factors = new Set(['radio', 'checkbox', 'select'])
      const res = [];
      for (let i = 0; i < this.research.items.length; i++) {
        const factor = this.research.items[i].factor;
        if (!factors.has(factor)) {
          continue
        }
        const fieldId = this.research.items[i].fieldId;
        if (fieldId === id) {  // 去除当前问题本身
          continue
        }
        const item = {
          label: this.research.items[i].label,
          value: fieldId,
          children: this.research.items[i].options.map(item => {
            return {
              label: item.label,
              value: item.value,
            }
          })
        }
        res.push(item);
      }
      return res
    },
    // 设置展示条件
    setDisplay() {
      this.displayOptions = this.getDisplay();
      this.displayDialog = true;
    },
  },
  computed: {
    editFactor() {
      return this.research.items[this.editIndex].factor;
    },
    editFieldId() {
      return this.research.items[this.editIndex].fieldId;
    },
    defaultValue: {
      get() {
        const editFactor = this.research.items[this.editIndex].factor;
        const editFieldId = this.research.items[this.editIndex].fieldId;
        if (editFactor === "checkbox") {
          return this.research.values[editFieldId].join(",");
        }
        return this.research.values[editFieldId]
      },
      set(newValue) {
        const editFactor = this.research.items[this.editIndex].factor;
        const editFieldId = this.research.items[this.editIndex].fieldId;
        if (editFactor === "checkbox") {
          if (newValue.length === 0) {
            this.research.values[editFieldId] = []
          } else {
            this.research.values[editFieldId] = newValue.split(",");
          }
        } else {
          this.research.values[editFieldId] = newValue;
        }
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.options {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
}
</style>
