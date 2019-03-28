import React from 'react';
import {
  Card, Col, Tooltip, Button, Icon, Table,
  Form, Input, Select, Popconfirm,
} from 'antd';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DragableRow from './DragableRow';

const FormItem = Form.Item;
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 10 },
  },
};

class CreateConsent extends React.Component {
  state = {
    dataSource: [
      {
        key: '1',
        title: 'Mike',
      },
      {
        key: '2',
        title: 'John',
      },
    ],
  };

  components = {
    body: {
      row: DragableRow,
    },
  };

  moveRow = (dragIndex, hoverIndex) => {
    const { dataSource } = this.state;
    const dragRow = dataSource[dragIndex];
    const { state } = this;
    this.setState(
      update(state, {
        dataSource: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]],
        },
      }),
    );
  };

  deleteField = record => {
    const { dataSource } = this.state;
    const arr = [];
    dataSource.map(value => {
      if (value.key !== record.key) arr.push(value);
      return '';
    });
    this.setState({
      dataSource: arr,
    });
  };

  render() {
    const columns = [
      {
        title: 'Chapters',
        dataIndex: 'title',
        key: 'title',
        width: '80%',
      },
      {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
        width: '20%',
        align: 'center',
      },
    ];

    columns[1].render = (value, record) => (
      <Popconfirm
        title="Sure to delete?"
        onConfirm={() => {
          this.deleteField(record);
        }}
      >
        <Button size="small" type="danger" icon="delete" shape="circle" />
      </Popconfirm>
    );

    const { form: { getFieldDecorator } } = this.props;
    const { dataSource } = this.state;
    return (
      <Card title="Create Consent" bordered={false}>
{/* ------------------------------Consent Title-----------------------------------  */}
        <Form layout="horizontal" onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="Title">
            {getFieldDecorator('consentTitle', {
              rules: [
                {
                  max: 500,
                  //   message: warningMessage,
                },
                {
                  required: true,
                  message: 'Please Enter Consent title',
                },
              ],
            })(<Input placeholder="Enter Consent title here..." />)}
          </FormItem>
{/* ----------------------------Consent Type-----------------------------------  */}
          <FormItem {...formItemLayout} label="Type">
            {getFieldDecorator('type', {
              rules: [
                // {
                //   max: 500,
                // //   message: warningMessage,
                // },
                {
                  required: true,
                  message: 'Please Select Consent Type',
                },
              ],
            })(
              <Select
                showSearch
                mode="single"
                placeholder="Select Type"
                // onChange={option => {
                //   setVisibility(option, fieldRuleNumber);
                // }}
              >
                <Option value="consent">Consent</Option>
                <Option value="reconsent">Re-Consent</Option>
              </Select>,
            )}
          </FormItem>
{/* -------------------------Create Chapter Button-----------------------------------  */}
          <Col align="right" style={{ paddingBottom: 5 }}>
            <Button>
              <Icon type="plus-circle" /> Create Chapter
            </Button>
            &nbsp;
            <Tooltip title="Reload">
              <Button>
                <Icon type="sync" />
              </Button>
            </Tooltip>
          </Col>
{/* --------------------------Chapters List-----------------------------------  */}
          <Table
            size="size"
            className="defaultTable"
            // loading={loading}
            dataSource={dataSource}
            columns={columns}
            pagination={{ pageSize: 10 }}
            components={this.components}
            onRow={(record, index) => ({
              index,
              moveRow: this.moveRow,
            })}
            // scroll={{ y: height }}
            // rowKey={() => { rowKey += 1; return rowKey; }}
          />
{/* ------------------------------Save Button-----------------------------------  */}
          <FormItem>
            <Button type="primary" icon="check-circle" htmlType="submit">
              Save
            </Button>
          </FormItem>
        </Form>
      </Card>
    );
  }
}

CreateConsent.propTypes = {
  form: PropTypes.instanceOf(Object).isRequired,
};

const CreateConsentForm = Form.create()(CreateConsent);
const Demo = DragDropContext(HTML5Backend)(CreateConsentForm);

export default Demo;
