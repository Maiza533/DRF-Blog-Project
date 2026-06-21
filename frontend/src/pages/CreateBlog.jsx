import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateBlog.css"; 

function CreateBlog() {
  const token = localStorage.getItem("access");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
    status: "published",
  });

  const navigate = useNavigate();

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

    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);
    data.append("image", formData.image);
    data.append("status", formData.status);
    const token = localStorage.getItem("token");


    fetch("http://127.0.0.1:8000/api/blogs/create/", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: data,
    })
     .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("Blog created successfully");
        navigate('/blogs');
      })
      .catch((err) => console.log(err));
  };


  return (
    <div className="create-container">
      <div className="create-card">

        <div className="create-header">
          <h3>Create New Blog</h3>
        </div>

        <div className="create-body">
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
              <label className="form-label">Image</label>
              <input
                type="file"
                className="form-input"
                name="image"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-success">
                Create Blog
              </button>

              <button
                type="button"
                className="btn-secondary"
                onClick={() => window.history.back()}
              >
                Cancel
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}

export default CreateBlog;


