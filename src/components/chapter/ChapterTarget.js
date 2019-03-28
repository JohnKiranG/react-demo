import React, { Component } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import {
  Card, Form, Row, Col,
  Button, Pagination, Icon, Popconfirm,
} from 'antd';
import PropTypes from 'prop-types';
import _ from 'lodash';
import RichTextEditor from './RichTextEditor';
import Items from './Items';
import './chapter.less';

const getTargetListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  // padding: grid,
  // width: 250,
  minHeight: '100%',
  textAlign: 'center',
});

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  // padding: grid * 2,
  padding: 5,
  // margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'lightgrey',
  // border: '1px solid',

  // styles we need to apply on draggables
  ...draggableStyle,
});

class Target extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reorderVisbility: false,
    };
  }

  // This method sends changed page no. to parent class
  onChange = pageNo => {
    const { handlePageChange } = this.props;
    handlePageChange(pageNo - 1);
  };

  // This method sets visibility for re-order button
  setVisbility = () => {
    this.setState(state => ({
      reorderVisbility: !state.reorderVisbility,
    }));
  };

  render() {
    const {
      pageItems,
      handleCancel,
      showModal,
      form,
      currentPageNo,
      totalPages,
      deletePage,
      createNewPage,
      movePageLeft,
      movePageRight,
      pageEditorState,
      onPageEditorChange,
      onPageEditorStateChange,
    } = this.props;
    const { reorderVisbility } = this.state;

    let leftPageDisable = false;
    let rightPageDisable = false;
    let addPageDisable = true;

    if (currentPageNo === 1) {
      leftPageDisable = true;
    }

    if (currentPageNo === totalPages) {
      rightPageDisable = true;
      addPageDisable = false;
    }

    return (
      <div style={{ minHeight: '85vh', paddingTop: 10 }}>
        <Card style={{ minHeight: '85vh' }}>
{/* ------------------------------Page Title-----------------------------------  */}
          <Row>
            <Col span={21}>
              <Form.Item label="Page Name">
                {form.getFieldDecorator('pageTitle', {
                  rules: [
                    {
                      max: 500,
                      //   message: warningMessage,
                    },
                    {
                      required: true,
                      message: 'Please Enter Page Name',
                    },
                  ],
                })(
                  <RichTextEditor
                    editorState={pageEditorState}
                    onContentStateChange={onPageEditorChange}
                    onEditorStateChange={onPageEditorStateChange}
                  />,
                )}
              </Form.Item>
            </Col>
{/* ------------------------------Page Delete-----------------------------------  */}
            <Col span={2} offset={1}>
              <Popconfirm
                title="Sure to delete page?"
                onConfirm={() => {
                  deletePage(currentPageNo - 1);
                }}
              >
                <Button
                  title="Delete page"
                  type="danger"
                  icon="delete"
                  shape="circle"
                />
              </Popconfirm>
            </Col>
          </Row>
          <br />
{/* ------------------------------Message-----------------------------------  */}
          <Row className="droppedItems">
            <Droppable
              droppableId="droppable2"
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getTargetListStyle(snapshot.isDraggingOver)}>
                  {!_.isEmpty(pageItems)

                    ? pageItems.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}>
                      {(provided1, snapshot1) => (
                        <div
                          ref={provided1.innerRef}
                          {...provided1.draggableProps}
                          {...provided1.dragHandleProps}
                          style={getItemStyle(
                            snapshot1.isDragging,
                            provided1.draggableProps.style,
                          )}>
                          {/* {this.setContType(item.type, index, handleCancel, item)} */}
                          <Items
                            index = { index }
                            handleCancel = { handleCancel }
                            componentName = { item.type }
                            modalComponent = { item.modalComponent }
                            showModal = { showModal}
                          />
                        </div>
                      )}
                    </Draggable>
                    ))
                    : <div className="dndInstruction">
                  Drag and drop components <br />
                  to add to this chapter
                  <br />
                </div>

                          }
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Row>
          <br />
{/* ---------------------Footer with buttons and pagination---------------------  */}
          <Row>
            <Col span={2}>
              <Button onClick={this.setVisbility}>Re-order</Button>
            </Col>
            <Col span={12} offset={1}>
              {reorderVisbility ? (
                <span>
                  <Button
                    disabled={leftPageDisable}
                    onClick={() => movePageLeft()}
                  >
                    <Icon type="left" />
                  </Button>
                  &nbsp;
                  <Button
                    disabled={rightPageDisable}
                    onClick={() => movePageRight()}
                  >
                    <Icon type="right" />
                  </Button>
                </span>
              ) : (
                ''
              )}
            </Col>
            <Col span={2} offset={1}>
              <Button disabled={addPageDisable} onClick={() => createNewPage()}>
                Add Page
              </Button>
            </Col>
            <Col span={5} offset={1} style={{ marginTop: 4 }}>
              <Pagination
                simple
                defaultCurrent={1}
                current={currentPageNo}
                total={totalPages * 10}
                onChange={pageNo => this.onChange(pageNo)}
              />
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

// const spec = {
//   drop(props, monitor) {
//     const item = monitor.getItem();
//     props.onDrop(item);
//     return item;
//   },
// };
// const collect = connect => ({
//   connectDropTarget: connect.dropTarget(),
// });

Target.propTypes = {
  selected: PropTypes.instanceOf(Array).isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  pageItems: PropTypes.instanceOf(Array).isRequired,
  handleCancel: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  form: PropTypes.instanceOf(Object).isRequired,
  createNewPage: PropTypes.func.isRequired,
  deletePage: PropTypes.func.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  currentPageNo: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  movePageLeft: PropTypes.func.isRequired,
  movePageRight: PropTypes.func.isRequired,
  onPageEditorChange: PropTypes.func.isRequired,
  onPageEditorStateChange: PropTypes.func.isRequired,
  pageEditorState: PropTypes.instanceOf(Object).isRequired,
};

// syntax DropTarget( type, spec, collect )(component)
// export default DropTarget('form-elements', spec, collect)(Target);
export default Target;
