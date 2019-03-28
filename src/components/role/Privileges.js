import React from 'react';
import {
  Table, Checkbox, Col, Row, Card,
} from 'antd';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { retrievePrivilegesByClientId } from '../../utils/clientRole';

class Previleges extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientPrivileges: [],
      loading: false,
    };
  }

  async componentDidMount() {
    const { userOrgId, isLicensee } = this.props;
    this.setState(prevState => ({
      ...prevState, loading: true,
    }));
    try {
      const res = await retrievePrivilegesByClientId(isLicensee, userOrgId);
      this.setState(prevState => ({
        ...prevState,
        clientPrivileges: res.data || [],
        loading: false,
      }));
    } catch (error) {
      this.setState(prevState => ({ ...prevState, loading: false }));
    }
  }


  getKeyByPrivileges = () => {
    const { clientPrivileges } = this.state;
    const keys = _.keys(clientPrivileges);
    const prvlgs = [];
    keys.map(category => clientPrivileges[category].map(p => prvlgs.push(p)));
    const keyByPrivileges = _.keyBy(prvlgs, p => p.id);
    return keyByPrivileges;
  }

  getChildsOfParent = (id) => {
    const keyByPrivileges = this.getKeyByPrivileges();
    const childPrivileges = _.values(keyByPrivileges).filter(
      prvlg => prvlg.privilege && prvlg.privilege.id === id,
    );
    return childPrivileges;
  }

  setPrivilege = (id, isChecked, crps) => {
    const clientRolePrivileges = crps;
    if (clientRolePrivileges[id]) {
      clientRolePrivileges[id].active = isChecked;
    } else {
      clientRolePrivileges[id] = {
        privilege: {
          id,
        },
        active: isChecked,
      };
    }
    return clientRolePrivileges;
  }

  getUpdatedPrivileges = (id, isChecked, crps) => {
    let clientRolePrivileges = crps;
    const parentId = this.checkForParent(id);
    if (parentId && isChecked) { // if childprivilege  checked
      clientRolePrivileges = this.updateParent(id, isChecked, crps);
    } else if (parentId && !isChecked) { // if childPrivilege unchecked
      clientRolePrivileges = this.setPrivilege(id, isChecked, clientRolePrivileges);
    } else if (!parentId && isChecked) { // if parentPrivilege checked
      clientRolePrivileges = this.setPrivilege(id, isChecked, clientRolePrivileges);
    } else { // if parentprivilege uncheked
      clientRolePrivileges = this.unCheckChildsOfParent(id, crps, isChecked);
    }
    return clientRolePrivileges;
  }


  updateParent = (id, isChecked, crps) => {
    let clientRolePrivileges = crps;
    clientRolePrivileges = this.setPrivilege(id, isChecked, clientRolePrivileges);
    const parentId = this.checkForParent(id);
    if (parentId) { // child privilege
      if (isChecked) { // checks parent if child is checked
        this.updateParent(parentId, isChecked, crps);
      // } else { // unchecks parent if child unchecked and no child is selected for that parent
      //   const selectedPrivileges = this.checkIfAnyChildChecked(parentId, clientRolePrivileges);
      //   if (!selectedPrivileges.length) {
      //     this.updateParent(parentId, isChecked, crps);
      //   }
      // }
      }
    }
    return clientRolePrivileges;
  }

  unCheckChildsOfParent = (parentId, crps, isChecked) => {
    let clientRolePrivileges = crps;
    clientRolePrivileges = this.setPrivilege(parentId, isChecked, clientRolePrivileges);
    const selectedChildPrivileges = this.checkIfAnyChildChecked(parentId, clientRolePrivileges);
    if (selectedChildPrivileges.length) {
      selectedChildPrivileges.map(sp => {
        clientRolePrivileges = this.setPrivilege(sp.id, isChecked, clientRolePrivileges);
        return null;
      });
    }
    return clientRolePrivileges;
  }

  checkIfAnyChildChecked = (parentId, clientRolePrivileges) => {
    const childPrivileges = this.getChildsOfParent(parentId);
    const selectedPrivileges = childPrivileges.filter(
      cp => clientRolePrivileges[cp.id] && clientRolePrivileges[cp.id].active,
    );
    return selectedPrivileges;
  }

  checkForParent = (id) => { // returns parent id of selected privilege
    const keyByPrivileges = this.getKeyByPrivileges();
    const parentPrivilege = keyByPrivileges[id].privilege;
    const parentId = parentPrivilege ? parentPrivilege.id : null;
    return parentId;
  }

  handlePrivilege = (value, id, crPrvlgs) => {
    const { setClientRolePrivileges } = this.props;
    const clientRolePrivileges = this.getUpdatedPrivileges(id, value, crPrvlgs);
    setClientRolePrivileges(Object.values(clientRolePrivileges));
  }

  updatePrivilege = (e, id) => {
    let { clientRolePrivileges } = this.props;
    clientRolePrivileges = _.keyBy(clientRolePrivileges, crp => crp.privilege.id);
    this.handlePrivilege(e.target.checked, id, clientRolePrivileges);
  }

  render() {
    const { roleName } = this.props;
    let { clientRolePrivileges } = this.props;
    clientRolePrivileges = _.keyBy(clientRolePrivileges, crp => crp.privilege.id);
    const { loading, clientPrivileges } = this.state;
    const categories = Object.keys(clientPrivileges);
    const columns = [
      {
        title: 'Privilege Name',
        dataIndex: 'name',
      },
      {
        title: 'Is Permitted',
        dataIndex: 'isPermitted',
        render: (value, record) => {
          const checked = (clientRolePrivileges[record.id])
            ? clientRolePrivileges[record.id].active : false;
          return <Checkbox checked = {checked}
          onChange = {(e) => this.updatePrivilege(e, record.id)}/>;
        },
      },
    ];
    return (
      <Card loading = {loading} bordered = {false} title = {null}>
        <Row style={{ marginBottom: '2%' }}>
          <Col><b>Role Name:{roleName}</b></Col>
        </Row>
      <Col span = "12">
      {categories.map((category, index) => {
        if (index % 2 === 0) {
          return <Card title={category}
          bordered style={{ margin: '2%' }}
          // extra={<Checkbox> Select All </Checkbox>}
          >
          <Table size="small" pagination= { false } columns={columns} dataSource={clientPrivileges[category]}/>
          </Card>;
        }
      })
      }
      </Col>
      <Col span = "12">
      {categories.map((category, index) => {
        if (index % 2 !== 0) {
          return <Card title={category}
          bordered
          style={{ margin: '2%' }}
          // extra={<Checkbox> Select All </Checkbox>}
          >
          <Table size="small" pagination= { false } columns={columns} dataSource={clientPrivileges[category]}/>
          </Card>;
        }
      })
      }
      </Col>
      </Card>
    );
  }
}
Previleges.defaultProps = {
  roleName: '',
  clientRolePrivileges: [],
  isLicensee: false,
};
Previleges.propTypes = {
  roleName: PropTypes.string,
  clientRolePrivileges: PropTypes.instanceOf(Object),
  setClientRolePrivileges: PropTypes.func.isRequired,
  userOrgId: PropTypes.string.isRequired,
  isLicensee: PropTypes.bool,
};
export default Previleges;
