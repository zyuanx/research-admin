<template>
    <div style="padding:20px;">
        <el-table :data="tableData" size="mini" border stripe>
            <el-table-column
                type="index"
                label="#"
                align="center"
            ></el-table-column>
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
            <el-table-column label="收集状态" width="80" align="center">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.status === 0" type="success"
                        >编辑中</el-tag
                    >
                    <el-tag v-else-if="scope.row.status === 1">收集中</el-tag>
                    <el-tag v-else type="success">已结束</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="修改时间" width="140" align="center">
                <template slot-scope="scope">
                    {{ scope.row.updatedAt | parseTime }}
                </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                align="center"
                label="操作"
                width="80"
            >
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

        <el-drawer title="问卷填写" :visible.sync="drawer" size="50%">
            <reserach-write :research="research"></reserach-write>
        </el-drawer>
    </div>
</template>

<script>
import { listResearch, retrieveResearch } from "@/api/survey/research";
// import { Message } from "element-ui";
import ReserachWrite from "./components/ReserachWrite.vue";

export default {
    components: {
        ReserachWrite
    },
    data() {
        return {
            listLoading: false,
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
        async createRecord(row) {
            if (row.status === 2) {
                this.$message.error("问卷已停止填写");
            } else if (row.status === 0) {
                this.$message.error("问卷仍在编辑中");
            } else {
                const res = await retrieveResearch(row.id);
                this.research = res.data.research;
                this.drawer = true;
            }
        },
        handleSizeChange(val) {
            this.listQuery.size = val;
            this.fetchData();
        },
        handleCurrentChange(val) {
            this.listQuery.page = val;
            this.fetchData();
        }
    }
};
</script>

<style></style>
