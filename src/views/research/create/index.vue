<template>
    <el-row>
        <!-- 左侧控件选择区 -->
        <el-col :span="6">
            <el-card shadow="hover" style="margin:5px;">
                <!-- 空间排布 -->
                <div class="btns-flex">
                    <div class="btns-item">
                        <el-button
                            type="primary"
                            size="medium"
                            @click="factorAdd('radio')"
                            >单选框
                        </el-button>
                    </div>
                    <div class="btns-item">
                        <el-button
                            type="primary"
                            size="medium"
                            @click="factorAdd('checkbox')"
                            >复选框
                        </el-button>
                    </div>
                    <div class="btns-item">
                        <el-button
                            type="primary"
                            size="medium"
                            @click="factorAdd('text')"
                            >短文本
                        </el-button>
                    </div>
                    <div class="btns-item">
                        <el-button
                            type="primary"
                            size="medium"
                            @click="factorAdd('textarea')"
                            >长文本
                        </el-button>
                    </div>
                    <div class="btns-item">
                        <el-button
                            type="primary"
                            size="medium"
                            @click="factorAdd('select')"
                            >下拉选择
                        </el-button>
                    </div>
                    <div class="btns-item">
                        <el-button
                            type="primary"
                            size="medium"
                            @click="factorAdd('switch')"
                            >开关
                        </el-button>
                    </div>
                    <div class="btns-item">
                        <el-button
                            type="primary"
                            size="medium"
                            @click="factorAdd('timePicker')"
                            >时间选择
                        </el-button>
                    </div>
                    <div class="btns-item">
                        <el-button
                            type="primary"
                            size="medium"
                            @click="factorAdd('timePickerRange')"
                            >时间范围
                        </el-button>
                    </div>
                    <div class="btns-item">
                        <el-button
                            type="primary"
                            size="medium"
                            @click="factorAdd('datePicker')"
                            >日期选择
                        </el-button>
                    </div>
                    <div class="btns-item">
                        <el-button
                            type="primary"
                            size="medium"
                            @click="factorAdd('datePickerRange')"
                            >日期范围
                        </el-button>
                    </div>
                </div>
                <!-- <div>fieldCount: {{ fieldCount }}</div>
                <div>editIndex: {{ editIndex }}</div>
                <div>editFieldId: {{ editFieldId }}</div>
                <div>editFactor: {{ editFactor }}</div>
                <div>
                    <div>title: {{ research.title }}</div>
                    <div>desc: {{ research.desc }}</div>
                    <div>once: {{ research.once }}</div>
                    <div>confirm: {{ research.confirm }}</div>
                    <pre>
                        fieldsValue: {{ research.fieldsValue }}
                    </pre>
                    <pre>
                        detail: {{ research.detail }}
                    </pre>
                    <pre>
                        rules: {{ research.rules }}
                    </pre>
                </div> -->
            </el-card>
        </el-col>
        <!-- 中间问卷展示区域 -->
        <el-col :span="10">
            <el-card shadow="hover" style="margin:5px;">
                <el-form
                    :model="research.fieldsValue"
                    label-position="top"
                    label-width="100px"
                    size="small"
                    :rules="research.rules"
                >
                    <!-- 问卷基础信息 -->
                    <div class="center-basic">
                        <h3>{{ research.title }}</h3>
                        <p>{{ research.desc }}</p>
                    </div>
                    <!-- 问卷字段 -->
                    <div
                        v-for="(item, index) in research.detail"
                        :key="index"
                        :class="[
                            editIndex === index ? 'bg-select' : '',
                            'center-form'
                        ]"
                    >
                        <!-- 控件元素 -->
                        <div style="width:100%;">
                            <el-form-item
                                :label="index + 1 + '、' + item.label"
                                :prop="item.fieldId"
                            >
                                <!--单选框-->
                                <el-radio-group
                                    v-if="item.factor === 'radio'"
                                    v-model="research.fieldsValue[item.fieldId]"
                                    :disabled="editIndex !== index"
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
                                    :disabled="editIndex !== index"
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
                                    :disabled="editIndex !== index"
                                ></el-input>
                                <!-- 多行文本 -->
                                <el-input
                                    v-else-if="item.factor === 'textarea'"
                                    type="textarea"
                                    :rows="item.rows"
                                    :placeholder="item.placeholder"
                                    v-model="research.fieldsValue[item.fieldId]"
                                    :disabled="editIndex !== index"
                                ></el-input>
                                <!-- 下拉选择 -->
                                <el-select
                                    v-else-if="item.factor === 'select'"
                                    v-model="research.fieldsValue[item.fieldId]"
                                    clearable
                                    :placeholder="item.placeholder"
                                    :disabled="editIndex !== index"
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
                                    active-color="#13ce66"
                                    inactive-color="#DCDFE6"
                                    :active-value="item.activeValue"
                                    :inactive-value="item.inactiveValue"
                                    :disabled="editIndex !== index"
                                ></el-switch>
                                <!-- 时间值 -->
                                <el-time-picker
                                    v-else-if="item.factor === 'timePicker'"
                                    v-model="research.fieldsValue[item.fieldId]"
                                    value-format="hh-mm-ss"
                                    :placeholder="item.placeholder"
                                    :disabled="editIndex !== index"
                                ></el-time-picker>
                                <!-- 时间范围 -->
                                <el-time-picker
                                    v-else-if="
                                        item.factor === 'timePickerRange'
                                    "
                                    v-model="research.fieldsValue[item.fieldId]"
                                    value-format="hh-mm-ss"
                                    is-range
                                    range-separator="至"
                                    start-placeholder="开始时间"
                                    end-placeholder="结束时间"
                                    :placeholder="item.placeholder"
                                    :disabled="editIndex !== index"
                                >
                                </el-time-picker>
                                <!-- 日期值 -->
                                <el-date-picker
                                    v-else-if="item.factor === 'datePicker'"
                                    v-model="research.fieldsValue[item.fieldId]"
                                    value-format="yyyy-hh-dd"
                                    :placeholder="item.placeholder"
                                    :disabled="editIndex !== index"
                                ></el-date-picker>
                                <!-- 日期范围 -->
                                <el-date-picker
                                    v-else-if="
                                        item.factor === 'datePickerRange'
                                    "
                                    v-model="research.fieldsValue[item.fieldId]"
                                    value-format="yyyy-hh-dd"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :disabled="editIndex !== index"
                                >
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <!-- 控件编辑选择 -->
                        <div>
                            <el-button
                                type="primary"
                                icon="el-icon-edit"
                                circle
                                @click="setEditIndex(index)"
                            ></el-button>
                        </div>
                    </div>
                    <el-form-item style="text-align:center;">
                        <el-button type="primary" size="medium">
                            {{ research.confirm }}
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-col>
        <!-- 右侧属性设置 -->
        <el-col :span="8">
            <el-card shadow="hover" style="margin:5px;">
                <el-tabs type="card" v-model="activeTabName">
                    <el-tab-pane label="控件属性" name="controlProperties">
                        <el-form
                            v-if="editIndex !== null"
                            label-width="80px"
                            size="small"
                        >
                            <h4 style="padding:10px;text-align:center;">
                                组件基本属性
                            </h4>

                            <el-form-item label="字段id">
                                <el-input
                                    :disabled="true"
                                    v-model="research.detail[editIndex].fieldId"
                                    clearable
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="标题">
                                <el-input
                                    placeholder="请输入标题"
                                    v-model="research.detail[editIndex].label"
                                    clearable
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="默认值">
                                <el-input
                                    :disabled="true"
                                    placeholder="控件内设置默认值"
                                    v-model="defaultValue"
                                    clearable
                                ></el-input>
                            </el-form-item>
                            <!-- 开关不需要 -->
                            <el-form-item
                                v-if="
                                    editFactor === 'text' ||
                                        editFactor === 'textarea' ||
                                        editFactor === 'select'
                                "
                                label="占位提示"
                            >
                                <el-input
                                    placeholder="请输入占位提示"
                                    v-model="
                                        research.detail[editIndex].placeholder
                                    "
                                    clearable
                                ></el-input>
                            </el-form-item>
                            <!-- 扩展配置 -->
                            <h4
                                v-if="
                                    editFactor === 'switch' ||
                                        editFactor === 'textarea'
                                "
                                style="padding:10px;text-align:center;"
                            >
                                扩展配置
                            </h4>
                            <el-form-item
                                v-if="editFactor === 'textarea'"
                                label="行数"
                            >
                                <el-input-number
                                    v-model="research.detail[editIndex].rows"
                                    :min="2"
                                    :max="10"
                                ></el-input-number>
                            </el-form-item>
                            <el-form-item
                                v-if="editFactor === 'switch'"
                                label="开启值"
                            >
                                <el-input
                                    placeholder="请输入开启值"
                                    v-model="
                                        research.detail[editIndex].activeValue
                                    "
                                    clearable
                                ></el-input>
                            </el-form-item>
                            <el-form-item
                                v-if="editFactor === 'switch'"
                                label="关闭值"
                            >
                                <el-input
                                    placeholder="请输入关闭值"
                                    v-model="
                                        research.detail[editIndex].inactiveValue
                                    "
                                    clearable
                                ></el-input>
                            </el-form-item>
                            <div
                                v-if="
                                    editFactor === 'radio' ||
                                        editFactor === 'checkbox' ||
                                        editFactor === 'select'
                                "
                            >
                                <h4 style="padding:10px;text-align:center;">
                                    选项
                                </h4>
                                <div
                                    v-for="(option, index) in research.detail[
                                        editIndex
                                    ].options"
                                    :key="index"
                                    class="options"
                                >
                                    <i class="el-icon-s-operation"></i>
                                    <el-input
                                        placeholder="选项名"
                                        v-model="
                                            research.detail[editIndex].options[
                                                index
                                            ].label
                                        "
                                        size="small"
                                        style="margin:0 5px;"
                                    ></el-input>
                                    <el-input
                                        placeholder="选项值"
                                        v-model="
                                            research.detail[editIndex].options[
                                                index
                                            ].value
                                        "
                                        size="small"
                                        style="margin:0 5px;"
                                    ></el-input>
                                    <el-button
                                        type="danger"
                                        icon="el-icon-delete"
                                        size="mini"
                                        circle
                                        @click="deleteOption(editIndex, index)"
                                    ></el-button>
                                </div>
                                <div class="options">
                                    <el-button
                                        type="text"
                                        icon="el-icon-circle-plus"
                                        @click="addOption(editIndex)"
                                        >添加选项
                                    </el-button>
                                </div>
                            </div>
                            <!-- 开关不需要 -->
                            <div v-if="editFactor !== 'switch'">
                                <h4 style="padding:10px;text-align:center;">
                                    组件验证规则
                                </h4>
                                <el-form-item label="是否必填">
                                    <el-switch
                                        v-model="
                                            research.rules[editFieldId][0]
                                                .required
                                        "
                                    ></el-switch>
                                </el-form-item>
                                <el-form-item label="规则提示">
                                    <el-input
                                        placeholder="输入内容"
                                        v-model="
                                            research.rules[editFieldId][0]
                                                .message
                                        "
                                        clearable
                                    ></el-input>
                                </el-form-item>
                            </div>
                            <h4 style="padding:10px;text-align:center;">
                                更多
                            </h4>
                            <div style="text-align:center;padding:5px;">
                                <el-button
                                    type="danger"
                                    size="medium"
                                    @click="deleteFactor(editIndex)"
                                    >删除组件</el-button
                                >
                            </div>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="基本设置" name="basicSettings">
                        <el-form
                            size="small"
                            :model="research"
                            :rules="basicSettingsRules"
                            ref="basicSettingsRef"
                        >
                            <el-form-item label="调研标题" prop="title">
                                <el-input
                                    placeholder="输入调研标题"
                                    v-model="research.title"
                                    clearable
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="调研描述" prop="desc">
                                <el-input
                                    type="textarea"
                                    :rows="3"
                                    placeholder="请输入调研描述内容"
                                    v-model="research.desc"
                                ></el-input>
                            </el-form-item>
                            <!-- <el-form-item label="是否重复填写">
                                <el-switch
                                    v-model="research.once"
                                    :active-value="1"
                                    :inactive-value="0"
                                >
                                </el-switch>
                            </el-form-item> -->
                            <el-form-item label="调研提交名称" prop="confirm">
                                <el-input
                                    placeholder="如：确定、提交"
                                    v-model="research.confirm"
                                    clearable
                                ></el-input>
                            </el-form-item>

                            <el-form-item style="text-align:center;">
                                <el-button-group>
                                    <el-button
                                        type="primary"
                                        size="medium"
                                        @click="onSubmit('basicSettingsRef')"
                                        >创建</el-button
                                    >
                                    <!-- <el-button type="success" size="medium"
                                        >预览</el-button
                                    > -->
                                </el-button-group>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import { createResearch } from "@/api/research";
