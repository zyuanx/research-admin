<template>
    <div class="container">
        <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="80px"
            label-position="top"
            size="medium"
            :disabled="formFlag"
            v-show="showFormFlag"
            style="margin:20px;"
        >
            <div>
                <p style="text-indent:2em;">各位同学：</p>
                <p style="text-indent:2em;">
                    国庆期间为丰富同学们的假期生活，学生工作处主要面向2020级新生开展外出参观活动，10月2日上午组织前往淮海战役纪念馆，10月3日上午组织前往徐州市规划馆，每人仅可选择一项，采取网上报名、包车集中前往的方式。
                </p>
                <p style="color:red;text-indent:2em;">
                    特别提醒:2日、3日早8：30准时在图书馆门前统一发车，凭报名截图和校园卡上车。
                </p>
            </div>

            <el-form-item label="1.姓名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="2.学院" prop="college">
                <el-input v-model="ruleForm.college"></el-input>
            </el-form-item>
            <el-form-item label="3.班级" prop="stuclass">
                <el-input v-model="ruleForm.stuclass"></el-input>
            </el-form-item>
            <el-form-item label="4.手机号" prop="tel">
                <el-input
                    v-model="ruleForm.tel"
                    type="tel"
                    maxlength="11"
                    show-word-limit
                    placeholder="输入手机号"
                ></el-input>
            </el-form-item>
            <el-form-item label="5.参观地点" prop="location">
                <div>10月2日：淮海战役纪念馆，10月3日：徐州市规划馆</div>
                <div>出发时间均为当天早上8:30</div>
                <el-radio-group v-model="ruleForm.location" size="medium">
                    <el-radio-button
                        v-for="(item, index) in visitLocation"
                        :key="index"
                        :label="item.title"
                    >
                        {{ item.title }}<br />
                        <span style="font-size:10px;"
                            >(余{{ item.remain }}位)</span
                        >
                    </el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item class="btn">
                <el-button type="primary" @click="submitForm('ruleForm')"
                    >提交</el-button
                >
            </el-form-item>
        </el-form>
        <div v-if="!showFormFlag" class="pass">
            <img class="pass-img" :src="imgUrl" alt="" />
            <!-- <div class="item num">编号：{{ ruleForm.num }}</div> -->
            <div class="item body">
                <div style="margin-left:25%;">
                    <div class="body-item">
                        <div style="font-weight:bold;">集合时间</div>
                        <div style="font-size:10px;">
                            2020年10月{{
                                ruleForm.location === "徐州市规划馆"
                                    ? "3"
                                    : "2"
                            }}日8:30
                        </div>
                    </div>
                    <div class="body-item">
                        <div style="font-weight:bold;">集合地点</div>
                        <div style="font-size:10px;">图书馆门前</div>
                    </div>
                    <div class="body-item">
                        <div style="font-weight:bold;">姓名</div>
                        <div style="font-size:10px;">{{ ruleForm.name }}</div>
                    </div>
                    <div class="body-item">
                        <div style="font-weight:bold;">学院</div>
                        <div style="font-size:10px;">
                            {{ ruleForm.college }}
                        </div>
                    </div>
                    <div class="body-item">
                        <div style="font-weight:bold;">注意事项</div>
                        <div style="font-size:10px;">
                            请8:30前在图书馆门前集合，统一乘车前往
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 非新生提示 -->
        <el-dialog
            title="提示"
            :visible.sync="centerDialogVisible"
            width="80%"
            center
        >
            <span>你是老生啦，建议机会留给新生，是否继续?</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false"
                    >取 消</el-button
                >
                <el-button type="primary" @click="continueBook"
                    >确 定</el-button
                >
            </span>
        </el-dialog>
    </div>
</template>

<script>
import pic1 from "@/assets/1.png";
import pic2 from "@/assets/2.png";
import { VisitLocation, VisitCreate, VisitList } from "@/api/visit.js";
import { Message } from "element-ui";
import axios from "axios";
export default {
    data() {
        return {
            centerDialogVisible: false,
            showFormFlag: true,
            formFlag: true,
            ruleForm: {
                user: "",
                name: "",
                tel: "",
                college: "",
                stuclass: "",
                location: ""
            },
            rules: {
                name: [
                    { required: true, message: "请输入姓名", trigger: "blur" }
                ],
                college: [
                    { required: true, message: "请输入学院", trigger: "blur" }
                ],
                stuclass: [
                    { required: true, message: "请输入班级", trigger: "blur" }
                ],
                tel: [
                    { required: true, message: "请输入电话", trigger: "blur" },
                    {
                        min: 11,
                        max: 11,
                        message: "长度必须为11个字符",
                        trigger: "blur"
                    }
                ],
                location: {
                    required: true,
                    message: "请选择参观地点",
                    trigger: "change"
                }
            },
            visitLocation: {}
        };
    },
    created() {
        const user = this.$route.query.user;
        this.getUserInfo(user);
    },
    computed: {
        imgUrl() {
            let url = this.ruleForm.location === "徐州市规划馆" ? pic2 : pic1;
            return url;
        }
    },

    methods: {
        getUserInfo: function(user) {
            axios
                .get("https://job.cumtserver.cn/user_info/" + user)
                .then(res => {
                    if (res.data.data) {
                        const userInfo = res.data.data["userInfo"];
                        this.ruleForm.user = userInfo["username"];
                        this.ruleForm.name = userInfo["name"];
                        this.ruleForm.college = userInfo["college"];
                        this.ruleForm.tel = userInfo["tel"];
                        this.ruleForm.stuclass = userInfo["stuclass"];
                        if (userInfo["rank"] !== "2020") {
                            this.centerDialogVisible = true;
                        } else {
                            // 获取余量信息
                            this.getVisitList(user);
                        }
                    } else {
                        Message({
                            message: "不存在此用户信息",
                            type: "error",
                            duration: 3 * 1000,
                            offset: 200
                        });
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        // 获取预约信息
        getVisitList: function(user) {
            VisitList({
                user: user
            }).then(res => {
                if (res.data) {
                    this.showFormFlag = false;
                    this.ruleForm = res.data;
                } else {
                    this.formFlag = false;
                    this.getVisitLocation();
                }
            });
        },
        // 获取地点余量
        getVisitLocation: function() {
            VisitLocation().then(res => {
                this.visitLocation = res.data.results;
            });
        },

        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                this.formFlag = true;
                if (valid) {
                    VisitCreate(this.ruleForm).then(res => {
                        if (res.code === 200) {
                            this.formFlag = false;
                            Message({
                                message: res.msg,
                                type: "success",
                                duration: 3 * 1000,
                                offset: 200
                            });
                        } else {
                            this.getVisitList(this.ruleForm["user"]);
                        }
                    });
                }
            });
        },
        // 非新生继续预约
        continueBook: function() {
            this.centerDialogVisible = false;
            this.getVisitList(this.ruleForm.user);
        }
    }
};
</script>

<style lang="scss" scoped>
.pass {
    position: relative;
    .pass-img {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
    }
    .item {
        position: absolute;
        // text-align: center;
    }
    .num {
        width: 100%;
        top: 28%;
        color: black;
        font-weight: bold;
        // font-size: 20px;
    }
    .body {
        width: 100%;
        top: 34%;
        color: #529289;
        font-size: 14px;
        .body-item {
            margin: 10px 0;
        }
    }
    .sub {
        width: 100%;
        top: 55%;
        .sub-item {
            margin: 10px 0;
        }
    }
}
.container {
    // padding: 20px;
    .btn {
        text-align: center;
    }
}
</style>
