<template>
  <div style="padding:10px;">
    <!-- <el-page-header @back="goBack" :content="research.title" style="margin: 5px 0;"></el-page-header> -->
    <el-table :data="tableData" border stripe>
      <el-table-column type="index" label="#" align="center"></el-table-column>
      <el-table-column label="标题" min-width="130" align="center">
        <template slot-scope="scope">{{ research.title }}</template>
      </el-table-column>
      <el-table-column prop="user.username" label="填写人" align="center"></el-table-column>
      <el-table-column prop="IPAddress" label="IP地址" align="center"></el-table-column>
      <el-table-column label="填写时间" width="160" align="center">
        <template slot-scope="scope">{{ scope.row.createdAt | parseTime }}</template>
      </el-table-column>
      <el-table-column prop="values" label="填写值" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column fixed="right" align="center" label="操作" width="80">
        <template slot-scope="scope">
          <el-button type="text" size="medium" @click="readRecord(scope.row)">查看</el-button>
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
    <el-drawer title="记录预览" :visible.sync="drawer" size="700px">
      <research-preview :preview-data="research" style="margin: 20px;"></research-preview>
    </el-drawer>
  </div>
</template>

<script>
import { listRecord, listOpenRecord, retrieveRecord } from "@/api/survey/record";
import { retrieveResearch } from "@/api/survey/research";
import ResearchPreview from "@/components/Research/ResearchPreview";
export default {
  name: "RecordList",
  components: { ResearchPreview },
  data() {
    return {
      tableData: [],
      total: 0,
      listQuery: {
        page: 1,
        size: 10
      },
      drawer: false,
      research: {}
    };
  },
  created() {
    const id = this.$route.params.id;
    this.getResearch(id);
    this.listQuery.researchID = id;
    this.fetchData();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async getResearch(id) {
      const res = await retrieveResearch(id);
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
    },
    async fetchData() {
      const res = await listOpenRecord(this.listQuery);
      this.tableData = res.data.results;
      this.total = res.data.total;
    },
    handleSizeChange(val) {
      this.listQuery.size = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.fetchData();
    },
    async readRecord(row) {
      this.research.values = JSON.parse(row.values);
      this.drawer = true;
    }
  }
};
</script>

<style lang="scss">
.el-drawer.rtl {
  overflow: scroll;
}
</style>
