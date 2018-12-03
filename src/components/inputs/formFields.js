import { Input } from 'antd';
import withFormikField from './utils/withFormikField';
import Select from './Select';

export const InputField = withFormikField(Input);

export const SelectField = withFormikField(Select);
