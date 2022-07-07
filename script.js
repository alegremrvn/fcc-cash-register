function checkCashRegister(price, cash, cid) {
  let currencyMap = {
    PENNY: 0.01,
    NICKEL: 0.05,
    DIME: 0.1,
    QUARTER: 0.25,
    ONE: 1,
    FIVE: 5,
    TEN: 10,
    TWENTY: 20,
    'ONE HUNDRED': 100
  }

  let change = cash - price;

  let totalCID = 0;
  for (let i = 0; i < cid.length; i++) {
    totalCID += cid[i][1];
  }
  totalCID = Math.round(totalCID * 10000)/10000;

  if (change > totalCID) {
    return {
      status: 'INSUFFICIENT_FUNDS',
      change: []
    };
  } else if (change == totalCID) {
    return {
      status: 'CLOSED',
      change: cid
    };
  }

  let drawer = [];
  for (let i = 0; i < cid.length; i++) {
    drawer.push([cid[(cid.length - 1) - i][0], 0])
    while (cid[(cid.length - 1) - i][1] != 0
    && change >= currencyMap[cid[(cid.length - 1) - i][0]]) {
      change -= currencyMap[cid[(cid.length - 1) - i][0]];
      change = Math.round(change * 1000)/1000;
      drawer[i][1] += currencyMap[cid[(cid.length - 1) - i][0]];
      drawer[i][1] = Math.round(drawer[i][1] * 1000)/1000;
      cid[(cid.length - 1) - i][1] -= currencyMap[cid[(cid.length - 1) - i][0]];
      cid[(cid.length - 1) - i][1] = Math.round(cid[(cid.length - 1) - i][1] * 1000)/1000;
    }
  }

  if (change != 0) {
    return {
      status: 'INSUFFICIENT_FUNDS',
      change: []
    };
  } else {
    return {
      status: 'OPEN',
      change: drawer.filter(bill => bill[1] != 0)
    };
  }
}

console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));