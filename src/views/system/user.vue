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
            <el-table-column label="头像" width="80" align="center">
                <template slot-scope="scope">
                    <el-avatar :src="scope.row.avatar"></el-avatar>
                </template>
            </el-table-column>
            <el-table-column
                prop="update_time"
                label="修改时间"
                align="center"
            ></el-table-column>
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

        <el-dialog
            :title="dialogType === 'edit' ? '用户编辑' : '用户添加'"
            :visible.sync="dialogFormVisible"
            :before-close="handleClose"
        >
            <el-form
                :model="form"
                :rules="rules"
                ref="ruleForm"
                label-width="80px"
            >
                <el-form-item label="用户名" prop="username">
                    <el-input
                        v-model="form.username"
                        :disabled="dialogType !== 'add'"
                    ></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="nickname">
                    <el-input v-model="form.nickname"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="头像" v-if="dialogType != 'add'">
                    <div class="avatar-item">
                        <el-upload
                            class="avatar-uploader"
                            ref="upload"
                            action=""
                            :multiple="false"
                            :show-file-list="false"
                            :auto-upload="true"
                            :http-request="updateAvatar"
                        >
                            <img
                                v-if="form.avatar"
                                :src="form.avatar"
                                class="avatar"
                            />
                             <div slot="tip" class="el-upload__tip">点击图片即可上传</div>
                        </el-upload>
                        <div></div>
                    </div>
                </el-form-item>
                <!-- <el-form-item
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
                </el-form-item> -->
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
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')"
                    >确定</el-button
                >
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    getUser,
    updateUser,
    addUser,
    deleteUser,
    resetPassword,
    updateUserAvatar
} from "@/api/system/user";
import { getRole } from "@/api/system/role";
export default {
    name: "User",
    data() {
        let validatePassword2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value !== this.form.password2) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };
        return {
            tableData: [],
            roleData: {},
            dialogFormVisible: false,
            dialogAddFormVisible: false,
            dialogType: "edit",
            form: {},
            rules: {
                username: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur"
                    }
                ],
                nickname: [
                    {
                        required: true,
                        message: "请输入昵称",
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
        this.getUserData();
        this.getRoleData();
    },
    methods: {
        async getUserData() {
            const res = await getUser();
            this.tableData = res.data.results;
        },
        async getRoleData() {
            const res = await getRole();
            this.roleData = res.data;
        },
        addUser() {
            this.form = {};
            this.dialogType = "add";
            this.dialogFormVisible = true;
        },
        editUser(row) {
            this.form = row;
            this.dialogType = "edit";
            this.dialogFormVisible = true;
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
            if (this.dialogType === "edit") {
                let payload = {
                    nickname: this.form.nickname,
                    email: this.form.email,
                    roles: this.form.roles
                };
                await updateUser(this.form.id, payload);
                this.$message.success("更新成功");
            } else {
                let payload = {
                    username: this.form.username,
                    nickname: this.form.nickname,
                    email: this.form.email,
                    // password1: this.form.password1,
                    // password2: this.form.password2,
                    roles: this.form.roles
                };
                await addUser(payload);
                this.$message.success("添加成功");
            }
            this.getUserData();
            this.dialogFormVisible = false;
        },
        deleteUser(row) {
            this.$confirm("确认删除?", "警告", {
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(async () => {
                    await deleteUser(row.id);
                    this.getUserData();
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
                    await resetPassword(row.id);
                    this.$message.success("密码已被重置为：123456");
                })
                .catch(err => {
                    console.error(err);
                });
        },
        handleClose(done) {
            this.$refs["ruleForm"].resetFields();
            done();
        },
        closeDialog() {
            this.$refs["ruleForm"].resetFields();
            this.dialogFormVisible = false;
        },
        submitUpload() {
            this.$refs.upload.submit();
        },
        async updateAvatar(param) {
            console.log(param);
            let id = this.form.id;
            let file = param.file;
            let form = new FormData();
            form.append("avatar", file);
            const res = await updateUserAvatar(id, form);
            this.form.avatar = res.data.avatar;
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
