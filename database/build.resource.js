const fs = require('fs');
const path = require('path');

const get_resource = (resource) => {
  const result = [];
  const files = fs.readdirSync(resource);

  for(let i = 0; i < files.length; ++i) {
    if(path.extname(files[i]) === '.json') {
      const rawdata = fs.readFileSync(`${resource}/${files[i]}`, 'utf8');
      result.push(JSON.parse(rawdata));
    }
  }

  return result;
};

const get_resources = (resources) => {
  const result = resources.map(resource => {
    const res = Object.create(null);
    res[resource] = get_resource(`./${resource}`);
    return res;
  });

  fs.writeFile(
    '../public/resource.json',
    JSON.stringify(result),
    'utf8',
    () => { console.log('>>build resource.json complete'); }
  );
};

get_resources([
  'armaments',
  'gunports',
  'hulls',
  'panelings',
  'sails',
  'skills',
  'skills_grade',
  'ships'
]);
