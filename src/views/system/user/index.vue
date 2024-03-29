<template>
  <div style="padding: 20px">
    <el-button type="primary" icon="el-icon-plus" @click="addUser"
      >添加</el-button
    >
    <el-table :data="tableData" border stripe>
      <el-table-column type="index" label="序号" width="70" align="center" />
      <el-table-column
        prop="username"
        label="用户名"
        width="180"
        align="center"
      />
      <el-table-column prop="name" label="姓名" width="180" align="center" />
      <el-table-column prop="college" label="学院" align="center" />
      <el-table-column prop="profession" label="专业" align="center" />
      <el-table-column prop="rank" label="年级" width="100" align="center" />
      <el-table-column prop="classname" label="班级" align="center" />
      <!-- <el-table-column label="修改时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.updatedAt | parseTime }}
        </template>
      </el-table-column> -->
      <el-table-column fixed="right" align="center" label="操作" width="100">
        <template slot-scope="scope">
          <el-dropdown trigger="click">
            <span style="cursor: pointer; color: #409eff">
              更多<i style="font-size: 12px" class="el-icon-arrow-down"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button
                  type="text"
                  icon="el-icon-edit"
                  @click="editUser(scope.row)"
                  style="color: #67c23a"
                  >编辑</el-button
                ></el-dropdown-item
              >
              <el-dropdown-item>
                <el-button
                  type="text"
                  icon="el-icon-refresh"
                  @click="resetPassword(scope.row)"
                  style="color: #e6a23c"
                  >重置密码</el-button
                >
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button
                  type="text"
                  icon="el-icon-delete"
                  @click="deleteUser(scope.row)"
                  style="color: #f56c6c"
                  >删除</el-button
                >
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
        style="padding: 20px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="form.username"
            :disabled="drawerType !== 'add'"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="drawerType === 'add'" label="密码" prop="password1">
          <el-input v-model="form.password1" clearable show-password></el-input>
        </el-form-item>
        <el-form-item
          v-if="drawerType === 'add'"
          label="确认密码"
          prop="password2"
        >
          <el-input v-model="form.password2" clearable show-password></el-input>
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
            style="width: 100%"
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
  retrieveUser,
  createUser,
  updateUser,
  deleteUser,
  resetPassword,
} from "@/api/system/user";
import { listRole } from "@/api/system/role";
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
        size: 20,
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
            trigger: "blur",
          },
        ],
        password1: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
        password2: [
          {
            required: true,
            validator: validatePassword2,
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.fetchData();
    this.fetchRoleData();
  },
  methods: {
    async fetchData() {
      const res = await listUser(this.listQuery);
      this.tableData = res.data.results;
      this.total = res.data.total;
    },
    async fetchRoleData() {
      const res = await listRole({ size: 999 });
      this.roleData = res.data.results;
    },
    addUser() {
      this.form = {};
      this.drawerType = "add";
      this.drawer = true;
    },
    async editUser(row) {
      const res = await retrieveUser(row.id);
      this.form = res.data.user;
      this.form["id"] = row.id;
      this.drawerType = "edit";
      this.drawer = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
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
          roles: this.form.roles,
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
          roles: this.form.roles,
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
        type: "warning",
      })
        .then(async () => {
          await deleteUser(row.id);
          this.fetchData();
          this.$message.success("成功");
        })
        .catch((err) => {
          console.error(err);
        });
    },
    async resetPassword(row) {
      this.$confirm("确认重置密码?", "警告", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await resetPassword(row.id, {});
          this.$message.success("密码已被重置为：123456");
        })
        .catch((err) => {
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
    },
  },
};
</script>

<style lang="scss" scope>
</style>
