import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Table,
  Input,
  Row,
  Col,
  Select,
  Icon,
} from 'antd';
import config from '../../../config/common';
import styles from './Access.m.scss';

const { Option } = Select;

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
    searchText: '',
    filters: {
      name: '',
      status: '',
    },
  }

  handleChange = (pagination) => {
    this.setState({
      current: pagination.current,
    }, () => {
      this.fetchList();
    });
  }

  handleSearchChange = (e) => {
    this.setState({
      searchText: e.target.value,
    });
  }

  handleSelectFilterChange = (type, value) => {
    this.changeFilters(type, value, () => {
      this.fetchList();
    });
  }

  handleSearch = () => {
    const { searchText } = this.state;
    this.changeFilters('name', searchText, () => {
      this.fetchList();
    });
  }

  changeFilters = (type, value, cb = () => {}) => {
    const { filters } = this.state;
    this.setState({
      filters: {
        ...filters,
        [type]: value,
      },
    }, () => {
      this.setState({ current: 1 }, () => {
        cb();
      });
    });
  }

  fetchList = () => {
    const { dispatch } = this.props;
    const {
      current,
      pageSize,
      filters,
    } = this.state;
    dispatch({
      type: 'access/fetchList',
      payload: {
        page: current,
        limit: pageSize,
        ...filters,
      },
    });
  }

  render() {
    const { access } = this.props;
    const {
      current,
      pageSize,
      filters,
      searchText,
    } = this.state;
    return (
      <div>
        <Row>
          <Col span={8}><span>状态</span><Select onChange={this.handleSelectFilterChange.bind(null, 'status')} value={filters.status} className={styles.select}><Option value="运行中">运行中</Option><Option value="已停止">已停止</Option></Select></Col>
          <Col span={8}><span>任务名称</span><Input onChange={this.handleSearchChange} value={searchText} className={styles.input} suffix={<Icon type="search" onClick={this.handleSearch} />} /></Col>
        </Row>
        <Table
          rowKey="id"
          dataSource={access.list}
          columns={columns}
          pagination={{ current, pageSize, total: access.total }}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default connect(({ access }) => {
  return {
    access,
  };
})(Access);
