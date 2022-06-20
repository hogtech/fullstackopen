import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('makes sure that form calls its callback function given as props with right data', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)

  const sendButton = screen.getByText('create')
  const titleInput = screen.getByLabelText('title')
  const authorInput = screen.getByLabelText('author')
  const urlInput = screen.getByLabelText('url')
  const likesInput = screen.getByLabelText('likes')

  await user.type(titleInput, 'title here')
  await user.type(authorInput, 'author here')
  await user.type(urlInput, 'url here')
  await user.type(likesInput, 'likes here')

  await user.click(sendButton)


  expect(createBlog.mock.calls).toHaveLength(1)
  console.log('mock: ', createBlog.mock.calls[0][0].title)
  expect(createBlog.mock.calls[0][0].title).toBe('title here')
  expect(createBlog.mock.calls[0][0].author).toBe('author here')
  expect(createBlog.mock.calls[0][0].url).toBe('url here')
  expect(createBlog.mock.calls[0][0].likes).toBe('likes here')

})