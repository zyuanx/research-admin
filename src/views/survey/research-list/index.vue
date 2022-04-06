<template>
  <div style="padding: 10px">
    <el-table :data="tableData" border stripe>
      <el-table-column type="index" label="#" align="center"></el-table-column>
      <el-table-column prop="title" label="标题" min-width="130" align="center"></el-table-column>
      <el-table-column prop="description" label="描述" min-width="300" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="开放状态" min-width="160" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>
            {{
              scope.row.startAt | parseTime
            }}
            -
            {{
              scope.row.endAt | parseTime
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="开放状态" width="100" align="center">
        <template slot-scope="scope">
          <el-tag type="success" size="small" v-if="scope.row.open">公开</el-tag>
          <el-tag type="warning" size="small" v-else>不公开</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" align="center" width="200" label="操作">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit" @click="editResearch(scope.row)">编辑</el-button>
          <el-button
            type="text"
            icon="el-icon-s-claim"
            style="color: #67c23a"
            @click="previewResearch(scope.row)"
          >预览</el-button>
          <el-button
            type="text"
            icon="el-icon-s-data"
            style="color: #e6a23c"
            @click="viewRecord(scope.row)"
          >数据</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="listQuery.page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="listQuery.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <el-drawer title="问卷编辑" :visible.sync="drawer" size="700px">
      <research-setting v-model="research" style="margin: 20px;"></research-setting>
      <div style="text-align:center;margin-top: 5px;">
        <el-button size="small" @click="drawer = false">取消</el-button>
        <el-button size="small" type="primary" @click="updateResearch">更新</el-button>
      </div>
    </el-drawer>
    <el-drawer title="问卷预览" :visible.sync="preview" size="700px">
      <research-preview :preview-data="research" v-if="preview" style="margin: 20px;"></research-preview>
    </el-drawer>
  </div>
</template>

<script>
import {
  listResearch,
  retrieveResearch,
  updateResearch,
  exportRecord,
} from "@/api/survey/research";
import ResearchPreview from "@/components/Research/ResearchPreview";
import ResearchSetting from "@/components/Research/ResearchSetting";
export default {
  name: "ResearchList",
  components: {
    ResearchPreview,
    ResearchSetting,
  },
  data() {
    return {
      listLoading: false,
      tableData: [],
      total: 0,
      listQuery: {
        page: 1,
        size: 10,
      },
      research: {},
      drawer: false,
      preview: false,
      researchId: null,
    };
  },
  created() {
    const id = this.$route.params.id;
    this.listQuery.researchID = id;
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.listLoading = true;
      let res = await listResearch(this.listQuery);
      this.tableData = res.data.results;
      this.total = res.data.total;
      this.listLoading = false;
    },
    async editResearch(row) {
      const res = await retrieveResearch(row.id);
      this.research = {
        id: res.data.research.id,
        title: res.data.research.title,
        description: res.data.research.description,
        config: JSON.parse(res.data.research.config),
        startAt: res.data.research.startAt,
        endAt: res.data.research.endAt,
        access: JSON.parse(res.data.research.access),
        once: res.data.research.once,
        open: res.data.research.open,
      };
      this.drawer = true;
    },
    async updateResearch() {
      const payload = {
        title: this.research.title,
        description: this.research.description,
        config: JSON.stringify(this.research.config),
        startAt: this.research.startAt,
        endAt: this.research.endAt,
        access: JSON.stringify(this.research.access),
        once: this.research.once,
        open: this.research.open,
      };
      await updateResearch(this.research.id, payload);
      this.$message.success("更新成功");

      this.fetchData();
      this.drawer = false;
    },
    async exportExcel(row) {
      const res = await exportRecord(row.id);
      const link = document.createElement('a')
      let blob = new Blob([res], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      let objectUrl = URL.createObjectURL(blob);  // 创建URL
      link.href = objectUrl;
      link.download = row.title;  // 自定义文件名
      link.click();  // 下载文件
      URL.revokeObjectURL(objectUrl);  // 释放内存
    },
    // 调研预览
    async previewResearch(row) {
      const res = await retrieveResearch(row.id);
      this.research = {
        title: res.data.research.title,
        description: res.data.research.description,
        config: JSON.parse(res.data.research.config),
        items: JSON.parse(res.data.research.items),
        values: JSON.parse(res.data.research.values),
        startAt: res.data.research.startAt,
        endAt: res.data.research.endAt,
        access: JSON.parse(res.data.research.access),
        once: res.data.research.once,
        open: res.data.research.once,
      };
      this.preview = true;

      // this.$router.push({ name: "Preview", params: { id: row.id } });
      // const { href } = this.$router.resolve({
      //     name: "Preview",
      //     params: { id: row._id }
      // });
      // window.open(href, "_blank");
    },
    // 查看填写记录
    viewRecord(row) {
      this.$router.push({ name: "ResearchRecord", params: { id: row.id } });
    },

    handleSizeChange(val) {
      this.listQuery.size = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.fetchData();
    },
  },
};
</script>

<style lang="scss">
.el-drawer.rtl {
  overflow: scroll;
}
</style>