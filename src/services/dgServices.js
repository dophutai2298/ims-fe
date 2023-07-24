import api from "../api/instance";
import { API_BASE } from "../api/config";
export class DgService {
  getDg() {
    return api.get(API_BASE);
  }
  deleteDg(id) {
    return api.delete(`${API_BASE}/dg/${id}`);
  }
}
