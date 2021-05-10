<template>
    <div style="padding:20px;">
        <el-button type="primary" icon="el-icon-plus" @click="exportExcel">
            导出
        </el-button>
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
                prop="user.username"
                label="填写人"
                align="center"
            ></el-table-column>
            <el-table-column label="填写日期" width="140" align="center">
                <template slot-scope="scope">
                    {{ scope.row.createAt | parseTime }}
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
    </div>
</template>

<script>
import { listRecord, exportRecord } from "@/api/survey/record";
export default {
    data() {
        return {
            tableData: [],
            total: 0,
            listQuery: {
                page: 1,
                size: 10
            }
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
        async exportExcel() {
            const res = await exportRecord();
            let blob = new Blob([res], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            });
            let objectUrl = URL.createObjectURL(blob); // 创建URL
            location.href = objectUrl;
            URL.revokeObjectURL(objectUrl); // 释放内存
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
