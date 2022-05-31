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


describe('When logged in', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')

    cy.get('#username').type('hhokka')
    cy.get('#password').type('salasana')
    cy.get('#submit').click()
  })

  it('A blog can be created', function() {
    cy.contains('create new blog').click()
    cy.get('#title').type('Title created by Cypress')
    cy.get('#author').type('Hans Hokka')
    cy.get('#url').type('www.fi')
    cy.get('#likes').type('10')
    cy.get('#create').click()
    cy.contains('a new blog Title created by Cypress by Hans Hokka added')
    cy.contains('Title created by Cypress Hans Hokka')
  })
  it('A blog can be liked', function() {
    cy.get('#view').click()
    cy.get('#like').click()
    cy.contains('likes: 11')
  })
  it('A blog can be removed', function() {
    cy.get('#view').click()
    cy.get('#remove').click()
    cy.contains('Blog Title created by Cypress by Hans Hokka succesfully removed')
  })

})
