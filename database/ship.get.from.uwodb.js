const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const request = require('request');
const cheerio = require('cheerio');

const sails = require('../src/resSails');
const armaments = require('../src/resArmaments');
const gunports = require('../src/resGunports');

const allParts = Object.assign({}, sails, armaments, gunports);

const configs = [
  {purpose: 'Adventure', grade_type: 'Expedition Ship', purpose_num: 1, is_nc:  false},
  {purpose: 'Adventure', grade_type: 'Expedition Ship', purpose_num: 10, is_nc:  true},
  {purpose: 'Trade', grade_type: 'Cargo Ship', purpose_num: 2, is_nc:  false},
  {purpose: 'Trade', grade_type: 'Cargo Ship', purpose_num: 11, is_nc:  true},
  {purpose: 'Battle', grade_type: 'Battle Ship', purpose_num: 3, is_nc:  false},
  {purpose: 'Battle', grade_type: 'Battle Ship', purpose_num: 12, is_nc:  true},
];

// here is 6x configs for scrap all type of ships, enum and run this scrip on each 0-5 num
const current_config = 5;

const template_ship = {
  "id": "",
  "img": "",
  "href": "",
  "name": "",
  "size": "",
  "purpose": configs[current_config]['purpose'],
  "levels": {"advent": 0, "trade": 0, "battle": 0},
  "days": 0,
  "sail": true,
  "steam": false,
  "is_nc": configs[current_config]['is_nc'],
  "ship_equipment": {
    "studding_sails": 0,
    "broadsides": 0,
    "special_equipment": 0,
    "bow_turret": 0,
    "extra_armouring": 0,
    "stern_turret": 0
  },
  "improvement": { "result": 0,
    "limit": {"base": 0, "add": {"limit": 0, "current": 0}, "current": 0}
  },
  "ship_handling_proficiency": {"base": 0, "grade": 0, "result": 0},
  "durability": {
    "base": 0, "improve": 0,
    "material": 0,
    "grade": 0,
    "custom": 0,
    "improve_limit": {"base": 0, "grade": 0, "current": 250},
    "result": 0
   },
  "vertical_sail": {
        "base": 0, "improve": 0,
        "material": 0,
        "grade": 0,
        "custom": 0,
        "penalty": 0,
        "improve_limit": {"base": 0, "grade": 0, "current": 110},
        "result": 0
      },
  "horizontal_sail": {
        "base": 0, "improve": 0,
        "material": 0,
        "grade": 0,
        "custom": 0,
        "penalty": 0,
        "improve_limit": {"base": 0, "grade": 0, "current": 110},
        "result": 0
      },
  "row_power": {
        "row": false,
        "base": 0, "improve": 0,
        "grade": 0,
        "custom": 0,
        "penalty": 0,
        "improve_limit": {"base": 0, "grade": 0, "current": 0},
        "result": 0
      },
  "turning_performance": {
        "base": 0, "improve": 0,
        "grade": 0,
        "custom": 0,
        "penalty": 0,
        "improve_limit": {"base": 0, "grade": 0, "current": 22},
        "result": 0
      },
  "wave_resistance": {
        "base": 0, "improve": 0,
        "grade": 0,
        "custom": 0,
        "penalty": 0,
        "improve_limit": {"base": 0, "grade": 0, "current": 21},
        "result": 0
      },
  "armouring_value": {
        "base": 0, "improve": 0,
        "grade": 0,
        "custom": 0,
        "improve_limit": {"base": 0, "grade": 0, "current": 21},
        "result": 0
      },
  "cabine_capacity": {
        "base": 0, "improve": 0,
        "grade": 0,
        "custom": 0,
        "base_ranged": 0,
        "improve_limit": {"base": 0, "grade": 0, "current": 40},
        "required": 0,
        "result": 0
      },
  "cannon_chambers_capacity": {
    "base": 0, "improve": 0,
    "grade": 0,
    "custom": 0,
    "base_ranged": 0,
    "improve_limit": {"base": 0, "grade": 0, "current": 40},
    "result": 0
  },
  "hold_capacity": {
    "base": 0,
    "improve": 0,
    "base_ranged": 0,
    "grade": 0,
    "custom": 0,
    "improve_limit": {"base": 0, "grade": 0, "current": 41},
    "result": 0
  },
  "cargo": {
    "result": 0
  },
  "material": {
    "id": "022000800",
    "name": "Beech Paneling"
  },
  "skills": {
    "available": [],
    "optional": { "limit": 2, "grade": 0, "set": [ ]},
    "inherit": [],
    "original": ""
  },
  "hulls": {
    "current": "",
    "available": []
  },
  "grade_size": 0,
  "grade_type_default": configs[current_config]['grade_type'],
  "grade": {"rank": 0, "type": configs[current_config]['grade_type'], "skills": []}
};

