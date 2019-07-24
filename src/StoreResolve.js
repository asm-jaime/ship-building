const durability = (durability, improve) => ({
    ...durability,
    result: durability.base_ranged + durability.material + durability.grade + improve,
});

const vertical = (vertical, improve) => ({
  ...vertical,
  result: vertical.base_ranged + vertical.material +
  vertical.grade + vertical.penalty + improve,
});

const horizontal = (horizontal, improve) => ({
  ...horizontal,
  result: horizontal.base_ranged + horizontal.material +
  horizontal.grade + horizontal.penalty + improve,
});

const row = (row, improve) => ({
  ...row,
  result: row.base_ranged + row.grade + row.penalty + improve,
});

const turning = (turning, improve) => ({
  ...turning,
  result: turning.base_ranged + turning.grade + turning.penalty + improve,
});

const wave = (wave, improve) => ({
  ...wave,
  result: wave.base_ranged + wave.grade + wave.penalty + improve,
});

const armouring = (armouring, improve) => ({
  ...armouring,
  result: armouring.base_ranged + armouring.grade + armouring.penalty + improve,
});

const cabine = (cabine, ranged, improve) => ({
  ...cabine,
  base_ranged: ranged,
  result: ranged + cabine.grade + improve,
});

const cannon = (cannon, ranged, improve) => ({
  ...cannon,
  base_ranged: ranged,
  result: ranged + cannon.grade + improve,
});

const hold = (hold, ranged, improve) => ({
  ...hold,
  base_ranged: ranged,
  result: ranged + hold.grade + improve,
});

export const get_cargo = (cargo, hold, cabine, chambers) => ({
  ...cargo,
  result: hold.base_ranged - cabine.base_ranged - chambers.base_ranged,
});

export const get_improve = (limit, improve) => (
  Math.sign(improve) * Math.min(Math.abs(improve), Math.abs(limit))
);

export const resolve = {
  "durability": durability,
  "vertical_sail": vertical,
  "horizontal_sail": horizontal,
  "row_power": row,
  "turning_performance": turning,
  "wave_resistance": wave,
  "armouring_value": armouring,
  "cannon_chambers_capacity": cannon,
  "cabine_capacity": cabine,
  "hold_capacity": hold,
}
