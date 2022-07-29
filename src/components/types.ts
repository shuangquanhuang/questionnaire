import { FormInstance } from 'antd';
import React, { CSSProperties } from 'react';

export type TRuleType = {
  path?: number[];
  id?: string;
  disabled?: boolean;
  field: string;
  operator: string;
  value: any;
  strValue?: string;
};

export type TRuleGroupType = {
  path?: number[];
  id?: string;
  disabled?: boolean;
  combinator: string;
  rules: (TRuleType | TRuleGroupType)[];
  not?: boolean;
};

export const TOperatorType = {
  Equal: '=',
  NotEqual: '!=',
  LessThan: '<',
  GregerThan: '>',
  LessEqual: '<=',
  GreaterEqual: '>=',
  Contains: 'contains',
  BeginWith: 'begin-with',
  EndsWidth: 'ends-with',
  DoesNotContain: 'does-not-contain',
  DoesNotBeginWith: 'does-not-begin-with',
  DoesNotEndWith: 'does-not-end-with',
  IsNull: 'is-null',
  IsNotNull: 'is-not-null',
  IsBlank: 'is-blank',
  IsNotBlank: 'is-not-blank',
  In: 'in',
  NotIn: 'not-in',
  Between: 'between',
  NotBetween: 'not-between',
};

export const TQuestionType = {
  AutoComplete: 'auto-complete',
  Button: 'button',
  Checkbox: 'checkbox',
  DatePicker: 'date-picker',
  DateRangePicker: 'date-range-picker',
  Input: 'input',
  InputNumber: 'input-number',
  Radio: 'radio',
  Rate: 'rate',
  SingleSelect: 'single-select',
  MultiSelect: 'multi-select',
  Slider: 'slider',
  Switch: 'switch',
  Text: 'text',
  TimePicker: 'time-picker',
  TimeRangePicker: 'time-range-picker',
};

export const TQuestionLogicType = {
  AND: 'AND',
  OR: 'OR',
};

export type TOptionType = {
  label: string;
  value: string;
  name: string;
};

export enum TQuestionAnswerCorrectness {
  CORRECT = 'correct',
  INCORRECT = 'incorrect',
  UNKNOWN = 'unknown',
}

export type TQuestionAnswerValue = {
  // the value showed in the render
  value?: string | null;
  valueArray?: string[];
  // it's anything you want
  rawValue?: any;
  correctness?: TQuestionAnswerCorrectness;
  [key: string]: any;
};

export type TQuestionDependency = {
  field: string;
  value: string;
  rules: TRuleGroupType;
};

export type TQuestionItem = {
  id: string;
  /**
   * an type to tell render how to render the question,
   * for example, if it's raio, the render will render it as AntD Radio by default
   */
  type: string;
  /**
   * tags, multiple, etc
   */
  mode?: string;
  /**
   * The question you want to ask
   */
  title?: string;
  /**
   * parsed from rawOptions, may be null
   */
  options?: string[];
  /**
   * When use customized OptionsRender in QuestionnaireBuilder, it's the allValues of onValueChanges(changedValues, allValues),
   * Will leave yourself to handle it in QuestionnaireRender
   */
  rawOptions?: any;
  /**
   * TODO: not used for now
   */
  style?: string;
  /**
   * is this question required?
   */
  required?: boolean;
  /**
   * show requiredMark "*" on the required question title
   */
  requiredMark?: boolean;
  /**
   * show : after question
   */
  colon?: boolean;
  /**
   * is this question visible?
   */
  visible?: boolean;
  /**
   * is this question disabled?
   */
  disabled?: boolean;
  /**
   * answer of this question
   */
  answer?: TQuestionAnswerValue;
  /**
   * TODO: allow user to mannually input
   */
  mannual?: boolean;
  /**
   * TODO: not used for now
   */
  component?: string;
  /**
   * logic rules to judge whether to show it or not
   */
  visibleRules?: TRuleGroupType;
  /**
   * logic rules to judge whether to disable it or not
   */
  disabledRules?: TRuleGroupType;
  /**
   * TODO: not impleted for now
   */
  extraRules?: TQuestionDependency[];
  /**
   * any extra settings you want to put in the schema, will used by your own question render.
   */
  extraSettings?: any;
  /**
   * any extra setting comes from the customized title extra setting renders.
   */
  headAreaExtraSettings?: any;
};

export type TQuestionAnswer = {
  id: string;
  title?: string;
  type?: string;
  value?: TQuestionAnswerValue;
};

export type TQuestionAnswerMap = {
  [id: string]: TQuestionAnswerValue;
};

export interface TQuestionOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export type TFormNamtPathItem = string | number;

export type TFormField = {
  name: TFormNamtPathItem | TFormNamtPathItem[];
  key: TFormNamtPathItem | TFormNamtPathItem[];
};

export type TQuestionInputField = TFormField;

/**
 * props provided to each question item render in the QuestionnaireRender
 */
