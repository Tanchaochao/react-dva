import { Select } from 'antd';
import withInput from './utils/withInput';

const SelectC = withInput(Select);
SelectC.Option = Select.Option;
export default SelectC;
