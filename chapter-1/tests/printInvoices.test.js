const invoices = require('./../invoices.json')
const plays = require('./../plays.json')

const printInvoice = require('./../printInvoices')
const invoiceResult = printInvoice(invoices, plays)

describe('Test printInvoice function', () => {
  it('Statement title', () => {
    expect(invoiceResult).toContain('Statement for BigCo')
  })

  it('Hamlet item validation', () => {
    expect(invoiceResult).toContain('Hamlet: $650.00 (55 seats)')
  })

  it('As You Like It item validation', () => {
    expect(invoiceResult).toContain('As You Like It: $660.00 (45 seats)')
  })
  
  it('Othello item validation', () => {
    expect(invoiceResult).toContain('Othello: $500.00 (40 seats)')
  })

  it('Amount owed contain $1,810.00', () => {
    expect(invoiceResult).toContain('Amount owed is $1,810.00')
  })

  it('Credit contain 59', () => {
    expect(invoiceResult).toContain('You earned 59 credits')
  })
})

