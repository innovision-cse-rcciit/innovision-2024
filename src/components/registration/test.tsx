"use client";
import React, { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    collegeRoll: "",
    department: "",
    section: "",
    phoneNumber: "",
    gender: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        alert("Registration successful! Confirmation email sent.");
      } else {
        alert("Failed to send confirmation email.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during registration.");
    }
  };

  return (
                        
                        <div className="relative min-h-screen bg-gray-900 flex items-center justify-center">
                        <div className="absolute inset-0 z-0">
                          <div
                            className="w-full h-full object-cover"
                            style={{ backgroundImage: "url('/registration_background.png')" }}
                          />
                        </div>
                  
                        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl px-8">
                          <div className="mb-8 lg:mb-0 lg:order-2 lg:w-1/2">
                            <img
                              src="/home/about/about_logo.png"
                              alt="Main Logo"
                              className="mx-auto w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 xl:w-[500px] xl:h-[500px]"
                            />
                          </div>
                          <div className="bg-white mr-4 bg-opacity-10 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-pink-600 w-full max-w-md lg:order-1 lg:w-1/2">
                          <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                      <label className="block text-white font-semibold mb-2" htmlFor="name">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        className="w-full px-4 py-2 border border-pink-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-pink-400"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-white font-semibold mb-2" htmlFor="email">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        className="w-full px-4 py-2 border border-pink-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-pink-400"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-white font-semibold mb-2" htmlFor="collegeRoll">
                        College Roll
                      </label>
                      <input
                        type="text"
                        id="collegeRoll"
                        required
                        className="w-full px-4 py-2 border border-pink-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-pink-400"
                        placeholder="Enter your college roll number"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-white font-semibold mb-2" htmlFor="department">
                        Department
                      </label>
                      <select
                        id="department"
                        defaultValue="" 
                        required
                        className="w-full px-4 py-2 border border-pink-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-pink-400"
                      >
                        <option value="" disabled>Select your department</option>
                        <option value="cse">Computer Science and Engineering</option>
                        <option value="it">Information Technology</option>
                        <option value="ece">Electronics and Communication Engineering</option>
                        <option value="ee">Electrical Engineering</option>
                      </select>
                    </div>
                    <div className="mb-2">
                      <label className="block text-white font-semibold mb-2" htmlFor="section">
                        Section
                      </label>
                      <input
                        type="text"
                        id="section"
                        required
                        className="w-full px-4 py-2 border border-pink-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-pink-400"
                        placeholder="Enter your section"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-white font-semibold mb-2" htmlFor="phoneNumber">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        required
                        className="w-full px-4 py-2 border border-pink-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-pink-400"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="block text-white font-semibold mb-2">Gender</label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="gender"
                            value="female"
                            className="form-radio text-pink-600"
                          />
                          <span className="ml-2 text-white">Female</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="gender"
                            value="male"
                            className="form-radio text-pink-600"
                          />
                          <span className="ml-2 text-white">Male</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="gender"
                            value="other"
                            className="form-radio text-pink-600"
                          />
                          <span className="ml-2 text-white">Rather not say</span>
                        </label>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-pink-600 hover:bg-pink-500 text-white font-semibold py-2 px-4 rounded-md transition-colors"
                    >
                      Submit
                    </button>
                  </form>
                          </div>
                        </div>
                      </div>
  );
}
