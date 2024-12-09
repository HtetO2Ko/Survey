import axios from "axios";

const domainURL = "http://localhost:8080";

export async function getSurveyList() {
  try {
    const response = await axios.post(
      `${domainURL}/routes/user_route/getAllUserSurvey`
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function getSurveyByID(body) {
  try {
    const response = await axios.post(
      `${domainURL}/routes/user_route/getUserSurveyByID`,
      body
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteSurveyByID(body) {
  try {
    const response = await axios.post(
      `${domainURL}/routes/user_route/deleteOneuserSurvey`,
      body
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function createSurvey(body) {
  try {
    const response = await axios.post(
      `${domainURL}/routes/user_route/createUserSurvey`,
      body
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function updateSurvey(body) {
  try {
    const response = await axios.post(
      `${domainURL}/routes/user_route/updateUserSurvey`,
      body
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}
