import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';

let dragingIndex = -1;

class BodyRow extends React.Component {
  render() {
    const {
      isOver,
      connectDragSource,
      connectDropTarget,
      moveRow,
      ...restProps
    } = this.props;
    const style = { ...restProps.style, cursor: 'move' };

    let { className } = restProps;
    if (isOver) {
      if (restProps.index > dragingIndex) {
        className += ' drop-over-downward';
      }
      if (restProps.index < dragingIndex) {
        className += ' drop-over-upward';
      }
    }

    return connectDragSource(
      connectDropTarget(
        <tr {...restProps} className={className} style={style} />,
      ),
    );
  }
}

const rowSource = {
  beginDrag(props) {
    dragingIndex = props.index;
    return {
      index: props.index,
    };
  },
};

const rowTarget = {
  drop(props, monitor) {
    const monitor1 = monitor;
    const { index, moveRow } = props;
    const dragIndex = monitor1.getItem().index;
    const hoverIndex = index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Time to actually perform the action
    moveRow(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor1.getItem().index = hoverIndex;
  },
};

BodyRow.propTypes = {
  isOver: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  moveRow: PropTypes.func.isRequired,
};

const DragableRow = DropTarget('row', rowTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
}))(
  DragSource('row', rowSource, connect => ({
    connectDragSource: connect.dragSource(),
  }))(BodyRow),
);

export default DragableRow;
