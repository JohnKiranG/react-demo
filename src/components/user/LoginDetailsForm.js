import React from 'react';
import {
  Form, Input, Switch, Card,
} from 'antd';
import PropTypes from 'prop-types';
import '../../index.less';

const FormItem = Form.Item;

class LoginDetails extends React.Component {
  state = {};

  componentDidMount() {
    this.setFields();
  }

  componentDidUpdate(prevProps) {
    const { logInDetails } = this.props;
    if (JSON.stringify(prevProps.logInDetails) !== JSON.stringify(logInDetails)) {
      this.setFields();
    }
  }

  setFields = () => {
    const { form, logInDetails } = this.props;
    form.setFields({
      'user.userName': {
        value: logInDetails.userName,
      },
      'user.loginPassword': {
        value: logInDetails.loginPassword,
      },
      confirm: {
        value: logInDetails.loginPassword,
      },
      'user.2faEnabled': {
        value: logInDetails.is2faEnabled,
      },
    });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('user.loginPassword')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    const { confirmDirty } = this.state;
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render() {
    const { form: { getFieldDecorator }, loading } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
    };
    return (
      <Card loading = {loading} bordered = { false}>
        <FormItem {...formItemLayout} label = "User Name">
          {getFieldDecorator('user.userName', {
            rules: [
              {
                required: true,
                message: 'Please enter user Name',
                whitespace: true,
              },
            ],
          })(<Input placeholder="Enter login ID" />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Password"
        >
          {getFieldDecorator('user.loginPassword', {
            rules: [{
              required: true, message: 'Please enter password!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" placeholder="Enter password"/>,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Confirm Password"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" placeholder="Confirm password" onBlur={this.handleConfirmBlur} />,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Two Factor Authentication"
        >
          {getFieldDecorator('user.2faEnabled', { valuePropName: 'checked' })(
            <Switch/>,
          )}
        </FormItem>
      </Card>
    );
  }
}
LoginDetails.defaultProps = {
  logInDetails: {},
  loading: false,
};
LoginDetails.propTypes = {
  form: PropTypes.instanceOf(Object).isRequired,
  logInDetails: PropTypes.instanceOf(Object),
  loading: PropTypes.bool,
};
const LoginDetailsFrom = Form.create()(LoginDetails);
export default LoginDetailsFrom;
