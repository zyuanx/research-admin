<template>
    <div style="padding:20px;">
        <el-button type="primary" icon="el-icon-plus" @click="addRole"
            >添加</el-button
        >
        <el-table
            :data="tableData"
            size="mini"
            border
            stripe
            @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection" width="50" align="center">
            </el-table-column>
            <el-table-column
                type="index"
                label="序号"
                width="50"
                align="center"
            ></el-table-column>
            <el-table-column
                prop="title"
                label="角色名"
                width="120"
                align="center"
            >
            </el-table-column>
            <el-table-column
                prop="desc"
                label="描述"
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
                        @click="editRole(scope.row)"
                    ></el-button>
                    <el-button
                        type="danger"
                        size="mini"
                        icon="el-icon-delete"
                        circle
                        @click="deleteRole(scope.row)"
                    ></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-drawer
            :title="drawerType === 'edit' ? '角色编辑' : '角色添加'"
            :visible.sync="drawer"
            size="50%"
        >
            <el-form
                :model="form"
                :rules="rules"
                ref="ruleForm"
                label-width="80px"
                style="margin:20px;"
            >
                <el-form-item label="角色名" prop="title">
                    <el-input
                        v-model="form.title"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item label="拥有权限">
                    <el-tree
                        :data="permissonTreeData"
                        ref="permRef"
                        show-checkbox
                        node-key="id"
                    >
                    </el-tree>
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
import { getRole, updateRole, addRole, deleteRole } from "@/api/system/role";
import { getPermission } from "@/api/system/permisson";
import { genTree } from "@/utils";
export default {
    name: "Role",
    data() {
        return {
            tableData: [],
            permissonTreeData: [],
            drawer: false,
            drawerType: "edit",
            form: {},
            rules: {
                title: [
                    {
                        required: true,
                        message: "请输入角色名称",
                        trigger: "blur"
                    }
                ]
            },
            multipleSelection: []
        };
    },

    created() {
        this.getRoleData();
        // this.getPermissionData();
    },
    methods: {
        // 获取角色数据
        async getRoleData() {
            const res = await getRole();
            this.tableData = res.data.results;
        },
        async getPermissionData() {
            const res = await getPermission();
            this.permissonTreeData = genTree(res.data);
        },
        // 编辑角色
        editRole(row) {
            this.form = row;
            this.drawer = true;
            this.drawerType = "edit";
            this.$nextTick(() => {
                this.$refs.permRef.setCheckedKeys(row.permissions);
                // this.$refs.permRef.setCheckedKeys(
                //     [8, 9, 10, 11, 12, 14, 15, 1],
                //     true
                // );
            });
        },
        // 添加角色
        addRole() {
            this.form = {};
            this.drawer = true;
            this.drawerType = "add";
            this.$nextTick(() => {
                this.$refs.permRef.setCheckedKeys([]);
            });
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
        },
        // 添加、更新数据
        async confirmEdit() {
            this.form.permissions = this.$refs.permRef.getCheckedKeys(true);
            // console.log(this.$refs.permRef.getHalfCheckedKeys())
            let payload = {
                desc: this.form.desc,
                permissions: this.form.permissions,
                title: this.form.title
            };
            if (this.drawerType === "edit") {
                await updateRole(this.form.id, payload);
                this.$message.success("更新成功");
            } else {
                await addRole(payload);
                this.$message.success("添加成功");
            }
            this.getRoleData();
            this.drawer = false;
        },
        // 删除角色
        deleteRole(row) {
            this.$confirm("确认删除?", "警告", {
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(async () => {
                    await deleteRole(row.id);
                    this.getRoleData();
                    this.$message.success("成功");
                })
                .catch(err => {
                    console.error(err);
                });
        },
        handleSelectionChange(val) {
            console.log(val);
            this.multipleSelection = val;
        }
    }
};
</script>

<style lang="scss">
.el-drawer__header {
    span:focus {
        outline: 0 !important;
    }
}
.el-drawer {
    overflow: auto;
}
</style>
