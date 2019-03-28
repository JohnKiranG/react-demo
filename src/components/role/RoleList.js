import React from 'react';
import {
  Table, Input, Button, Icon, Card,
} from 'antd';
import PropTypes from 'prop-types';
import api from '../../utils/api';
import { columnStringSorter } from '../../utils/util';
import '../../index.less';

class RoleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roles: [],
      searchText: '',
      filterDropdownVisible: false,
      filtered: false,
      selectedRole: [],
    };
  }

  async componentDidMount() {
    const { userOrgId } = this.props;
    this.setState(prevState => ({ ...prevState, loading: true }));
    try {
      const res = await api.get(`clientRole/client/${userOrgId}`);
      this.setState(prevState => ({
        ...prevState,
        loading: false,
        roles: Object.values(res.data),
      }));
    } catch (error) {
      this.setState(prevState => ({ ...prevState, loading: false }));
    }
  }

  onSearch = param => {
    const { searchText, roles } = this.state;
    const reg = new RegExp(searchText, 'gi');
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchText,
      selectedRole: roles
        .map(record => {
          const match = record[param].match(reg);
          if (!match) {
            return null;
          }
          return {
            ...record,
            param: (
              <span>
                {record[param].split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i')).map(
                  text => (text.toLowerCase() === searchText.toLowerCase() ? (
                      <span key={record.key} className="highlight">
                        {text}
                      </span>
                  ) : (
                    text
                    )), // eslint-disable-line
                )}
              </span>
            ),
          };
        })
        .filter(record => !!record),
    });
  };

  onInputChange = e => {
    this.setState({ searchText: e.target.value });
  };

  handleFilterDropdown = () => {
    const { filterDropdownVisible } = this.state;
    this.setState({
      filterDropdownVisible: !filterDropdownVisible,
    });
  };

  changePath = (id) => {
    const { history } = this.props;
    history.push(`/admin/role/edit/${id}`);
  }

  render() {
    const {
      searchText, filtered, roles, loading, selectedRole,
    } = this.state;
    const columns = [
      {
        title: 'Role Name',
        dataIndex: 'roleName',
        render: (roleName, role) => // eslint-disable-next-line
        <a onClick={() => this.changePath(role.id)}>{roleName}</a>,
        rowSpan: 1,
        width: '20%',
        sorter: (a, b) => columnStringSorter(a, b, 'roleName'),
        filterDropdown: (
          <div className="custom-filter-dropdown">
            <Input
              ref={node => {
                this.input = node;
              }}
              placeholder="Search Role Name"
              value={searchText}
              onChange={this.onInputChange}
              onPressEnter={() => this.onSearch('roleName')}
            />
            <Button type="primary" onClick={() => this.onSearch('roleName')}>
              Search
            </Button>
          </div>
        ),
        filterIcon: (
          <Icon
            type="search"
            onClick={this.handleFilterDropdown}
            style={{ color: filtered ? '#108ee9' : '#aaa' }}
          />
        ),
        onFilterDropdownVisibleChange: visible => {
          this.setState(
            {
              filterDropdownVisible: visible,
            },
            () => this.input && this.input.focus(),
          );
        },
      },
      {
        title: 'Role OID',
        dataIndex: 'roleOid',
        rowSpan: 1,
        width: '20%',
        sorter: (a, b) => columnStringSorter(a, b, 'roleOid'),
      },
      {
        title: 'Client Type',
        dataIndex: 'clientType',
        rowSpan: 1,
        width: '20%',
        sorter: (a, b) => columnStringSorter(a, b, 'clientType'),
      },
      {
        title: 'Description',
        dataIndex: 'description',
        rowSpan: 1,
        width: '20%',
      },
    ];
    let rowKey = 0;
    const height = (50 / 100) * window.innerHeight;
    return (
      <div className="defaultDiv">
        <Card title="Role List" bordered={false}>
          <Table
            size="small"
            className = "defaultTable"
            columns={columns}
            dataSource={(selectedRole.length) ? selectedRole : roles}
            pagination = {(roles.length > 10)}
            loading = {loading}
            scroll={{ y: height }}
            rowKey = {() => { rowKey += 1; return rowKey; }}
          />
        </Card>
      </div>
    );
  }
}

RoleList.propTypes = {
  userOrgId: PropTypes.string.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};
export default RoleList;
