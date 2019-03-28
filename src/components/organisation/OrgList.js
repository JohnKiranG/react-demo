import React from 'react';
import {
  Switch, Card, Table, Input, Button, Icon, message,
} from 'antd';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { columnStringSorter } from '../../utils/util';
import '../../index.less';
// import SubjectDetails from '../Subject/SubjectDetails';
import api from '../../utils/api';

class OrgList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      organizations: [],
      searchText: '',
      filterDropdownVisible: false,
      filtered: false,
      loading: false,
      selectedOrganization: [],
    };
  }

  async componentDidMount() {
    const { clientId } = this.props;
    this.setState(prevState => ({ ...prevState, loading: true }));
    try {
      const res = await api.get(`org/client/${clientId}`);
      this.setState(prevState => ({
        ...prevState,
        organizations: res.data,
        loading: false,
      }));
    } catch (error) {
      this.setState(prevState => ({ ...prevState, loading: false }));
    }
  }


  onSearch = param => {
    const { searchText, organizations } = this.state;
    const reg = new RegExp(searchText, 'gi');
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchText,
      selectedOrganization: organizations
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

  editOrg = async (id) => {
    const { history } = this.props;
    try {
      this.setState(prevState => ({
        ...prevState,
        loading: true,
      }));
      const res = await api.get(`/org/detail/${id}`);
      const data = _.get(res, 'data');
      if (!_.isEmpty(data)) {
        let clientUser = {
          clientUserRoles: [],
          clientUserPrivileges: [],
        };
        if (data.clientUsers && data.clientUsers.length) {
          [clientUser] = data.clientUsers;
        }
        const client = { ...data };
        client.clientPlans = [];
        client.clientUsers = [];
        history.push({
          pathname: '/admin/organisation/edit',
          state: {
            client,
            clientUser,
          },
        });
      }
    } catch (e) {
      message.error('Something went wrong');
    }
    this.setState(prevState => ({
      ...prevState,
      loading: false,
    }));
  }

  handleFilterDropdown = () => {
    const { filterDropdownVisible } = this.state;
    this.setState({
      filterDropdownVisible: !filterDropdownVisible,
    });
  };

  handleStatus = record => {
    const site = record;
    const { updateOrgStatusById } = this.props;
    site.deleted = !site.deleted;
    updateOrgStatusById(site);
  };

  render() {
    const {
      searchText, filtered, organizations, loading, selectedOrganization,
    } = this.state;
    const dataSource = (selectedOrganization.length) ? selectedOrganization : organizations;
    const scroll = (organizations.length > 8) ? { y: '70%' } : {};
    const columns = [
      {
        title: 'Org Name',
        dataIndex: 'name',
        key: 'name',
        width: '40%',
        sorter: (a, b) => columnStringSorter(a, b, 'name'),
        render: (name, obj) => <a onClick={() => this.editOrg(obj.id)}>{name}</a>,
        filterDropdown: (
          <div className="custom-filter-dropdown">
            <Input
              ref={node => {
                this.input = node;
              }}
              placeholder="Search Org Name"
              value={searchText}
              onChange={this.onInputChange}
              onPressEnter={() => this.onSearch('name')}
              style={{ width: '60%' }}
            />
            <Button type="primary" onClick={() => this.onSearch('name')}>
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
        title: 'Org OID',
        dataIndex: 'oid',
        key: 'OID',
        width: '30%',
        sorter: (a, b) => columnStringSorter(a, b, 'siteOid'),
      },
      {
        title: 'Status',
        dataIndex: 'deleted',
        key: 'status',
        render: (deleted, record) => (
          <Switch checked={!deleted} onChange={() => this.handleStatus(record)} />
        ),
      },
    ];
    const pagination = dataSource.length > 10;
    let rowKey = 0;
    const height = (50 / 100) * window.innerHeight;
    return (
      <div className="defaultDiv">
      {/* <SubjectDetails
      siteName={activeStudyOrg ? activeStudyOrg.client.name : ''} labelForOrgName="Org Name"
      studyName={activeStudy ? activeStudy.studyNumber : ''}
      labelForStudyName="Study Name"
      complianceName="Study Org Compliance" height={180}
      complianceObject = {studyOrgCompliance}
      loading = {false}
      /> */}
        <Card title="Org List" bordered={false}>
          <Table
            size="small"
            className = "defaultTable"
            columns={columns}
            dataSource={dataSource}
            pagination={pagination}
            scroll={{ y: height }}
            loading = {loading}
            rowKey = {() => { rowKey += 1; return rowKey; }}
          />
        </Card>
      </div>
    );
  }
}
OrgList.propTypes = {
  clientId: PropTypes.string.isRequired,
};

export default OrgList;
