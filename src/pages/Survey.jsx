import React, { useEffect, useState } from "react";
import { getSurveyList, deleteSurveyByID } from "../service/api";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

function Survey() {
  const navigate = useNavigate();
  const [surveyList, setSurveyList] = useState([]);

  async function getSurvey() {
    try {
      const response = await getSurveyList();
      if (response.status == 200) {
        const res = response.data;
        if (res.status == "success") {
          setSurveyList(res.data);
        }
      }
    } catch (e) {
      alert(`${e}`);
    }
  }

  useEffect(() => {
    getSurvey();
  }, []);

  const createUpdateSurvey = (id) => {
    navigate(`/createupdate/${id}`);
  };

  const deleteSurvey = async (id) => {
    try {
      const body = {
        id: id,
      };
      const response = await deleteSurveyByID(body);
      if (response.status == 200) {
        const res = response.data;
        if (res.status == "success") {
          getSurvey();
        }
      }
    } catch (e) {
      alert(`${e}`);
    }
  };

  return (
    <div className="h-screen bg-[#E3FDFD] pt-3">
      <section>
        <section className="flex justify-between ml-10 mr-10">
          <h1 className="text-[#71C9CE] text-center text-3xl font-bold">
            Survey List
          </h1>

          <button
            onClick={() => createUpdateSurvey(null)}
            className="bg-[#A6E3E9] text-black py-2 px-4 rounded-lg"
          >
            Create
          </button>
        </section>
        {surveyList.length == 0 ? (
          <h1 className="text-[#00000] text-center text-2xl font-semibold mt-24">
            Empty
          </h1>
        ) : (
          <div className="m-10 grid lg:grid-cols-4 lg:gap-4 md:grid md:grid-cols-3 md:gap-3">
            {surveyList.map((survey) => (
              <div
                key={survey.id}
                className="bg-[#CBF1F5] p-4 rounded-2xl mb-4"
              >
                <div className="font-bold text-2xl">Name: {survey.name}</div>
                <p className="text-gray-700 text-lg">Phone : {survey.phone}</p>
                <p className="text-gray-700 text-lg">
                  Address : {survey.address}
                </p>
                <p className="text-gray-700 text-lg">
                  Gender : {survey.gender}
                </p>
                <p className="text-gray-700 text-lg">
                  Jobtitle : {survey.jobtitle}
                </p>
                <p className="text-gray-700 text-lg">Age : {survey.age}</p>
                <p className="text-gray-500 text-base">
                  Remark : {survey.remark}
                </p>
                <div className="flex h-10 justify-end mt-4">
                  <button
                    onClick={() => createUpdateSurvey(survey.id)}
                    className="bg-[#A6E3E9] text-black py-2 px-4 rounded-lg mr-3"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => deleteSurvey(survey.id)}
                    className="bg-red-600 text-white py-2 px-4 rounded-lg"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Survey;
