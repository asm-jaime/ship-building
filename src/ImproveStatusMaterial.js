import React from 'react';
import './ImproveStatusMaterial.css';

const ImproveMaterial = (props) => {
  return (
    <div className="improve-material">
    <img className="icon" src={`./i_material.png`} alt="material"></img>
    <div>{props.material.name}</div>
    </div>
  );
}

export default ImproveMaterial;
