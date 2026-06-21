import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditBlog.css";

function EditBlog() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    status: "draft",
    image: null,
  });

  const [existingImage, setExistingImage] = useState("");
  const navigate = useNavigate();
  const { slug } = useParams(); 

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://127.0.0.1:8000/api/blogs/${slug}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          title: data.title,
          content: data.content,
          status: data.status,
          image: null,
        });
        setExistingImage(data.image);
      });
  }, [slug]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);
    data.append("status", formData.status);

    if (formData.image) {
      data.append("image", formData.image);
    }

    fetch(`http://127.0.0.1:8000/api/blogs/${slug}/edit/`, {
      method: "PUT", 
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    })
      .then((res) => res.json())
      .then(() => {
        alert("Blog updated successfully");
        navigate(`/blogs/${slug}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="edit-container">
      <div className="edit-card">

        <h2 className="edit-title">Edit Blog</h2>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-input"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Content</label>
            <textarea
              className="form-textarea"
              name="content"
              rows="6"
              value={formData.content}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Image</label>

            {existingImage && (
              <a
                href={`http://127.0.0.1:8000${existingImage}`}
                target="_blank"
                rel="noreferrer"
                className="image-link"
              >
                {existingImage}
              </a>
              
            )}
            

            <input
              type="file"
              className="form-input"
              name="image"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn-primary">
            Update Blog
          </button>

          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate(`/blogs/${slug}`)}
          >
            Cancel
          </button>

        </form>

      </div>
    </div>
  );
}

export default EditBlog;