<template>
    <div class="app-container">
        <el-table :data="form_data" border stripe style="width: 100%">
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
                    <!-- <el-button
                        type="primary"
                        icon="el-icon-edit"
                        size="mini"
                        circle
                        @click="showEditDialog(scope.row)"
                    ></el-button> -->
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
    </div>
</template>

<script>
import { listResearch, readResearch, updateResearch } from "@/api/research";

export default {
    data() {
        return {
            listLoading: false,
            form_data: [],
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
        fetchData() {
            this.listLoading = true;
            const that = this;
            listResearch(this.listQuery).then(response => {
                that.form_data = response.data.results;
                that.listQuery.page = response.data.page;
                that.total = response.data.count;
                that.listLoading = false;
            });
        },
        // 调研状态更新
        researchStateChange: function(row) {
            console.log(row);
            updateResearch(
                {
                    status: row.status
                },
                row.id
            ).then(() => {});
        },
        // 调研预览
        previewResearch: function(row) {
            console.log(row);
            const { href } = this.$router.resolve({
                path: "/preview",
                query: { id: row.id }
            });
            window.open(href, "_blank");
        },
        handlePreview(index, row) {
            console.log(index, row.id);
            readResearch(row.id).then(response => {
                console.log(response);
            });
        },
        handleView(index, row) {
            console.log(index, row.id);
        },
        handleSizeChange(val) {
            this.listQuery.size = val;
            this.fetchData();
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.listQuery.page = val;
            this.fetchData();
            console.log(`当前页: ${val}`);
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
