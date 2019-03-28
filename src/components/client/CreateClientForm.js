import React from 'react';
import PropTypes from 'prop-types';
import {
  Form, Input, Button, Select, Spin,
} from 'antd';
import _ from 'lodash';
import { retrieveCountries } from '../../utils/client';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;
// const { AutoCompleteOption } = AutoComplete;

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

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

class CreateClientForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
    };
    this.countries = [];
  }

  componentDidMount = async () => {
    const { client, form } = this.props;
    if (!_.isEmpty(client)) {
      form.setFieldsValue({ client: this.clientToForm(client) });
    }
    this.setState(prevState => ({ ...prevState, fetching: true }));
    try {
      const res = await retrieveCountries();
      this.countries = _.get(res, 'data', []);
      this.setState(prevState => ({ ...prevState, fetching: false }));
    } catch (error) {
      console.log(error);
      this.setState(prevState => ({ ...prevState, fetching: false }));
    }
  }
  // componentDidUpdate(prevProps, prevState) {
  //   if (_.isEmpty(prevState.client)) {
  //     const { client, form } = prevProps;
  //     if (!_.isEmpty(client)) {
  //       form.setFields(this.clientToForm(client));
  //     }
  //   }
  // }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (_.isEmpty(prevState.client)) {
  //     const { client, form } = nextProps;
  //     if (!_.isEmpty(client)) {
  //       form.setFields(this.clientToForm(client));
  //     }
  //   }
  // }

  clientToForm = (client) => ({
    name: client.name,
    clientType: _.get(client, 'clientType'),
    description: _.get(client, 'description'),
    oid: _.get(client, 'oid'),
    email: _.get(client, 'email'),
    website: _.get(client, 'website'),
    contactName: _.get(client, 'contactName'),
    contactPhoneNoCountryCode: client.contactPhoneNo ? client.contactPhoneNo.slice(0, 3) : '',
    phoneNoCountryCode: client.phoneNo ? client.phoneNo.slice(0, 3) : '',
    phoneNo: client.phoneNo ? client.phoneNo.slice(3) : client.phoneNo,
    contactPhoneNo: (client.contactPhoneNo ? client.contactPhoneNo.slice(3)
      : client.contactPhoneNo),
    location: client.country,
    logo: client.logo,
  })

  formToClient = (form) => {
    const { client } = this.props;
    const location = _.filter(this.countries, ctry => ctry.ctryName === form.location);
    const temp = {
      ...form,
      contactPhoneNo: form.contactPhoneNo ? `${form.contactPhoneNoCountryCode}${form.contactPhoneNo}` : form.contactPhoneNo,
      phoneNo: form.phoneNo ? `${form.phoneNoCountryCode}${form.phoneNo}` : form.phoneNo,
      region: _.get(location[0], 'regionName', null),
      country: _.get(location[0], 'ctryName', null),
      // city: form.location[2],
    };
    return _.merge(client, temp);
  };


  handleSubmit= () => {
    const { form, onSubmit } = this.props;
    this.setState({
      loading: true,
    });
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const { client } = values;
        await onSubmit(this.formToClient(client));
        console.log('Received values of form: ', values);
      }
      this.setState({
        loading: false,
      });
    });
  }

  prefixSelector = () => (
    <Select style={{ width: 70 }}>
      <Option value="+86">+86</Option>
      <Option value="+87">+87</Option>
    </Select>
  )

  render() {
    const {
      form: { getFieldDecorator },
      clientType,
    } = this.props;
    const { loading, fetching } = this.state;
    const showClientypeField = clientType !== 'SITE';

    return (
      <Form>
        <FormItem {...formItemLayout} label="Name">
          {getFieldDecorator('client.name', { rules: [{ required: true, message: 'Please input your Name' }, { type: 'string' }, { max: 100, message: 'max length exceeded.' }] })(<Input />)}
        </FormItem>
        {showClientypeField ? (<FormItem {...formItemLayout} label="Organization Type" type>
          {getFieldDecorator('client.clientType', {
            rules: [{ required: true, message: 'Please select Organization Type' }],
          })(
            <Select mode="single" placeholder="Please Select">
              <Option value="CRO">CRO</Option>
              <Option value="SITENETWORK">Site Network</Option>
              <Option value="SITE">Site</Option>
              <Option value="SPONSOR">Sponsor</Option>

            </Select>,
          )}
        </FormItem>) : ''}
        <FormItem {...formItemLayout} label="Client OID">
          {getFieldDecorator('client.oid', { rules: [{ required: true, message: 'Please Enter OID' }, { type: 'string' }, { max: 50, message: 'max length exceeded.' }] })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label=" Description ">
        {getFieldDecorator('client.description', { rules: [{ type: 'string' }, { max: 1000, message: 'max length exceeded.' }] })(<TextArea autosize />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Location">
        {getFieldDecorator('client.location', { initialValue: '' })(
        <Select showSearch placeholder = "select a country"
        notFoundContent={fetching ? <Spin size="small" /> : 'No Countries to display'}
        >
        {
          this.countries.map(country => <Option key ={country.id} value = {country.ctryName}>{country.ctryName}</Option>)
        }
        </Select>,
        )}
        </FormItem>
        <FormItem {...formItemLayout} label="E-mail">
        {getFieldDecorator('client.email', { rules: [{ type: 'email', message: 'The input is not valid E-mail!' }, { max: 100, message: 'max length exceeded.' }] })(<Input type="email"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="Phone Number">
        {getFieldDecorator('client.phoneNo', { rules: [{ type: 'string' }, { max: 10, message: 'max length exceeded.' }] })(<Input addonBefore={getFieldDecorator('client.phoneNoCountryCode', {
          initialValue: '+86',

        })(this.prefixSelector())} style={{ width: '100%' }} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Website">
        {getFieldDecorator('client.website', { rules: [{ type: 'string' }, { max: 100, message: 'max length exceeded.' }] })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label=" Contact Name ">
        {getFieldDecorator('client.contactName', { rules: [{ type: 'string' }, { max: 100, message: 'max length exceeded.' }] })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label=" Contact Number ">
        {getFieldDecorator('client.contactPhoneNo', { rules: [{ type: 'string' }, { max: 10, message: 'max length exceeded.' }] })(<Input addonBefore={getFieldDecorator('client.contactPhoneNoCountryCode', {
          initialValue: '+86',
        })(this.prefixSelector())} style={{ width: '100%' }} />)}
        </FormItem>
        <FormItem {...formItemLayout} label=" Logo URL ">
        {getFieldDecorator('client.logo', { rules: [{ type: 'string' }, { max: 2147483647, message: 'max length exceeded.' }] })(<Input />)}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" loading={loading} onClick={this.handleSubmit}>Save</Button>
        </FormItem>
      </Form>
    );
  }
}
CreateClientForm.propTypes = {
  form: PropTypes.instanceOf(Object).isRequired,
  clientType: PropTypes.string,
  client: PropTypes.instanceOf(Object),
  onSubmit: PropTypes.func,
};

CreateClientForm.defaultProps = {
  clientType: '',
  onSubmit: () => {},
  client: {},
};

const createClientForm = Form.create()(CreateClientForm);
export default createClientForm;
