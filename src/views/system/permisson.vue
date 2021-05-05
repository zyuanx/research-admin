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
        <el-dialog
            :title="dialogType === 'edit' ? '权限编辑' : '权限添加'"
            :visible.sync="dialogFormVisible"
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
                <el-form-item label="描述">
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
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')"
                    >确定</el-button
                >
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    listPermission,
    updatePermission,
    addPermission,
    deletePermission
} from "@/api/system/permisson";

import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
    name: "Permission",
    data() {
        return {
            menuItems: ["目录", "菜单", "接口"],
            tableData: [],
            tableTreeData: [],
            permissonTreeData: [],
            dialogFormVisible: false,
            dialogType: "edit",
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
                        trigger: "change"
                    }
                ],
                method: [
                    {
                        required: true,
                        message: "请选择方法",
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
        },
        // 编辑权限
        editPermission(row) {
            this.form = row;
            this.dialogType = "edit";
            this.dialogFormVisible = true;
        },
        // 添加权限
        addPermission() {
            this.form = {
                menu: 0
            };
            this.dialogType = "add";
            this.dialogFormVisible = true;
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
                method: this.form.method
            };
            if (this.dialogType === "edit") {
                await updatePermission(this.form.id, payload);
                this.$message.success("更新成功");
            } else {
                await addPermission(payload);
                this.$message.success("添加成功");
            }
            this.getPermissionData();
            this.dialogFormVisible = false;
        },
        // 删除角色
        deletePermission(row) {
            this.$confirm("确认删除?", "警告", {
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(async () => {
                    await deletePermission(row.id);
                    this.getPermissionData();
                    this.$message.success("成功");
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }
};
</script>

<style></style>
