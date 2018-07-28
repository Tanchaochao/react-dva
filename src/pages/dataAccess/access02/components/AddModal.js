import React, { PureComponent } from 'react';
import { Modal } from 'antd';
import { connect } from 'dva';
import RefHolder from '../../../../compoents/RefHolder';
import * as service from '../service';
import Form from './Form';


class AddModal extends PureComponent {
  state = {
    visible: false,
    error: null,
  }

  handleOpen = () => {
    this.setState({
      visible: true,
    });
  }

  handleClose = () => {
    this.setState({
      visible: false,
      error: null,
    });
  }

  handleSubmit = (values, actions) => {
    service.addAccessTask(values)
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
      dispatch,
      ...other
    } = this.props;
    const { visible, error } = this.state;
    const item = {
      name: '',
      status: '',
    };
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
          title="新建"
          footer={null}
          visible={visible}
          onCancel={this.handleClose}
          destroyOnClose
        >
          <Form
            onSubmit={this.handleSubmit}
            item={item}
            errorMessage={error}
          />
        </Modal>
      </RefHolder>
    );
  }
}

export default connect()(AddModal);
