import React from 'react';
import {Tabs} from 'antd';
import WrappedUploadFile from './uploadFile';

const TabPane = Tabs.TabPane;

function callback (key) {
  //   console.log (key);
}
class MenuList extends React.Component {
  render () {
    return (
      <Tabs
        defaultActiveKey="1"
        onChange={callback}
        // style={{height: '670px'}}
      >
        <TabPane tab="Upload Image" key="1">
          {/* <div
            style={{
              border: '3px solid #366666',
              width: '400px',
              height: '400px',
              boxSizing: 'border-box',
              position: 'relative',
              left: '35%',
              top: '25%',
              overflow: 'auto',
              padding:'1%',
            }}
          > */}
            <WrappedUploadFile id="1" />
          {/* </div> */}
        </TabPane>
        <TabPane tab="Upload Audio" key="2">
          {/* <div
            style={{
              border: '3px solid #366666',
              width: '380px',
              height: '380px',
              boxSizing: 'border-box',
              position: 'relative',
              left: '35%',
              top: '25%',
              overflow: 'auto',
              padding:'1%',
            }}
          > */}
            <WrappedUploadFile id="2" />
          {/* </div> */}
        </TabPane>
        <TabPane tab="Upload Video" key="3">
          {/* <div
            style={{
              border: '3px solid #366666',
              width: '380px',
              height: '380px',
              boxSizing: 'border-box',
              position: 'relative',
              left: '35%',
              top: '25%',
              overflow: 'auto',
              padding:'1%',
            }}
          > */}
            <WrappedUploadFile id="3" />
          {/* </div> */}
        </TabPane>
      </Tabs>
    );
  }
}
export default MenuList;
