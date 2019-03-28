import React from 'react';
import {
  Switch, Card, Table, Input, Button, Icon, message,
} from 'antd';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { columnStringSorter } from '../../utils/util';
import '../../index.less';
import api from '../../utils/api';

class ClientList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: [],
      searchText: '',
      filterDropdownVisible: false,
      filtered: false,
      loading: false,
    };
  }


  componentDidMount() {
    this.retrieveClients();
  }

  onSearch = param => {
    const { searchText } = this.state;
    let { list } = this.state;
    list = Object.values(list);
    const reg = new RegExp(searchText, 'gi');
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchText,
      clients: list
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

  editClient = async (id) => {
    const { history } = this.props;
    try {
      this.setState(prevState => ({
        ...prevState,
        loading: true,
      }));
      const res = await api.get(`/client/detail/${id}`);
      const data = _.get(res, 'data');
      if (!_.isEmpty(data)) {
        const { clientPlans } = data;
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
          pathname: '/admin/client/create',
          state: {
            client,
            clientUser,
            clientPlans,
          },
        });
      }
      history.push({
        pathname: '/admin/client/create',
        state: {
          client: res.data,
        },
      });
    } catch (e) {
      message.error('Something went wrong');
    }
    this.setState(prevState => ({
      ...prevState,
      loading: false,
    }));
  }

  retrieveClients = async () => {
    try {
      this.setState(prevState => ({
        ...prevState,
        loading: true,
      }));
      const res = await api.get('/client/');
      this.setState(prevState => ({
        ...prevState,
        clients: res.data || [],
      }));
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
    const client = record;
    // const { updateSiteStatusById } = this.props;
    client.deleted = !client.deleted;
    // updateClientStatusById(client);
  };

  render() {
    const {
      searchText, filtered, clients, loading,
    } = this.state;

    const dataSource = clients.map(client => ({
      ...client,
      name: // eslint-disable-next-line
      <a onClick={() => this.editClient(client.id)}>{client.name}</a>}));
    const scroll = (clients.length > 8) ? { y: '70%' } : {};
    const columns = [
      {
        title: 'Client Name',
        dataIndex: 'name',
        key: 'name',
        width: '40%',
        sorter: (a, b) => columnStringSorter(a, b, 'name'),
        filterDropdown: (
          <div className="custom-filter-dropdown">
            <Input
              ref={node => {
                this.input = node;
              }}
              placeholder="Search Client Name"
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
        title: 'Client OID',
        dataIndex: 'clientOid',
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
        <Card title="Site List" bordered={false} loading={ loading }>
          <Table
            size="small"
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

export default ClientList;
