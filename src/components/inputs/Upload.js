import React, { Component } from 'react';
import classnames from 'classnames';
import { Button, Icon } from 'antd';
import RefHolder from '@/compoents/RefHolder';
import * as fileService from '@/services/file';
import './Upload.scss';

const STATUS = {
  pending: 0, // 未选择
  success: 1, // 上传成功
  fail: 2, // 上传失败
};

class Upload extends Component {
  state = {
    fileName: '',
    loading: false,
    status: STATUS.pending,
  }

  triggerChange = (value) => {
    const { name, onChange } = this.props;
    onChange({
      target: {
        value,
        name,
      },
    });
  }

  handleClick = () => {
    this.fileNode.click();
  }

  handleChange = (e) => {
    // eslint-disable-next-line no-undef
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append('file', file);
    this.setState({
      loading: true,
      fileName: file.name,
    });
    fileService.create(formData)
      .then((data) => {
        this.setState({
          loading: false,
          status: STATUS.success,
        });
        this.triggerChange(data.fileID);
      })
      .catch(() => {
        this.setState({
          loading: false,
          status: STATUS.fail,
        });
        this.triggerChange('');
      });
  }

  render() {
    const {
      children,
      className: classNameProp,
      onBlur,
      onChange,
      name,
      accept,
      ...other
    } = this.props;
    const {
      status,
      loading,
      fileName,
    } = this.state;
    return (
      <RefHolder>
        {React.cloneElement(children, {
          ...other,
          className: classnames('upload', classNameProp),
          onClick: (e) => {
            const { onClick } = children.props;
            this.handleClick();
            onClick && onClick(e);
          },
        })}
        <input
          accept={accept}
          type="file"
          style={{ display: 'none' }}
          ref={node => this.fileNode = node}
          onChange={this.handleChange}
        />
        {loading && <Icon type="loading" style={{ fontSize: 24 }} spin />}
        {fileName && (
          <span
            className={classnames('upload-filename', {
              error: status === STATUS.fail,
              success: status === STATUS.success,
            })}
          >
            {fileName}
          </span>
        )}
      </RefHolder>
    );
  }
}

export default (props) => {
  return (
    <Upload {...props}>
      <Button>上传文件</Button>
    </Upload>
  );
};
