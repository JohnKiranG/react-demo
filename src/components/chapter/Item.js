import React, { Component } from 'react';
import { Button, Card, Col } from 'antd';
import { DropTarget, DragSource } from 'react-dnd';
import PropTypes from 'prop-types';
import './chapter.less';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onHover: false,
    };
  }

  // This method is used to handle the component to be rendered in modal
  handleClick = (e, modalComponent, componentName) => {
    const { showModal } = this.props;
    showModal(modalComponent, componentName);
  };

  // empty handler to handle error
  onKeyDown = () => {}

  render() {
    const {
      modalComponent,
      componentName,
      index,
      connectDragSource,
      connectDropTarget,
      connectDragPreview,
      handleCancel,
    } = this.props;
    const { onHover } = this.state;
    return connectDropTarget(
      <div>
        {connectDragSource(
          <div>
            {connectDragPreview(
              <div className={`item ${onHover ? 'onHover' : ''}`}>
                <Card className="item" hoverable>
{/* -----------------------------Tap to conig-----------------------------------  */}
                  <Col span={21}>
                    <div className="config"
                      onClick={e => this.handleClick(e, modalComponent, componentName) }
                      onKeyDown={this.onKeyDown}
                      role = "button"
                    >
                      Tap to configure&nbsp;{componentName}
                    </div>
                  </Col>
{/* ------------------------------Delete Button-----------------------------------  */}
                  <Col span={2} offset={1}>
                    <Button
                      type="danger"
                      title="Delete"
                      shape="circle"
                      icon= "delete"
                      onClick={e => handleCancel(e, index)}
                    />
                  </Col>
                </Card>
              </div>,
            )}
          </div>,
        )}
      </div>,
    );
  }
}

Item.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  modalComponent: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  componentName: PropTypes.string.isRequired,
};

export default DropTarget(
  'ITEM',
  {
    drop(props, monitor) {
      const item = monitor.getItem();
      const newIndex = props.index;
      const oldIndex = item.index;
      props.moveCard(oldIndex, newIndex);
      return item;
    },
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  }),
)(
  DragSource(
    'ITEM',
    {
      beginDrag(props) {
        const item = {
          ...props,
        };
        return item;
      },
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      connectDragPreview: connect.dragPreview(),
      isDragging: monitor.isDragging(),
    }),
  )(Item),
);
