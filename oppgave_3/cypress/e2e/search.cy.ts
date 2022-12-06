describe('Test of search with a specific search', () => {
  const testPerson = 'Trude'
  it('Connects to page', () => {
    cy.visit('http://localhost:3000/search')
  })
  it('Simulate search of an employee and successfully get a table of the employee', () => {
    cy.get('#person').type(testPerson)
    cy.get('.styled-button').click()
    cy.url().should('include', testPerson)
  })
  it('Simulate request to API endpoint', () => {
    cy.request({
      url : `/api/search/${testPerson}`
    })
    .then((response) => {
      expect(response.status).to.be.oneOf([
        200,
        304
      ])
    })
  })
  it('Should contain the correct data', () => {
    cy.get('.employeeName').should('contain', testPerson)
  })
  it('Excel file can be downloaded by clicking the button', () => {
    cy.get('.excel-button').click({ multiple: true })
    cy.readFile('../oppgave_3/cypress/downloads/Lunsjliste.xlsx')
  })
})

describe('Test of search with a unspecific search', () => {
  const testPerson = 'S'
  it('Connects to page', () => {
    cy.visit('http://localhost:3000/search')
  })
  it('Simulate search of an employee and successfully get a table of the employee', () => {
    cy.get('#person').type(testPerson)
    cy.get('.styled-button').click()
    cy.url().should('include', testPerson)
  })
  it('Simulate request to API endpoint', () => {
    cy.request({
      url : `/api/search/${testPerson}`
    })
    .then((response) => {
      expect(response.status).to.be.oneOf([
        200,
        304
      ])
    })
  })
  it('Should contain the correct data', () => {
    cy.get('.employeeName').should('contain', testPerson)
  })
  it('Excel file can be downloaded by clicking the button', () => {
    cy.get('.excel-button').click({ multiple: true })
    cy.readFile('../oppgave_3/cypress/downloads/Lunsjliste.xlsx')
  })
})

export{}