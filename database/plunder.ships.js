const fetch = require('node-fetch');
const sails = require('../src/resSails');
const armaments = require('../src/resArmaments');
const gunports = require('../src/resGunports');
const panels = require('../src/resPanels');
const skills = require('../src/resSkills');

const fs = require('fs');
const process = require('child_process');

const link = 'http://www.uwotool.com/ajax/get_ship_detail.php?ship_id';
const MAX_SHIPS = 452;

const allParts = Object.assign({}, sails, armaments, gunports, panels);

const partsNameId = Object.create(null);
const allPartsKeys = Object.keys(allParts);
for (let i = 0; i < allPartsKeys.length; ++i) {
  partsNameId[allParts[allPartsKeys[i]]['name'].toLowerCase()] = allPartsKeys[i];
}

const skillsNameId = Object.create(null);
const skillsKeys = Object.keys(skills);
for (let i = 0; i < skillsKeys.length; ++i) {
  skillsNameId[skills[skillsKeys[i]]['name'].toLowerCase()] = skillsKeys[i];
}

const gradeTypeShips = {
  'Adventure': 'Expedition Ship',
  'Trade': 'Cargo Ship',
  'Battle': 'Battle Ship',
}

const parse_ship = (raw_ship) => {
  const ship = Object.create(null);

  ship['id'] = raw_ship['oid'];
  ship['img'] = raw_ship['image'];
  ship['href'] = raw_ship['external_link'];
  ship['name'] = raw_ship['title'];
  ship['size'] = raw_ship['size_local'];

  ship['purpose'] = raw_ship['type1'];
  ship['is_nc'] = raw_ship['is_nc'] === '0' ? false : true;

  ship['levels'] = {
    'advent': parseInt(raw_ship['adv_lvl']),
    'trade': parseInt(raw_ship['trade_lvl']),
    'battle': parseInt(raw_ship['battle_lvl'])
  };

  ship['days'] = parseInt(raw_ship['days']);

  ship['skills'] = {
    'optional': {
      'limit': 2,
      'grade': 0,
      set: []
    },
    'inherit': [],
    'original': '',
    'available': raw_ship['skills'].map((e, i) => ({
      'id': skillsNameId[e['title'].toLowerCase()],
      'parts': raw_ship['skills'][i]['parts'].map(e =>
        partsNameId[e['title'].toLowerCase()]
      ),
    }))
  };

  ship['ship_equipment'] = {
    'studding_sails': parseInt(raw_ship['studding_sail']),
    'broadsides': parseInt(raw_ship['broadside']),
    'special_equipment': parseInt(raw_ship['special_equipment']),
    'bow_turret': parseInt(raw_ship['bow_turret']),
    'extra_armouring': parseInt(raw_ship['extra_armouring']),
    'stern_turret': parseInt(raw_ship['stern_turret'])
  };

  ship['improvement'] = {
    'result': 0,
    'limit': {
      'base': parseInt(raw_ship['improvements']),
      'add': {
        'limit': parseInt(raw_ship['re_improvements']),
        'current': 0
      },
      'current': 0
    }
  };

  ship['ship_handling_proficiency'] = {
    'base': parseInt(raw_ship['proficiency']),
    'grade': 0,
    'result': parseInt(raw_ship['proficiency'])
  };

  ship['durability'] = {
    'base': parseInt(raw_ship['durability']),
    'improve': 0,
    'material': 0,
    'grade': 0,
    'custom': 0,
    'improve_limit': {
      'base': parseInt(raw_ship['upper_limit']['durability']),
      'grade': 0,
      'current': parseInt(raw_ship['upper_limit']['durability'])
    },
    'result': 0
  };

  ship['vertical_sail'] = {
    'base': parseInt(raw_ship['vertical_sail']),
    'improve': 0,
    'material': 0,
    'grade': 0,
    'custom': 0,
    'penalty': 0,
    'improve_limit': {
      'base': parseInt(raw_ship['upper_limit']['vertical_sail']),
      'grade': 0,
      'current': parseInt(raw_ship['upper_limit']['vertical_sail'])
    },
    'result': 0
  };

  ship['horizontal_sail'] = {
    'base': parseInt(raw_ship['horizontal_sail']),
    'improve': 0,
    'material': 0,
    'grade': 0,
    'custom': 0,
    'penalty': 0,
    'improve_limit': {
      'base': parseInt(raw_ship['upper_limit']['horizontal_sail']),
      'grade': 0,
      'current': parseInt(raw_ship['upper_limit']['horizontal_sail'])
    },
    'result': 0
  };

  ship['row_power'] = {
    'row': raw_ship['type2'] === 'combined',
    'base': parseInt(raw_ship['row_power']),
    'improve': 0,
    'grade': 0,
    'custom': 0,
    'penalty': 0,
    'improve_limit': {
      'base': parseInt(raw_ship['upper_limit']['row_power']),
      'grade': 0,
      'current': parseInt(raw_ship['upper_limit']['row_power'])
    },
    'result': 0
  };

  ship['turning_performance'] = {
    'base': parseInt(raw_ship['turn_speed']),
    'improve': 0,
    'grade': 0,
    'custom': 0,
    'penalty': 0,
    'improve_limit': {
      'base': parseInt(raw_ship['upper_limit']['turn_speed']),
      'grade': 0,
      'current': parseInt(raw_ship['upper_limit']['turn_speed'])
    },
    'result': 0
  };

  ship['wave_resistance'] = {
    'base': parseInt(raw_ship['wave_resistance']),
    'improve': 0,
    'grade': 0,
    'custom': 0,
    'penalty': 0,
    'improve_limit': {
      'base': parseInt(raw_ship['upper_limit']['wave_resistance']),
      'grade': 0,
      'current': parseInt(raw_ship['upper_limit']['wave_resistance'])
    },
    'result': 0
  };

  ship['armouring_value'] = {
    'base': parseInt(raw_ship['armour']),
    'improve': 0,
    'grade': 0,
    'custom': 0,
    'improve_limit': {
      'base': parseInt(raw_ship['upper_limit']['armour']),
      'grade': 0,
      'current': parseInt(raw_ship['upper_limit']['armour'])
    },
    'result': 0
  };

  ship['cabine_capacity'] = {
    'base': parseInt(raw_ship['cabin']),
    'improve': 0,
    'grade': 0,
    'custom': 0,
    'base_ranged': parseInt(raw_ship['cabin']),
    'improve_limit': {
      'base': parseInt(raw_ship['upper_limit']['cabin']),
      'grade': 0,
      'current': parseInt(raw_ship['upper_limit']['cabin'])
    },
    'required': parseInt(raw_ship['sailors_required']),
    'result': 0
  };

  ship['cannon_chambers_capacity'] = {
    'base': parseInt(raw_ship['cannon_chambers']),
    'improve': 0,
    'grade': 0,
    'custom': 0,
    'base_ranged': parseInt(raw_ship['cannon_chambers']),
    'improve_limit': {
      'base': parseInt(raw_ship['upper_limit']['cannon_chambers']),
      'grade': 0,
      'current': parseInt(raw_ship['upper_limit']['cannon_chambers'])
    },
    'result': 0
  };

  ship['hold_capacity'] = {
    'base': parseInt(raw_ship['hold']),
    'improve': 0,
    'grade': 0,
    'custom': 0,
    'base_ranged': parseInt(raw_ship['hold']),
    'improve_limit': {
      'base': parseInt(raw_ship['upper_limit']['hold']),
      'grade': 0,
      'current': parseInt(raw_ship['upper_limit']['hold'])
    },
    'result': 0
  };

  ship['material'] = {
    'id': '022000800',
    'name': 'Beech Paneling'
  };

  ship['grade_size'] = parseInt(raw_ship['upper_limit_id']);
  ship['grade_type_default'] = gradeTypeShips[raw_ship['type1']];
  ship['grade'] = {
    'rank': 0,
    'type': gradeTypeShips[raw_ship['type1']],
    'skills': []
  };

  return ship;
};

const getParseName = name => (
  name.replace(/'/g, '').replace(/ /g, '-').toLowerCase()
);

const get_ships = (len) => {
  for (let i = 1; i < len + 1; ++i) {
    setTimeout(() => fetch(`${link}=${i}`)
      .then(res => res.json())
      .then(parse_ship)
      .then(ship => {
        fs.writeFile(`./Ships/${getParseName(ship.name)}.json`,
          JSON.stringify(ship), 'utf8',
          () => {
            process.spawn(
              'js-beautify', ['-r', `./Ships/${getParseName(ship.name)}.json`]
            );
            console.log(`>>: ${ship.name}`);
          }
        );
        return fetch(`http://www.uwotool.com/images/ship/${ship['img']}`)
          .then(data => ({
            name: ship['img'],
            data
          }));
      })
      .then(res => {
        const fileStream = fs.createWriteStream(`./Ships/${res.name}`);
        res.data.body.pipe(fileStream);
      })
      .catch(console.log), i * 1000);
  }
};

get_ships(MAX_SHIPS);
