export const LVL_MIN = 0;
export const LVL_MAX = 87;

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

export const IMPROVEABLE_PROPERTIES = [
  "durability",
  "vertical_sail",
  "horizontal_sail",
  "row_power",
  "turning_performance",
  "wave_resistance",
  "armouring_value",
  "cannon_chambers_capacity",
  "cabine_capacity",
  "hold_capacity",
];

export const IDB_NAME = "shipyardDB";

export const IDB_SETTING = {
  name: IDB_NAME,
  version: 1,
  tables: [
  {
    tableName: "armaments",
    keyPath: "id",
    autoIncrement: true,
    index: ["id", "img", "name", "nc", "ship_sizes", "stats_ranges", "description"],
    unique: [true, false, true, false, false, false, false]
  },
  {
    tableName: "gunports",
    keyPath: "id",
    autoIncrement: true,
    index: ["id", "img", "name", "nc", "ship_sizes", "stats_ranges", "description"],
    unique: [true, false, true, false, false, false, false]
  },
  {
    tableName: "hulls",
    keyPath: "id",
    autoIncrement: true,
    index: ["id", "img", "name", "nc", "ship_sizes", "stats_ranges", "description"],
    unique: [true, false, true, false, false, false, false]
  },
  {
    tableName: "panelings",
    keyPath: "id",
    autoIncrement: true,
    index: ["id", "img", "name", "nc", "panel_stats", "ship_sizes", "stats_ranges", "description"],
    unique: [true, false, true, false, false, false, false, false]
  },
  {
    tableName: "sails",
    keyPath: "id",
    autoIncrement: true,
    index: ["id", "img", "name", "nc", "ship_sizes", "stats_ranges", "description"],
    unique: [true, false, true, false, false, false, false]
  },
  {
    tableName: "skills",
    keyPath: "id",
    autoIncrement: true,
    index: ["id", "name", "description", "optional", "original"],
    unique: [true, false, false, false, false]
  },
  {
    tableName: "skills_grade",
    keyPath: "id",
    autoIncrement: true,
    index: ["id", "name", "description"],
    unique: [true, false, false]
  },
  {
    tableName: "ships",
    keyPath: "id",
    autoIncrement: true,
    index: [
      "id", "img", "href", "name", "size", "purpose", "levels", "row", "days",
      "ship_equipment",
      "improvement",
      "ship_handling_proficiency",
      "durability",
      "vertical_sail",
      "horizontal_sail",
      "row_power",
      "turning_performance",
      "wave_resistance",
      "armouring_value",
      "cabine_capacity",
      "cannon_chambers_capacity",
      "hold_capacity",
      "cargo",
      "material",
      "skills",
      "grade",
      "description"
    ],
    unique: [
       true, false, false, false, false, false, false, false, false,
      false, false, false, false, false, false, false, false, false,
      false, false, false, false, false, false, false, false, false
    ]
  },
  ]
};

export const DATA_RESOURCE = './resource.json';
