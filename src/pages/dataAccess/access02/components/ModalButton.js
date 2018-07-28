import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import RefHolder from '../../../../compoents/RefHolder';

class ModalButton extends PureComponent {
  render() {
    const {
      children,
      ModalProps,
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
        <Modal {...ModalProps} visible={visible} />
      </RefHolder>
    );
  }
}

ModalButton.propTypes = {
  children: PropTypes.node.isRequired,
  ModalProps: Modal.propTypes,
};

export default ModalButton;
