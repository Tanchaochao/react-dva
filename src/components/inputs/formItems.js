import { Input } from 'antd';
import withFormItem from './utils/withFormItem';

import Select from './Select';

export const InputFormItem = withFormItem(Input);
export const SelectFormItem = withFormItem(Select);
export const TextAreaFormItem = withFormItem(Input.TextArea);
