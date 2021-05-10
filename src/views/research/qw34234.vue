<template>
    <el-card shadow="hover" style="margin:5px;">
        <el-form
            :model="research.fieldsValue"
            :rules="research.rules"
            ref="researchRef"
            label-position="top"
            label-width="100px"
            size="small"
            :disabled="status"
        >
            <!-- 问卷基础信息 -->
            <div class="center-basic">
                <h3>{{ research.title }}</h3>
                <p>{{ research.desc }}</p>
            </div>
            <!-- 问卷字段 -->
            <div v-for="(item, index) in research.detail" :key="index">
                <!-- 控件元素 -->
                <el-form-item
                    :label="index + 1 + '. ' + item.label"
                    :prop="item.fieldId"
                >
                    <!--单选框-->
                    <el-radio-group
                        v-if="item.factor === 'radio'"
                        v-model="research.fieldsValue[item.fieldId]"
                    >
                        <el-radio
                            v-for="(item2, index2) in item.options"
                            :key="index2"
                            :label="item2.value"
                            >{{ item2.label }}
                        </el-radio>
                    </el-radio-group>
                    <!--复选框-->
                    <el-checkbox-group
                        v-else-if="item.factor === 'checkbox'"
                        v-model="research.fieldsValue[item.fieldId]"
                    >
                        <el-checkbox
                            v-for="(item2, index2) in item.options"
                            :key="index2"
                            :label="item2.value"
                            >{{ item2.label }}
                        </el-checkbox>
                    </el-checkbox-group>
                    <!--短文本-->
                    <el-input
                        v-else-if="item.factor === 'text'"
                        :placeholder="item.placeholder"
                        v-model="research.fieldsValue[item.fieldId]"
                        clearable
                    ></el-input>
                    <!-- 多行文本 -->
                    <el-input
                        v-else-if="item.factor === 'textarea'"
                        type="textarea"
                        :rows="item.rows"
                        :placeholder="item.placeholder"
                        v-model="research.fieldsValue[item.fieldId]"
                    ></el-input>
                    <!-- 下拉选择 -->
                    <el-select
                        v-else-if="item.factor === 'select'"
                        v-model="research.fieldsValue[item.fieldId]"
                        clearable
                        :placeholder="item.placeholder"
                    >
                        <el-option
                            v-for="(item2, index2) in item.options"
                            :key="index2"
                            :label="item2.label"
                            :value="item2.value"
                        ></el-option>
                    </el-select>
                    <!-- 开关 -->
                    <el-switch
                        v-else-if="item.factor === 'switch'"
                        v-model="research.fieldsValue[item.fieldId]"
                        :active-value="item.activeValue"
                        :inactive-value="item.inactiveValue"
                    ></el-switch>
                    <!-- 时间值 -->
                    <el-time-picker
                        v-else-if="item.factor === 'timePicker'"
                        v-model="research.fieldsValue[item.fieldId]"
                        value-format="hh-mm-ss"
                        :placeholder="item.placeholder"
                    ></el-time-picker>
                    <!-- 时间范围 -->
                    <el-time-picker
                        v-else-if="item.factor === 'timePickerRange'"
                        v-model="research.fieldsValue[item.fieldId]"
                        value-format="hh-mm-ss"
                        is-range
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        :placeholder="item.placeholder"
                    >
                    </el-time-picker>
                    <!-- 日期值 -->
                    <el-date-picker
                        v-else-if="item.factor === 'datePicker'"
                        v-model="research.fieldsValue[item.fieldId]"
                        value-format="yyyy-hh-dd"
                        :placeholder="item.placeholder"
                    ></el-date-picker>
                    <!-- 日期范围 -->
                    <el-date-picker
                        v-else-if="item.factor === 'datePickerRange'"
                        v-model="research.fieldsValue[item.fieldId]"
                        value-format="yyyy-hh-dd"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                    >
                    </el-date-picker>
                </el-form-item>
            </div>
            <el-form-item style="text-align:center;">
                <el-button
                    type="primary"
                    size="medium"
                    @click="submitForm('researchRef')"
                    >提交</el-button
                >
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
import {
    retrieveResearch,
    createResearchData,
    listResearchData
} from "@/api/research";
import { Message } from "element-ui";
export default {
    name: "Preview",
    data() {
        return {
            user: {},
            research: {}
        };
    },
    created() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            // 获取指定id下的问卷
            const id = this.$route.params.id;
            const res = await retrieveResearch(id);
            this.research = res.data.research;

            if (this.research.status === 0) {
                Message({
                    message: "调研已停止收集",
                    type: "error",
                    duration: 3 * 1000,
                    offset: 200
                });
            }
        },
        async createResearchData(data) {
            await createResearchData(data);
            this.$message.success("提交成功");
        },
        // 获取用户某一问卷填写信息
        getUserResearchData(id, user) {
            listResearchData({
                research_id: id,
                username: user
            }).then(res => {
                if (res.data.count) {
                    this.user = {};
                    Message({
                        message: "已完成填写",
                        type: "success",
                        duration: 1000,
                        offset: 200
                    });
                }
            });
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    const payload = {
                        research_id: this.research.id,
                        detail: this.research.fieldsValue
                    };
                    this.createResearchData(payload);
                } else {
                    return false;
                }
            });
        }
    },
    computed: {
        status() {
            // this.research["status"]为1，在收集
            // this.user为空，错误
            return !this.research["status"];
        }
    }
};
</script>

<style lang="scss">
// 调研基本信息
.center-basic {
    padding: 10px;

    h3 {
        text-align: center;
    }
    p {
        font-size: 14px;
        color: #909399;
        text-indent: 2em;
        padding: 5px;
    }
}
</style>
