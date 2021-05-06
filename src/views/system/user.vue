<template>
    <div style="padding:20px;">
        <el-button type="primary" icon="el-icon-plus" @click="addUser"
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
                prop="username"
                label="用户名"
                width="120"
                align="center"
            >
            </el-table-column>
            <el-table-column
                prop="nickname"
                label="昵称"
                width="120"
                align="center"
            >
            </el-table-column>
            <el-table-column
                prop="email"
                label="邮箱"
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
                width="140"
            >
                <template slot-scope="scope">
                    <el-button
                        type="primary"
                        size="mini"
                        icon="el-icon-edit"
                        circle
                        @click="editUser(scope.row)"
                    ></el-button>
                    <el-button
                        type="warning"
                        size="mini"
                        icon="el-icon-refresh"
                        circle
                        @click="resetPassword(scope.row)"
                    ></el-button>
                    <el-button
                        type="danger"
                        size="mini"
                        icon="el-icon-delete"
                        circle
                        @click="deleteUser(scope.row)"
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
            :title="drawerType === 'edit' ? '用户编辑' : '用户添加'"
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
                <el-form-item label="用户名" prop="username">
                    <el-input
                        v-model="form.username"
                        :disabled="dialogType !== 'add'"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    v-if="dialogType === 'add'"
                    label="密码"
                    prop="password1"
                >
                    <el-input
                        v-model="form.password1"
                        clearable
                        show-password
                    ></el-input>
                </el-form-item>
                <el-form-item
                    v-if="dialogType === 'add'"
                    label="确认密码"
                    prop="password2"
                >
                    <el-input
                        v-model="form.password2"
                        clearable
                        show-password
                    ></el-input>
                </el-form-item>
                <el-form-item label="昵称">
                    <el-input v-model="form.nickname"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="form.telephone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="角色">
                    <el-select
                        v-model="form.roles"
                        multiple
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="(item, index) in roleData"
                            :key="index"
                            :label="item.title"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select>
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
    listUser,
    updateUser,
    createUser,
    deleteUser,
    resetPassword
} from "@/api/system/user";
import { getRole } from "@/api/system/role";
export default {
    name: "User",
    data() {
        let validatePassword2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value !== this.form.password1) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };
        return {
            tableData: [],
            total: 0,
            listQuery: {
                page: 1,
                size: 10
            },
            roleData: {},
            drawer: false,
            drawerType: "edit",
            form: {},
            rules: {
                username: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur"
                    }
                ],
                password1: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "blur"
                    }
                ],
                password2: [
                    {
                        required: true,
                        validator: validatePassword2,
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    created() {
        this.fetchData();
        this.getRoleData();
    },
    methods: {
        async fetchData() {
            const res = await listUser();
            this.tableData = res.data.results;
            this.total = res.data.total;
        },
        async getRoleData() {
            const res = await getRole();
            this.roleData = res.data;
        },
        addUser() {
            this.form = {};
            this.drawerType = "add";
            this.drawer = true;
        },
        editUser(row) {
            this.form = row;
            this.drawerType = "edit";
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
        },
        async confirmEdit() {
            if (this.drawerType === "edit") {
                let payload = {
                    nickname: this.form.nickname,
                    telephone: this.form.telephone,
                    email: this.form.email,
                    roles: this.form.roles
                };
                await updateUser(this.form.id, payload);
                this.$message.success("更新成功");
            } else {
                let payload = {
                    username: this.form.username,
                    password1: this.form.password1,
                    password2: this.form.password2,
                    nickname: this.form.nickname,
                    telephone: this.form.telephone,
                    email: this.form.email,
                    roles: this.form.roles
                };
                await createUser(payload);
                this.$message.success("添加成功");
            }
            this.fetchData();
            this.drawer = false;
        },
        deleteUser(row) {
            this.$confirm("确认删除?", "警告", {
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(async () => {
                    await deleteUser(row.id);
                    this.fetchData();
                    this.$message.success("成功");
                })
                .catch(err => {
                    console.error(err);
                });
        },
        async resetPassword(row) {
            this.$confirm("确认重置密码?", "警告", {
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(async () => {
                    await resetPassword(row.id, {});
                    this.$message.success("密码已被重置为：123456");
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

<style lang="scss" scope>
.avatar-item {
    display: flex;
    // justify-content: space-;
}
.avatar-uploader {
    .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .el-upload:hover {
        border-color: #409eff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }
    margin-right: 20px;
}
.avatar {
    width: 100px;
    height: 100px;
    display: block;
}
</style>
