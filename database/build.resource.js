const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const get_array_resource = (resource) => {
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

const make_json_resources = (resources) => {
  const result = resources.map(resource => {
    const res = Object.create(null);
    res[resource] = get_array_resource(`./${resource}`);
    return res;
  });

  fs.writeFile(
    '../public/resource.json',
    JSON.stringify(result),
    'utf8',
    () => {
      console.log('>>build resource.json complete');
    }
  );
};

const get_object_resource = (resource) => {
  const result = Object.create(null);
  const files = fs.readdirSync(resource);

  for(let i = 0; i < files.length; ++i) {
    if(path.extname(files[i]) === '.json') {
      const data = JSON.parse(fs.readFileSync(`${resource}/${files[i]}`, 'utf8'));
      result[data['id']] = data;
    }
  }

  return result;
};

const make_index_resources = (resources) => {
  const result = resources.map(resource => {
    const res = Object.create(null);
    res[resource] = get_object_resource(`./${resource}`);
    return res;
  });

  for(let i = 0; i < result.length; ++i) {
    fs.writeFile(
      `../src/res${resources[i]}.js`,
      `export default ${JSON.stringify(result[i][resources[i]])};`,
      'utf8',
      () => {
        spawn('js-beautify', [ '-r', `../src/res${resources[i]}.js` ]);
        console.log(`>>build res${resources[i]}.js has been completed`);
      }
    );
  }
};

make_json_resources([
  'Ships'
]);

make_index_resources([
  'Armaments',
  'Gunports',
  'Hulls',
  'Panels',
  'Sails',
  'Skills',
  'SkillsGrade'
]);
