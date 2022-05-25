import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('renders content', () => {
  const blog = {
    title: 'Title',
    author: 'Hans Hokka',
    url: 'www.fi',
    likes: 20
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

test('clicking the button reveals url and likes', async () => {
  const blog = {
    title: 'Title',
    author: 'Hans Hokka',
    url: 'www.fi',
    likes: 20
  }

  const user = {
    username: 'hhokka',
    name: 'Hans Hokka'

  }
  const { container } = render(
    <Blog blog={blog} user={user}/>
  )
  const div = container.querySelector('.blog')
  const button = screen.getByText('view')
  userEvent.click(button)


  expect (div).toHaveTextContent(blog.url)
  expect (div).toHaveTextContent(blog.likes)

  screen.debug()
})

test('pressing button twice results in likes called two times', () => {
  const blog = {
    title: 'Title',
    author: 'Hans Hokka',
    url: 'www.fi',
    likes: 20
  }

  const user = {
    username: 'hhokka',
    name: 'Hans Hokka'

  }
  const mockHandler = jest.fn()
  render(
    <Blog blog={blog} user={user} like={mockHandler} />
  )
  const button = screen.getByText('like')
  userEvent.click(button)
  userEvent.click(button)
  expect(mockHandler.mock.calls).toHaveLength(2)
}
)