const getPartIdsByText = (text) => {
  const result = [];
  const names = text.split('+').map(e => e.trim());
  const ids = Object.keys(allParts);

  for (let i = 0; i < ids.length; ++i) {
    for(let n = 0; n < names.length; ++n) {
      if(allParts[ids[i]]['name'] === names[n]) {
        result.push(ids[i]);
      }
    }
  }

  return result;
};

const getParseName = name => (
    name.replace(/'/g, '').replace(/ /g, '-').toLowerCase()
);

const save_ship_to_file = (ship, resource) => {
  fs.writeFile(`./${resource}/${getParseName(ship.name)}.json`,
    JSON.stringify(ship), 'utf8',
    () => {
      spawn(
        '../node_modules/js-beautify/js/bin/js-beautify.js',
        ['-r', `./${resource}/${getParseName(ship.name)}.json`]
      );
      console.log(`>>: ${ship.name}`);
    }
  );
}

const get_ids_from_uwodbmirror = () => {
  const link = `http://uwodbmirror.ivyro.net/eg/main.php?id=145&chp=${configs[current_config]['purpose_num']}`;
  return new Promise((resolve, reject) => {
    request(link, (error, response, html) => {
      if (!error && response.statusCode === 200) {
        const result = [];
        const dom = cheerio.load(html);
        const ships = dom('.item0');
        for(let i = 0; i < ships.length; ++i) {
          try {
            const temp = ships[i]['children'][0]['attribs']['href'].split('=')[1];
            result.push(temp);
          } catch(error) {
            console.log('something wrong on: ', i);
          }
        }
        if(result.length === 0) {
          reject(`${link} empty name`);
        } else {
          resolve(result);
        }
      } else {
        reject(`${link} can not read`);
      }
    });
  });
}

const get_ids_from_database = () => {

  return new Promise((resolve, reject) => {
    const resource = 'Ships';
    const files = fs.readdirSync(resource);
    const result = [];
    for(let i = 0; i < files.length; ++i) {
      if(path.extname(files[i]) === '.json') {
        const ship = JSON.parse(fs.readFileSync(`${resource}/${files[i]}`, 'utf8'));
        if(ship.purpose === configs[current_config]['purpose']
           && ship.is_nc === configs[current_config]['is_nc']) {
          result.push(ship.id);
        }
      }
    }
    resolve(result);
  });
}

const find_nonexist_ship = () => {
  return Promise.all([get_ids_from_database(), get_ids_from_uwodbmirror()])
    .then((datas) => {
      const result = [];
      for(let i = 0; i < datas[1].length; ++i) {
        if(datas[0].find( elem => elem === datas[1][i]) === undefined){
          result.push(`http://uwodbmirror.ivyro.net/eg/main.php?id=${datas[1][i]}`);
        }
      }
      console.log(result);
      return result;
    });
};


const get_ship_handling_data = (text) => {
  const result = {
    "ship_handling_proficiency": 0,
    "size": "",
    "grade_size": 0
  };

  if(text.search('200') > -1) {
    result.ship_handling_proficiency = 200;
    result.size = 'Heavy';
    result.grade_size = 5;
  } else if(text.search('160') > -1) {
    result.ship_handling_proficiency = 160;
    result.size = 'Heavy';
    result.grade_size = 4;
  } else if(text.search('120') > -1) {
    result.ship_handling_proficiency = 120;
    result.size = 'Standard';
    result.grade_size = 3;
  } else if(text.search('80') > -1) {
    result.ship_handling_proficiency = 80;
    result.size = 'Light';
    result.grade_size = 2;
  } else if(text.search('40') > -1) {
    result.ship_handling_proficiency = 40;
    result.size = 'Light';
    result.grade_size = 1;
  }

  return result;
};

const ship_limits = [
  [90, 130, 170, 210, 250],
  [30, 50, 70, 90, 110],
  [30, 50, 70, 90, 110],
  [6, 9, 13, 17, 21],
  [6, 10, 14, 18, 22],
  [5, 9, 13, 17, 21],
  [5, 9, 13, 17, 21],
  [8, 16, 24, 32, 40],
  [8, 16, 24, 32, 40],
  [9, 17, 25, 33, 41],
];

const get_ship_from_uwodbmirror = (link) => {
  const ship = template_ship;
  return new Promise((resolve, reject) => {
    request(link, (error, response, html) => {
      if (!error && response.statusCode === 200) {
        const dom = cheerio.load(html);
        ship['img'] = dom('.item0')[0]['children'][0]['attribs']['src'].split('/')[5];
        if(ship['img'] === '') console.log('no img for', link);
        ship['id'] = link.split('=')[1];
        if(ship['id'] === '') console.log('no id for', link);
        ship['href'] = link;
        ship['name'] = dom('.item0')[0]['children'][0]['attribs']['title'];
        if(ship['name'] === '') console.log('no name for', link);

        const data_sh = get_ship_handling_data(dom('.item0').text());
        ship['ship_handling_proficiency']['base'] = data_sh['ship_handling_proficiency'];
        ship['ship_handling_proficiency']['result'] = data_sh['ship_handling_proficiency'];
        ship['size'] = data_sh['size'];
        ship['grade_size'] = data_sh['grade_size'];
        if(data_sh['size'] === '') console.log('no ship_handling for', link);
        ship['levels']['advent'] = parseInt(dom('.level1').text(), 10);
        ship['levels']['trade'] = parseInt(dom('.level2').text(), 10);
        ship['levels']['battle'] = parseInt(dom('.level3').text(), 10);


        const ship_equipment = dom('.item1').text();
        ship['ship_equipment']['studding_sails'] = parseInt(
          ship_equipment.match(/Studding Sail: \d/g)[0].match(/\d/)[0], 10
        );
        ship['ship_equipment']['broadsides'] = parseInt(
          ship_equipment.match(/Broadside: \d/g)[0].match(/\d/)[0], 10
        );
        ship['ship_equipment']['special_equipment'] = parseInt(
          ship_equipment.match(/Special Equipment: \d/g)[0].match(/\d/)[0], 10
        );
        ship['ship_equipment']['bow_turret'] = parseInt(
          ship_equipment.match(/Bow Turret: \d/g)[0].match(/\d/)[0], 10
        );
        ship['ship_equipment']['extra_armouring'] = parseInt(
          ship_equipment.match(/Extra Armouring: \d/g)[0].match(/\d/)[0], 10
        );
        ship['ship_equipment']['stern_turret'] = parseInt(
          ship_equipment.match(/Stern Turret: \d/g)[0].match(/\d/)[0], 10
        );

        try {
          ship['days'] = parseInt(dom('.item13').text().match(/\d+/g)[0], 10);
        } catch(error) {
        }
        if(ship['days'] === 0) console.log('no ship building days for', link);

        const improvements = dom('.item11');
        const improvement = improvements[Object.keys(improvements).find(e => {
          try {
            return improvements[e]['children'][1]['data'].search('Improvements') > -1;
          }catch(error) {
            return false;
          }
        })];
        if(improvement !== undefined){
          const improvement_nums = dom(improvement).text().match(/\d/g);
          ship['improvement']['limit']['base'] = parseInt(improvement_nums[0], 10);
          ship['improvement']['limit']['current'] = ship['improvement']['limit']['base'];
          if(improvement_nums.length === 2){
            ship['improvement']['limit']['add']['limit'] = parseInt(improvement_nums[1], 10);
          }
        }
        if(ship['improvement']['limit']['base'] === 0) console.log('no improve info on', link);

        ship['durability']['base'] = parseInt(dom('.state6').text(), 10);
        ship['durability']['improve_limit']['base'] = ship_limits[0][ship['grade_size'] - 1];
        ship['durability']['improve_limit']['current'] = ship['durability']['improve_limit']['base'];
        if(ship['durability']['base'] === 0) console.log('no durability info on', link);
        ship['vertical_sail']['base'] = parseInt(dom('.state0').text(), 10);
        ship['vertical_sail']['improve_limit']['base'] = ship_limits[1][ship['grade_size'] - 1];
        ship['vertical_sail']['improve_limit']['current']
          = ship['vertical_sail']['improve_limit']['base'];
        if(ship['vertical_sail']['base'] === 0) console.log('no vertical_sail info on', link);
        ship['horizontal_sail']['base'] = parseInt(dom('.state1').text(), 10);
        ship['horizontal_sail']['improve_limit']['base'] = ship_limits[2][ship['grade_size'] - 1];
        ship['horizontal_sail']['improve_limit']['current']
          = ship['horizontal_sail']['improve_limit']['base'];
        if(ship['horizontal_sail']['base'] === 0) console.log('no horizontal_sail info on', link);
        ship['row_power']['base'] = parseInt(dom('.state2').text(), 10);
        if(ship['row_power']['base'] > 0){
          ship['row_power']['row'] = true;
          ship['steam'] = false;
          ship['sail'] = false;
          ship['row_power']['improve_limit']['base'] = ship_limits[3][ship['grade_size'] - 1];
        ship['row_power']['improve_limit']['current']
          = ship['row_power']['improve_limit']['base'];
        } else {
          ship['sail'] = true;
          ship['row_power']['row'] = false;
        }
        ship['turning_performance']['base'] = parseInt(dom('.state3').text(), 10);
        ship['turning_performance']['improve_limit']['base'] = ship_limits[4][ship['grade_size'] - 1];
        ship['turning_performance']['improve_limit']['current']
          = ship['turning_performance']['improve_limit']['base'];
        if(ship['turning_performance']['base'] === 0)
          console.log('no turning_performance info on', link);
        ship['wave_resistance']['base'] = parseInt(dom('.state4').text(), 10);
        ship['wave_resistance']['improve_limit']['base'] = ship_limits[5][ship['grade_size'] - 1];
        ship['wave_resistance']['improve_limit']['current']
          = ship['wave_resistance']['improve_limit']['base'];
        if(ship['wave_resistance']['base'] === 0) console.log('no wave_resistance info on', link);
        ship['armouring_value']['base'] = parseInt(dom('.state5').text(), 10);
        ship['armouring_value']['improve_limit']['base'] = ship_limits[6][ship['grade_size'] - 1];
        ship['armouring_value']['improve_limit']['current']
          = ship['armouring_value']['improve_limit']['base'];
        if(ship['armouring_value']['base'] === 0) console.log('no armouring_value info on', link);
        const cabine_data = dom('.state7a').text().split('/');
        ship['cabine_capacity']['base'] = parseInt(cabine_data[1], 10);
        ship['cabine_capacity']['improve_limit']['base'] = ship_limits[7][ship['grade_size'] - 1];
        ship['cabine_capacity']['improve_limit']['current']
          = ship['cabine_capacity']['improve_limit']['base'];
        ship['cabine_capacity']['base_ranged'] = ship['cabine_capacity']['base'];
        ship['cabine_capacity']['required'] = parseInt(cabine_data[0], 10);
        if(ship['cabine_capacity']['base'] === 0) console.log('no cabine_capacity info on', link);
        ship['cannon_chambers_capacity']['base'] = parseInt(dom('.state8').text(), 10);
        ship['cannon_chambers_capacity']['base_ranged'] = ship['cannon_chambers_capacity']['base'];
        ship['cannon_chambers_capacity']['improve_limit']['base']
          = ship_limits[8][ship['grade_size'] - 1];
        ship['cannon_chambers_capacity']['improve_limit']['current']
          = ship['cannon_chambers_capacity']['improve_limit']['base'];
        if(ship['cannon_chambers_capacity']['base'] === 0)
          console.log('no cannon_chambers_capacity info on', link);
        ship['hold_capacity']['base'] = parseInt(dom('.state9').text(), 10) +
          ship['cannon_chambers_capacity']['base'] + ship['cabine_capacity']['base'];
        ship['hold_capacity']['base_ranged'] = ship['hold_capacity']['base'];
        ship['hold_capacity']['improve_limit']['base'] = ship_limits[9][ship['grade_size'] - 1];
        ship['hold_capacity']['improve_limit']['current']
          = ship['hold_capacity']['improve_limit']['base'];
        if(ship['hold_capacity']['base'] === 0) console.log('no hold_capacity info on', link);

        ship['grade_type_default'] = configs[current_config]['grade_type'];
        ship['grade']['type'] = configs[current_config]['grade_type'];

        const skill_find_data = dom('.unlifsskill');
        ship['skills']['available'] = Object.keys(skill_find_data).filter(i => {
          if(i.match(/\d+/g)){
            return true;
          }
          return false;
        }).map(e => ({
          id: skill_find_data[e]['children'][1]['children'][0]['attribs']['src']
            .split('L/')[1].split('.')[0],
          parts: getPartIdsByText(skill_find_data[e]['children'][4]['data']),
        }));

        resolve(ship);
      }
    });
  });
}

//get_ids_from_database().then(res => console.log(res.length));
//get_ids_from_uwodbmirror().then(res => console.log(res)).catch(console.log);

find_nonexist_ship().then(ships => (ships.forEach((e, i) => {
  setTimeout(() => (get_ship_from_uwodbmirror(e)
    .then(ship => save_ship_to_file(ship, './Ships.new')).catch(console.log)), 1000*i);
}))).catch(console.log);
