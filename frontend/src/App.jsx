import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import BlogsView from './pages/BlogsView'

import CreateBlog from './pages/CreateBlog'

const router = createBrowserRouter([
  {
    path: '/',
    element: <BlogsView />,
  },
  {
    path: '/create',
    element: <CreateBlog />,
  },
])
function App() {
  return <RouterProvider router={router}></RouterProvider>
}

export default App
