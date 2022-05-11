//import Notification from './Notification'

const BlogForm = ({
  addBlog,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  title,
  author,
  url
}) => (
  <div>
    <h1>create new</h1>
    <form onSubmit={addBlog}>
      <label htmlFor="title">title</label>
      <input
        id="input"
        name="title"
        value={title}
        //value="hans"
        onChange={handleTitleChange}
      /><br></br>
      <label htmlFor="author">author</label>
      <input
        id="author"
        name="author"
        value={author}
        onChange={handleAuthorChange}
      /><br></br>
      <label htmlFor='url'>url</label>
      <input
        id="url"
        name="url"
        value={url}
        onChange={handleUrlChange}
      /><br></br>
      <button type="submit">create</button>
    </form>
  </div>
)

export default BlogForm