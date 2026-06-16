const factors = {
  car: 0.192,
  bus: 0.105,
  bike: 0.08,
};

function calculateCarbon(data) {
  const travelCarbon = data.distance * factors[data.vehicle];

  const electricityCarbon = data.electricity * 0.82;

  const foodCarbon = data.food === "vegetarian" ? 1 : 3;

  const totalCarbon = travelCarbon + electricityCarbon + foodCarbon;

  return {
    travelCarbon,
    electricityCarbon,
    foodCarbon,
    totalCarbon,
  };
}

module.exports = calculateCarbon;
