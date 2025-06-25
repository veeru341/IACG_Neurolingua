import axios from "axios";
import { baseURL } from "../../../utils/api";

function createAxios() {
  const token = JSON.parse(localStorage.getItem("profile"))?.token;
  return axios.create({
    baseURL: `${baseURL}/teacher`,
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token && token.access}`,
    },
  });
}

function createAxiosReview() {
  const token = JSON.parse(localStorage.getItem("profile"))?.token;
  return axios.create({
    baseURL: `${baseURL}`,
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token && token.access}`,
    },
  });
}

export const getTeacherDetailById = (uid) => async(dispatch) => {
  try {
    let API = createAxios()
    const {data} = await API.get(`/userId/${uid}`)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const updateRatings = (audioRating,videoRating,teacherRating,comments,sessionID, teacherId, studentId) => async(dispatch) => {
  try {
    let API = createAxiosReview()
    // const {data} = await API.get(`/userId/${uid}`)
    // return data
    let payload={
      courseId:sessionID,
      teacherId:teacherId,
      audio_rating:audioRating,
      video_rating:videoRating,
      teacher_rating:teacherRating, 
      userId : studentId, 
      comments:comments
    }
    const { data } = await API.post("/review/addTeacherReivew", payload);
    return data;
  } catch (error) {
    console.log(error)
  }
}

export const getTeacherSessions = (payload) => async(dispatch) => {
  try {
    // console.log(tid)
    let API = createAxios()
    const {data} = await API.get(`/sessions`)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getUpcomingClassForTeacher = (payload) => async(dispatch) => {
  try{
    let API = createAxios()
    const {data} = await API.get("/upcomingClass")
    return data
  } catch(error){
    console.log(error)
    return error.response.message;
  }
}

export const getTeacherDetailByTId = (tid) => async(dispatch) => {
  try {
    let API = createAxios()
    const {data} = await API.get(`/teacherId/${tid}`)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getTeacherData = (payload) => async (dispatch) => {
  try {
    let API = createAxios();
    // console.log(payload, 'payload')
    const { data } = await API.get("/detail");

    localStorage.setItem("teacherData", JSON.stringify(data));
    return data;
  } catch (e) {
    console.log(e);
    return e.response.message;
  }
};

export const updateTeacherProfile = (payload) => async (dispatch) => {
  try {
    let API = createAxios();
    console.log(payload)
    const { data } = await API.post("/updateProfile", payload);
    return data;
  } catch (e) {
    console.log(e);
    return e.response.message;
  }
};

export const updateCourse = (payload) => async (dispatch) => {
  try {
    let API = createAxios();

    // console.log(payload, 'payload')
    const { data } = await API.post("/updateCourse", payload);
    return data;
  } catch (e) {
    console.log(e);
    return e.response.message;
  }
};

export const addAvailability = (payload) => async (dispatch) => {
  try {
    let API = createAxios();

    console.log(payload, "payload");
    const { data } = await API.post("/addAvailability", payload);
    console.log(data, "DaTA");
    // dispatch({ type: "Create_Course", payload: { ...data } });
    return data;
  } catch (e) {
    console.log(e);
    return e.response.message;
  }
};

export const editAvailability = (payload) => async (dispatch) => {
  try {
    let API = createAxios();

    console.log(payload, "payload");
    const { data } = await API.post("/editAvailability", payload);
    console.log(data, "DaTA");
    // dispatch({ type: "Create_Course", payload: { ...data } });
    return data;
  } catch (e) {
    console.log(e);
    return e.response.message;
  }
};

export const getTeacherEarnings = async (payload) => {
  try {
    let API = createAxios();

    const { data } = await API.get("/allMyEarnigs");
    console.log(data, "DaTA");
    console.log(data.success, "DaTA");
    console.log(data.data, "DaTA");

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getTeacherWithdrawals = async (payload) => {
  try {
    let API = createAxios();

    const { data } = await API.get("/getAllMyPayouts");
    console.log(data, "DaTA");
    console.log(data.success, "DaTA");
    console.log(data.data, "DaTA");

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getTeacherWallet = async (payload) => {
  try {
    let API = createAxios();

    const { data } = await API.get("/getMyBalance");
    console.log(data, "DaTA");
    console.log(data.success, "DaTA");
    console.log(data.data, "DaTA");

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getTeacherTodayEarnings = async (payload) => {
  try {
    let API = createAxios();

    const { data } = await API.get("/getTodayEarnings");

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getTeacherPendingEarnings = async (payload) => {
  try {
    let API = createAxios();

    const { data } = await API.get("/getTeacherPendingEarnings");

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getTeacherAlreadyWithdrawn = async (payload) => {
  try {
    let API = createAxios();

    const { data } = await API.get("/getTeacherAlreadyWithdrawn");

    return data;
  } catch (e) {
    console.log(e);
  }
};
