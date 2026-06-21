import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./BlogDetail.css";

function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const UserId = Number(localStorage.getItem("user_id"));
  const isAuthor = blog?.author_id == UserId;

  useEffect(() => {
  if (!slug) return;

  fetch(`http://127.0.0.1:8000/api/blogs/${slug}/`)
    .then(async (res) => {
      if (!res.ok) {
        throw new Error("Blog not found");
      }
      return res.json();
    })
    .then((data) => setBlog(data))
    .catch((err) => {
      console.log(err);
      setError("Blog not found");
    });

}, [slug]);

const handleDelete = () => {
  const token = localStorage.getItem("token");

  fetch(`http://127.0.0.1:8000/api/blogs/${slug}/delete/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Delete failed");
      return res.json();
    })
    .then(() => {
      alert("Blog deleted successfully");

      navigate("/blogs", { state: { refresh: true } });
    })
    .catch((err) => console.log(err));
};

  return (
    <div className="blog-container">

      <div className="blog-wrapper">

        <button
          onClick={() => navigate("/blogs")}
          className="back-btn"
        >
          ← Back to Blog List
        </button>

        <div className="blog-grid">

          {blog && blog.image && (
            <img
              src={`http://127.0.0.1:8000${blog.image}`}
              alt="blog"
              className="blog-img"
            />
          )}

          <div>
            <h2 className="blog-title">{blog?.title}</h2>

            <p className="blog-meta">
              <strong>Author:</strong> {blog?.author_name}
            </p>

            <p className="blog-meta">
              <strong>Created:</strong>{" "}
              {new Date(blog?.created_at).toLocaleString()}
            </p>

            <p className="blog-meta">
              <strong>Updated:</strong>{" "}
              {new Date(blog?.updated_at).toLocaleString()}
            </p>
          </div>

        </div>

       
        <div className="blog-content">
          {blog?.content}
        </div>

        {isAuthor && (
          <div className="action-btns">

            <button
              className="edit-btn"
              onClick={() => navigate(`/blogs/${slug}/edit`)}
            >
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={handleDelete}
            >
              Delete
            </button>

          </div>
        )}

      </div>
    </div>
  );
}

export default BlogDetail;