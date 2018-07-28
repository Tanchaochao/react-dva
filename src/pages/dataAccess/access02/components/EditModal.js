import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Modal } from 'antd';
import RefHolder from '../../../../compoents/RefHolder';
import * as service from '../service';
import Form from './Form';


class EditModal extends PureComponent {
  state = {
    visible: false,
    error: null,
  }

  handleOpen = () => {
    const { dispatch, id } = this.props;
    dispatch({
      type: 'access02Item/fetch',
      payload: id,
    });
    this.setState({
      visible: true,
    });
  }

  handleClose = () => {
    this.setState({
      visible: false,
    });
  }

  handleSubmit = (values, actions) => {
    service.eidtAccessTask(values.id, values)
      .then((result) => {
        if (result.code === 0) {
          this.props.dispatch({
            type: 'access02List/fetchList',
          });
          this.handleClose();
        } else {
          this.setState({
            error: result.msg,
          });
        }
      })
      .finally(() => {
        actions.setSubmitting(false);
      });
  }

  render() {
    const {
      children,
      id,
      item,
      fetchLoading,
      dispatch,
      ...other
    } = this.props;
    const { visible, error } = this.state;
    return (
      <RefHolder>
        {React.cloneElement(children, {
          ...other,
          onClick: (e) => {
            const { onClick } = children.props;
            this.handleOpen();
            onClick && onClick(e);
          },
        })}
        <Modal
          title="编辑"
          footer={null}
          visible={visible}
          onCancel={this.handleClose}
          destroyOnClose
        >
          <Form onSubmit={this.handleSubmit} error={error} item={item} loading={fetchLoading} />
        </Modal>
      </RefHolder>
    );
  }
}

export default connect(({ access02Item, loading }) => {
  const { item } = access02Item;
  return {
    item,
    fetchLoading: loading.effects['access02Item/fetch'],
  };
})(EditModal);
