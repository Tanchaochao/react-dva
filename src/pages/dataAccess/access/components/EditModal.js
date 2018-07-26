import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Modal } from 'antd';
import RefHolder from '../../../../compoents/RefHolder';
import Form from './Form';

class EditModal extends PureComponent {
  state = {
    visible: false,
  }

  handleOpen = () => {
    const { dispatch, id } = this.props;
    dispatch({
      type: 'access/fetchItem',
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
    console.log(values);
    actions.setSubmitting(false);
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
    const { visible } = this.state;
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
          <Form onSubmit={this.handleSubmit} item={item} loading={fetchLoading} />
        </Modal>
      </RefHolder>
    );
  }
}

export default connect(({ access, loading }) => {
  const { item } = access;
  return {
    item,
    fetchLoading: loading.effects['access/fetchItem'],
  };
})(EditModal);
