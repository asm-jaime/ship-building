const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const request = require('request');
const cheerio = require('cheerio');

const getParseName = name => (
    name.replace(/'/g, '').replace(/ /g, '-').toLowerCase()
);

const save_ship_to_file = (ship) => {
  fs.writeFile(`./Ships/${getParseName(ship.name)}.json`,
    JSON.stringify(ship), 'utf8',
    () => {
      spawn(
        '../node_modules/js-beautify/js/bin/js-beautify.js',
        ['-r', `./Ships/${getParseName(ship.name)}.json`]
      );
      console.log(`>>: ${ship.name}`);
    }
  );
}

const get_ship_name = (link) => {
  return new Promise((resolve, reject) => {
    request(link, (error, response, html) => {
      if (!error && response.statusCode === 200) {
        const dom = cheerio.load(html);
        const shipName = dom('.item0')[0]['children'][0]['attribs']['title'];

        if(shipName === '') {
          reject(`${link} empty name`);
        } else {
          resolve(shipName);
        }
      } else {
        reject(`${link} can not read`);
      }
    });
  });
}

const fix_ship_names = () => {
  const resource = 'Ships';
  const files = fs.readdirSync(resource);

  for(let i = 0; i < files.length; ++i) {
    if(path.extname(files[i]) === '.json') {
      const ship = JSON.parse(fs.readFileSync(`${resource}/${files[i]}`, 'utf8'));
      if(ship.name.search('xxx') > -1) {
        get_ship_name(ship.href)
          .then((shipName) => {
            ship.name = shipName;
            save_ship_to_file(ship);
          })
          .catch(console.log);
      }
    }
  }
};

const fix_base_hold_and_range = () => {
  const resource = 'Ships';
  const files = fs.readdirSync(resource);

  for(let i = 0; i < files.length; ++i) {
    if(path.extname(files[i]) === '.json') {
      const ship = JSON.parse(fs.readFileSync(`${resource}/${files[i]}`, 'utf8'));
      ship.hold_capacity.base = ship.hold_capacity.base +
        ship.cabine_capacity.base +
        ship.cannon_chambers_capacity.base;
      ship.hold_capacity.base_ranged = ship.hold_capacity.base;
      save_ship_to_file(ship);
    }
  }
};
