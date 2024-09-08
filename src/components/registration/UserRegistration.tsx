"use client";
import React, { useEffect, useState } from "react";
import Heading from "../common/Heading";
import { clearSpaces, validateUserReg } from "@/utils/functions/validateReg";
import { supabase } from "@/lib/supabase-client";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/store/user";
import FormElement from "../events/FormElement";
import RegFormElement from "../events/RegFormElement";
import Image from "next/image";

// Array of department options
const departmentOptions = [
  { value: "CSE", label: "Computer Science and Engineering" },
  { value: "IT", label: "Information Technology" },
  { value: "ECE", label: "Electronics and Communication Engineering" },
  { value: "EE", label: "Electrical Engineering" },
  { value: "AEIE", label: "Applied Electronics & Instrumentation Engineering" },
  { value: "BCA", label: "Bachelor Of Computer Application" },
];

export default function Register() {
  const router = useRouter();
  const user = useUser((state) => state.user);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    collegeRoll: "",
    department: "",
    section: "",
    phone: "",
    gender: "",
    year: "",
  });
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    collegeRoll: "",
    department: "",
    section: "",
    phone: "",
    gender: "",
    year: "",
  });

  useEffect(() => {
    if (user) {
      setInputs((prevInputs) => ({
        ...prevInputs,
        name: user.name,
        email: user.email,
        collegeRoll: user.college_roll,
        department: user.department,
        section: user.section,
        phone: user.phone,
        year: user.year,
        gender: user.gender,
      }));
    }
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };
  const setUser = useUser((state) => state.setUser);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const validation = validateUserReg(inputs);
      const allFieldsValid = Object.values(validation).every(
        (value) => value === ""
      );
      console.log(allFieldsValid);
      console.log(validation);
      if (allFieldsValid) {
        const { data, error } = await supabase
          .from("users")
          .update({
            name: inputs.name,
            phone: clearSpaces(inputs.phone).trim(),
            gender: inputs.gender,
            college_roll: inputs.collegeRoll,
            department: inputs.department,
            year: inputs.year,
            section: inputs.section,
          })
          .eq("id", user?.id).select();
        setUser(data![0]);

        if (error) {
          toast.error("There was an error submitting the form");
          return;
        }

        router.push("/events");
        toast.success("Registration Successful");
      } else {
        setErrors(validation);
        toast.error("Fill all the fields accurately!");
      }
    } catch (error) {
      console.error("Error occurred", { error });
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div className="relative min-h-screen l bg-gray-900  w-full bg-no-repeat bg-cover registration-bg">

      <div className="gap-10 flex flex-col items-center justify-center py-10">
        <Toaster position="bottom-right" />
        <Heading text="REGISTRATION" />
        <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between w-full max-w-7xl px-8">
          <div className="mb-8 lg:mb-0 lg:order-2 lg:w-1/2">
            <Image
              width={400}
              height={400}
              src="https://i.postimg.cc/G297YJLj/about-logo.png"
              alt="Main Logo"
              className="mx-auto w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 xl:w-[500px] xl:h-[500px]"
            />
          </div>

          <div className="bg-white  mr-4 bg-opacity-10 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-pink-600 w-full max-w-md lg:order-1 lg:w-1/2">
            {/* Name Input */}
            <div className="mb-2 w-full">
              <RegFormElement
                type="text"
                name={"Name"}
                value={inputs.name}
                id="name"
                onChange={handleInputChange}
                width="100%"
              />
              {errors.name && (
                <h1 className="text-xs font-semibold text-red-600">
                  {errors.name}
                </h1>
              )}
            </div>

            {/* Email Input */}
            <div className="mb-2">
              <RegFormElement
                type="email"
                disabled
                name={"Email"}
                value={inputs.email}
                id="email"
                onChange={handleInputChange}
                width="100%"
              />
              {errors.email && (
                <h1 className="text-xs font-semibold text-red-600">
                  {errors.email}
                </h1>
              )}
            </div>

            {/* College Roll Input */}
            <div className="mb-2">
              <RegFormElement
                type="text"
                name={"College Roll"}
                value={inputs.collegeRoll}
                id="collegeRoll"
                onChange={handleInputChange}
                width="100%"
              />
              {errors.collegeRoll && (
                <h1 className="text-xs font-semibold text-red-600">
                  {errors.collegeRoll}
                </h1>
              )}
            </div>

            {/* Department Dropdown */}
            <div className="mb-2">
              <label
                id="glow"
                className="text-base font-sans tracking-widest font-semibold md:text-lg"
                htmlFor="department"
              >
                Department :
              </label>
              <select
                id="department"
                name="department"
                value={inputs.department}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-pink-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-pink-400"
              >
                <option value="" disabled>
                  Select your department
                </option>
                {departmentOptions.map((department) => (
                  <option key={department.value} value={department.value}>
                    {department.label}
                  </option>
                ))}
              </select>
              {errors.department && (
                <h1 className="text-xs font-semibold text-red-600">
                  {errors.department}
                </h1>
              )}
            </div>

            <div className="mb-3">
              <label
                id="glow"
                className="text-base font-sans tracking-widest font-semibold md:text-lg"
                htmlFor="section"
              >
                Section
              </label>
              <div className="flex space-x-4">
                {["A", "B", "C", "D"].map((section) => (
                  <label key={section} className="flex items-center">
                    <input
                      type="radio"
                      name="section"
                      value={section}
                      checked={inputs.section === section}
                      onChange={handleInputChange}
                      className="form-radio text-pink-600"
                    />
                    <span className="ml-2 text-white">{section}</span>
                  </label>
                ))}
              </div>
              {errors.section && (
                <h1 className="text-xs font-semibold text-red-600">
                  {errors.section}
                </h1>
              )}
            </div>

            <div className="mb-3">
              <label
                id="glow"
                className="text-base font-sans tracking-widest font-semibold md:text-lg"
                htmlFor="year"
              >
                Year
              </label>
              <div className="flex space-x-4">
                {["1st", "2nd", "3rd", "4th"].map((year) => (
                  <label key={year} className="flex items-center">
                    <input
                      type="radio"
                      name="year"
                      value={year}
                      checked={inputs.year === year}
                      onChange={handleInputChange}
                      className="form-radio text-pink-600"
                    />
                    <span className="ml-2 text-white">{year}</span>
                  </label>
                ))}
              </div>
              {errors.year && (
                <h1 className="text-xs font-semibold text-red-600">
                  {errors.year}
                </h1>
              )}
            </div>

            {/* Phone Number Input */}
            <div className="mb-2">
              <RegFormElement
                type="text"
                name={"Phone"}
                value={inputs.phone}
                id="phone"
                onChange={handleInputChange}
                width="100%"
              />
              {errors.phone && (
                <h1 className="text-xs font-semibold text-red-600">
                  {errors.phone}
                </h1>
              )}
            </div>

            <div className="mb-3">
              <label
                id="glow"
                className="text-base font-sans tracking-widest font-semibold md:text-lg"
                htmlFor="gender"
              >
                Gender
              </label>
              <div className="flex space-x-4">
                {["FEMALE", "MALE", "OTHER"].map((gender) => (
                  <label key={gender} className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value={gender}
                      checked={inputs.gender === gender}
                      onChange={handleInputChange}
                      className="form-radio text-pink-600"
                    />
                    <span className="ml-2 text-white">{gender}</span>
                  </label>
                ))}
              </div>
              {errors.gender && (
                <h1 className="text-xs font-semibold text-red-600">
                  {errors.gender}
                </h1>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={(e: any) => handleSubmit(e)}
              className="w-full bg-pink-600 hover:bg-pink-500 text-white font-semibold py-2 px-4 rounded-md transition-colors"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
