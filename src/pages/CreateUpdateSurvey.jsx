import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSurveyByID, createSurvey, updateSurvey } from "../service/api";

function CreateUpdateSurvey() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isCreate, setIsCreate] = useState(true);
  const [submitForm, setSubmitForm] = useState({
    name: "",
    phone: "",
    address: "",
    gender: "Male",
    jobtitle: "",
    age: 0,
    remark: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "age") {
      setSubmitForm({
        ...submitForm,
        [name]: parseInt(value),
      });
    } else {
      setSubmitForm({
        ...submitForm,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitForm.age == 0) {
      alert("Age can't be zero!");
      return false;
    }
    console.log("Submitted Data:", submitForm);
    try {
      if (isCreate) {
        const response = await createSurvey(submitForm);
        if (response.status == 200) {
          const res = response.data;
          if (res.status == "success") {
            goBack();
          }
        }
      } else {
        const body = {
          id: id,
          name: submitForm.name,
          phone: submitForm.phone,
          address: submitForm.address,
          gender: submitForm.gender,
          jobtitle: submitForm.jobtitle,
          age: submitForm.age,
          remark: submitForm.remark,
        };
        const response = await updateSurvey(body);
        if (response.status == 200) {
          const res = response.data;
          if (res.status == "success") {
            goBack();
          }
        }
      }
    } catch (e) {
      alert(`${e}`);
    }
  };

  const goBack = () => {
    navigate(`/`);
  };

  const fetchSurveyData = async () => {
    try {
      const body = {
        id: id,
      };
      const response = await getSurveyByID(body);
      if (response.status == 200) {
        const res = response.data;
        if (res.status == "success") {
          setSubmitForm({
            name: res.data.name,
            phone: res.data.phone,
            address: res.data.address,
            gender: res.data.gender,
            jobtitle: res.data.jobtitle,
            age: res.data.age,
            remark: res.data.remark,
          });
        }
      }
    } catch (e) {
      alert(`${e}`);
    }
  };

  useEffect(() => {
    if (id === "null") {
      setIsCreate(true);
    } else {
      setIsCreate(false);
      console.log(id);
      fetchSurveyData();
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-[#E3FDFD] py-3 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl">
        <h1 className="text-[#71C9CE] text-center text-3xl font-bold">
          {isCreate ? "Create" : "Update"} Survey
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={submitForm.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={submitForm.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={submitForm.address}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          {/* Gender */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Gender
            </label>
            <select
              name="gender"
              value={submitForm.gender}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          {/* Jobtitle */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Jobtitle
            </label>
            <input
              type="text"
              name="jobtitle"
              value={submitForm.jobtitle}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          {/* Age */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Age</label>
            <input
              type="number"
              name="age"
              value={submitForm.age}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          {/* Remark */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Remark
            </label>
            <textarea
              name="remark"
              value={submitForm.remark}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-end">
            <button
              onClick={goBack}
              className="bg-black text-white py-2 px-4 rounded-lg mr-3"
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-[#A6E3E9] text-black py-2 px-4 rounded-lg"
            >
              {isCreate ? "Create" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateUpdateSurvey;
