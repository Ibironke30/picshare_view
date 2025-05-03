import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API = "http://localhost:5000";

export default function PhotoDetail({ user }) {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API}/photos/${id}`)
      .then(res => res.json())
      .then(data => setPhoto(data));
  }, [id]);

  if (!photo) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-6 mt-6">
      <img src={photo.imageUrl} alt={photo.title} className="w-full h-64 object-cover rounded mb-4" />
      <h3 className="text-2xl font-bold">{photo.title}</h3>
      <p className="text-gray-600">{photo.caption}</p>
      <p className="text-gray-400">{photo.location}</p>
      <p className="text-gray-400">{photo.people}</p>
      <button className="mt-4 text-blue-600 hover:underline" onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}
