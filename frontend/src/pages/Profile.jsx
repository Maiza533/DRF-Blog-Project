import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css"; 

function Profile() {
  const [user, setUser] = useState({});
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://127.0.0.1:8000/api/profile/", {
      method: "GET",
      headers: {
        
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("PROFILE API:", data);
        setUser(data.user || {});
        setBlogs(data.blogs || []);
        console.log("BLOG SLUG:", blog.slug);
      })
      .catch((err) => console.log(err));
  }, []);


  return (
    <section className="profile-section">
      <div className="profile-container">

        <div className="profile-row">
          <div className='main-heading'>
            <h3 className="heading">Profile</h3>
     
            
          </div>

          
          <div className="profile-left">
            <div className="profile-card">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="profile"
                className="profile-img"
              />
              <h4>{user.username}</h4>
              <p className="profile-email">{user.email}</p>
              <hr />
              <p><strong>Total Blogs:</strong> {blogs.length}</p>
              <p><strong>Status:</strong> Active User</p>
            </div>
          </div>

          <div className="profile-right">
            <h3 className="profile-heading">My Blogs</h3>

            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <div key={blog.id} className="blog-card">

                  <h4
                    className="blog-title"
                    onClick={() => navigate(`/blogs/${blog.slug}`)}
                  >
                    {blog.title}
                  </h4>

                  <p className="blog-meta">
                    Status: <strong>{blog.status}</strong>
                  </p>

                  <div className="blog-footer">
                    <p className="blog-meta">
                      {blog.created_at}
                    </p>

                    <button
                      className="view-btn"
                      onClick={() => navigate(`/blogs/${blog.slug}`)}
                    >
                      View
                    </button>
                  </div>

                </div>
              ))
            ) : (
              <div className="empty-card">
                <h5>No blogs created yet</h5>
              </div>
            )}
          </div>

        </div>

       
        <button
          className="back-btn"
          onClick={() => navigate("/blogs")}
        >
          ← Back to Blog List
        </button>

      </div>
    </section>
  );
}

export default Profile;