export type TQuestionInputProps = {
  id: string | number;
  defaultValue?: string;
  disabled?: boolean;
  field: TQuestionInputField;
  form?: FormInstance;
  /**
   * style for the input component
   */
  inputStyle?: CSSProperties;
  isCalibration?: boolean;
  key?: string;
  options?: TQuestionOption[];
  question?: TQuestionItem;
  /**
   * When use customized OptionsRender in QuestionnaireBuilder, it's the allValues of onValueChanges(changedValues, allValues),
   * Will leave yourself to handle it in QuestionnaireRender
   */
  rawOptions?: string;
  required?: boolean;
  requiredMark?: boolean;
  showQuestionId?: boolean;
  title?: string;
  titleRender?: TQuestionTitleRender;
  titleStyle?: any;
  colon?: boolean;
  type?: string;
  value?: TQuestionAnswerValue;
  // follow antd's doc, do not use onChange
  onValuesChange: (value: any, allValues: any) => void;
  onFocusIn?: () => void;
  onFocusOut?: () => void;
  [x: string | number | symbol]: any;
};

/**
 * props provided to each item on the QuestionnaireBuilder
 */
export type TQuestionnaireBuilderSettingProps = {
  /**
   * question id
   */
  id: string | number;
  defaultValue?: string;
  disabled?: boolean;
  field: TQuestionInputField;
  form: FormInstance;
  /**
   * all questions in the builder
   */
  questions: TQuestionItem[];

  /**
   * current question in the builder
   */
  question: TQuestionItem;

  /**
   * value get from the form for the customized setting render
   */
  value: any;
  // follow antd's doc, do not use onChange
  onValuesChange: (value: any, allValues: any) => void;
  [x: string | number | symbol]: any;
};

/**
 * the interface implemented by QuestionnaireRender
 */
export interface TQuestionnaireRenderHandle {
  validate: () => void;
  getValues: () => Promise<any>;
  submit: () => Promise<TQuestionAnswer[]>;
  getVisibleQuestions: () => TQuestionItem[];
  getQuestions: () => TQuestionItem[];
}

/**
 * the interface should be implemented in customized question item render
 */
export interface TQuestionItemRenderHanle {
  validate: () => void;
  getValues: () => Promise<any>;
}

/**
 * the interface implemented by QuestionnaireBuilder
 */
export interface TQuestionnaireBuilderHandle {
  handleSave: (validate?: boolean) => Promise<TQuestionnaireSchema>;
  submit: () => Promise<TQuestionnaireSchema>;
  getValues: () => TQuestionnaireSchema;
  validate: () => void;
}

/**
 * the interface implemented by QuestionnaireBuilderGroupItem
 */
export interface TQuestionnaireGroupItemBuidlerHandle {
  handleSave: (validate?: boolean) => Promise<TQuestionnaireGroupSchemaItem>;
  submit: () => Promise<TQuestionnaireGroupSchemaItem>;
  getValues: () => Promise<TQuestionnaireGroupSchemaItem>;
  validate: () => void;
}

/**
 * the interface implemented by QuestionnaireGroupBuilder
 */
export interface TQuestionnaireGroupBuidlerHandle {
  handleSave: (validate?: boolean) => Promise<TQuestionnaireGroupSchema>;
  submit: () => Promise<TQuestionnaireGroupSchema>;
  getValues: () => Promise<TQuestionnaireGroupSchema>;
  validate: () => void;
}

/**
 * the interface impletementd by customized options selector which is used to select options in QuestionnaireBuilder
 */
export interface TQuestionnaireBuidlerSettingRenderHandle {
  validate: () => void;
  getValues: () => any;
  // submit: () => any;
}

export type TOperation = (left: string, right: string) => boolean;

export type TQuestionnaireBuilderOperationValueInputComponentProps = {
  value?: any;
  options?: any;
  disabled?: any;
  onChange?: (value: any) => void;
  [key: string]: any;
};

export type TQuestionnaireBuidlerOperationValueInputComponent =
  | React.Component<TQuestionnaireBuilderOperationValueInputComponentProps>
  | ((props: TQuestionnaireBuilderOperationValueInputComponentProps) => JSX.Element);

/**
 * customized render for single question item in the QuestionnaireRender
 */
export type TQuestionItemRenderComponent = React.ForwardRefExoticComponent<
  Pick<TQuestionInputProps, keyof TQuestionInputProps> & React.RefAttributes<TQuestionItemRenderHanle>
>;

/**
 * customized render for filling "Options" if the QuestionnaireBuilder
 */
export type TQuestionnaireBuilderSettingRenderComponent = React.ForwardRefExoticComponent<
  Pick<TQuestionnaireBuilderSettingProps, keyof TQuestionnaireBuilderSettingProps> &
    React.RefAttributes<TQuestionnaireBuidlerSettingRenderHandle>
>;

export type TField = { name: string; fieldKey: string };

export type TBuilderComponentProps = { field: TField };

export type TBuilderComponent =
  | React.FunctionComponent<TBuilderComponentProps>
  | React.ComponentClass<TBuilderComponentProps>;

