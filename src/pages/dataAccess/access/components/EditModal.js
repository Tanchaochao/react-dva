import React, { PureComponent } from 'react';
import { Modal } from 'antd';
import RefHolder from '../../../../compoents/RefHolder';

export default class extends PureComponent {
  state = {
    visible: false,
  }

  handleOpen = () => {
    this.setState({
      visible: true,
    });
  }

  handleClose = () => {
    this.setState({
      visible: false,
    });
  }

  render() {
    const {
      children,
      id,
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
          visible={visible}
          onCancel={this.handleClose}
        >
          编辑
        </Modal>
      </RefHolder>
    );
  }
}
