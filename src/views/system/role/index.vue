<template>
    <div style="padding:20px;">
        <el-button type="primary" icon="el-icon-plus" @click="addRole"
            >添加</el-button
        >
        <el-table :data="tableData" border stripe>
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
                    <el-dropdown trigger="click">
                        <span style="cursor: pointer;color: #409eff;">
                            更多<i
                                style="font-size: 12px;"
                                class="el-icon-arrow-down"
                            ></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <el-button
                                    type="text"
                                    icon="el-icon-edit"
                                    @click="editRole(scope.row)"
                                    style="color:#67c23a;"
                                    >编辑</el-button
                                ></el-dropdown-item
                            >
                            <el-dropdown-item>
                                <el-button
                                    type="text"
                                    icon="el-icon-delete"
                                    @click="deleteRole(scope.row)"
                                    style="color:#f56c6c;"
                                    >删除</el-button
                                >
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
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
import {
    listRole,
    retrieveRole,
    createRole,
    updateRole,
    deleteRole
} from "@/api/system/role";
import { listPermission } from "@/api/system/permisson";
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
        this.getPermissionData();
    },
    methods: {
        // 获取角色数据
        async getRoleData() {
            const res = await listRole();
            this.tableData = res.data.results;
        },
        toTree(data) {
            const map = {};
            data.forEach(item => {
                item.label = item.desc;
                const parent = map[item.group];
                if (parent) {
                    map[item.group].children.push(item);
                } else {
                    map[item.group] = {
                        label: item.group,
                        children: [item]
                    };
                }
            });
            const res = [];
            Object.keys(map).forEach(function(key) {
                res.push(map[key]);
            });
            return res;
        },
        async getPermissionData() {
            const res = await listPermission({ size: 999 });
            this.permissonTreeData = this.toTree(res.data.results);
        },
        // 编辑角色
        async editRole(row) {
            const res = await retrieveRole(row.id);
            this.form = res.data.role;
            this.drawer = true;
            this.drawerType = "edit";
            this.$nextTick(() => {
                // this.$refs.permRef.setCheckedKeys(row.permissions);
                this.$refs.permRef.setCheckedKeys(
                    this.form.permissions ? this.form.permissions : [],
                    true
                );
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
                await createRole(payload);
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
