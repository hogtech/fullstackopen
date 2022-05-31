/* eslint-disable no-undef */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Hans Hokka',
      username: 'hhokka',
      password: 'salasana'
    }
    cy.request('POST', 'http:/localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
  })
})
describe('Login',function() {
  it('succeeds with correct credentials', function() {
    cy.get('#username').type('hhokka')
    cy.get('#password').type('salasana')
    cy.get('#submit').click()
    cy.contains('Hans Hokka logged in')
  })

  it('fails with wrong credentials', function() {
    cy.contains('logout').click()
    cy.get('#username').type('hhokka_')
    cy.get('#password').type('salasana_')
    cy.get('#submit').click()
    cy.contains('wrong username or password')
  })
})