export type TQuestionTitleRender = ({ id, title }: { id?: string | number; title?: string }) => any;

export interface TLabelValuePair {
  label: string;
  value: string;
  [x: string]: any;
}

export interface TQuestionnaireBuilderComponentNameValuePair {
  label?: string;
  value: string;
  render?: TQuestionnaireBuilderSettingRenderComponent | null;
  renderProps?: any;
  noOptionsNeed?: boolean;
  defaultOptions?: string;
  mode?: string;
}

export interface TQuestionItemComponentNameValuePair {
  label?: string;
  value: string;
  render?: TQuestionItemRenderComponent | null;
  renderProps?: any;
  mode?: 'tags' | 'multiple';
}

export interface TOperationNameValuePair {
  label?: string;
  value: string;
  operation?: TOperation;
}

export interface TRenderCalibrationOptions {
  noHeader?: boolean;
  title?: string;
}

export enum TConditionSettingType {
  DisplayWhen = 0,
  DisableWhen = 1,
}

export const TConditionSettingTypeValues: TConditionSettingType[] = Object.values(TConditionSettingType)
  .filter((v) => !Number.isNaN(Number(v)))
  .map((v) => v as TConditionSettingType);

export type TConditionSettingOption = {
  type: TConditionSettingType;
  label: string;
};

export enum TConditionBuilderType {
  Basic = 'basic',
  ReactQueryBuider = 'query',
  LogicCombinationBuilder = 'logic',
}

export interface TAdvanceOption {
  conditionOptions?: TConditionSettingOption[];
  conditionBuiderType?: TConditionBuilderType;
}

export enum TOperationValueType {
  SingleItem,
  MultiItem,
  None,
}

export type TOperatorValueRender = ({ value, options }: { value?: any; options?: any[] }) => any;
export interface TOperator {
  name?: string;
  label: string;
  value: string;
  valueType?: TOperationValueType;
  render?: any;
  noValue?: boolean;
  // TODO: add validator
  validator?: () => void;
  [x: string]: any;
}

export interface TRuleProps {
  showNotToggle?: boolean;
  showCloneButtons?: boolean;
  onlyShowQuestionId?: boolean;
  addConditionText?: string;
  maxNum?: number;
  warnTip?: string;
  operators?: TOperator[];
  advanceOption?: TAdvanceOption;
  disableCyleCheck?: boolean;
}

export enum TQuestionFormCorrectness {
  ALL_CORRECT = 'all_correct',
  ALL_INCORRECT = 'all_incorrect',
  UNKNOWN = 'unknown',
}

export type TQuestionnaireBuilderProps = {
  /**
   * 指定问题类型，会展示在Question Type:右边
   * @default [{ label: "Radio", value: "radio"}, { label: "Checkbox", value: "checkbox" }, { label: "Text", value: "text", noOptionsNeed: true }]
   */
  questionTypes?: TQuestionnaireBuilderComponentNameValuePair[];
  /**
   * 高级选项，用于设定条件表达式。比如在满足条件的情况下展示问题
   */
  ruleProps?: TRuleProps;
  /**
   * 选项的分隔符，默认
   * @default ,或者;
   */
  optionSpliter?: string;

  /**
   * 问题的Title是否必须
   */
  titleRequired?: boolean;

  /**
   * 自定义的问题Title校验
   * @default 会校验title是必填项
   */
  questionTitleValidator?: (rule: any, value: string) => void;

  /**
   * title右边的额外设置项
   */
  headAreaExtraSettingBuilder?: TQuestionnaireBuilderSettingRenderComponent;

  /**
   * 自定义的额外设置选项面板的选项
   */
  extraSettingOptions?: {
    topLevel?: boolean;
    title?: string;
  };

  /**
   * 自定义的额外设置选项面板
   */
  extraSettingBuilder?: TQuestionnaireBuilderSettingRenderComponent;

  /**
   * 想传给extraSettingBuilder的属性
   */
  extraSettingBuilderProps?: any;

  /**
   *
   */
  validator?: (questions: TQuestionItem[]) => boolean;
};

export type TQuestionnaireSchema = {
  /**
   * 问题列表
   */
  questions?: TQuestionItem[];

  /**
   * builder Props
   */
  builderProps?: TQuestionnaireBuilderProps;

  /**
   * should be 'single'
   */
  type?: TQuestionnaireSchemaType;

  /**
   * extra fields
   */
  [key: string]: any;
};

export enum TQuestionnaireSchemaType {
  SINGLE = 'single',
  GROUP = 'group',
}

export type TQuestionnaireGroupSchemaItem = {
  name?: string;
  description?: string;
  schema?: TQuestionnaireSchema;
};

export type TQuestionnaireGroupSchema = {
  groups: TQuestionnaireGroupSchemaItem[];
  /**
   * should be 'group'
   */
  type?: TQuestionnaireSchemaType;
};

export type TOperatorValueTypeBetween = {
  left: number;
  right: number;
};

export const QuestionFormRootFieldName = 'questions';
