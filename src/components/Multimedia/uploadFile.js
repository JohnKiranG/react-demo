import React from 'react';
import {
  Upload,
  Icon,
  Modal,
  Button,
  Popconfirm,
  Input,
  Row,
  Col,
  Form,
  message,
} from 'antd';
import Preview from './preview';
import PropTypes from 'prop-types';

const FormItem = Form.Item;

const InputArea = props => {
  const {getFieldDecorator} = props;
  return (
    <FormItem>
      {getFieldDecorator ('id', {}) (<Input placeholder="Enter URL..." />)}
    </FormItem>
  );
};

class UploadFile extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [],
    };
  }

  handleCancel = () => this.setState ({previewVisible: false});

  handlePreview = file => {
    this.setState ({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handleChange = file => {
    this.setState ({fileList: file.fileList});
  };

  handleClick = () => {
    const val = this.props.form.getFieldValue ('id');
    this.props.form.resetFields ();
    const obj = {url: val, uid: Math.random ()};
    const {fileList} = this.state;
    fileList.push (obj);
    this.setState ({fileList});
    // console.log (val);
  };

  render () {
    const {type} = this.props;
    const {previewVisible, fileList, previewImage} = this.state;
    const {getFieldDecorator} = this.props.form;

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div>Upload File</div>
      </div>
    );

    const uploadUrl = (
      <div>
        <Icon type="plus" />
        <div>Upload URL</div>
      </div>
    );

    return (
      <div>
        <Row type="flex" gutter={7}>
          <Modal
            visible={previewVisible}
            footer={null}
            onCancel={this.handleCancel}
            width="50%"
            heigth="50%"
          >
            <Preview type={type} previewImage={previewImage} />
          </Modal>
        </Row>
        <Row type="flex" gutter={7}>
          <Upload
            name="file"
            action="//jsonplaceholder.typicode.com/posts/"
            listType="picture-card"
            fileList={fileList}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
            multiple={true}
          >
            {uploadButton}
          </Upload>
          <Popconfirm
            placement="topLeft"
            title={<InputArea getFieldDecorator={getFieldDecorator} />}
            onConfirm={() => this.handleClick ()}
            icon={<Icon />}
          >
            <Button
              type="dashed"
              style={{height: '103px', backgroundColor: ''}}
            >
              {uploadUrl}
            </Button>
          </Popconfirm>

        </Row>
      </div>
    );
  }
}

UploadFile.defaultProps = {
  type: 'image',
};

UploadFile.propTypes = {
  type: PropTypes.string.isRequired,
};

const MediaInput = Form.create () (UploadFile);

export default MediaInput;
