<template>
    <div style="padding:20px;">
        <el-button type="primary" icon="el-icon-plus" @click="addPermission"
            >添加</el-button
        >
        <el-table :data="tableData" size="mini" border stripe>
            <el-table-column
                type="index"
                label="序号"
                width="50"
                align="center"
            ></el-table-column>
            <el-table-column
                prop="group"
                label="组"
                align="center"
            ></el-table-column>
            <el-table-column
                prop="path"
                label="路径"
                align="center"
            ></el-table-column>
            <el-table-column
                prop="desc"
                label="描述"
                align="center"
            ></el-table-column>
            <el-table-column
                prop="method"
                label="方法"
                align="center"
            ></el-table-column>
            <el-table-column
                prop="index"
                label="次序"
                align="center"
            ></el-table-column>
            <el-table-column label="修改时间" align="center">
                <template slot-scope="scope">
                    {{ scope.row.updatedAt | parseTime }}
                </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                align="center"
                label="操作"
                width="100"
            >
                <template slot-scope="scope">
                    <el-button
                        type="primary"
                        size="mini"
                        icon="el-icon-edit"
                        circle
                        @click="editPermission(scope.row)"
                    ></el-button>
                    <el-button
                        type="danger"
                        size="mini"
                        icon="el-icon-delete"
                        circle
                        @click="deletePermission(scope.row)"
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
        <el-drawer
            :title="drawerType === 'edit' ? '权限编辑' : '权限添加'"
            :visible.sync="drawer"
            size="50%"
        >
            <el-form
                :model="form"
                :rules="rules"
                ref="ruleForm"
                label-width="80px"
            >
                <el-form-item label="组" prop="group">
                    <el-input v-model="form.group"></el-input>
                </el-form-item>
                <el-form-item label="路径" prop="path">
                    <el-input v-model="form.path"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="desc">
                    <el-input v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item label="方法" prop="method">
                    <el-select
                        v-model="form.method"
                        clearable
                        placeholder="请选择"
                    >
                        <el-option label="GET" value="GET"> </el-option>
                        <el-option label="POST" value="POST">POST</el-option>
                        <el-option label="PUT" value="PUT">PUT</el-option>
                        <el-option label="DELETE" value="DELETE"
                            >DELETE</el-option
                        >
                    </el-select>
                </el-form-item>
                <el-form-item label="次序" prop="index">
                    <el-input-number
                        v-model="form.index"
                        :min="1"
                        :max="10"
                    ></el-input-number>
                    越大越靠后
                </el-form-item>
                <el-form-item>
                    <el-button @click="drawer = false">取消</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')">
                        确定</el-button
                    >
                </el-form-item>
            </el-form>
        </el-drawer>
    </div>
</template>

<script>
import {
    listPermission,
    retrievePermission,
    updatePermission,
    createPermission,
    destroyPermission
} from "@/api/system/permisson";

import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
    name: "Permission",
    data() {
        return {
            tableData: [],
            total: 0,
            listQuery: {
                page: 1,
                size: 10
            },
            drawer: false,
            drawerType: "edit",
            form: {},
            rules: {
                group: [
                    {
                        required: true,
                        message: "请输入组名称",
                        trigger: "blur"
                    }
                ],
                path: [
                    {
                        required: true,
                        message: "请输入路径",
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
                method: [
                    {
                        required: true,
                        message: "请选择方法",
                        trigger: "change"
                    }
                ],
                index: [
                    {
                        required: true,
                        message: "请选择次序",
                        trigger: "change"
                    }
                ]
            }
        };
    },
    created() {
        this.fetchData();
    },
    methods: {
        // 获取角色数据
        async fetchData() {
            const res = await listPermission();
            this.tableData = res.data.results;
            this.total = res.data.total;
        },
        // 编辑权限
        async editPermission(row) {
            const res = await retrievePermission(row.id)
            this.form = res.data.permission;
            this.drawerType = "edit";
            this.drawer = true;
        },
        // 添加权限
        addPermission() {
            this.form = {};
            this.drawerType = "add";
            this.drawer = true;
        },
        // 表单提交
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
                group: this.form.group,
                path: this.form.path,
                desc: this.form.desc,
                method: this.form.method,
                index: this.form.index
            };
            if (this.drawerType === "edit") {
                await updatePermission(this.form.id, payload);
                this.$message.success("更新成功");
            } else {
                await createPermission(payload);
                this.$message.success("添加成功");
            }
            this.fetchData();
            this.drawer = false;
        },
        // 删除角色
        deletePermission(row) {
            this.$confirm("确认删除?", "警告", {
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(async () => {
                    await destroyPermission(row.id);
                    this.fetchData();
                    this.$message.success("成功");
                })
                .catch(err => {
                    console.error(err);
                });
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
