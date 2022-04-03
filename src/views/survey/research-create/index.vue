<template>
  <div>
    <el-row style="min-width:1000px;">
      <!-- 左侧控件选择区 -->
      <el-col :span="6">
        <research-control @factor-add="factorAdd"></research-control>
      </el-col>
      <!-- 中间问卷展示区域 -->
      <el-col :span="10">
        <div style="text-align:right;margin-top: 5px;padding: 5px;">
          <el-button type="text" icon="el-icon-info" @click="dialogVisible = true">系统对接</el-button>
          <el-button type="text" icon="el-icon-s-promotion" @click="createDialog = true">发布问卷</el-button>
          <el-button type="text" icon="el-icon-s-claim" @click="preview = true">预览</el-button>
          <el-button
            :type="setting ? 'success' : 'primary'"
            size="small"
            icon="el-icon-s-tools"
            @click="setting = !setting"
          >{{ setting ? "设置" : "组件" }}</el-button>
        </div>
        <research-design v-model="research" :editIndex="editIndex" @set-edit-index="setEditIndex"></research-design>
      </el-col>
      <!-- 右侧属性设置 -->
      <el-col :span="8">
        <research-attribute
          v-if="!setting"
          v-model="research"
          :editIndex="editIndex"
          @set-edit-index="setEditIndex"
        ></research-attribute>
        <research-setting v-if="setting" v-model="research"></research-setting>
      </el-col>
    </el-row>
    <!-- 对接方法描述块 -->
    <!-- <el-dialog title="对接方法" :visible.sync="dialogVisible" width="40%">
      <div>
        <p>
          url 传入 token 字段，如
          <span style="font-weight: bold;">url?token=xxxxxx</span>
        </p>
        <p>
          设置一个接口可以通过 token 获取用户的信息，格式
          <span
            style="font-weight: bold;"
          >{user: {name: xxx, ... }, code: 0, ...}</span>
        </p>
        <p>
          用户信息需包括 permissions 字段，用于验证是否有权限，如
          <span
            style="font-weight: bold;"
          >permissions=['2020','三班']</span>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>-->
    <!-- 确认创建问卷 -->
    <el-dialog title="是否继续" :visible.sync="createDialog" width="40%">
      <div>
        请确认问卷信息已设置完毕
        <span style="color: #F56C6C;">（包括开放时间、可填写者等）</span>，是否继续？
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="createDialog = false">取 消</el-button>
        <el-button size="small" type="primary" @click="createResearch">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 预览块 -->
    <el-drawer title="问卷预览" :visible.sync="preview" size="700px">
      <research-preview :preview-data="research" v-if="preview" style="margin: 5px 5px 10px 5px;"></research-preview>
    </el-drawer>
  </div>
</template>

<script>
import { v4 } from 'uuid';
import { Message } from 'element-ui';
import ResearchControl from "./components/ResearchControl";
import ResearchDesign from "./components/ResearchDesign";
import ResearchAttribute from "./components/ResearchAttribute";
import ResearchSetting from "./components/ResearchSetting";
import ResearchPreview from "./components/ResearchPreview";
import { factorItems, factorRules, factorValues, research } from "@/utils/research/factor";
import { createResearch } from "@/api/survey/research";
export default {
  name: "ResearchCreate",
  components: {
    ResearchControl,
    ResearchDesign,
    ResearchAttribute,
    ResearchSetting,
    ResearchPreview,

  },
  data() {
    return {
      editIndex: 0,
      editFactor: "text",
      research: {},
      preview: false,
      setting: false,
      createDialog: false,
      dialogVisible: false,
    };
  },
  created() {
    this.research = research;
  },
  methods: {
    // 添加控件
    factorAdd(factor) {

      const fieldId = "field" + v4();
      const factorItem = JSON.parse(JSON.stringify(factorItems[factor]));
      factorItem['fieldId'] = fieldId;
      const factorRule = JSON.parse(JSON.stringify(factorRules[factor]));
      factorItem["rules"] = factorRule
      const factorValue = JSON.parse(JSON.stringify(factorValues[factor]));

      this.$set(this.research.values, fieldId, factorValue);  // Vue2 动态更新对象
      // this.research.values[fieldId] = factorValue;  // Vue3 动态更新对象
      this.research.items.push(factorItem);
    },
    // 设置编辑组件index
    setEditIndex(editIndex) {
      this.editIndex = editIndex;
    },
    async createResearch() {
      const payload = {
        title: this.research.title,
        description: this.research.description,
        config: JSON.stringify(this.research.config),
        items: JSON.stringify(this.research.items),
        values: JSON.stringify(this.research.values),
        startAt: this.research.startAt,
        endAt: this.research.endAt,
        access: JSON.stringify(this.research.access),
        once: this.research.once,
        open: this.research.once,
      };
      // console.log(payload);
      const res = await createResearch(payload);
      this.createDialog = false;
      Message({
        message: "创建成功",
        type: "success",
        duration: 1000,
        offset: 200,
      });
    }
  },
};
</script>

<style lang="scss">
.el-drawer.rtl {
  overflow: scroll;
}
</style>
