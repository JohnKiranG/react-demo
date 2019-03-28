import React, { Component } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import {
  Layout, Card, Form, Col, Icon, Button, Modal,
} from 'antd';
import PropTypes from 'prop-types';
import _ from 'lodash';
import draftToHtml from 'draftjs-to-html';
import {
  EditorState,
} from 'draft-js';
import RichTextEditor from './RichTextEditor';
import Target from './ChapterTarget';
import Source from './ChapterSource';
import PharseData from './Data';

const { Content, Sider } = Layout;

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const grid = 10;
const getSourceListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'white',
  padding: grid,
  // width: 250,
});

const rightPan = (count, offset = 0) => Array.from({ length: count }, (v, k) => k).map(k => ({
  id: `right-${k + offset}`,
  label: `right ${k + offset}`,
}));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
let newID = 0;
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(PharseData.configData);
  const destClone = Array.from(destination);
  // const [removed] = sourceClone.splice(droppableSource.index, 1);

  const droppableDestinationProp = PharseData.configData[droppableSource.index];
  const add = {
    id: `${droppableDestinationProp.label}_${newID}`,
    type: droppableDestinationProp.type,
    modalComponent: droppableDestinationProp.modalComponent,
  };
  destClone.splice(droppableDestination.index, 0, add);
  newID += 1;
  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;
  return result;
};

class CreateChapter extends Component {
  id2List = {
    droppable: 'items',
    droppable2: 'pageItems',
  };

  constructor() {
    super();
    this.state = {
      selected: rightPan(),
      modalVisibility: false,
      modalComponent: '',
      componentName: '',
      currentPageNo: 0,
      chapterEditorState: EditorState.createEmpty(),
      pageEditorState: EditorState.createEmpty(),
      pages: [
        {
          title: '',
          pageItems: [],
        },
      ],
    };
  }

  // getList = id => this.state[this.id2List[id]];

  getList = () => {
    const { pages, currentPageNo } = this.state;
    return pages[currentPageNo].pageItems;
  }

  onDragEnd = result => {
    const { source, destination } = result;
    const { currentPageNo, pages } = this.state;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === 'droppable') {
        return;
      }

