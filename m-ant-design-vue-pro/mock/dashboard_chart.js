function chart(method) {
  let res = null;
  switch (method) {
    case "GET":
      res = [40, 40, 78, 10, 30, 80];
      break;
    default:
      res = null;
  }
  return res;
}

module.exports = chart;
