const plays = require('./plays.json')

function statement(invoice, plays) {
  let result = `Statement for ${invoice.customer}\n`
  for (let perf of invoice.performances) {
    // print line for this order
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`
  }

  result += `Amount owed is ${usd(totalAmount(invoice))}\n`
  result += `You earned ${totalVolumeCredits(invoice)} credits\n`
  return result
}

function amountFor(aPerformance) {
  let amount = 0

  switch (playFor(aPerformance).type) {
    case "tragedy":
      amount = 40000
      if (aPerformance.audience > 30) {
        amount += 1000 * (aPerformance.audience - 30)
      }
    break
    case "comedy":
      amount = 30000
      if (aPerformance.audience > 20) {
        amount += 10000 + 500 * (aPerformance.audience - 20)
      }
      amount += 300 * aPerformance.audience
    break
    default:
      throw new Error(`unknown type: ${playFor(aPerformance).type}`)
  }

  return amount
}

function playFor(aPerformance) {
  return plays[aPerformance.playID]
}

function volumeCreditsFor(aPerformance) {
  let volumeCredits = 0
  volumeCredits += Math.max(aPerformance.audience - 30, 0)

  if ("comedy" === playFor(aPerformance).type) 
    volumeCredits += Math.floor(aPerformance.audience / 5)

  return volumeCredits
}

function totalAmount(invoice) {
  let totalAmount = 0
  for (let perf of invoice.performances) {
    totalAmount += amountFor(perf)
  }

  return totalAmount
}

function totalVolumeCredits(invoice) {
  let volumeCredits = 0
  for (let perf of invoice.performances) {
    volumeCredits += volumeCreditsFor(perf)
  }

  return volumeCredits
}

function usd(aNumber) {
  return new Intl.NumberFormat("en-US", { 
    style: "currency", 
    currency: "USD", 
    minimumFractionDigits: 2 
  }).format(aNumber/100)
}

module.exports = statement