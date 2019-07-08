const fs = require('fs');
const path = require('path');

function get_ships() {
  const db_ships = './ships';

  const files = fs.readdirSync(db_ships);

  const res = Object.create(null);
  for(let i = 0; i < files.length; ++i) {
    if(path.extname(files[i]) === '.json') {
      const rawdata = fs.readFileSync(`${db_ships}/${files[i]}`, 'utf8');
      res[path.basename(files[i], '.json')] = JSON.parse(rawdata);
    }
  }

  return res;
}

function get_parts() {
  const db_parts = './parts';
  const paths = [
    { name: 'armaments', path: `${db_parts}/armaments.json` },
    { name: 'gunports', path: `${db_parts}/gunports.json`},
    { name: 'hulls', path: `${db_parts}/hulls.json`},
    { name: 'panelings', path: `${db_parts}/panelings.json`},
    { name: 'sails', path: `${db_parts}/sails.json`},
  ];

  return get_data(paths);
}

function get_data(paths) {
  const res = Object.create(null);
  for(let i = 0; i < paths.length; ++i){
    const rawdata = fs.readFileSync(paths[i].path, 'utf8');
    res[paths[i].name] = JSON.parse(rawdata)[paths[i].name];
  }
  return res;
}

function get_skills() {
  const db_skills = './skills';
  const paths = [
    { name: 'skills_optional', path: `${db_skills}/skills-optional.json`},
    { name: 'skills_original', path: `${db_skills}/skills-original.json`},
  ];
  return get_data(paths);
}

function get_resources() {
  const res = Object.create(null);
  res["ships"] = get_ships();
  res["parts"] = get_parts();
  res["skills"] = get_skills();

  fs.writeFile(
    './res.json',
    JSON.stringify(res),
    'utf8',
    () => { console.log('>>build res.json complete'); }
  );
}

get_resources();
