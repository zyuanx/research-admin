<template>
  <div style="padding: 20px">
    <el-card
      class="box-card"
      style="margin-bottom: 20px"
      v-for="(item, k) in tableData"
      :key="k"
    >
      <div slot="header" class="clearfix">
        <span>{{ item.title }}</span>
      </div>
      <div style="display: flex;align-items: center;justify-content: space-between;">
        {{ item.createdAt | parseTime }}
        <el-button type="primary" @click="createRecord(item)" size="medium">填写</el-button>
      </div>
    </el-card>
    <!-- <el-table :data="tableData" border stripe>
      <el-table-column type="index" label="#" align="center"></el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        min-width="130"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="desc"
        label="描述"
        min-width="300"
      ></el-table-column>
      <el-table-column
        prop="user.username"
        label="发布人"
        align="center"
      ></el-table-column>
      <el-table-column fixed="right" align="center" label="操作" width="80">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            icon="el-icon-edit"
            @click="createRecord(scope.row)"
            >填写</el-button
          >
        </template>
      </el-table-column>
    </el-table> -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="listQuery.page"
      :page-size="listQuery.size"
      layout="total, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <el-drawer title="问卷填写" :visible.sync="drawer" size="50%">
      <reserach-write :research="research"></reserach-write>
    </el-drawer>
  </div>
</template>

<script>
import { listResearchSquare, retrieveResearch } from "@/api/survey/research";
import { filledRecord } from "@/api/survey/record";
import ReserachWrite from "./components/ResearchWrite";

export default {
  components: {
    ReserachWrite,
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
      drawer: false,
      research: {},
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.listLoading = true;
      let res = await listResearchSquare(this.listQuery);
      this.tableData = res.data.results;
      this.total = res.data.total;
      this.listLoading = false;
    },
    async createRecord(row) {
      await filledRecord(row.researchID);
      if (row.status === 2) {
        this.$message.error("问卷已停止填写");
      } else if (row.status === 0) {
        this.$message.error("问卷仍在编辑中");
      } else {
        // const res = await retrieveResearch(row.id);
        // this.research = res.data.research;
        this.$router.push({
          name: "DrawerPage",
          params: { id: row.id },
        });
        // window.open(href, "_blank");

        // this.drawer = true;
      }
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

<style></style>
