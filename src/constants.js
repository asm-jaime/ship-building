export const LVL_MIN = 0;
export const LVL_MAX = 87;

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

export const SKILLS_OPTIONAL = {
  "00002000": {"name": "Enhance Ship Handling","description": "activation +2 turn speed"  },
  "00002001": {"name": "Emergency Acceleration","description": "activation +10% acceleration"  },
  "00002002": {"name": "Rowing Assistance","description": "+5 turn speed"  },
  "00002004": {"name": "Direct Hit Prevention","description": "activation preventing crit from the front"  },
  "00002005": {"name": "Casting Net","description": "skill fish/collection +1"  },
  "00002006": {"name": "Recreation Room","description": "increase effect wining and during"  },
  "00002007": {"name": "Aide's Cabin","description": "+20% aide exp"  },
  "00002008": {"name": "Improved Rudder","description": "skill steering +2"  },
  "00002009": {"name": "Flotsam Search","description": "skill recognition autoeffect on sea"  },
  "00002010": {"name": "High Lookout","description": "skill caution autoeffect on sea"  },
  "00002011": {"name": "Hauling Assistance","description": "haul a shipwreck, +20% speed with hauling skill"  },
  "00002012": {"name": "Lifeboat","description": "once on sea, prevent losses shipwrecks/sirens/storms"  },
  "00002013": {"name": "Shipwright's Quarters","description": "-30% ship equipment loss durapility"  },
  "00002014": {"name": "Sail Sewing Skill","description": "Autorepair sail. Lessen damage to sails during battle"  },
  "00002015": {"name": "Military Camouflage","description": "Prevents 90% from visible NPC attack"  },
  "00002016": {"name": "Library","description": "Raises the likelihood of obtaining clues while hunting treasure"  },
  "00002017": {"name": "Reference Room","description": "Skill geo/theo/archeo/bio/...-logy +1"  },
  "00002020": {"name": "Moored Mine","description": "Stopped the ship like gun crit"  },
  "00002021": {"name": "Camouflaged Hold","description": "30% to prevent plunder trade good, pirates can not see good on sea"  },
  "00002022": {"name": "Improved Hold","description": "100% to prevent plunder trade good"  },
  "00002023": {"name": "Galley","description": "+15% cooking/storage great success at sea"  },
  "00002024": {"name": "Workshop","description": "+10% casting/sewing/handicraft great success at sea"  },
  "00002025": {"name": "Wind-Resistant Mast","description": "90% effective precautions against squalls"  },
  "00002026": {"name": "Wave-Resistant Armouring","description": "90% effective precautions broadside wave, when WR ship less than current wave on sea"  },
  "00002027": {"name": "Fireproof Wall","description": "reduce to 5% burned trade good, when fire happens"  },
  "00002028": {"name": "Earthquake-proof Hold","description": "reduce to 5% the chance for trade goods to collapse during a storm/broadside wave"  },
  "00002029": {"name": "Domestic Livestock Room","description": "Cattle/Chickens/Ducks/Sheep/Pigs/Goats randomly reproduce when sail at sea"  },
  "00002030": {"name": "Sanitation Room","description": "95% effective precautions against rat infection/pure sanitation"  },
  "00002031": {"name": "Everyday Item Storage","description": "all PO1 skills+1"  },
  "00002032": {"name": "Manufactured Item Storage","description": "all PO2 skills+1"  },
  "00002033": {"name": "General Luxury Goods Storage","description": "all PO3 skills+1"  },
  "00002034": {"name": "Quality Luxury Goods Storage","description": "all PO4 skills+1"  },
  "00002035": {"name": "Quality Cabin","description": "Reduces fatigue and prevent insomnia"  },
  "00002036": {"name": "Paymaster Cabin","description": "60% reduction in food and water use"  },
  "00002040": {"name": "Heavy Bombing","description": "normal shot cannons -20% the speed of the enemy ship"  },
  "00002041": {"name": "Explosive Shell","description": "increase chance on great disorder, when use grape shot"  },
  "00002042": {"name": "Armouring Deterioration Bullet","description": "10% broand and 100% crit flame shot will great damage enemy armour ship equipment"  },
  "00002043": {"name": "Armour Piercing Bullet","description": "double shot will cause great flooding"  },
  "00002044": {"name": "Special Smoke Bomb","description": "smoke bombs shot will stops to use enemy evasion/shot-defense"  },
  "00002045": {"name": "Intensive Charge","description": "Increases load speed by 50% when sails are being folded"  },
  "00002046": {"name": "Improved Gun Port","description": "skill gunnery+2"  },
  "00002060": {"name": "Demolition Work","description": "cause flood=>sail damage=>rudden damage=>destroy during melee battle"  },
  "00002061": {"name": "Training Bomb","description": "10% chance blow enemy ammunition, and damage 3x(amount ammunition)"  },
  "00002062": {"name": "Pre-emptive Attack","description": "the first melee attack/defense +20%"  },
  "00002063": {"name": "Special Sterncastle","description": "2x reduce enemy castles effects, protect your stencastle against same enemy effect"  },
  "00002064": {"name": "Attack Prevention Net","description": "+30% melee defence, +50% chance on retreat"  },
  "00002080": {
    "name": "Improved Ram",
    "description": "increase ram attack power, can be increased with sail on Tailwind and Huge ram"
  },
  "00002081": {"name": "Special Ram","description": "Increase the penetration of a ram attack and flood the enemy is ship"  },
  "00002082": {"name": "Ramming Tactics","description": "Totally destroy the enemy ship's rudder by ramming hit the ship in stern"  },
  "00002083": {"name": "Set Fire","description": "burn yourself with major fire and melee, 10% damage on both side"  },
  "00002100": {
    "name": "Cooperation Enhancement",
    "description": "+20% cannon damage applies, when both shooters on one side of enemy ship"
  },
  "00002101": {"name": "Command Post","description": "prevent the disorder from cannon shots"  },
  "00002102": {"name": "Repair Support","description": "+50% skill repair effect, for all fleet"  },
  "00002103": {"name": "Intensive Repair","description": "+100% skill repair when sail are being folded, the only for ship user"  },
  "00002104": {"name": "Medical Support","description": "+50% skill surgeon effect, for all fleet"  },
  "00002105": {"name": "Bullet-proof Armouring","description": "+10 armour"  },
  "00002106": {"name": "Drainage Pump","description": "Stop leaks, regular and large, on your own ship"  },
  "00002120": {"name": "Sea Mine Search","description": "Automate detection of enemy sea mines during battle"  },
  "00002121": {"name": "Sea Mine Removal","description": "Activate removal of enemy sea mine, when it is nearby"  },
  "00002122": {"name": "Special Sea Mine","description": "Cause major flooding to an enemy ship with a sea mine"  },
  "00002123": {"name": "Roaring Sea Mine","description": "Create great disorder on an enemy ship with a sea mine"  },
  "00002125": {"name": "Improved Sea Mine","description": "+50 sea mine damage, up to 300, for max"  },
  "00002126": {"name": "Assault Deck Battle","description": "+20% chance to engage in Deck Battle"  },
  "00002127": {"name": "Evade Melee Battle","description": "70% chance avoid melee battle"  },
  "00002128": {
    "name": "Welcome Melee Battle",
    "description": "increase x2 your base defence power, when your crew ability lower, 100% against PEA"
  },
  "00002129": {"name": "Deck Barrier","description": "+20% chance to avoid Deck Battle"  },
  "00002130": {"name": "Watertight Bulkhead","description": "avoid 90% of leaks from happening"  },
  "00002131": {"name": "Nanban Trade Preference","description": "+20% nanban trade good"  },
  "00002900": {"name": "Gunboat Refit","description": "+5% damage increase in cannon shots, -5% melee/cannon shot defence"  },
  "00002901": {"name": "Armoured Ship Refit","description": "5% damage decrease in cannon shots, -5% base sails"  },
  "00002902": {"name": "Melee Battle Ship Refit","description": "+5% melee damage, -5% cannon shots defence"  },
  "00002903": {"name": "Cargo Hold Ship Refit","description": "+5% cargo hold..."  },
  "00002904": {"name": "Exploration Ship Refit","description": "10% more adventure EXP while doing discovery in sea, +10 the rate of rise in salvage"  }
}

