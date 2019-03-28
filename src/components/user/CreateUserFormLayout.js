import React from 'react';
import {
  Form, Button, Card, message, Steps,
} from 'antd';
import PropTypes from 'prop-types';
import UserDetails from './UserDetailsForm';
import LoginDetails from './LoginDetailsForm';
import AddUserPrivileges from './AddUserPrivilegesForm';
import {
  retrieveClientUserwithRolesAndPrivileges, createClientUser, updateClientUser,
  getlogInDetails, getPrivileges, getUserDetails, setUserDetails,
} from '../../utils/clientUser';
import '../../index.less';
import './styles.less';
// import Authorize from '../Authorize';
// import Privilege from '../../constants/privilege';

const { Step } = Steps;

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      loading: false,
      saveBtnLoading: false,
      clientUser: {
        clientUserRoles: [],
        clientUserPrivileges: [],
      },
      deletedRoles: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    if (id) {
      await this.setState(prevState => ({ ...prevState, loading: true }));
      try {
        const res = await retrieveClientUserwithRolesAndPrivileges(id);
        this.setState(prevState => ({
          ...prevState,
          clientUser: (res) ? res.data : prevState.clientUser,
          loading: false,
        }));
      } catch (error) {
        message.error('Failed retrieve User', [2]);
        this.setState(prevState => ({ ...prevState, loading: false }));
      }
    }
  }

  setRolesToDelete = (list) => {
    this.setState(prevState => ({
      ...prevState,
      deletedRoles: list,
    }));
  }

  setUser =() => {
    const { form } = this.props;
    const { clientUser } = this.state;
    let user = form.getFieldValue('user');
    user = setUserDetails(user, clientUser);
    return user;
  }

  submitUser = async () => {
    const { userOrgId } = this.props;
    const { deletedRoles } = this.state;
    const user = this.setUser();
    user.client = {
      id: userOrgId,
    };
    this.setState(prevState => ({ ...prevState, saveBtnLoading: true }));
    try {
      const successInfo = (user.id) ? 'Updated Successfully' : 'Saved Successfully';
      const res = (user.id)
        ? await updateClientUser(user, deletedRoles) : await createClientUser(user);
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
  };

  next() {
    const { current } = this.state;
    const user = this.setUser();
    const count = current + 1;
    this.setState(prevState => ({
      ...prevState,
      current: count,
      clientUser: user,
    }));
  }

  prev() {
    const { current } = this.state;
    const user = this.setUser();
    const count = current - 1;
    this.setState(prevState => ({
      ...prevState,
      current: count,
      clientUser: user,
    }));
  }

  render() {
    const {
      current, loading, clientUser, deletedRoles,
    } = this.state;
    const {
      form, userOrgId, userOrgType, isLicensee,
    } = this.props;
    const userDetails = getUserDetails(clientUser);
    const logInDetails = getlogInDetails(clientUser);
    const privileges = getPrivileges(clientUser);
    const clientUserId = clientUser.id || '';
    const steps = [{
      title: 'User Details',
      content: <UserDetails user = {userDetails} form = {form} loading = {loading}/>,
    }, {
      title: 'Login Details',
      content: <LoginDetails logInDetails = {logInDetails} form = {form} />,
    }, {
      title: 'Add Privileges',
      content: <AddUserPrivileges
      form = {form} clientId = {userOrgId} privileges = {privileges} clientType = {userOrgType}
      setRolesToDelete = {this.setRolesToDelete} isLicensee = {isLicensee}
      deletedRoles ={deletedRoles} clientUserId = {clientUserId} isUser
      />,
    }];
    return (
      <div className="defaultDiv">
      <Card title={<div className="steps"><Steps current={current}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps></div>} bordered={false}>
        <Form layout="horizontal">
        {steps[current].content}
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
            // current === steps.length - 1
            // && <Authorize hasAnyGrant={[Privilege.CREATE_USER]}>
            // <Button loading = {saveBtnLoading} type="primary" style={{ marginLeft: 8 }} onClick = {this.submitUser}>Submit</Button>
            // </Authorize>
          }
        </div>
        </Form>
      </Card>
      </div>
    );
  }
}
User.defaultProps ={
  match  : {
     params : {
        id : '15b21a0524',
        userOrgId:'jgj73433',
        isLicensee:false,
       }, 
      },
};

User.propTypes = {
  form: PropTypes.instanceOf(Object).isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
  userOrgId: PropTypes.string.isRequired,
  userOrgType: PropTypes.string.isRequired,
  isLicensee: PropTypes.bool.isRequired,
};

export const CreateUserLayout = Form.create()(User);
export const EditUserLayout = Form.create()(User);
