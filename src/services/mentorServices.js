import api from "../api/instance";
import { API_BASE } from "../api/config";
export class MentorService {
  getMentor() {
    return api.get(API_BASE);
  }
  deleteMentor(id) {
    return api.delete(`${API_BASE}/mentor/${id}`);
  }
}
