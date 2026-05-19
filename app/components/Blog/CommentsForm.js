"use client"; // Required for client-side code in App Router

import React, { useState, useEffect } from "react";
import { submitComment } from "@/app/api/blog";

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorageAvailable, setLocalStorageAvailable] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
    storeData: false,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLocalStorageAvailable(true);
      setFormData({
        name: window.localStorage.getItem("name") || "",
        email: window.localStorage.getItem("email") || "",
        storeData: !!(window.localStorage.getItem("name") || window.localStorage.getItem("email")),
      });
    }
  }, []);

  const onInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePostSubmission = async () => {
    setError(false);
    const { name, email, comment, storeData } = formData;

    if (!name || !email || !comment) {
      setError(true);
      return;
    }

    const commentObj = { name, email, comment, slug };

    if (localStorageAvailable) {
      if (storeData) {
        window.localStorage.setItem("name", name);
        window.localStorage.setItem("email", email);
      } else {
        window.localStorage.removeItem("name");
        window.localStorage.removeItem("email");
      }
    }

    try {
      const res = await submitComment(commentObj);
      if (res.createComment) {
        setFormData({ name: "", email: "", comment: "", storeData });
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      setError(true);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Leave a Reply</h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          value={formData.comment}
          onChange={onInputChange}
          className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          name="comment"
          placeholder="Comment"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          value={formData.name}
          onChange={onInputChange}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Name"
          name="name"
        />
        <input
          type="email"
          value={formData.email}
          onChange={onInputChange}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Email"
          name="email"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            checked={formData.storeData}
            onChange={onInputChange}
            type="checkbox"
            id="storeData"
            name="storeData"
          />
          <label className="text-gray-500 text-sm cursor-pointer" htmlFor="storeData">
            Save my name, email in this browser for the next time I comment.
          </label>
        </div>
      </div>
      {error && <p className="text-xs text-red-500">All fields are mandatory</p>}
      <div className="mt-8">
        <button
          type="button"
          onClick={handlePostSubmission}
          className="transition duration-500 ease bg-primary_color hover:bg-secondary_color text-white px-8 py-3 cursor-pointer"
        >
          Post Comment
        </button>
        {showSuccessMessage && (
          <p className=" float-right font-semibold mt-3 text-green-500">
            Comment submitted for review
          </p>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;
