const get_improve = (limit, improve) => {
  return Math.sign(improve) * Math.min(Math.abs(improve), Math.abs(limit));
}

const durability = (durability) => {
  const improve = get_improve(durability.improve_limit.current, durability.improve);
  durability.result =
    durability.base_ranged + durability.material + durability.grade + improve;
  return durability;
}

const vertical = (vertical) => {
  const improve = get_improve(vertical.improve_limit.current, vertical.improve);
  vertical.result =
    vertical.base_ranged + vertical.material +
    vertical.grade + vertical.penalty + improve;
  return vertical;
}

const horizontal = (horizontal) => {
  const improve = get_improve(horizontal.improve_limit.current, horizontal.improve);
  horizontal.result =
    horizontal.base_ranged + horizontal.material +
    horizontal.grade + horizontal.penalty + improve;
  return horizontal;
}

const row = (row) => {
  const improve = get_improve(row.improve_limit.current, row.improve);
  row.result = row.base_ranged + row.grade + row.penalty + improve;
  return row;
}

const turning = (turning) => {
  const improve = get_improve(turning.improve_limit.current, turning.improve);
  turning.result = turning.base_ranged + turning.grade + turning.penalty + improve;
  return turning;
}

const wave = (wave) => {
  const improve = get_improve(wave.improve_limit.current, wave.improve);
  wave.result = wave.base_ranged + wave.grade + wave.penalty + improve;
  return wave;
}

const armouring = (armouring) => {
  const improve = get_improve(armouring.improve_limit.current, armouring.improve);
  armouring.result =
    armouring.base_ranged + armouring.grade + armouring.penalty + improve;
  return armouring;
}

const cabine = (cabine) => {
  const improve = get_improve(cabine.improve_limit.current, cabine.improve);
  cabine.result = cabine.base_ranged + cabine.grade + improve;
  return cabine;
}

const cannon = (cannon) => {
  const improve = get_improve(cannon.improve_limit.current, cannon.improve);
  cannon.result = cannon.base_ranged + cannon.grade + improve;
  return cannon;
}

const hold = (hold) => {
  const improve = get_improve(hold.improve_limit.current, hold.improve);
  hold.result = hold.base_ranged + hold.grade + improve;
  return hold;
}

export const get_cargo = (cargo, hold, cabine, chambers) => {
  cargo.result = hold.base_ranged - cabine.base_ranged - chambers.base_ranged;
  return cargo;
}

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
