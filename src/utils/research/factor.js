/**
 * 此文件存放问题类型和校验规则
 */
export const factorItems = {
  // 短文本
  text: {
    factor: "text",
    label: "短文本",
    placeholder: "提示文字",
  },
  // 长文本
  textarea: {
    factor: "textarea",
    label: "长文本",
    placeholder: "提示文字",
    rows: 3,
  },
  // 单选
  radio: {
    factor: "radio",
    label: "单选",
    options: [
      { label: "选项1", value: "值1" },
      { label: "选项2", value: "值2" },
    ],
  },
  // 多选
  checkbox: {
    factor: "checkbox",
    label: "多选",
    options: [
      { label: "选项1", value: "值1" },
      { label: "选项2", value: "值2" },
    ],
  },
  // 下拉选择
  select: {
    factor: "select",
    label: "下拉选择",
    options: [
      { label: "选项1", value: "值1" },
      { label: "选项2", value: "值2" },
    ],
  },
  // 时间选择
  timePicker: {
    factor: "timePicker",
    label: "时间选择",
  },
  // 日期选择
  datePicker: {
    factor: "datePicker",
    label: "日期选择",
  },
};

export const factorRules = {
  text: [
    {
      required: true,
      message: "请输入内容",
      trigger: "blur",
    },
  ],
  textarea: [
    {
      required: true,
      message: "请输入内容",
      trigger: "blur",
    },
  ],
  radio: [
    {
      required: true,
      message: "请选择一个值",
      trigger: "change",
    },
  ],
  checkbox: [
    {
      required: true,
      message: "请选择一个值",
      trigger: "change",
    },
  ],
  select: [
    {
      required: true,
      message: "请选择一个值",
      trigger: "change",
    },
  ],
  timePicker: [
    {
      required: true,
      message: "请选择时间",
      trigger: "change",
    },
  ],
  datePicker: [
    {
      required: true,
      message: "请选择日期",
      trigger: "change",
    },
  ],
};

export const factorValues = {
  text: "",
  textarea: "",
  radio: "",
  checkbox: [],
  select: "",
  timePicker: "",
  datePicker: "",
};

export const research = {
  title: "问卷标题",
  description:
    "同学你好，看到这个问卷说明你收到了我们的低电量推送提醒，目前为测试阶段，您的宝贵意见将是我们进步的动力，感谢对微生活的关注和支持，相信在我们共同努力下能够一起度过美好的时光，祝学业有成，加油！",
  config: {
    size: "medium",
    labelPosition: "top",
    labelWidth: "100px",
  },
  items: [
    {
      fieldID: "field7762c89-2d78-4447-b1b4-19f902149cbb",
      factor: "radio",
      label: "单选",
      options: [
        { label: "选项1", value: "1" },
        { label: "选项2", value: "2" },
      ],
      rules: [{ required: true, message: "请选择一个值", trigger: "change" }],
    },
    {
      fieldID: "field7cb5873f-697e-4c46-87b6-156d0a368553",
      factor: "text",
      label: "短文本",
      placeholder: "请输入内容",
      rules: [{ required: true, message: "请输入内容", trigger: "blur" }],
    },
    {
      fieldID: "fieldc0a35eac-ccee-4705-bb3e-729bc6afb657",
      factor: "checkbox",
      label: "多选",
      options: [
        { label: "选项1", value: "1" },
        { label: "选项2", value: "2" },
      ],
      rules: [{ required: true, message: "请选择一个值", trigger: "change" }],
    },
  ],
  values: {
    "field7762c89-2d78-4447-b1b4-19f902149cbb": "",
    "field7cb5873f-697e-4c46-87b6-156d0a368553": "",
    "fieldc0a35eac-ccee-4705-bb3e-729bc6afb657": [],
  },
  once: 0,
  open: 0,
  startAt: new Date(),
  endAt: new Date(),
  access: [],
};
