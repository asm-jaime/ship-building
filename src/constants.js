export const LVL_MIN = 0;
export const LVL_MAX = 87;

export const SHIP_TYPE_ADVENTURE  = 'Adventure';
export const SHIP_TYPE_TRADE      = 'Trade';
export const SHIP_TYPE_BATTLE     = 'Battle';

export const SHIP_SIZE_LIGHT    = 'Light';
export const SHIP_SIZE_STANDARD = 'Standard';
export const SHIP_SIZE_HEAVY    = 'Heavy';

export const SHIP_SIZE_POS = {
  'Light' : 0,
  'Standard' : 1,
  'Heavy' : 2,
};

export const SSIP = {
  'Light': [1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  'Standard': [2, 2, 4, 6, 8, 10],
  'Heavy': [3, 3, 6, 9, 10]
};

export const GRADE_LIMIT = 8;
export const GRADE_STAGES = [1, 0, 1, 0, 0, 1, 0, 0];

export const GRADE_TYPE_DEFAULT = 'Generic Ship';
export const GRADE_TYPES = [
  'Generic Ship',
  'Expedition Ship',
  'High Speed Cargo Ship',
  'Cargo Ship',
  'Armed Merchant Ship',
  'Battle Ship',
  'High Speed Battle Ship'
];

export const SKILL_ROWING_ASSISTANCE     = '00002002';
export const SKILL_IMPROVED_RAM          = '00002080';
export const SKILL_SPECIAL_RAM           = '00002081';
export const SKILL_RAMMING_TACTICS       = '00002082';
export const SKILL_IMPROVED_SEA_MINE     = '00002125';
export const SKILL_EVADE_MELEE_BATTLE    = '00002127';
export const SKILL_DIRECT_HIT_PREVENTION = '00002004';

export const SKILL_ARMOURED_SHIP_REFIT     = '00002901';
export const SKILL_MELEE_BATTLE_SHIP_REFIT = '00002902';

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

export const GRADE_SPEEDUP_I   = '00004018';
export const GRADE_SPEEDUP_II  = '00004019';
export const GRADE_SPEEDUP_III = '00004020';

export const GRADE_SKILL_SLOT_I  = '00004012';
export const GRADE_SKILL_SLOT_II = '00004013';

export const GRADE_ROW_IMPROVE   = '00004003';

export const GRADE_ARMOURED_SHIP_REFIT      = '00004015';
export const GRADE_MELEE_BATTLE_SHIP_REFIT  = '00004016';

// ========== PANELS
export const BEECH_PANELING = '022000800';

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

export const IMPROVE_POSITIVE = '#96D677';
export const IMPROVE_NEGATIVE = '#E88181';

// ========== message actions

export const MESSAGE_ADD = 'MESSAGE_ADD';

// ========== import/export plan actions

export const STATE_EXPORT = 'STATE_EXPORT';
export const STATE_IMPORT = 'STATE_IMPORT';

// ========== improvement actions

export const IMPROVE_STEP_SET_SAIL       = 'IMPROVE_STEP_SET_SAIL';
export const IMPROVE_STEP_SET_GUNPORT    = 'IMPROVE_STEP_SET_GUNPORT';
export const IMPROVE_STEP_SET_ARMAMENT_1 = 'IMPROVE_STEP_SET_ARMAMENT_1';
export const IMPROVE_STEP_SET_ARMAMENT_2 = 'IMPROVE_STEP_SET_ARMAMENT_2';

export const ADD_RESET  = 'ADD_RESET';

export const IMPROVE_ACTIVE_TOGGLE = 'IMPROVE_ACTIVE_TOGGLE';
export const IMPROVE_DEL = 'IMPROVE_DEL';
export const IMPROVE_ADD = 'IMPROVE_ADD';
export const IMPROVE_CUSTOM_SET = 'IMPROVE_CUSTOM_SET';

// ========== grade actions

export const GRADE_RESET            = 'GRADE_RESET';
export const GRADE_STEP_SET_TYPE    = 'GRADE_STEP_SET_TYPE';
export const GRADE_STEP_SET_SKILLS  = 'GRADE_STEP_SET_SKILLS';

export const GRADE_DEL = 'GRADE_DEL';
export const GRADE_ADD = 'GRADE_ADD';


export const RECALCULATE_ALL  = 'RECALCULATE_ALL';

// ========== panel original optional skills actions

export const ORIGINAL_STEP_SET = 'ORIGINAL_STEP_SET';
export const OPTIONAL_STEP_SET = 'OPTIONAL_STEP_SET';

export const SKILL_ORIGINAL_SET = 'SKILL_ORIGINAL_SET';
export const SKILL_OPTIONAL_SET = 'SKILL_OPTIONAL_SET';

export const PANEL_STEP_SET = 'PANEL_STEP_SET';
export const PANEL_SET = 'PANEL_SET';

export const SKILL_EMPTY = '';
export const SHIP_PART_EMPTY = '';

export const DISAGREE_ICON  = 'icon_disagree.png';
export const DISAGREE_GIF   = 'icon_disagree.gif';
export const DISAGREE_SOUND = new Audio('sound_disagree.mp3');
export const AGREE_ICON     = 'icon_agree.png';
export const AGREE_GIF      = 'icon_agree.gif';
export const AGREE_SOUND    = new Audio('sound_agree.mp3');

export const SOUND_HOVER    = new Audio('sound_hover.mp3');
export const SOUND_CLICK    = new Audio('sound_click.mp3');


export const SHIP_PART_EMPTY_NOTE = 'Empty Ship Part';

export const STATUS_SHOW = ['none', 'grid'];

export const STATUS_CLICK = ['none', 'all'];

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

export const SHIP_STAT_NAMES = {
  'durability': 'durability',
  'vertical_sail': 'vertical',
  'horizontal_sail': 'horizontal',
  'row_power': 'row',
  'turning_performance': 'turning',
  'wave_resistance': 'wave',
  'armouring_value': 'armour',
  'cabine_capacity': 'cabine',
  'cannon_chambers_capacity': 'cannon',
  'hold_capacity': 'hold'
};

export const SHIP_STAT_TITLES = {
  'durability': 'durability',
  'vertical_sail': 'vertical sail',
  'horizontal_sail': 'horizontal sail',
  'row_power': 'row power',
  'turning_performance': 'turning performance',
  'wave_resistance': 'wave resistance',
  'armouring_value': 'armouring value',
  'cabine_capacity': 'cabine capacity',
  'cannon_chambers_capacity': 'cannon chambers',
  'hold_capacity': 'hold capacity'
};

export const SHIP_STAT_ICONS_UW2 = {
  'durability': 'i_durability.png',
  'vertical_sail': 'i_vertical_sail.png',
  'horizontal_sail': 'i_horizontal_sail.png',
  'row_power': 'i_row_power.png',
  'turning_performance': 'uw2_turning_performance.png',
  'wave_resistance': 'i_wave_resistance.png',
  'armouring_value': 'i_armouring_value.png',
  'cabine_capacity': 'uw2_cabine_capacity.png',
  'cannon_chambers_capacity': 'uw2_cannon.png',
  'hold_capacity': 'uw2_hold_capacity.png',
  'cargo': 'uw2_cargo.png'
};

export const SHIP_STAT_ICONS_IMP = {
  'durability': 'i_durability.png',
  'vertical_sail': 'i_vertical_sail.png',
  'horizontal_sail': 'i_horizontal_sail.png',
  'row_power': 'i_row_power.png',
  'turning_performance': 'uw2_turning_performance.png',
  'wave_resistance': 'i_wave_resistance.png',
  'armouring_value': 'i_armouring_value.png',
  'cabine_capacity': 'uw2_cabine.png',
  'cannon_chambers_capacity': 'uw2_cannon.png',
  'hold_capacity': 'uw2_hold_capacity.png',
  'cargo': 'uw2_cargo.png'
};

export const DATA_RESOURCE = './resource.json';

// ========== MESSAGES

export const MESSAGE_GRADE_LIMIT = 'this ship already got the grade limit';
export const MESSAGE_GRADE_SKILL_EMPTY = 'please, set a grade skill on this stage';
export const MESSAGE_INHERIT_SKILL_EMPTY = 'please, set a inherit skill on this grade skill';

export const MESSAGE_STATE_SUCCESS_EXPORT = 'export state is complete, now you can save your plan as an url to your bookmark';
export const MESSAGE_STATE_SUCCESS_IMPORT = 'import state is successful complete';
export const MESSAGE_STATE_FAIL_IMPORT = 'import failed, data from your url can not be imported';

// =========== MENU TEXT

export const MENU_TXT_IMPORT_BUTTON = 'Import';
export const MENU_TXT_EXPORT_BUTTON = 'Get plan as a link';

// =========== INFO

export const IMPROVEMENTS_INFO = 'size of approved improvements';
export const GRADE_SELECT_INFO     = 'select a ship grade type';
export const GRADE_ADD_BUTTON_INFO = 'add this grade stage to current ship';

// ==========

export const SEARCH_STR_PLACEHOLDER = 'Vaisseu, FCV, evade, WMB';

// ========== SHIP PARTS

export const GENERAL_LARGE_OAR        = '022000444';
export const GENERAL_MEDIUM_OAR       = '022000443';
export const GENERAL_SMALL_OAR        = '022000442';
export const SPECIAL_ORDER_LARGE_OAR  = '022000441';
export const SPECIAL_ORDER_LIGHT_OAR  = '02200044';

// ========== keypress codes

export const KEY_ENTER = 'Enter';

// ========== theme imgs
export const IMG_TITLE_LEFT   = 'component-title-left.png';
export const IMG_TITLE_RIGHT  = 'component-title-right.png';
export const IMG_TITLE_MIDDLE = 'component-title-middle.png';
