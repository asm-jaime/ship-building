import React from 'react';
import './OnePart.css';

import Tabs from './Tabs';

import { get_stat_string } from './StoreResolve';

import {
  IMPROVEABLE_PROPERTIES,
  STATUS_SHOW,
  SOUND_CLICK,
  SHIP_STAT_ICONS_IMP,
  SHIP_STAT_NAMES,
} from './constants';


// get the only tabs for resources what's contain non-zero stats
const getTabs = (resource, data) => {
  const tabs = [];
  for(let i = 0; i < IMPROVEABLE_PROPERTIES.length; ++i) {
    const tab = [];
    for(let k = 0; k < data.length; ++k) {
      if( resource[data[k]]['stats_ranges'][i][0] !== 0 ||
          resource[data[k]]['stats_ranges'][i][1] !== 0 ) {
        tab.push(data[k]);
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
        className='select-item' key={i} alt={id}
        src={props.resource[id]['img']}
        title={`${props.resource[id]['name']} ${
          get_stat_string(props.resource[id]['stats_ranges'])
        }`}
        onClick={() => props.click(id)}
      ></img>)
    )
  }</div>
};

const OnePart = (props) => {
  const tabs = getTabs(props.resource, props.data).map((tab, i) =>
    <SelectPart key={i}
      name={<img
        className='icon-stat' title={SHIP_STAT_NAMES[tab['name']]}
        src={SHIP_STAT_ICONS_IMP[tab['name']]} alt={tab['name']}
        />
      }
      resource={props.resource} data={tab['tab']}
      click={(key) => {
        props.set(key);
        props.show();
        SOUND_CLICK.play();
      }}
    />
  );

  return (
    <div>
      <img className='icon-part'
        src={props.resource[props.part]['img']}
        onClick={() => {
          props.show();
          SOUND_CLICK.play();
        }}
        alt={props.name} title={
          `${props.resource[props.part]['name']} ${
            get_stat_string(props.resource[props.part]['stats_ranges'])
          }`}
      />
      <div className='select-panel' style={{display: STATUS_SHOW[props.status]}}>
        <Tabs>
          <SelectPart name={props.name}
            resource={props.resource}
            data={props.data}
            click={(key) => {
              props.set(key);
              props.show();
              SOUND_CLICK.play();
            }}
          />
        {tabs}
        </Tabs>
      </div>
    </div>
  )
};

export default OnePart;
