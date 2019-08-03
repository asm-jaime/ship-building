import React from 'react';
import './Tabs.css';

const Tabs = (props) => {
  const [tabs, setTabs] = React.useState(
    () => {
      const res = Array
        .apply(null, {length: props.children.length})
        .map(e => 0);
      res[0] = 1;
      return res;
    }
  );
  const displays = ['none', 'block'];
  const current = ['normal', 'bold'];

  return (
    <div>
    <div className='tab-buttons'>
    {props.children.map((child, i) => {
      const name = child.props.name;
      return (<button
        className='tab-button' style={{fontWeight: current[tabs[i]]}}
        onClick={() => {
          setTabs(tabs.map((e, ti) => {
            if(ti === i) {
              return 1;
            } else {
              return 0;
            }
        }));
      }}>{name}</button>)
    })}
    </div>
    {props.children.map((child, i) =>
      <div className='tab-area' style={{display: displays[tabs[i]]}}>
        {child}
      </div>
    )}
    </div>
  );
}

export default Tabs;
