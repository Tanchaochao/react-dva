import React, { Component } from 'react';
import { Table, Input, Button } from 'antd';
import { connect } from 'dva';
import { Field } from 'formik';
import withFormItem from '../../compoents/inputs/withFormItem';
import Select from '../../compoents/inputs/Select';
import EditableFormRow from './components/EditableFormRow';
import EditableCell from './components/EditableCell';
import {
  required,
  chain,
} from '../../validators';

const InputFormItem = withFormItem(Input);
const SelectFormItem = withFormItem(Select);

// const toFormikInput = (InputComponent) => {
//   return ({ field }) => {
//     return <InputComponent {...field} />;
//   };
// };
// const InputField = toFormikInput(Input);

class TreeTable extends Component {
  columns = [
    // {
    //   title: 'Name',
    //   dataIndex: 'name',
    //   key: 'name',
    //   field: {
    //     component: InputField,
    //   },
    // },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      field: {
        component: InputFormItem,
        validate: chain(required('请输入任务名')),
      },
    },
    {
      title: '类别',
      dataIndex: 'category',
      key: 'category',
      field: {
        dataIndex: 'categroyId', // input使用的数据
        component: SelectFormItem,
        children: [
          <Select.Option value={1}>aa</Select.Option>,
          <Select.Option value={2}>bb</Select.Option>,
          <Select.Option value={3}>cc</Select.Option>,
        ],
      },
    },
    {
      title: '操作',
      render: (record) => {
        const isEditing = this.isEditing(record);
        return isEditing
          ? (
            <span>
              <Field render={(props) => {
                return <Button onClick={props.form.handleSubmit}>保存</Button>;
              }}
              />
              <Button>取消</Button>
            </span>
          )
          : (
            <Button onClick={this.handleShowEditRow.bind(null, record)}>编辑</Button>
          );
      },
    },
  ];

  handleShowEditRow = (record) => {
    this.props.dispatch({
      type: 'treeTable/showEditRow',
      payload: record.id,
    });
  }

  handleSubmit = (values) => {
    console.log(values);
  }

  isEditing = (record) => {
    return record.id === this.props.editingKey;
  }

  render() {
    const { data } = this.props;
    const columns = this.columns.map((col, index) => {
      const { field, ...other } = col;
      return {
        ...other,
        // 设置单元格属性
        onCell: record => ({
          dataIndex: col.dataIndex,
          field,
          editing: col.field && this.isEditing(record),
          index,
        }),
      };
    });
    return (
      <div>
        <Table
          dataSource={data}
          columns={columns}
          rowKey="id"
          components={{
            body: {
              row: EditableFormRow,
              cell: EditableCell,
            },
          }}
          onRow={record => ({ record, onSubmit: this.handleSubmit })}
        />
      </div>
    );
  }
}

export default connect(({ treeTable: { data, editingKey } }) => {
  return { data, editingKey };
})(TreeTable);
