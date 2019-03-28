import React from 'react';
import {
  Form, Input, Card,
} from 'antd';
import PropTypes from 'prop-types';
import '../../index.less';

const FormItem = Form.Item;
class UserDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setFields();
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;
    if (JSON.stringify(prevProps.user) !== JSON.stringify(user)) {
      this.setFields();
    }
  }

  setFields = () => {
    const { form, user } = this.props;
    form.setFields({
      'user.firstName': {
        value: user.firstName,
      },
      'user.middleName': {
        value: user.middleName,
      },
      'user.lastName': {
        value: user.lastName,
      },
      'user.title': {
        value: user.title,
      },
      'user.email': {
        value: user.email,
      },
    });
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
          <FormItem {...formItemLayout} label = "First Name">
          {getFieldDecorator('user.firstName', {
            rules: [
              {
                required: true,
                message: 'Please enter first name!',
                whitespace: true,
              },
            ],
          })(<Input placeholder="Enter first name" />)}
        </FormItem>
        <FormItem {...formItemLayout} label = "Middle Name">
          {getFieldDecorator('user.middleName', {
          })(<Input placeholder="Enter middle name" />)}
        </FormItem>
        <FormItem {...formItemLayout} label = "Last Name">
          {getFieldDecorator('user.lastName', {
            rules: [
              {
                required: true,
                message: 'Please enter last name!',
                whitespace: true,
              },
            ],
          })(<Input placeholder="Enter last name" />)}
        </FormItem>
        <FormItem {...formItemLayout} label = "Title">
          {getFieldDecorator('user.title', {
            rules: [
              {
                required: true,
                message: 'Please enter title of the user!',
                whitespace: true,
              },
            ],
          })(<Input placeholder="Enter title of the user" />)}
        </FormItem>
        <FormItem {...formItemLayout} label = "Email">
          {getFieldDecorator('user.email', {
            rules: [
              {
                required: true,
                message: 'Please enter valid email!',
                whitespace: true,
                type: 'email',
              },
            ],
          })(<Input placeholder="Enter Email of the user" />)}
        </FormItem>
      </Card>
    );
  }
}

UserDetails.defaultProps = {
  user: {},
  loading: false,
};
UserDetails.propTypes = {
  form: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.instanceOf(Object),
  loading: PropTypes.bool,
};
const UserDetailsFrom = Form.create()(UserDetails);
export default UserDetailsFrom;
