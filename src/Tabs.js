import React from 'react';
import './Tabs.css';

import { SOUND_CLICK } from './constants';

const Tabs = (props) => {
  const getNormalChilds = (children) => {
    // just one or empty child
    if(children.hasOwnProperty('length') === false) {
      return [children];
    }

    let result = [];
    for(let i = 0; i < children.length; ++i){
      if(children[i].hasOwnProperty('length')) {
        result = result.concat(children[i]);
        continue;
      }
      result.push(children[i]);
    }

    return result;
  };
  const children = getNormalChilds(props.children);

  const getStatusTabs = (children) => {
    const res = Array
      .apply(null, {length: children.length})
      .map(e => 0);
    //make one tab active at first
    res[0] = 1;
    return res;
  }

  const newTabs = getStatusTabs(children);
  const [tabs, setTabs] = React.useState(getStatusTabs(children));

  const displays = ['none', 'block'];
  const current = ['normal', 'bold'];

  return <div className='tabs'>
    <div className='tab-buttons'>
    {children.map((child, i) => {
        const name = child.props.name;
        return (<button key={i}
          className='tab-button' style={{fontWeight: current[tabs[i]]}}
          onClick={() => {
            setTabs(newTabs.map((e, ti) => {
              SOUND_CLICK.play();
              if(ti === i) {
                return 1;
              } else {
                return 0;
              }
          }));
        }}>{name}</button>)
      })
    }
    </div>
    {children.map((child, i) =>
      <div key={i} style={{display: displays[tabs[i]]}}>
        {child}
      </div>)
    }
  </div>;
}

export default Tabs;
