import React, { Component } from 'react';
import { Button, Card, Col } from 'antd';
import PropTypes from 'prop-types';
import './chapter.less';

class Items extends Component {
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
      handleCancel,
    } = this.props;
    const { onHover } = this.state;
    return (
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
              </div>
    );
  }
}

Items.propTypes = {
  handleCancel: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  modalComponent: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  componentName: PropTypes.string.isRequired,
};

export default Items;
