import React from 'react';
import '../../index.less';
import {
  Steps, Button, Card, Form, message,
} from 'antd';
import PropTypes from 'prop-types';
import CreateRoleForm from './CreateRole';
import Privileges from './Privileges';
import './styles.less';
import { retrieveClientRoleWithPrivilegesById, saveClientRole } from '../../utils/clientRole';
 //import Privilege from '../../constants/privilege';
// import Authorize from '../Authorize';


const { Step } = Steps;

class CreateRoleLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      currentStep: 0,
      saveBtnLoading: false,
      clientRole: {
        clientRolePrivileges: [],
      },
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState(prevState => ({ ...prevState, loading: true }));
    if (id) {
      try {
        const res = await retrieveClientRoleWithPrivilegesById(id);
        this.setState(prevState => ({
          ...prevState,
          clientRole: res.data,
          loading: false,
        }));
      } catch (error) {
        this.setState(prevState => ({ ...prevState, loading: false }));
      }
    }
    this.setState(prevState => ({ ...prevState, loading: false }));
  }

  setClientRolePrivileges = async (loClientRolePrivileges) => {
    await this.setState(prevState => ({
      ...prevState,
      clientRole: {
        ...prevState.clientRole,
        clientRolePrivileges: loClientRolePrivileges,
      },
    }));
  }

 saveClientRole = async () => {
   const { clientRole } = this.state;
   const { userOrgId } = this.props;
   await this.setState(prevState => ({ ...prevState, saveBtnLoading: true }));
   const loClientRolePrivileges = [];
   clientRole.clientRolePrivileges.map(crp => {
     if (crp.id || crp.active) {
       loClientRolePrivileges.push(crp);
     }
     return null;
   });
   clientRole.clientRolePrivileges = loClientRolePrivileges;
   clientRole.client = {
     id: userOrgId,
   };
   try {
     const msg = (clientRole.id) ? 'Updated Successfully' : 'Saved Successfully';
     const res = await saveClientRole(clientRole);
     message.success(msg, [2]);
     this.setState(prevState => ({
       ...prevState,
       clientRole: res.data,
       saveBtnLoading: false,
     }));
   } catch (error) {
     const msg = (clientRole.id) ? 'Failed to update Role' : 'Failed to save Role';
     message.error(msg, [2]);
     this.setState(prevState => ({ ...prevState, saveBtnLoading: false }));
   }
 }

 validateClientRole = () => {
   const { form } = this.props;
   form.validateFieldsAndScroll(['role'], (err) => {
     if (err) {
       message.error('Please input required fields', [2]);
     } else {
       this.saveClientRole();
     }
   });
 }

 next() {
   const { form } = this.props;
   form.validateFields(['role']);
   let { currentStep, clientRole } = this.state;
   currentStep += 1;
   const loRole = form.getFieldValue('role');
   clientRole = Object.assign(clientRole, loRole);
   this.setState(prevState => ({ ...prevState, clientRole, currentStep }));
 }

 prev() {
   let { currentStep } = this.state;
   currentStep -= 1;
   this.setState(prevState => ({
     ...prevState,
     currentStep,
   }));
 }

 render() {
   const {
     currentStep, clientRole, loading,
   } = this.state;
   const {
     form, userOrgId, isLicensee, userOrgType,
   } = this.props;
   const steps = [
     {
       title: 'Role',
       content: <CreateRoleForm
        form = { form}
        isLicensee = {isLicensee}
        userOrgType = {userOrgType}
        clientId = { userOrgId } clientRole = {clientRole} loading = {loading}
        />,
     },
     {
       title: 'Privileges',
       content: <Privileges
        form = {form}
        clientRolePrivileges = {clientRole.clientRolePrivileges}
        roleName = {clientRole.roleName}
        userOrgId = {userOrgId}
        setClientRolePrivileges= {this.setClientRolePrivileges}
        isLicensee = {isLicensee}
    />,
     },
   ];
   return (
      <div className="defaultDiv">
      <Card title={<div className="steps"><Steps current={currentStep}>
          {steps.map(step => <Step key={step.title} title={step.title} />)}
        </Steps></div>} bordered={false}>
        <Form layout="horizontal">
        {steps[currentStep].content}
          <div className="steps-action" align="right">
          {
            currentStep > 0
            && (
            <Button onClick={() => this.prev()}>
              Previous
            </Button>
            )
          }
          {
            currentStep < steps.length - 1
            && <Button type="primary" style={{ marginLeft: 8 }} onClick={() => this.next()}>Next</Button>
          }
          {
            currentStep === steps.length - 1
            // && <Authorize hasAnyGrant={[Privilege.CREATE_ROLE]}>
            // <Button loading = {saveBtnLoading} type="primary" style={{ marginLeft: 8 }} onClick = {this.validateClientRole}>Submit</Button>
            // </Authorize>
          }
        </div>
        </Form>
        </Card>
        </div>
   );
 }
}
CreateRoleLayout.defaultProps ={
  match  : {
     params : {
        id : '15b21a0524',
       }, 
      },
};
CreateRoleLayout.propTypes = {
  form: PropTypes.instanceOf(Object).isRequired,
  userOrgId: PropTypes.string.isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
  userOrgType: PropTypes.string.isRequired,
  isLicensee: PropTypes.bool.isRequired,
};
export const CreateRole = Form.create()(CreateRoleLayout);
export const EditRole = Form.create()(CreateRoleLayout);
