import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Blog from './pages/Blogs';
import CreateBlogPage from './pages/Create';
import BlogDetails from './pages/BlogDetail';
import Error from './pages/Error';
import Home from './pages/Home';

const App = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="blog/:id" element={<BlogDetails />} />
        <Route path="blogs" element={<Blog />} />
        <Route path="dashboard" element={<Blog />} />
        <Route path="create" element={<CreateBlogPage />} />
        <Route path="edit/:id" element={<CreateBlogPage />} />
        <Route path="*" element={<Error/>} /> 
      </Route>
    </>
  )
);

export default App;