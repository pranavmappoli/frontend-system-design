// function computeAmount(){

// }

function computeAmount() {
  let total = 0;
  return (obj = {
    lacs(val) {
      total += val * 100000;
      return obj;
    },
    crore(val) {
      total += val * 10000000;
      return obj;
    },
    thousand(val) {
      total += val * 1000;
      return obj;
    },
    value() {
      return total;
    },
  });
}

const val = computeAmount()
  .lacs(15)
  .crore(5)
  .crore(2)
  .lacs(20)
  .thousand(45)
  .crore(7)
  .value();
console.log(val);
