import React from 'react';
import './Tabs.css';


export const TabbedArea = (props) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const tabNodes = props.children.map((child, index) => {
    return (
      <div className='tab-node' key={index} onClick={() => setActiveIndex(index)}>
        <a stype={{active: activeIndex === index }} href='#/'>
          {child.props.display}
        </a>
      </div>
    );
  });

  const contentNodes = props.children.map((child, index) => {
    if(activeIndex === index) {
      return (
        <div key={index} className='tab-pane'>
          {child.props.children}
        </div>
      );
    }
    return child;
  });

  return (
    <div className='tabbed-area'>
      <div className='tab clearfix'>
        {tabNodes}
      </div>
      {contentNodes}
    </div>
  );
};

export const TabPane = (props) => {
  const active = props.active || false;
  if (active) {
    return this.props.children;
  } else {
    return null;
  }
};
