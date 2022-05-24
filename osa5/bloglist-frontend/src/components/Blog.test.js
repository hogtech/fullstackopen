import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Title 20',
    author: 'Hans Hokka 20',
    url: 'www.fi',
    likes: 20
  }

  const { container } = render(<Blog
    blog={blog}
    /* makeLikeCallback={makeLikeCallback}
    removeCallback = {removeCallback}
    user={user}  */
  />)
  const div = container.querySelector('.blog')
  expect (div).toHaveTextContent(blog.title)
  expect (div).toHaveTextContent(blog.author)

  expect (div).not.toHaveTextContent(blog.url)
  expect (div).not.toHaveTextContent(blog.likes)

  //screen.debug()
  /*const titleElement = screen.getByText('Title 20')
  const authorElement = screen.getByText('Hans Hokka 20')
  const urlElement = screen.getByText('www.fi')
  const likesElement = screen.getByNumber(20)
  expect(titleElement).toBeDefined()
  expect(authorElement).toBeDefined()
  expect(urlElement).NotToBeDefined()
  expect(likesElement).NotToBeDefined() */
})