import React from 'react';
// import { DragSource } from 'react-dnd';
import { Draggable } from 'react-beautiful-dnd';
import { Card } from 'antd';
import PharseData from './Data';
// import siderComponents from './SiderComponents';
import './chapter.less';

// const components = Object.keys(siderComponents);

const grid = 5;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  // padding: grid * 2,
  padding: 1,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'white',
  // border: '1px solid',

  // styles we need to apply on draggables
  ...draggableStyle,
});

class Source extends React.Component {
  state = {
    items: PharseData.configData,
  };

  render() {
    const { items } = this.state;
    return (
      <div>
          {items.map((item, index) => (
            <Draggable
              key={item.id}
              draggableId={item.id}
              index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={getItemStyle(
                    snapshot.isDragging,
                    provided.draggableProps.style,
                  )}>
                  <Card hoverable
                    style={{
                      background: snapshot.isDragging ? 'lightgreen' : 'white',
                      border: snapshot.isDragging ? '1px lightgreen' : '1px solid #e4e2e2',
                      // userSelect: 'none',
                      // padding: 5,
                      // margin: `0 0 ${grid}px 0`,
                    }}
                    bodyStyle={{ padding: '6%' }}
                  >
                  <i className={item.icon} />
                  <span data-type={item.type} className="pan-text">{item.label}</span>
                  </Card>
                </div>
              )}
              </Draggable>
          ))}
      </div>
    );
  }
}

// const spec = {
//   beginDrag(props) {
//     const item = { ...props };
//     return item;
//   },
// };

// const collect = (connect, monitor) => ({
//   connectDragSource: connect.dragSource(),
//   isDragging: monitor.isDragging(),
// });

// syntax DragSource( type, spec, collect )(component)
// const ListItem = DragSource('form-elements', spec, collect)(props => {
//   const { connectDragSource, component } = props;
// return connectDragSource(<div>
// {/* <Card hoverable className="sourcelist">&nbsp;<b>{component}</b></Card> */}
// </div>
// );
// });

export default Source;
