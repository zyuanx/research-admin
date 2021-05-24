<template>
    <div style="padding:20px;">
        <el-form
            :model="research.fieldsValue"
            :rules="research.rules"
            ref="researchRef"
            label-position="top"
            label-width="100px"
            size="small"
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
    </div>
</template>

<script>
import { createRecord } from "@/api/survey/record";
export default {
    name: "ResearchWrite",
    props: {
        research: Object
    },
    data() {
        return {};
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
                title: this.research.title,
                researchID: this.research.researchID,
                fieldsValue: this.research.fieldsValue
            };
            await createRecord(payload);
            this.$message.success("填写成功");
        }
    }
};
</script>

<style lang="scss" scoped>
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
