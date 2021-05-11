<template>
    <div class="app-container">
        <el-form :model="form" :rules="rules" ref="ruleForm" label-width="80px">
            <el-form-item label="旧密码" prop="old_password">
                <el-input
                    v-model="form.old_password"
                    placeholder="请输入旧密码"
                    clearable
                    show-password
                ></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="new_password1">
                <el-input
                    v-model="form.new_password1"
                    placeholder="请输入新密码"
                    clearable
                    show-password
                ></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="new_password2">
                <el-input
                    v-model="form.new_password2"
                    placeholder="请再次输入新密码"
                    clearable
                    show-password
                ></el-input>
            </el-form-item>
            <el-form-item size="large">
                <el-button type="primary" @click="submitForm('ruleForm')"
                    >提交</el-button
                >
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { changePassword } from "@/api/auth";
export default {
    name: "ChangePassword",
    data() {
        let validatePassword2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入新密码"));
            } else if (value !== this.form.new_password1) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };
        return {
            form: {
                old_password: "",
                new_password1: "",
                new_password2: ""
            },
            rules: {
                old_password: [
                    {
                        required: true,
                        message: "请输入旧密码",
                        trigger: "blur"
                    }
                ],
                new_password1: [
                    {
                        required: true,
                        message: "请输入新密码",
                        trigger: "blur"
                    }
                ],
                new_password2: [
                    {
                        required: true,
                        validator: validatePassword2,
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
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
            let payload = {
                password: this.form.old_password,
                password1: this.form.new_password1,
                password2: this.form.new_password2
            };
            await changePassword(payload);
            this.$message.success("密码修改成功，请重新登陆");
            await this.$store.dispatch("user/logout");
            this.$router.push(`/login`);
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
};
</script>
