import React from 'react';
import {
    Form, Row, Col, Input, Button, Modal, Card,
} from 'antd';
import RichTextEditor from './RichTextEditor';
import PropTypes from 'prop-types';
import draftToHtml from 'draftjs-to-html';
import {
    EditorState
} from 'draft-js';
// import htmlToDraft from 'html-to-draftjs';

const FormItem = Form.Item;
let lastFocused,
    lastFocusedId,
    modalLastFocused,
    modalLastFocusedId,
    paragraphTitle;

class EditTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previewModalVisible: false,
            visible: true,
            editorState: EditorState.createEmpty(),
            ModalEditorState: EditorState.createEmpty(),
        };
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    modalOnEditorStateChange = (ModalEditorState) => {
        this.setState({
            ModalEditorState,
        });
    };


    onEditorChange = editorContent => {
        const { form: { getFieldsValue, setFieldsValue } } = this.props;
        const values = getFieldsValue();
        const body = draftToHtml(editorContent).trim();
        values.paragraphBody = body;
        setFieldsValue(values);
    };

    modalOnEditorChange = editorContent => {
        const { form: { getFieldsValue, setFieldsValue } } = this.props;
        const values = getFieldsValue();
        const body = draftToHtml(editorContent).trim();
        values.modalParagraphBody = body;
         setFieldsValue(values);
    };

    handleFocusEvent = e => {
        lastFocused = document.activeElement;
        lastFocusedId = e.target.id;
    };
    modalHandleFocusEvent = e => {
        modalLastFocused = document.activeElement;
        modalLastFocusedId = e.target.id;
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            paragraphTitle = values.title ;
            if (!err) {
                console.log('Received values of form: ',  values.paragraphBody );
            }
            console.log('Received values of form: ', values);
            this.setState({
                previewModalVisible: false,
            })
        });
    }
    handleModal = () => {
        this.setState(prevState => ({
            ...prevState,
            previewModalVisible: !prevState.previewModalVisible,


        }));
    };
    handleCancel = () => {
        this.setState({ visible: false });
    }
    render() {
        const { previewModalVisible, editorState, ModalEditorState } = this.state;
        const { form: { getFieldDecorator } } = this.props;
        const tailItemLayout = {
            wrapperCol: {
                sm: { span: 40 },
            },

        };
        return (
            <Card bordered>
                <Form>
                    <Form.Item
                        label="Title"
                        labelCol={{ span: 7 }}
                        wrapperCol={{ span: 10 }}
                    >
                        {getFieldDecorator('title', {
                            rules: [{ required: false, message: 'Please input your note!' }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <FormItem
                        label="Content"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 14 }}
                    >
                        {getFieldDecorator('paragraphBody')(
                            <RichTextEditor
                                editorState={editorState}
                                onContentStateChange={this.onEditorChange}
                                onFocus={this.handleFocusEvent}
                                editorStateChange={this.onEditorStateChange}
                            />
                        )}
                    </FormItem>
                    <Col offset={18} >
                        <FormItem>
                            {/* eslint-disable-next-line */}
                            <a style={{ color: 'rgb(59, 165, 122)', paddingRight: '1%' }} onClick={() => this.handleModal()}>
                                Add more
                                 </a>
                        </FormItem>
                    </Col>
                    <Row type="flex" gutter={10} >
                        <Col offset={10} >
                            <FormItem {...tailItemLayout}
                            >
                                <Button type="default" style={{ color: '#FE593D', marginRight: '3%' }}>
                                    close
                                </Button>
                            </FormItem>
                        </Col>
                        <Col align="right" >
                            <FormItem {...tailItemLayout}>
                                <Button type="primary" htmlType="submit" icon="check-circle" onClick={this.handleSubmit}>
                                    save
                                </Button>
                            </FormItem>
                        </Col>
                        <Modal
                            width="70%"
                            visible={previewModalVisible}
                            closable={false}
                            onCancel={() => this.handleModal('previewModalVisible')}
                            footer={<Button key="back" onClick={this.handleSubmit}>Done</Button>}
                            destroyOnClose
                        >
                            {getFieldDecorator('modalParagraphBody')(
                                <RichTextEditor
                                    editorState={ModalEditorState}
                                    onContentStateChange={this.modalOnEditorChange}
                                    onFocus={this.modalHandleFocusEvent}
                                    editorStateChange={this.modalOnEditorStateChange}
                                />
                            )}
                        </Modal>
                    </Row>
                </Form>
            </Card>
        );
    }
}

EditTemplate.propTypes = {
    form: PropTypes.instanceOf(Object).isRequired,
    history: PropTypes.instanceOf(Object).isRequired,
};
export default Form.create()(EditTemplate);
