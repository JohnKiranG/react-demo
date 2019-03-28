import React from 'react';
import {
  Form, Input, Select, Card, Spin,
} from 'antd';
import PropTypes from 'prop-types';
import api from '../../utils/api';
import '../../index.less';

const { Option } = Select;
const FormItem = Form.Item;
const { TextArea } = Input;
class CreateRoleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
      clientType: [],
    };
  }

  async componentDidMount() {
    this.setState(prevState => ({ ...prevState, loading: true }));
    const { isLicensee, userOrgType } = this.props;
    if (isLicensee) {
      try {
        const res = await api.get('clientType/names');
        this.setState(prevState => ({
          ...prevState,
          fetching: false,
          clientType: res.data,
        }));
      } catch (error) {
        this.setState(prevState => ({ ...prevState, fetching: false }));
      }
    } else {
      const { clientType } = this.state;
      clientType.push(userOrgType);
    }
    this.setFields();
  }

  componentDidUpdate(prevProps) {
    const { clientRole } = this.props;
    if (prevProps.clientRole !== clientRole) {
      this.setFields();
    }
  }

  setFields = () => {
    const { clientRole, form } = this.props;
    form.setFields({
      'role.roleName': {
        value: clientRole.roleName,
      },
      'role.roleOid': {
        value: clientRole.roleOid,
      },
      'role.clientType': {
        value: clientRole.clientType,
      },
      'role.description': {
        value: clientRole.description,
      },
    });
  }

  render() {
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
    const { form: { getFieldDecorator }, loading } = this.props;
    const { clientType, fetching } = this.state;
    return (
      <Card loading = {loading} bordered = { false} >
          <FormItem {...formItemLayout} label="Role Name">
          {getFieldDecorator('role.roleName', {
            rules: [{ required: true, whitespace: true, message: 'Please Enter Role Name' }],
          })(
            <Input type="text"/>,
          )}
          </FormItem>
          <FormItem {...formItemLayout} label="Role OID">
          {getFieldDecorator('role.roleOid', {
            rules: [{ required: true, message: 'Please Enter Role Oid' }],
          })(
            <Input type="text" />,
          )}
          </FormItem>
          <FormItem {...formItemLayout} label="Client Type">
          {getFieldDecorator('role.clientType', {
            rules: [{ required: true, message: 'Please Select Client Type' }],
          })(
            <Select
              placeholder="select client_type"
              style={{ width: '100%' }}
              notFoundContent={fetching ? <Spin size="small" /> : null}
            >
              {clientType.map(type => <Option value={type}>{type}</Option>)}
            </Select>,
          )}
          </FormItem>
          <FormItem {...formItemLayout} label="Description">
          {getFieldDecorator('role.description', {
            rules: [{ }],
          })(
            <TextArea />,
          )}
          </FormItem>
      </Card>
    );
  }
}
CreateRoleForm.defaultProps = {
  clientRole: {},
  loading: false,
};
CreateRoleForm.propTypes = {
  form: PropTypes.instanceOf(Object).isRequired,
  clientRole: PropTypes.instanceOf(Object),
  loading: PropTypes.bool,
  isLicensee: PropTypes.bool.isRequired,
  userOrgType: PropTypes.string.isRequired,
};
export default CreateRoleForm;
