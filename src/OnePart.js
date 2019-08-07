import React from 'react';
import './OnePart.css';

import Tabs from './Tabs';

import {
  SHIP_PART_EMPTY,
  IMPROVEABLE_PROPERTIES,
  STATUS_SHOW
} from './constants';

// get the only tabs for resources what's contain non-zero stats
const getTabs = (resource) => {
  const tabs = [];
  const keys = Object.keys(resource);
  for(let i = 0; i < IMPROVEABLE_PROPERTIES.length; ++i) {
    const tab = [];
    for(let k = 0; k < keys.length; ++k) {
      if( resource[keys[k]]['stats_ranges'][i][0] !== 0 ||
          resource[keys[k]]['stats_ranges'][i][1] !== 0 ) {
        tab.push(keys[k]);
      }
    }
    if(tab.length > 0) {
      tabs.push({name: IMPROVEABLE_PROPERTIES[i], tab});
    }
  }
  return tabs;
}

const SelectPart = (props) => {
  return <div className='select-area' name={props.name}>{
    props.data.map((id, i) => (
      <img
        className='select-item'
        key={i}
        src={props.resource[id]['img']}
        title={props.resource[id]['name']} alt={id}
        onClick={() => props.click(id)}
      ></img>)
    )
  }</div>
};

const OnePart = (props) => {
  const tabs = getTabs(props.resource).map((tab, i) =>
    <SelectPart key={i}
      name={<img src={`./i_${tab['name']}.png`} alt={tab['name']}/>}
      description={'kek'}
      resource={props.resource} data={tab['tab']}
      click={(key) => {
        props.set(key);
        props.show();
      }}
    />
  );
  const getIconPart = () => {
    if(props.part === SHIP_PART_EMPTY) {
      return <img className='icon-part'
      src={SHIP_PART_EMPTY}
      onClick={() => props.show()}
      alt={props.part} title={props.name}/>;
    } else {
      return <img className='icon-part'
      src={props.resource[props.part]['img']}
      onClick={() => props.show()}
      alt={props.part} title={props.resource[props.part]['name']}></img>;
    }
  };

  return (
    <div>
      {getIconPart()}
      <div className='select-panel' style={{display: STATUS_SHOW[props.status]}}>
        <Tabs>
          <SelectPart name={props.name}
            resource={props.resource}
            data={Object.keys(props.resource)}
            click={(key) => {
              props.set(key);
              props.show();
            }}
          />
        {tabs}
        </Tabs>
      </div>
    </div>
  )
};

export default OnePart;
