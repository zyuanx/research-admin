<template>
    <el-row style="min-width:1000px;">
        <!-- 左侧控件选择区 -->
        <el-col :span="6">
            <control-selection @factor-add="factorAdd"></control-selection>
        </el-col>
        <!-- 中间问卷展示区域 -->
        <el-col :span="10">
            <middle-preview
                v-model="research"
                @set-edit-index="setEditIndex"
            ></middle-preview>
        </el-col>
        <!-- 右侧属性设置 -->
        <el-col :span="8">
            <attribute-setting
                v-model="research"
                :editIndex="editIndex"
                :editFactor="editFactor"
                :editFieldId="editFieldId"
            >
            </attribute-setting>
        </el-col>
    </el-row>
</template>

<script>
import ControlSelection from "@/views/research/components/ControlSelection.vue";
import MiddlePreview from "@/views/research/components/MiddlePreview.vue";
import AttributeSetting from "@/views/research/components/AttributeSetting.vue";

export default {
    components: {
        ControlSelection,
        MiddlePreview,
        AttributeSetting
    },
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
        // 设置编辑组件index
        setEditIndex(editIndex) {
            this.editIndex = editIndex;
            this.editFieldId = this.research.detail[editIndex].fieldId;
            this.editFactor = this.research.detail[editIndex].factor;
            this.activeTabName = "controlProperties";
        }
    }
};
</script>

<style lang="scss">
* {
    padding: 0;
    margin: 0;
}
</style>
