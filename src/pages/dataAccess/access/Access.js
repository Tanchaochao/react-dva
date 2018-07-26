import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table } from 'antd';
import config from '../../../config/common';

const columns = [
  {
    title: 'id',
    dataIndex: 'id',
  },
  {
    title: '任务名称',
    dataIndex: 'name',
  },
  {
    title: '创建时间',
    dataIndex: 'createDate',
    render(text) {
      return text.replace(/-/g, '/');
    },
  },
  {
    title: '警告数量',
    dataIndex: 'warningCount',
  },
  {
    title: '状态',
    dataIndex: 'status',
  },
];

class Access extends PureComponent {
  state = {
    current: 1,
    pageSize: config.pageSize,
  }

  handleChange = (pagination) => {
    this.setState({
      current: pagination.current,
    }, () => {
      this.fetchList();
    });
  }

  fetchList = () => {
    const { dispatch } = this.props;
    const {
      current,
      pageSize,
    } = this.state;
    dispatch({
      type: 'access/fetchList',
      payload: {
        page: current,
        limit: pageSize,
      },
    });
  }

  render() {
    const { access } = this.props;
    const { current, pageSize } = this.state;
    return (
      <Table
        dataSource={access.list}
        columns={columns}
        pagination={{ current, pageSize, total: access.total }}
        onChange={this.handleChange}
      />
    );
  }
}

export default connect(({ access }) => {
  return {
    access,
  };
})(Access);