import { Message } from "element-ui";

export default {
    data() {
        return {
            fieldCount: 1,
            editIndex: 0,
            editFieldId: "field1",
            editFactor: "text",
            // 调研问卷数据
            research: {
                title: "调研标题",
                desc: "调研描述",
                once: 0,
                confirm: "提交",
                // 调研空间字段
                detail: [
                    {
                        fieldId: "field1",
                        factor: "text",
                        defaultValue: "",
                        label: "标题1",
                        placeholder: "输入内容"
                    }
                ],
                // 字段值
                fieldsValue: {
                    field1: ""
                },
                // 调研验证字段
                rules: {
                    field1: [
                        {
                            required: true,
                            message: "请输入内容",
                            trigger: "blur"
                        }
                    ]
                }
            },
            // 当前tab打开name
            activeTabName: "basicSettings",
            // 基本设置表单验证
            basicSettingsRules: {
                title: [
                    {
                        required: true,
                        message: "请输入调研标题",
                        trigger: "blur"
                    }
                ],
                desc: [
                    {
                        required: true,
                        message: "请输入调研描述",
                        trigger: "blur"
                    }
                ],
                confirm: [
                    {
                        required: true,
                        message: "请输入调研提交名称",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        // 添加控件
        factorAdd(factor) {
            console.log(factor, this.research.detail.length);
            const fieldId = "field" + ++this.fieldCount;
            let factorItem = {
                fieldId: fieldId,
                factor: factor,
                label: "标题" + this.fieldCount
            };
            let ruleItem = [];
            if (factor === "radio") {
                // 单选框
                factorItem.required = true;
                factorItem.options = [
                    {
                        label: "选项1",
                        value: "值1"
                    },
                    {
                        label: "选项2",
                        value: "值2"
                    }
                ];
                ruleItem[0] = {
                    required: true,
                    message: "请选择一个值",
                    trigger: "change"
                };
                this.$set(this.research.fieldsValue, fieldId, "");
            } else if (factor === "checkbox") {
                // 复选框
                factorItem.options = [
                    {
                        label: "选项1",
                        value: "值1"
                    },
                    {
                        label: "选项2",
                        value: "值2"
                    },
                    {
                        label: "选项3",
                        value: "值3"
                    }
                ];
                ruleItem[0] = {
                    type: "array",
                    required: true,
                    message: "请至少选择一个",
                    trigger: "change"
                };
                this.$set(this.research.fieldsValue, fieldId, []);
            } else if (factor === "text") {
                // 单行文本
                factorItem.label = "单行文本";
                factorItem.placeholder = "提示文字";
                ruleItem[0] = {
                    required: true,
                    message: "请输入内容",
                    trigger: "blur"
                };
                this.$set(this.research.fieldsValue, fieldId, "");
            } else if (factor === "textarea") {
                // 多行文本
                factorItem.placeholder = "提示文字";
                factorItem.rows = 2;
                ruleItem[0] = {
                    required: true,
                    message: "请输入内容",
                    trigger: "blur"
                };
                this.$set(this.research.fieldsValue, fieldId, "");
            } else if (factor === "select") {
                // 下拉选择
                factorItem.placeholder = "请选择";
                factorItem.options = [
                    {
                        label: "选项1",
                        value: "值1"
                    },
                    {
                        label: "选项2",
                        value: "值2"
                    },
                    {
                        label: "选项3",
                        value: "值3"
                    }
                ];
                ruleItem[0] = {
                    required: true,
                    message: "请选择一个选项",
                    trigger: "change"
                };
                this.$set(this.research.fieldsValue, fieldId, "");
            } else if (factor === "switch") {
                // 开关
                factorItem.activeValue = "true";
                factorItem.inactiveValue = "false";
                this.$set(this.research.fieldsValue, fieldId, false);
            } else if (factor === "timePicker") {
                ruleItem[0] = {
                    required: true,
                    message: "请选择时间",
                    trigger: "change"
                };
                this.$set(this.research.fieldsValue, fieldId, "");
            } else if (factor === "timePickerRange") {
                ruleItem[0] = {
                    required: true,
                    message: "请选择时间范围",
                    trigger: "change"
                };
                this.$set(this.research.fieldsValue, fieldId, "");
            } else if (factor === "datePicker") {
                ruleItem[0] = {
                    required: true,
                    message: "请选择日期",
                    trigger: "change"
                };
                this.$set(this.research.fieldsValue, fieldId, "");
            } else if (factor === "datePickerRange") {
                ruleItem[0] = {
                    required: true,
                    message: "请选择日期范围",
                    trigger: "change"
                };
                this.$set(this.research.fieldsValue, fieldId, "");
            }
            console.log(factorItem);

            console.log(ruleItem);
            this.research.detail.push(factorItem);
            // 对象数据动态添加
            this.$set(this.research.rules, fieldId, ruleItem);
        },
        // 删除组件
        deleteFactor: function(editIndex) {
            this.research.detail.splice(editIndex, 1);
            this.editIndex = null;
            // 对象数据动态删除
            this.$delete(this.research.rules, this.editFieldId);
        },
        // 设置编辑组件index
        setEditIndex: function(editIndex) {
            console.log(editIndex);
            this.editIndex = editIndex;
            this.editFieldId = this.research.detail[editIndex].fieldId;
            this.editFactor = this.research.detail[editIndex].factor;
            this.activeTabName = "controlProperties";
        },
        // 删除选项
        deleteOption: function(editIndex, index) {
            if (this.research.detail[editIndex].factor === "radio") {
                this.research.detail[editIndex].default_value = "";
            } else if (this.research.detail[editIndex].factor === "checkbox") {
                this.research.detail[editIndex].default_value = [];
            }
            this.research.detail[editIndex].options.splice(index, 1);
        },
        // 添加选项
        addOption: function(editIndex) {
            this.research.detail[editIndex].options.push({
                label: "标题",
                value: "值"
            });
        },
        onSubmit: function(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    createResearch(this.research).then(res => {
                        Message({
                            message: res.message,
                            type: "success",
                            duration: 1000,
                            offset: 200
                        });
                    });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        }
    },
    computed: {
        // 计算属性的 getter
        defaultValue: function() {
            const value = this.research.fieldsValue[this.editFieldId];
            console.log("defaultValue", value);
            if (value instanceof Array) {
                return this.research.fieldsValue[this.editFieldId].join(",");
            }
            return this.research.fieldsValue[this.editFieldId];
        }
    }
};
</script>

<style lang="scss">
* {
    padding: 0;
    margin: 0;
}
// 按钮组
.btns-flex {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    .btns-item {
        width: 48%;
        padding-bottom: 10px;
        .el-button {
            width: 100%;
        }
    }
}
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
// 选中控件
.bg-select {
    background-color: #f2f6fc;
    border-radius: 5px;
}
.center-form {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 5px;
}
// 单选、多选和下拉
.options {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
}
</style>
