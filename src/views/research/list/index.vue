<template>
    <div class="app-container">
        <el-table :data="formData" border stripe style="width: 100%">
            <el-table-column
                type="index"
                label="#"
                align="center"
            ></el-table-column>
            <el-table-column
                prop="title"
                label="标题"
                align="center"
            ></el-table-column>
            <el-table-column
                prop="desc"
                label="描述"
                min-width="350"
            ></el-table-column>
            <el-table-column label="收集状态" width="80" align="center">
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.status"
                        :active-value="1"
                        :inactive-value="0"
                        @change="researchStateChange(scope.row)"
                    ></el-switch>
                </template>
            </el-table-column>
            <el-table-column
                prop="created_time"
                label="时间"
                width="160"
                align="center"
            ></el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-tooltip
                        effect="dark"
                        content="调研数据"
                        placement="top"
                    >
                        <el-button
                            type="primary"
                            icon="el-icon-s-data"
                            size="mini"
                            circle
                            @click="exportResearchData(scope.row)"
                        ></el-button>
                    </el-tooltip>
                    <el-tooltip
                        effect="dark"
                        content="调研预览"
                        placement="top"
                    >
                        <el-button
                            type="warning"
                            icon="el-icon-reading"
                            size="mini"
                            circle
                            @click="previewResearch(scope.row)"
                        ></el-button>
                    </el-tooltip>
                    <el-tooltip
                        effect="dark"
                        content="删除调研"
                        placement="top"
                    >
                        <el-button
                            type="danger"
                            icon="el-icon-delete"
                            size="mini"
                            circle
                            @click="deleteDialog(scope.row)"
                        ></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="listQuery.page_index"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="listQuery.page_size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
        ></el-pagination>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
            <span>是否确认删除</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteResearch()"
                    >确 定</el-button
                >
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {
    listResearch,
    exportResearchData,
    updateResearch,
    deleteResearch
} from "@/api/research";
import { Message } from "element-ui";

export default {
    data() {
        return {
            listLoading: false,
            formData: [],
            total: 0,
            listQuery: {
                page: 1,
                size: 10
            },
            dialogVisible: false,
            researchId: null
        };
    },
    created() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            this.listLoading = true;
            const that = this;
            listResearch(this.listQuery).then(response => {
                that.formData = response.data.results;
                that.listQuery.page = response.data.page;
                that.total = response.data.count;
                that.listLoading = false;
            });
        },
        // 调研状态更新
        researchStateChange: function(row) {
            updateResearch({
                id: row.id,
                status: row.status
            }).then(res => {
                Message({
                    message: res.message,
                    type: "success",
                    duration: 1000,
                    offset: 200
                });
            });
        },
        // 调研数据导出
        exportResearchData: function(row) {
            Message({
                message: "请稍等",
                type: "success",
                duration: 1000,
                offset: 200
            });
            exportResearchData({
                research_id: row.id
            }).then(res => {
                let data = res; // 这里后端对文件流做了一层封装，将data指向res.data即可
                if (!data) {
                    return;
                }
                let url = window.URL.createObjectURL(
                    new Blob([data], {
                        type:
                            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                    })
                );
                let a = document.createElement("a");
                a.style.display = "none";
                a.href = url;
                a.setAttribute("download", row.id + ".xlsx");
                document.body.appendChild(a);
                a.click(); // 执行下载
                window.URL.revokeObjectURL(a.href); // 释放url
                document.body.removeChild(a); // 释放标签
            });
        },
        // 调研预览
        previewResearch: function(row) {
            const { href } = this.$router.resolve({
                name: "Preview",
                params: { id: row.id }
            });
            window.open(href, "_blank");
        },
        deleteDialog: function(row) {
            this.researchId = row.id;
            this.dialogVisible = true;
        },
        // 删除调研
        deleteResearch: function() {
            deleteResearch(this.researchId).then(res => {
                Message({
                    message: res.message,
                    type: "success",
                    duration: 1000,
                    offset: 200
                });
                this.dialogVisible = false;
                this.fetchData();
            });
        },
        handleSizeChange(val) {
            this.listQuery.size = val;
            this.fetchData();
        },
        handleCurrentChange(val) {
            this.listQuery.page = val;
        }
    }
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.bg-purple {
    background: #f9fafc;
}

.bg-select {
    background: #f6f7ff;
}

.grid-content {
    min-height: 36px;
}

.del-option {
    cursor: pointer;
    color: #f56c6c;
}
</style>
