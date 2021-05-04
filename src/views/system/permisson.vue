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
                <el-form-item label="权限名" prop="title">
                    <el-input
                        v-model="form.title"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="类型" prop="menu">
                    <el-radio-group v-model="form.menu">
                        <el-radio :label="0">目录</el-radio>
                        <el-radio :label="1">菜单</el-radio>
                        <el-radio :label="2">接口</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="方法" prop="method">
                    <el-input
                        v-model="form.method"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="父级" prop="parent">
                    <treeselect
                        v-model="form.parent"
                        :multiple="false"
                        :options="permissonTreeData"
                        placeholder="父级"
                    />
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
// import { genTree } from "@/utils";

// import the component
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
    name: "Permission",
    components: { Treeselect },
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
                title: [
                    {
                        required: true,
                        message: "请输入权限名称",
                        trigger: "blur"
                    }
                ],
                menu: [
                    {
                        required: true,
                        message: "请选择类型",
                        trigger: "change"
                    }
                ],
                method: [
                    {
                        required: true,
                        message: "请输入方法",
                        trigger: "blur"
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
            // this.tableTreeData = genTree(res.data);
            // this.permissonTreeData = this.tableTreeData;
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
                menu: this.form.menu,
                method: this.form.method,
                parent: this.form.parent ? this.form.parent : null,
                title: this.form.title
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
