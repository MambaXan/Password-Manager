import React, { useState, useEffect } from "react";
import "./Main.scss";
import ShowHideBtn from "../../Images/ShowHideBtn.png";

function Main({ showImportantOnly = false }) {
  const [passwords, setPasswords] = useState([]);
  const [showIndex, setShowIndex] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPw, setNewPw] = useState({
    name: "",
    email: "",
    password: "",
    important: false,
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("passwords")) || [];
    setPasswords(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("passwords", JSON.stringify(passwords));
  }, [passwords]);

  const toggleShow = (i) => setShowIndex(showIndex === i ? null : i);

  const toggleImportant = (i) => {
    setPasswords((p) =>
      p.map((x, idx) => (idx === i ? { ...x, important: !x.important } : x))
    );
  };

  const handleAdd = () => setShowAddForm(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPw((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPw.name && newPw.email && newPw.password) {
      setPasswords((p) => [...p, newPw]);
      setNewPw({ name: "", email: "", password: "", important: false });
      setShowAddForm(false);
    }
  };

  const displayList = showImportantOnly
    ? passwords.filter((x) => x.important)
    : passwords;

  return (
    <div className="main_page">
      <h1>Welcome back</h1>
      <h4 className="saved">
        {showImportantOnly ? "Important Passwords" : "Saved Passwords"}
      </h4>

      <div className="saved_passwords_cards">
        {displayList.length ? (
          displayList.map((item, i) => (
            <div className="card" key={i}>
              <h4>{item.name}</h4>
              <p>
                {item.email} • {showIndex === i ? item.password : "•".repeat(8)}
              </p>
              <div className="card_buttons">
                <button onClick={() => toggleShow(i)}>
                  Show/Hide <img src={ShowHideBtn} alt="" />
                </button>
                <button onClick={() => toggleImportant(i)}>
                  {item.important ? "★" : "☆"}
                </button>
                <button
                  onClick={() => {
                    if (window.confirm("Delete?"))
                      setPasswords((p) => p.filter((_, idx) => idx !== i));
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-passwords">Nothing to show here</p>
        )}
      </div>

      {!showImportantOnly && (
        <div className="add-password-section">
          <button onClick={handleAdd}>Add New Password</button>
        </div>
      )}

      {showAddForm && (
        <div className="add-password-modal">
          <div className="modal-content">
            <h2>Add New Password</h2>
            <form onSubmit={handleSubmit}>
              {["name", "email", "password"].map((f) => (
                <div className="form-group" key={f}>
                  <label>
                    {f === "name"
                      ? "Website Name"
                      : f === "email"
                      ? "Email/Username"
                      : "Password"}
                  </label>
                  <input
                    type={f === "password" ? "password" : "text"}
                    name={f}
                    placeholder={`Enter ${f}`}
                    value={newPw[f]}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}
              <div className="form-actions">
                <button type="submit">Save</button>
                <button type="button" onClick={() => setShowAddForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Main;
