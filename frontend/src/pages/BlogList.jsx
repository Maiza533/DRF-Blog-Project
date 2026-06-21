import { useEffect, useState } from "react";
import { useNavigate, useLocation} from "react-router-dom";
import "./BlogList.css"; 

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const fetchBlogs = () => {
    fetch("http://127.0.0.1:8000/api/blogs/")
      .then(res => res.json())
      .then(data => {
        const publishedBlogs = data.filter(blog => blog.status === "published");
        setBlogs(publishedBlogs);
      });
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  

  return (
    <div className="blog-container">
      
      <div className="container">
        <h2 className="blog-heading">All Blogs</h2>

        <div className="blog-grid">
          
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div key={blog.id} className="blog-card">

                {blog.image && (
                  <img
                    src={`http://127.0.0.1:8000${blog.image}`}
                    alt="blog"
                    className="blog-image"
                  />
                )}

                <div className="blog-content">
                  <h5
                    className="blog-title"
                    onClick={() => navigate(`/blogs/${blog.slug}`)}
                  >
                    {blog.title}
                  </h5>

                  <p className="blog-meta">
                    <strong>Author:</strong> {blog.author_email}
                  </p>

                  <p className="blog-meta">
                    {new Date(blog.created_at).toLocaleDateString()}
                  </p>

                  <p className="blog-text">
                    {blog.content.slice(0, 100)}...
                  </p>

                  <button
                    onClick={() => navigate(`/blogs/${blog.slug}`)}
                    className="blog-btn"
                  >
                    Read More
                  </button>
                </div>

              </div>
            ))
          ) : (
            <div className="no-blogs">
              <h4>No blogs available</h4>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}

export default BlogList;