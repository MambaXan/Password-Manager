import React, { useState, useEffect } from "react";
import "./Important.scss";

const ImportantPasswords = () => {
  const [importantList, setImportantList] = useState([]);
  const [showIndex, setShowIndex] = useState(null);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("passwords")) || [];
    setImportantList(all.filter((p) => p.important));
  }, []);

  const handleDelete = (i) => {
    if (window.confirm("Delete this important password?")) {
      const updated = importantList.filter((_, idx) => idx !== i);
      setImportantList(updated);

      const all = JSON.parse(localStorage.getItem("passwords")) || [];
      const filteredAll = all.filter((p) => p.important);

      const removedItem = importantList[i];
      const newAll = all.map((p) =>
        p === removedItem ? { ...p, important: false } : p
      );
      localStorage.setItem("passwords", JSON.stringify(newAll));
    }
  };

  return (
    <div className="important-page">
      <h1>Important Passwords</h1>
      <div className="cards">
        {importantList.length ? (
          importantList.map((item, i) => (
            <div className="card" key={i}>
              <h4>{item.name}</h4>
              <p>
                {item.email} • {showIndex === i ? item.password : "•".repeat(8)}
              </p>
              <div className="buttons">
                <button
                  onClick={() => setShowIndex(showIndex === i ? null : i)}
                >
                  {showIndex === i ? "Hide" : "Show"}
                </button>
                <button onClick={() => handleDelete(i)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No important passwords saved.</p>
        )}
      </div>
    </div>
  );
};

export default ImportantPasswords;
