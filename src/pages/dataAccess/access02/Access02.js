import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Table,
  Input,
  Row,
  Col,
  Select,
  Icon,
  Button,
} from 'antd';
import EditModal from './components/EditModal';
import styles from './Access02.m.scss';

const { Option } = Select;

class Access02 extends PureComponent {
  constructor(props) {
    super(props);
    this.columns = [
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
      {
        title: '操作',
        render: (_, record) => {
          return (
            <EditModal id={record.id}>
              <Button>编辑</Button>
            </EditModal>
          );
        },
      },
    ];
    this.state = {
      searchText: '',
    };
  }


  handlePageChange = (pagination) => {
    this.props.dispatch({
      type: 'access02List/changePage',
      payload: pagination.current,
    });
  }

  handleSearchChange = (e) => {
    this.setState({
      searchText: e.target.value,
    });
  }

  handleFitlerChange = (type, value) => {
    this.props.dispatch({
      type: 'access02List/changeFilter',
      payload: { [type]: value },
    });
  }

  handleSearch = () => {
    const { searchText } = this.state;
    this.props.dispatch({
      type: 'access02List/changeFilter',
      payload: { name: searchText },
    });
  }

  render() {
    const { listState } = this.props;
    const {
      searchText,
    } = this.state;
    return (
      <div>
        <Row>
          <Col span={8}><span>状态</span><Select onChange={this.handleFitlerChange.bind(null, 'status')} value={listState.filters.status} className={styles.select}><Option value="运行中">运行中</Option><Option value="已停止">已停止</Option></Select></Col>
          <Col span={8}><span>任务名称</span><Input onChange={this.handleSearchChange} value={searchText} className={styles.input} suffix={<Icon type="search" onClick={this.handleSearch} />} /></Col>
        </Row>
        <Table
          rowKey="id"
          dataSource={listState.list}
          columns={this.columns}
          pagination={{
            current: listState.page,
            pageSize: listState.pageSize,
            total: listState.total,
          }}
          onChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default connect(({ access02List: listState }) => {
  return {
    listState,
  };
})(Access02);
