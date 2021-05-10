<template>
    <div class="app-container">
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
                width="130"
            >
                <template slot-scope="scope">
                    <el-button
                        type="primary"
                        size="mini"
                        icon="el-icon-edit"
                        circle
                        @click="editResearch(scope.row)"
                    ></el-button>
                    <el-button
                        type="success"
                        icon="el-icon-s-data"
                        size="mini"
                        circle
                    ></el-button>
                    <el-button
                        type="danger"
                        size="mini"
                        icon="el-icon-delete"
                        circle
                        @click="deleteResearch(scope.row)"
                    ></el-button>
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

        <el-drawer title="问卷编辑" :visible.sync="drawer" size="50%">
            <el-form
                :model="form"
                :rules="rules"
                ref="ruleForm"
                label-width="80px"
            >
                <el-form-item label="标题" prop="title">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="desc">
                    <el-input v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-select
                        v-model="form.status"
                        clearable
                        placeholder="请选择"
                    >
                        <el-option label="编辑中" :value="0"></el-option>
                        <el-option label="收集中" :value="1"></el-option>
                        <el-option label="已完成" :value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="drawer = false">取消</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')">
                        更新
                    </el-button>
                    <el-button
                        type="success"
                        @click="previewResearch(scope.row)"
                    >
                        数据
                    </el-button>
                </el-form-item>
            </el-form>
            <el-divider><i class="el-icon-mobile-phone"></i>预览</el-divider>
            <preview :research="form"></preview>
        </el-drawer>
    </div>
</template>

<script>
import {
    listResearch,
    retrieveResearch,
    exportResearchData,
    updateResearch,
    deleteResearch
} from "@/api/research";
import { Message } from "element-ui";
import Preview from "@/views/research/components/Preview.vue";

export default {
    components: {
        Preview
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
            form: {},
            rules: {
                title: [
                    {
                        required: true,
                        message: "请输入标题",
                        trigger: "blur"
                    }
                ],
                desc: [
                    {
                        required: true,
                        message: "请输入描述",
                        trigger: "blur"
                    }
                ],
                status: [
                    {
                        required: true,
                        message: "请选择状态",
                        trigger: "change"
                    }
                ]
            },
            drawer: false,
            researchId: null
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
        async editResearch(row) {
            const res = await retrieveResearch(row.id);
            this.form = res.data.research;
            // this.form = row;
            this.drawer = true;
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.confirmEdit();
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        }, // 添加、更新权限
        async confirmEdit() {
            let payload = {
                title: this.form.title,
                desc: this.form.desc,
                status: this.form.status
            };
            await updateResearch(this.form.id, payload);
            this.$message.success("更新成功");

            this.fetchData();
            this.drawer = false;
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
            this.$router.push({ name: "Preview", params: { id: row.id } });
            // const { href } = this.$router.resolve({
            //     name: "Preview",
            //     params: { id: row._id }
            // });
            // window.open(href, "_blank");
        },
        // 删除调研
        deleteResearch: function(row) {
            this.$confirm("确认删除?", "警告", {
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(async () => {
                    await deleteResearch(row.id);
                    this.fetchData();
                    this.$message.success("成功");
                })
                .catch(err => {
                    console.error(err);
                });
            // deleteResearch(this.researchId).then(res => {
            //     Message({
            //         message: res.message,
            //         type: "success",
            //         duration: 1000,
            //         offset: 200
            //     });
            //     this.dialogVisible = false;
            //     this.fetchData();
            // });
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

.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
</style>
