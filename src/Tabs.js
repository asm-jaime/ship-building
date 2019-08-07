import React from 'react';
import './Tabs.css';

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
    res[0] = 1;
    return res;
  }

  const [tabs, setTabs] = React.useState(getStatusTabs(children));
  const displays = ['none', 'block'];
  const current = ['normal', 'bold'];


  return (
    <div>
    <div className='tab-buttons'>
    {children.map((child, i) => {
        const name = child.props.name;
        return (<button key={i}
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
      })
    }
    </div>
    {children.map((child, i) =>
      <div key={i} className='tab-area' style={{display: displays[tabs[i]]}}>
        {child}
      </div>)
    }
    </div>
  );
}

export default Tabs;
