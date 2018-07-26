import React, { PureComponent } from 'react';
import classnames from 'classnames';
import ecc from 'eosjs-ecc';
import {
  Input,
  Button,
} from 'antd';
import './EosKeyInput.css';


class EosKeyInput extends PureComponent {
  state = {
    key: null,
    loading: false,
  }

  handleGenerateKey = () => {
    this.setState({
      loading: true,
    });
    ecc.randomKey().then((privateKey) => {
      const key = {
        private: privateKey, // wif
        public: ecc.privateToPublic(privateKey), // EOSkey...
      };

      this.setState({ key, loading: false });
      this.props.onChange({
        target: {
          value: key.public,
          // https://github.com/jaredpalmer/formik#handlechange-e-reactchangeeventany--void
          // formik onChange方法 是根据input元素的name或id来区分字段的, 所以需要指定
          name: this.props.name,
        },
      });
    });
  }

  handleChange = (e) => {
    if (this.state.key) {
      this.setState({
        key: null,
      });
    }
    this.props.onChange(e);
  }

  render() {
    const {
      className: classNameProp,
      value,
      ...other
    } = this.props;
    const {
      key,
      loading,
    } = this.state;
    return (
      <div className={classnames('eoskey-input', classNameProp)}>
        <Input disabled={loading} {...other} value={value} onChange={this.handleChange} />
        <Button disabled={loading} loading={loading} className="eoskey-input-btn" onClick={this.handleGenerateKey}>点我生成</Button>
        {key && (
          <div className="private-key-info">请妥善保存private key: {key.private}</div>
        )}
      </div>
    );
  }
}

export default EosKeyInput;
