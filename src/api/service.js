import { API_BASE, API_Mentor } from "./config";
import api from "./instance";
import axios from "axios";
import * as Config from "./config";

export const loginAPI = (username, password) => {
  return api.post(`${Config.API_BASE}/auth/login`, {
    username: username,
    password: password,
  });
};
export function batchAPI(endpoint) {
  return api.get(`${API_BASE}/${endpoint}`, null);
}
export function batchHome(endpoint) {
  return api.get(`${API_BASE}/${endpoint}`, null);
}
export function batchCreate(endpoint, body) {
  return api.post(`${API_BASE}/${endpoint}`, body);
}
export function batchPut(endpoint, body) {
  return api.put(`${API_BASE}/${endpoint}`, body);
}
export function deleteBatch(endpoint) {
  return api.delete(`${API_BASE}/${endpoint}`, null);
}
export function candidateAPI(endpoint) {
  return api.get(`${API_BASE}/${endpoint}`, null);
}
export function mentorAPI(endpoint) {
  return api.get(`${API_BASE}/${endpoint}`, null);
}
export function candidatePost(endpoint, body) {
  return api.post(`${API_BASE}/${endpoint}`, body);
}
export function mentorCreate(endpoint, body) {
  return api.post(`${API_BASE}/${endpoint}`, body);
}

export function mentorEdit(endpoint, body) {
  return api.put(`${API_BASE}/${endpoint}`, body);
}

export const sendEmail = (data) => {
  return api.post(`${API_BASE}/sendeMail`, data);
};
export const saveDataInterview = (id, data) => {
  return api.put(`${API_BASE}/candidate/interview/${id}`, data);
};
export function candidatePut(endpoint, body) {
  return api.put(`${API_BASE}/${endpoint}`, body);
}
export function interviewAPI(endpoint) {
  return api.get(`${API_BASE}/${endpoint}`, null);
}
export function student(endpoint) {
  return api.get(`${API_BASE}/${endpoint}`, null);
}
export function studentCreate(endpoint, body) {
  return api.post(`${API_BASE}/${endpoint}`, body);
}
export function dg(endpoint) {
  return api.get(`${API_BASE}/${endpoint}`, null);
}
export function deleteStudent(endpoint) {
  return api.delete(`${API_BASE}/${endpoint}`, null);
}
export function editStudent(endpoint, body) {
  return api.put(`${API_BASE}/${endpoint}`, body);
}
export function mentorDG(endpoint) {
  return api.get(`${API_BASE}/${endpoint}`, null);
}

export function delinterviewAPI(endpoint) {
  return api.delete(`${API_BASE}/${endpoint}`, null);
}
export function updateinterviewAPI(endpoint, body) {
  return api.put(`${API_BASE}/${endpoint}`, body);
}
export function insertinterviewAPI(endpoint) {
  return api.post(`${API_BASE}/${endpoint}`, null);
}
export function internshipStatusUpdate(endpoint, body) {
  return api.put(`${API_BASE}/${endpoint}`, body);
}
export function updateinsertinterviewAPI(endpoint, body) {
  return api.put(`${API_BASE}/${endpoint}`, body);
}
export function UploadAPI(endpoint, file , config) {
  return api.post(`${API_BASE}/${endpoint}`, file );
}
export function deleteCandi(endpoint) {
  return api.delete(`${API_BASE}/${endpoint}`, null);
}
export function dgCreate(endpoint, body) {
  return api.post(`${API_BASE}/${endpoint}`, body);
}
export function dgEdit(endpoint, body) {
  return api.put(`${API_BASE}/${endpoint}`, body);
}