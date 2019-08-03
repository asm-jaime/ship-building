export const LVL_MIN = 0;
export const LVL_MAX = 87;

export const SSIP = {
  'Light': [1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  'Standard': [2, 2, 4, 6, 8, 10],
  'Heavy': [3, 3, 6, 9, 10]
};

export const GRADE_TYPES = [
  'Generic Ship',
  'Expedition Ship',
  'High Speed Cargo Ship',
  'Cargo Ship',
  'Armed Merchant Ship',
  'Battle Ship',
  'High Speed Battle Ship'
];

export const GRADE_DURABILITY = '00004000';
export const GRADE_VERTICAL   = '00004001';
export const GRADE_HORIZONTAL = '00004002';
export const GRADE_ROW        = '00004003';
export const GRADE_TURNING    = '00004004';
export const GRADE_WAVE       = '00004005';
export const GRADE_ARMOURING  = '00004006';
export const GRADE_CABINE     = '00004007';
export const GRADE_CANNON     = '00004008';
export const GRADE_HOLD       = '00004009';

export const GRADE_INHERIT    = '00004021';


export const GRADE_IMPROVES = {
  'durability': '00004000',
  'vertical_sail': '00004001',
  'horizontal_sail': '00004002',
  'row_power': '00004003',
  'turning_performance': '00004004',
  'wave_resistance': '00004005',
  'armouring_value': '00004006',
  'cabine_capacity': '00004007',
  'cannon_chambers_capacity': '00004008',
  'hold_capacity': '00004009',
}

export const GRADE_LIMITS = {
  'durability': rank => 5 * rank,
  'vertical_sail': rank => parseInt(2.5 * rank),
  'horizontal_sail': rank => parseInt(2.5 * rank),
  'row_power': rank => parseInt(0.5 * rank),
  'turning_performance': rank => parseInt(0.5 * rank),
  'wave_resistance': rank => parseInt(0.5 * (rank + 1)),
  'armouring_value': rank => parseInt(0.5 * (rank + 1)),
  'cabine_capacity': rank => rank,
  'cannon_chambers_capacity': rank => rank,
  'hold_capacity': rank => rank,
}

export const GRADE_IMPROVE = {
  '00004000': [ 40, 80, 120, 160, 200 ],
  '00004001': [ 15, 30, 45, 60, 75 ],
  '00004002': [ 15, 30, 45, 60, 75 ],
  '00004003': [ 1, 4, 6, 8, 10 ],
  '00004004': [ 1, 3, 4, 6, 7 ],
  '00004005': [ 1, 3, 4, 6, 7 ],
  '00004006': [ 2, 4, 6, 8, 10 ],
  '00004007': [ 6, 12, 18, 24, 30 ],
  '00004008': [ 6, 12, 18, 24, 30 ],
  '00004009': [ 6, 12, 18, 24, 30 ]
}

export const GRADE_BONUS = {
  'Generic Ship': [
    [0,0,0,0,0,0,0,0,0,0],
    [10,5,5,1,0,0,0,0,0,0],
    [10,5,5,1,0,0,1,2,2,2],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
  ],
  'Expedition Ship': [
    [0,5,5,0,0,0,0,0,0,0],
    [0,10,10,1,1,1,0,0,0,0],
    [0,15,15,1,2,2,0,0,0,0],
    [10,25,25,2,3,3,1,0,0,0],
    [10,30,30,3,4,4,1,0,0,0],
    [10,35,35,3,5,5,1,0,0,0],
    [10,35,35,3,5,5,1,0,0,0],
    [10,35,35,3,5,5,1,0,0,0]
  ],
  'High Speed Cargo Ship': [
    [0,5,5,0,0,0,0,0,0,0],
    [0,5,5,0,1,1,0,0,0,2],
    [10,15,15,1,1,1,1,0,0,4],
    [20,20,20,2,2,2,1,0,0,6],
    [20,25,25,3,2,2,1,0,0,6],
    [30,30,30,3,3,3,2,0,0,8],
    [30,30,30,3,3,3,2,0,0,8],
    [30,30,30,3,3,3,2,0,0,8]
  ],
  'Cargo Ship': [
    [0,0,0,0,0,0,0,0,0,2],
    [10,5,5,1,0,0,1,0,0,4],
    [20,10,10,1,1,1,1,0,0,6],
    [30,15,15,2,1,1,2,0,0,10],
    [30,15,15,3,1,1,2,0,0,12],
    [40,20,20,3,2,2,3,0,0,14],
    [40,20,20,3,2,2,3,0,0,14],
    [40,20,20,3,2,2,3,0,0,14]
  ],
  'Armed Merchant Ship': [
    [0,0,0,0,0,0,0,0,0,0],
    [10,0,0,1,0,0,1,0,0,2],
    [20,5,5,1,0,0,2,0,0,4],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
  ],
  'Battle Ship': [
    [10,0,0,0,0,0,1,0,0,0],
    [30,0,0,1,0,0,3,2,0,0],
    [40,0,0,1,0,0,4,2,0,0],
    [60,0,0,2,1,1,6,4,2,0],
    [80,0,0,3,1,1,8,6,2,0],
    [90,0,0,3,1,1,9,6,2,0],
    [90,0,0,3,1,1,9,6,2,0],
    [90,0,0,3,1,1,9,6,2,0]
  ],
  'High Speed Battle Ship': [
    [0,5,5,0,0,0,0,0,0,0],
    [10,10,10,1,0,0,1,0,0,0],
    [20,15,15,1,1,1,2,0,0,0],
    [30,20,20,2,1,1,3,0,0,0],
    [40,25,25,3,1,1,4,0,0,0],
    [50,35,35,3,2,2,5,0,0,0],
    [50,35,35,3,2,2,5,0,0,0],
    [50,35,35,3,2,2,5,0,0,0]
  ]
};

export const GRADEABLE = [
  'ship_handling_proficiency',
  'durability',
  'vertical_sail',
  'horizontal_sail',
  'row_power',
  'turning_performance',
  'wave_resistance',
  'armouring_value',
  'cabine_capacity',
  'cannon_chambers_capacity',
  'hold_capacity',
  'skills'
]

export const NUMBERS = [
  's0.png',
  's1.png',
  's2.png',
  's3.png',
  's4.png',
  's5.png',
  's6.png',
  's7.png',
  's8.png',
  's9.png'
]

export const SHIP_BUILDING_RANK = 20;
export const SHIP_CABINE_BASE_RANGE_SET = 'SHIP_CABINE_BASE_RANGE_SET';
export const SHIP_CANNON_BASE_RANGE_SET = 'SHIP_CANNON_BASE_RANGE_SET';
export const SHIP_HOLD_BASE_RANGE_SET   = 'SHIP_HOLD_BASE_RANGE_SET';

export const SEARCH_SET = 'SEARCH_SET';

export const SHIP_SET = 'SHIP_SET';

export const LVL_ADVENTURE_SET = 'LVL_ADVENTURE_SET';
export const LVL_ADVENTURE_INC = 'LVL_ADVENTURE_INC';
export const LVL_ADVENTURE_DEC = 'LVL_ADVENTURE_DEC';

export const LVL_TRADE_SET = 'LVL_TRADE_SET';
export const LVL_TRADE_INC = 'LVL_TRADE_INC';
export const LVL_TRADE_DEC = 'LVL_TRADE_DEC';

export const LVL_BATTLE_SET = 'LVL_BATTLE_SET';
export const LVL_BATTLE_INC = 'LVL_BATTLE_INC';
export const LVL_BATTLE_DEC = 'LVL_BATTLE_DEC';

export const DATA_LOAD = 'DATA_LOAD';

export const IMPROVE_POSITIVE = '#E88181';
export const IMPROVE_NEGATIVE = '#96D677';

export const IMPROVE_ACTIVE_TOGGLE = 'IMPROVE_ACTIVE_TOGGLE';
export const IMPROVE_DEL = 'IMPROVE_DEL';

export const GRADE_DEL = 'GRADE_DEL';

export const RECALCULATE_ALL  = 'RECALCULATE_ALL';

export const SKILL_ORIGINAL_SET = 'SKILL_ORIGINAL_SET';
export const SKILL_OPTIONAL_SET = 'SKILL_OPTIONAL_SET';

export const SKILL_EMPTY = 'skill_epmty';
export const IMPROVEABLE_PROPERTIES = [
  'durability',
  'vertical_sail',
  'horizontal_sail',
  'row_power',
  'turning_performance',
  'wave_resistance',
  'armouring_value',
  'cabine_capacity',
  'cannon_chambers_capacity',
  'hold_capacity'
];

export const DATA_RESOURCE = './resource.json';