      if (source.droppableId === 'droppable2') {
        const items = reorder(
          this.getList('droppable2'),
          // this.getList(source.droppableId),
          source.index,
          destination.index,
        );
        // console.log(items);

        pages[currentPageNo].pageItems = items;
        this.setState(prevState => ({
          ...prevState,
          pages,
        }));

        // let state = { items };
        // state = { selected: items };
        // this.setState(state);
      }
    } else {
      if (destination.droppableId === 'droppable') {
        return;
      }
      const result1 = move(
        this.getList(source.droppableId),
        // this.getList(destination.droppableId),
        pages[currentPageNo].pageItems,
        source,
        destination,
        // pages[currentPageNo].pageItems,
      );

      // this.setState({
      //   items: result1.droppable,
      //   selected: result1.droppable2,
      // }, () => console.log(this.state.selected));


      pages[currentPageNo].pageItems = result1.droppable2;
      this.setState(prevState => ({
        ...prevState,
        pages,
      }));
    }
  };

  // This method will set items that are dropped on target to respective page.
  onDrop = component => {
    const { currentPageNo, pages } = this.state;
    const newComponentsList = _.concat(
      [],
      pages[currentPageNo].pageItems,
      component,
    );
    pages[currentPageNo].pageItems = newComponentsList;
    this.setState(prevState => ({
      ...prevState,
      pages,
    }));
  };

  // This method is used to delete the rendered cards
  handleCancel = (e, index) => {
    const { currentPageNo, pages } = this.state;
    const newComponent = pages[currentPageNo].pageItems.slice();
    newComponent.splice(index, 1);
    pages[currentPageNo].pageItems = newComponent;
    this.setState(prevState => ({
      ...prevState,
      pages,
    }));

    // const { selected } = this.state;
    // const newComponent1 = selected.slice();
    // newComponent1.splice(index, 1);
    // this.setState(prevState => ({
    //   ...prevState,
    //   selected: newComponent1,
    // }));
  };

  // This method is used to set the indexes of moved cards
  moveCard = (oldIndex, newIndex) => {
    const { currentPageNo, pages } = this.state;
    const component = _.concat([], pages[currentPageNo].pageItems);
    _.remove(component, (n, index) => {
      if (index === oldIndex) {
        return true;
      }
      return false;
    });
    const componentToMove = pages[currentPageNo].pageItems[oldIndex];
    if (oldIndex < newIndex) {
      // 2 to 4
      const modifiedNewIndex = newIndex;
      component.splice(modifiedNewIndex, 0, componentToMove);
    } else if (oldIndex > newIndex) {
      // 4 to 2
      component.splice(newIndex, 0, componentToMove);
    } else if (oldIndex === newIndex) {
      return;
    }
    pages[currentPageNo].pageItems = component;
    this.setState(prevState => ({
      ...prevState,
      pages,
    }));
  };

  // This method sets the respective card component to the modal.
  showModal = (modalComponent, componentName) => {
    this.setState({
      modalVisibility: true,
      modalComponent,
      componentName,
    });
  };

  // This method hides the modal window.
  hideModal = () => {
    this.setState({
      modalVisibility: false,
    });
  };

  // This method creates new page for the chapter and moves to that chapter
  createNewPage = () => {
    const newPage = [
      {
        component: Target,
        title: '',
        pageItems: [],
      },
    ];
    const { pages } = this.state;
    this.setState({
      pages: _.concat(pages, newPage),
      currentPageNo: pages.length,
    });
  };

  // This method moves to changed page
  handlePageChange = currentPageNo => {
    this.setState({
      currentPageNo,
    });
  };

  // This method is used to swap the page to its left
  movePageLeft = () => {
    const { currentPageNo, pages } = this.state;
    const loPage1 = pages[currentPageNo - 1];
    pages[currentPageNo - 1] = pages[currentPageNo];
    pages[currentPageNo] = loPage1;
    this.setState(prevState => ({
      ...prevState,
      pages,
      currentPageNo: currentPageNo - 1,
    }));
  };

  // This method is used to swap the page to its right
  movePageRight = () => {
    const { currentPageNo, pages } = this.state;
    const loPage1 = pages[currentPageNo + 1];
    pages[currentPageNo + 1] = pages[currentPageNo];
    pages[currentPageNo] = loPage1;
    this.setState(prevState => ({
      ...prevState,
      pages,
      currentPageNo: currentPageNo + 1,
    }));
  };

  // method to delete page
  deletePage = pageNo => {
    const { pages } = this.state;
    let newArray = _.filter(pages, (obj, index) => index !== pageNo);
    let newPageNo;
    if (pageNo === 0) {
      newPageNo = 0;
      if (pages.length === 1) {
        newArray = [
          {
            component: Target,
            title: '',
            pageItems: [],
          },
        ];
      }
    } else {
      newPageNo = pageNo - 1;
    }
    this.setState(prevState => ({
      ...prevState,
      pages: newArray,
      currentPageNo: newPageNo,
    }));
  }

  // method to set get field decorator of chapter rich text editor
  onChapterEditorChange = editorContent => {
    const { form: { getFieldsValue, setFieldsValue } } = this.props;
    const values = getFieldsValue();
    const body = draftToHtml(editorContent).trim();
    values.chapterTitle = body;
    setFieldsValue(values);
  };

  // method to set state of chapter editor
  onChapterEditorStateChange = (editorState) => {
    this.setState({
      chapterEditorState: editorState,
    });
  };

  // method to set get field decorator of page rich text editor
  onPageEditorChange = editorContent => {
    const { form: { getFieldsValue, setFieldsValue } } = this.props;
    const values = getFieldsValue();
    const body = draftToHtml(editorContent).trim();
    values.pageTitle = body;
    setFieldsValue(values);
  };

  // method to set state of page editor
  onPageEditorStateChange = (editorState) => {
    this.setState({
      pageEditorState: editorState,
    });
  };

  render() {
    const {
      selected,
      modalVisibility,
      modalComponent,
      componentName,
      pages,
      currentPageNo,
      chapterEditorState,
      pageEditorState,
    } = this.state;
    const Val = modalComponent;
    const { pageItems } = pages[currentPageNo];
    const totalPages = pages.length;
    const { form } = this.props;
    return (
      <div>
        <Form layout="inline" onSubmit={this.handleSubmit} >
          <Layout style={{ padding: '15px' }}>
{/* ------------------------------Sider Draggable Items-----------------------------------  */}
        <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable
          droppableId="droppable"
          // isDropDisabled={this.state.dropDisabled}
        >
          {(provided, snapshot) => (
            <Card bordered={false} style={{ background: 'slategray' }}>
            <Sider theme="light">
            <div
              ref={provided.innerRef}
              style={getSourceListStyle(snapshot.isDraggingOver)}>
                <Source/>
              {provided.placeholder}
            </div>
            </Sider>
            </Card>
          )}
        </Droppable>

            <Content style={{ marginLeft: 10, overflowX: 'inherit' }}>
                <Card>
{/* ------------------------------Chapter Title Input Box-----------------------------------  */}
                  <Col span={21}>
                    <Form.Item label="Chapter" {...formItemLayout}>
                      {form.getFieldDecorator('chapterTitle', {
                        rules: [
                          {
                            max: 500,
                            //   message: warningMessage,
                          },
                          {
                            required: true,
                            message: 'Please Enter Chapter title',
                          },
                        ],
                      })(<RichTextEditor
                        editorState={chapterEditorState}
                        onContentStateChange={this.onChapterEditorChange}
                        onEditorStateChange={this.onChapterEditorStateChange}
                    />)}
                    </Form.Item>
                  </Col>
{/* ------------------------------Total Save Button-----------------------------------  */}
                  <Col span={2} offset={1}>
                    <Form.Item>
                      <Button>
                        <Icon type="save" />
                      </Button>
                    </Form.Item>
                  </Col>
                </Card>
{/* ------------------------------Target Container-----------------------------------  */}
              {/* <Droppable
                droppableId="droppable2"
              >
                {(provided, snapshot) => (
                   <div
                   ref={provided.innerRef}
                   style={getTargetListStyle(snapshot.isDraggingOver)}>
                   <Target
                      selected={selected}
                      onDrop={this.onDrop}
                      pageItems={pageItems}
                      moveCard={this.moveCard}
                      handleCancel={this.handleCancel}
                      showModal={this.showModal}
                      form={form}
                      currentPageNo={currentPageNo + 1}
                      totalPages={totalPages}
                      createNewPage={this.createNewPage}
                      handlePageChange={this.handlePageChange}
                      movePageLeft={this.movePageLeft}
                      movePageRight={this.movePageRight}
                      deletePage={this.deletePage}
                      pageEditorState={pageEditorState}
                      onPageEditorChange={this.onPageEditorChange}
                      onPageEditorStateChange={this.onPageEditorStateChange}
                    />
                   {provided.placeholder}
                 </div>
                )}
              </Droppable> */}
              <Target
                 selected={selected}
                 onDrop={this.onDrop}
                 pageItems={pageItems}
                 moveCard={this.moveCard}
                 handleCancel={this.handleCancel}
                 showModal={this.showModal}
                 form={form}
                 currentPageNo={currentPageNo + 1}
                 totalPages={totalPages}
                 createNewPage={this.createNewPage}
                 handlePageChange={this.handlePageChange}
                 movePageLeft={this.movePageLeft}
                 movePageRight={this.movePageRight}
                 deletePage={this.deletePage}
                 pageEditorState={pageEditorState}
                 onPageEditorChange={this.onPageEditorChange}
                 onPageEditorStateChange={this.onPageEditorStateChange}
               />
                {/* <Droppable
              droppableId="droppable2"
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getTargetListStyle(snapshot.isDraggingOver)}>
                  {selected.map((item, index) => (
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
                          {this.setContType(item.type)}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable> */}
{/* ------------------------------Modal Window-----------------------------------  */}
                <Modal
                  title={componentName}
                  visible={modalVisibility}
                  onOk={this.hideModal}
                  onCancel={this.hideModal}
                  width={1000}
                  style={{ top: '20px' }}
                >
                  <Val type={componentName}/>
                </Modal>
            </Content>
          </DragDropContext>
          </Layout>
        </Form>
      </div>
    );
  }
}

CreateChapter.propTypes = {
  form: PropTypes.instanceOf(Object).isRequired,
};

const CreateChapterForm = Form.create()(CreateChapter);
// const WrapperApp = DragDropContext(HTML5Backend)(CreateChapterForm);
export default CreateChapterForm;
