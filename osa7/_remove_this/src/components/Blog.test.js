import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


test('renders content', () => {

  const blog = {
    title: 'Title',
    author: 'Hans Hokka',
    url: 'www.fi',
    likes: 20,
    user: {
      username: 'hhokka',
      name: 'Hans Hokka'
    }
  }
  const user = {
    username: 'hhokka',
    name: 'Hans Hokka'

  }

  const { container } = render(<Blog
    blog={blog} user={user}
    /* makeLikeCallback={makeLikeCallback}
    removeCallback = {removeCallback}
    user={user}  */
  />)
  const div = container.querySelector('.blog')
  expect (div).toHaveTextContent(blog.title)
  expect (div).toHaveTextContent(blog.author)

  expect (div).not.toHaveTextContent(blog.url)
  expect (div).not.toHaveTextContent(blog.likes)

  screen.debug()
})

test('clicking the button reveals url and likes', () => {

  const blog = {
    title: 'Title',
    author: 'Hans Hokka',
    url: 'www.fi',
    likes: 20,
    user: {
      username: 'hhokka',
      name: 'Hans Hokka'
    }
  }
  const user = {
    username: 'hhokka',
    name: 'Hans Hokka'

  }

  const { container } = render(
    <Blog blog={blog} user={user}/>
  )
  const div = container.querySelector('.all-visible')
  const button = screen.getByText('view')
  userEvent.click(button)


  expect (div).toHaveTextContent(blog.url)
  expect (div).toHaveTextContent(blog.likes)

  screen.debug()
})


test('pressing button twice results in likes called two times', async () => {
  const blog = {
    title: 'Title',
    author: 'Hans Hokka',
    url: 'www.fi',
    likes: 20,
    user: {
      username: 'hhokka',
      name: 'Hans Hokka'
    }
  }
  const user = {
    username: 'hhokka',
    name: 'Hans Hokka'

  }
  const mockHandler = jest.fn()
  render(
    <Blog blog={blog} user={user} makeLikeCallback={mockHandler} />
  )
  const eventUser = userEvent.setup()
  const button = screen.getByText('like')
  await eventUser.click(button)
  await eventUser.click(button)
  expect(mockHandler.mock.calls).toHaveLength(2)
})