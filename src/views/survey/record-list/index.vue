<template>
    <div style="padding:20px;">
        <el-table :data="tableData" border stripe>
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
                prop="user.username"
                label="填写人"
                align="center"
            ></el-table-column>
            <el-table-column
                prop="ip"
                label="IP地址"
                align="center"
            ></el-table-column>
            <el-table-column label="填写时间" width="160" align="center">
                <template slot-scope="scope">
                    {{ scope.row.createdAt | parseTime }}
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
                        @click="readRecord(scope.row)"
                        >查看</el-button
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
        <el-drawer title="记录预览" :visible.sync="drawer" size="50%">
            <record-preview :research="research"></record-preview>
        </el-drawer>
    </div>
</template>

<script>
import { listRecord, retrieveRecord } from "@/api/survey/record";
import { retrieveMgoResearch } from "@/api/survey/research";
import RecordPreview from "./components/RecordPreview";
export default {
    components: { RecordPreview },
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
        this.fetchData();
    },
    methods: {
        async fetchData() {
            const res = await listRecord(this.listQuery);
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
            const res = await retrieveRecord(row.id);
            const re = await retrieveMgoResearch(row.researchID);
            const research = re.data.research;
            research.title = res.data.record.title;
            research.fieldsValue = res.data.record.fieldsValue;
            this.research = research;
            this.drawer = true;
        }
    }
};
</script>

<style></style>
