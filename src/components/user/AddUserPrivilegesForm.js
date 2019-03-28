import React from 'react';
import {
  Form, Select, Switch, Card, Spin,
} from 'antd';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { retrieveClientRolesByClientIdAndclientType, retrieveClientRolePrivileges } from '../../utils/client';
import '../../index.less';

const FormItem = Form.Item;

const { Option } = Select;

// let clientRoles = [];
// let clientRolePrivileges = [];

class AddUserPrivileges extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
    };
    this.clientRoles = [];
    this.clientRolePrivileges = [];
  }

  async componentDidMount() {
    const { clientId, clientType, isLicensee } = this.props;
    this.setState(prevState => ({ ...prevState, fetching: true }));
    try {
      const roles = await retrieveClientRolesByClientIdAndclientType(clientId, clientType);
      this.clientRoles = roles.data || [];
      const additionalPrivileges = await retrieveClientRolePrivileges(
        clientId, clientType, isLicensee,
      );
      this.clientRolePrivileges = Object.values(additionalPrivileges.data);
      this.setState(prevState => ({ ...prevState, fetching: false }));
    } catch (error) {
      this.setState(prevState => ({ ...prevState, fetching: false }));
    }


    this.setFields();
  }

  getClientUserPrivileges = () => {
    const { privileges: { clientUserPrivileges: prvlgs } } = this.props;
    let clientUserPrivileges = [];
    if (prvlgs.length) {
      clientUserPrivileges = prvlgs.map(cup => cup.privilege.id);
    }
    return clientUserPrivileges;
  }

  getClientUserRoles = () => {
    const { privileges: { clientUserRoles: cur }, clientUserId, isUser } = this.props;
    let clientUserRoles = [];
    if (cur.length) {
      clientUserRoles = cur.map(r => r.clientRole.id);
    } else if (!clientUserId && !isUser) {
      this.clientRoles.map(cr => {
        if (cr.roleName === 'Administrator') {
          clientUserRoles.push(cr.id);
        }
        return null;
      });
    }
    return clientUserRoles;
  }

  getPrivilegesOfRole = (roleId) => {
    let rolePrivileges = [];
    const clientRole = this.clientRoles.filter(cr => cr.id === roleId);
    // rolePrivileges = clientRole[0].clientRolePrivileges;
    rolePrivileges = clientRole[0].clientRolePrivileges.map(cr => cr.privilege);
    return rolePrivileges;
  }

  setFields = () => {
    const { form, privileges } = this.props;
    const clientUserPrivileges = this.getClientUserPrivileges();
    const clientUserRoles = this.getClientUserRoles();
    if (clientUserRoles.length) {
      clientUserRoles.map(id => this.removeRolePrivilegesByRoleId(id));
    }
    form.setFields({
      // 'user.clientUserRoles': {
      //   value: clientUserRoles,
      // },
      'user.clientUserPrivileges': {
        value: clientUserPrivileges,
      },
      'user.status': {
        value: privileges.lastName,
      },
    });
  }

  setClientUserPrivileges = (cur) => {
    const { form } = this.props;
    form.setFieldsValue({
      'user.clientUserPrivileges': cur.length ? cur : [],
    });
  }


  getValueFromEvent = () => {
    const { form } = this.props;
    return form.getFieldValue('user.clientUserPrivileges');
  }

  checkClientUserRoleExists = (roleId) => {
    const { privileges: { clientUserRoles } } = this.props;
    let boolean = false;
    clientUserRoles.map(cur => {
      if (cur.id && cur.clientRole.id === roleId) {
        boolean = true;
      }
      return null;
    });
    return boolean;
  }

  isEqual = (a, b) => {
    if (a === b.id) {
      return true;
    }
    return false;
  }

  removeRolePrivilegesByRoleId = (roleId) => {
    const rolePrivileges = this.getPrivilegesOfRole(roleId);
    this.clientRolePrivileges = _.differenceWith(
      this.clientRolePrivileges, rolePrivileges, _.isEqual,
    );
    const { form, setRolesToDelete, deletedRoles } = this.props;
    let selectedAdditionalPrivileges = form.getFieldValue('user.clientUserPrivileges') || [];
    selectedAdditionalPrivileges = _.differenceWith(
      selectedAdditionalPrivileges, rolePrivileges, this.isEqual,
    );
    this.setClientUserPrivileges(selectedAdditionalPrivileges);
    const index = this.checkDeletedRole(roleId);
    if (index >= 0) {
      deletedRoles.splice(index, 1);
      setRolesToDelete(deletedRoles);
    }
  }

  addRoleBasedPrivileges = (roleId) => {
    const { form } = this.props;
    let rolePrivileges = this.getPrivilegesOfRole(roleId);
    const selectedRoles = form.getFieldValue('user.clientUserRoles');
    selectedRoles.map(id => {
      if (id !== roleId) {
        const selectedRolePrivileges = this.getPrivilegesOfRole(id);
        rolePrivileges = _.differenceWith(
          rolePrivileges, selectedRolePrivileges, _.isEqual,
        );
      }
      return null;
    });
    this.clientRolePrivileges = _.concat(this.clientRolePrivileges, rolePrivileges);
    this.clientRolePrivileges = _.uniqWith(this.clientRolePrivileges, _.isEqual);
    const { setRolesToDelete, deletedRoles } = this.props;
    const index = this.checkDeletedRole(roleId);
    if (index < 0 && this.checkClientUserRoleExists(roleId)) {
      deletedRoles.push(roleId);
      setRolesToDelete(deletedRoles);
    }
  }

  checkDeletedRole = (id) => {
    const { deletedRoles } = this.props;
    return deletedRoles.indexOf(id);
  }

  checkForChildPrivileges = (e) => {
    const childPrivileges = this.clientRolePrivileges.filter(
      prvlg => prvlg.privilege && prvlg.privilege.id === e,
    );
    const selectedChildprivileges = [];
    if (childPrivileges.length) {
      const { form } = this.props;
      const selectedPrivileges = form.getFieldValue('user.clientUserPrivileges');
      childPrivileges.filter(cp => selectedPrivileges.map(sp => {
        if (cp.id === sp) {
          selectedChildprivileges.push(sp);
        }
        return null;
      }));
    }
    return selectedChildprivileges;
  }

  removePrivilege = (id, selectedPrivileges) => {
    const index = selectedPrivileges.indexOf(id);
    selectedPrivileges.splice(index, 1);
    return selectedPrivileges;
  }

  removeAdditionalPrivileges = (e) => {
    const { form } = this.props;
    let selectedPrivileges = form.getFieldValue('user.clientUserPrivileges');
    const prvlg = this.clientRolePrivileges.filter(p => p.id === e);
    if (prvlg[0].privilege) {
      selectedPrivileges = this.removePrivilege(e, selectedPrivileges);
    } else {
      selectedPrivileges = this.removePrivilege(e, selectedPrivileges);
      const selectedChildprivileges = this.checkForChildPrivileges(e);
      if (selectedChildprivileges.length) {
        selectedChildprivileges.map(sp => {
          selectedPrivileges = this.removePrivilege(sp, selectedPrivileges);
          return null;
        });
      }
    }
    this.setClientUserPrivileges(selectedPrivileges);
  }

  checkIfParentPrivilegeExists = (parentId) => {
    const parentPrvlg = this.clientRolePrivileges.filter(p => p.id === parentId);
    if (parentPrvlg.length) {
      return true;
    } return false;
  }

  handleAdditionalPrivileges = (e) => {
    const { form } = this.props;
    const selectedPrivileges = form.getFieldValue('user.clientUserPrivileges');
    selectedPrivileges.push(e);
    const prvlg = this.clientRolePrivileges.filter(p => p.id === e);
    if (prvlg[0].privilege) {
      const parentId = prvlg[0].privilege.id;
      const parentPrivilegeIsExisit = this.checkIfParentPrivilegeExists(parentId);
      if (!selectedPrivileges.includes(parentId) && parentPrivilegeIsExisit) {
        selectedPrivileges.push(prvlg[0].privilege.id);
      }
    }
    this.setClientUserPrivileges(selectedPrivileges);
  }

  render() {
    const { form: { getFieldDecorator } } = this.props;
    const { fetching } = this.state;
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
    const clientUserPrivileges = this.getClientUserPrivileges();
    const clientUserRoles = this.getClientUserRoles();
    return (
      <Card loading = { fetching} bordered= {false}>
          <FormItem {...formItemLayout} label="Status">
            <Switch defaultChecked/>
        </FormItem>
        <FormItem {...formItemLayout} label="Role Name">
          {getFieldDecorator('user.clientUserRoles', {
            rules: [
              {
                required: true,
                message: 'Please select at least one role!',
              },
            ],
            initialValue: clientUserRoles,

          })(<Select
            showSearch
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Please select"
            optionFilterProp="children"
            onSelect = {this.removeRolePrivilegesByRoleId}
            onDeselect = {this.addRoleBasedPrivileges}
            notFoundContent={fetching ? <Spin size="small" /> : 'No Roles to display'}
            filterOption={(input, option) => option.props.children.toLowerCase()
              .indexOf(input.toLowerCase()) >= 0}
          >
            {this.clientRoles.map(role => <Option value = {role.id}>{role.roleName}</Option>)}
          </Select>)}
        </FormItem>
        <FormItem {...formItemLayout} label="Additional Privileges">
          {getFieldDecorator('user.clientUserPrivileges', { initialValue: clientUserPrivileges, getValueFromEvent: this.getValueFromEvent() })(<Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Please select"
            onSelect = {this.handleAdditionalPrivileges}
            onDeselect = {this.removeAdditionalPrivileges}
            notFoundContent={fetching ? <Spin size="small" /> : 'No Additional Privileges'}
            filterOption={(input, option) => option.props.children.toLowerCase()
              .indexOf(input.toLowerCase()) >= 0}
          >
            {this.clientRolePrivileges.map(
              prvlg => <Option value = {prvlg.id}>{prvlg.name}</Option>,
            )}
          </Select>)}
        </FormItem>
      </Card>
    );
  }
}

AddUserPrivileges.defaultProps = {
  loading: false,
  privileges: {
    clientUserPrivileges: [],
    clientUserRoles: [],
  },
  clientType: '',
  clientId: '',
  setRolesToDelete: () => {},
  deletedRoles: [],
  clientUserId: '',
  isLicensee: false,
  isUser: false,
};
AddUserPrivileges.propTypes = {
  form: PropTypes.instanceOf(Object).isRequired,
  privileges: PropTypes.instanceOf(Object),
  clientId: PropTypes.string,
  clientType: PropTypes.string,
  loading: PropTypes.bool,
  setRolesToDelete: PropTypes.func,
  deletedRoles: PropTypes.instanceOf(Object),
  clientUserId: PropTypes.string,
  isLicensee: PropTypes.bool,
  isUser: PropTypes.bool,
};
const AddUserPrivilegesFrom = Form.create()(AddUserPrivileges);
export default AddUserPrivilegesFrom;
