import React from 'react';
import {
  Table, Input, Button, Icon, Switch, Card,
} from 'antd';
import { columnStringSorter } from '../utils/util';
import '../index.less';

const data = [
  {
    name: 'Donerb',
    roles: 'principle investigator , cro',
    status: true,
  },
  {
    name: 'Doner bird',
    roles: 'sponsor staff',
    status: false,
  },
  {
    name: 'Mattew',
    roles: 'network administrator',
    status: false,
  },
];
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: data,
      searchText: '',
      filterDropdownVisible: false,
      filtered: false,
    };
  }

  onSearch = param => {
    const { searchText, dataSource } = this.state;
    const reg = new RegExp(searchText, 'gi');
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchText,
      dataSource: dataSource
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

  render() {
    const {
      dataSource, searchText, filterDropdownVisible, filtered,
    } = this.state;
    const pagination = dataSource.length >= 8;
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '30%',
        sorter: (a, b) => columnStringSorter(a, b, 'name'),
        filterDropdown: (
          <div className="custom-filter-dropdown">
            <Input
              ref={node => {
                this.input = node;
              }}
              placeholder="Search Name"
              value={searchText}
              onChange={this.onInputChange}
              onPressEnter={this.onSearch}
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
        filterDropdownVisible,
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
        title: 'Role',
        dataIndex: 'roles',
        key: 'roles',
        width: '40%',
        sorter: (a, b) => columnStringSorter(a, b, 'roles'),
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        width: '30%',
        render: (status) => (
            <Switch defaultChecked = {status} />
        ),

      },
    ];
    const scroll = (dataSource.length > 8) ? { y: '70%' } : {};
    return (
    <div className="defaultDiv">
    <Card title="Users" bordered={false}>
        <Table
          className="smallTable"
          size="small"
          dataSource={dataSource}
          columns={columns}
          style={{ width: '100%' }}
          pagination={pagination}
          scroll={scroll}
        />
        </Card>
      </div>
    );
  }
}
export default UserList;
