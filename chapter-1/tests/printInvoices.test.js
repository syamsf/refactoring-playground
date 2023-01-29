const invoices = require('./../invoices.json')
const plays = require('./../plays.json')

const printInvoice = require('./../printInvoices')

console.log(printInvoice(invoices, plays))