import React from 'react';
import {
  Button, Card, message, Steps, Form,
} from 'antd';
import PropTypes from 'prop-types';
import _ from 'lodash';
import CreateClientForm from './CreateOrgForm';
import UserDetails from '../user/UserDetailsForm';
import LoginDetails from '../user/LoginDetailsForm';
import AddUserPrivileges from '../user/AddUserPrivilegesForm';
import {
  createClientUser, updateClientUser,
  getlogInDetails, getPrivileges, getUserDetails, setUserDetails,
} from '../../utils/clientUser';
import '../../index.less';
import './styles.less';
// import Authorize from '../Authorize';
// import Privilege from '../../constants/privilege';

import {
  saveOrg, updateOrg,
} from '../../utils/org';


const { Step } = Steps;

// const steps = [{
//   title: 'Client Details',
//   content: props => <CreateClientForm {...props}/>,

// }, {
//   title: 'Select Plan',
//   content: props => <SelectionOfPlan {...props}/>,
// }, {
//   title: 'User Details',
//   content: props => <UserDetails {...props}/>,
// },
// {
//   title: 'Login Details',
//   content: props => <LoginDetails {...props}/>,
// },
// {
//   title: 'Add Privileges',
//   content: props => <AddUserPrivileges {...props}/>,
// }];

const steps = [{
  title: 'Client Details',
  content: CreateClientForm,

}, {
  title: 'User Details',
  content: UserDetails,
},
{
  title: 'Login Details',
  content: LoginDetails,
},
{
  title: 'Add Privileges',
  content: AddUserPrivileges,
}];


class CreateOrgLayout extends React.Component {
  state = {
    current: 0,
    client: {},
    clientUser: {
      clientUserRoles: [],
      clientUserPrivileges: [],
    },
    saveBtnLoading: false,
    deletedRoles: [],
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (_.isEmpty(prevState.client)) {
      const { client, clientUser } = nextProps;
      if (!_.isEmpty(client)) {
        return {
          ...prevState,
          client,
          clientUser,
        };
      }
    }
    return prevState;
  }

  setRolesToDelete = (list) => {
    this.setState(prevState => ({
      ...prevState,
      deletedRoles: list,
    }));
  }

  getUser =() => {
    const { form } = this.props;
    const { clientUser } = this.state;
    let user = form.getFieldValue('user');
    user = setUserDetails(user, clientUser);
    return user;
  }

  setUser = () => {
    const user = this.getUser();
    this.setState(prevState => ({
      ...prevState,
      clientUser: user,
    }));
  }

  setClient = () => {
    const { form } = this.props;
    const { client: loClient } = this.state;
    const client = form.getFieldValue('client');
    client.country = client.location;
    client.contactPhoneNo = client.contactPhoneNo ? `${client.contactPhoneNoCountryCode}${client.contactPhoneNo}` : client.contactPhoneNo;
    client.phoneNo = client.phoneNo ? `${client.phoneNoCountryCode}${client.phoneNo}` : client.phoneNo;
    _.merge(loClient, client);
    this.setState(prevState => ({
      ...prevState,
      client: loClient,
    }));
  }

  handleSubmit = async () => {
    const { client, deletedRoles } = this.state;
    const user = this.getUser();
    user.client = {
      id: client.id,
    };
    if (client.id) {
      this.setState(prevState => ({ ...prevState, saveBtnLoading: true }));
      try {
        const successInfo = (user.id) ? 'Updated Successfully' : 'Saved Successfully';
        const res = (user.id) ? await updateClientUser(user, deletedRoles) : await createClientUser(user);
        message.success(successInfo, [2]);
        this.setState(prevState => ({
          ...prevState,
          clientUser: res.data,
          saveBtnLoading: false,
        }));
      } catch (error) {
        const errorInfo = (user.id) ? 'Failed to updated the user' : 'Failed to save the user';
        message.error(errorInfo, [2]);
        this.setState(prevState => ({ ...prevState, saveBtnLoading: false }));
      }
    } else {
      message.error('Please save the Organization before saving the user');
    }
  };

  next() {
    const { current } = this.state;
    const count = current + 1;
    if (count === 1) {
      this.setClient();
    }
    if (count <= 4 && count >= 2) {
      this.setUser();
    }
    this.setState(prevState => ({
      ...prevState,
      current: count,
    }));
  }

  prev() {
    const { current } = this.state;
    const count = current - 1;
    if ((count <= 4 && count >= 2) || count === 0) {
      this.setUser();
    }
    this.setState(prevState => ({
      ...prevState,
      current: count,
    }));
  }

  renderSteps = (index) => {
    switch (index) {
      case 0: {
        const { client } = this.state;
        const { loggedInUserClientId, form } = this.props;
        const onSubmit = _.get(client, 'id') ? updateOrg : saveOrg;
        const loOnSubmit = async (loClient) => {
          console.log(loClient);
          const res = await onSubmit({ ...loClient, client: { id: loggedInUserClientId } });
          if (res.id) {
            this.setState({
              client: res,
            });
          }
        };
        return <CreateClientForm client = {client} onSubmit = {loOnSubmit} form = {form}/>;
      }
      case 1: {
        const { clientUser } = this.state;
        const { form } = this.props;
        const userDetails = getUserDetails(clientUser);

        return <UserDetails user = {userDetails} form = {form}/>;
      }
      case 2: {
        const { clientUser } = this.state;
        const logInDetails = getlogInDetails(clientUser);
        const { form } = this.props;
        return <LoginDetails logInDetails = {logInDetails} form = {form}/>;
      }
      case 3: {
        const { clientUser, client, deletedRoles } = this.state;
        const clientType = _.get(client, 'clientType') || '';
        const clientUserId = _.get(clientUser, 'id') || '';
        const clientId = _.get(client, 'id') || '';
        const privileges = getPrivileges(clientUser);
        const isLicensee = _.get(client, 'isLicensee') || false;
        const { form } = this.props;
        return <AddUserPrivileges form = {form} clientId = {clientId} privileges = {privileges} clientType = {clientType}
        setRolesToDelete = {this.setRolesToDelete} isLicensee= {isLicensee}
      deletedRoles ={deletedRoles} clientUserId = {clientUserId}
      />;
      }
      default: {
        return '';
      }
    }
  };

  render() {
    // const { form: { getFieldDecorator } } = this.props;
    const { current, saveBtnLoading } = this.state;

    return (
      <div className="defaultDiv">
      <Card title={
        <div className="steps">
        <Steps current={current} >
            {steps.map(item => <Step key={item.title} title={item.title} />)}
          </Steps>
        </div>
      } bordered={false}>
          <div className="steps-action" align="right">
          {
            current > 0
            && (
            <Button onClick={() => this.prev()}>
              Previous
            </Button>
            )
          }
          {
            current < steps.length - 1
            && <Button type="primary" style={{ marginLeft: 8 }} onClick={() => this.next()}>Next</Button>
          }
          {
            current === steps.length - 1
            && (
            // <Authorize hasAnyGrant={[Privilege.CREATE_ORGANIZATION]}>
              <Button loading = {saveBtnLoading} type="primary" style={{ marginLeft: 8 }} onClick = {this.handleSubmit}>Submit</Button>
            // </Authorize>
            )
          }

        </div>
        <div className="steps-content">
          {this.renderSteps(current)}
        </div>

      </Card>
      </div>
    );
  }
}

CreateOrgLayout.propTypes = {
  form: PropTypes.instanceOf(Object).isRequired,
  loggedInUserClientId: PropTypes.string.isRequired,
};

export default Form.create()(CreateOrgLayout);
