import React from 'react';
import {
  Form, Select, Button, message,
} from 'antd';
import PropTypes from 'prop-types';
import _ from 'lodash';

const FormItem = Form.Item;
const { Option } = Select;

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

class PlanSelectionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  // componentDidMount = () => {
  //   const { clientPlans, form } = this.props;
  //   // if (!_.isEmpty(clientPlans)) {
  //   //   form.setFieldsValue({ appPlans: clientPlans });
  //   // }
  // }

  getDeletedPlans = (updatedPlans, savedPlans) => (_.differenceBy(updatedPlans, savedPlans, o => o.id)
    .map(p => ({ ...p, isDeleted: true })));

    formToClientPlans = (appPlans) => {
      const { client } = this.props;
      return appPlans.map(ap => ({
        appPlan: {
          id: ap,
        },
        client,
      }));
    };

  handleSubmit = () => {
    const {
      form, onSubmit, clientPlans, client,
    } = this.props;
    if (client.id) {
      this.setState({
        loading: true,
      });
      form.validateFieldsAndScroll(async (err, values) => {
        if (!err) {
          const { appPlans } = values;
          if (clientPlans.length) {
            this.getDeletedPlans(appPlans, clientPlans);
          }
          await onSubmit(this.formToClientPlans(appPlans));
          console.log('Received values of form: ', values);
        }
        this.setState({
          loading: false,
        });
      });
    } else {
      message.error('Please Save the client before saving the client plans', [2]);
    }
  }

  render() {
    const { appPlans, form: { getFieldDecorator }, clientPlans } = this.props;
    const loClientPlans = clientPlans.map(cp => cp.appPlan.id);
    const { loading } = this.state;
    return (
      <Form layout="horizontal">
        <FormItem {...formItemLayout} label="Select Plan">
        {getFieldDecorator('appPlans', {
          initialValue: loClientPlans,

        })(<Select mode="multiple" placeholder="Please Select">
          {
            appPlans.map(plan => (<Option value={plan.id} key={plan.id}>
            {plan.name}
          </Option>))
          }
          </Select>)}

        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" loading={loading} onClick={this.handleSubmit}>Save</Button>
        </FormItem>
      </Form>
    );
  }
}

PlanSelectionForm.propTypes = {
  form: PropTypes.instanceOf(Object).isRequired,
  appPlans: PropTypes.arrayOf(Object),
  client: PropTypes.instanceOf(Object).isRequired,
  onSubmit: PropTypes.func,
};

PlanSelectionForm.defaultProps = {
  appPlans: [],
  onSubmit: () => {},
};

export default Form.create()(PlanSelectionForm);
