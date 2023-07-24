import api from "../../api/instance";
import { API_BASE } from "../../api/config";

export class CandiService {

  deleteCandi(idCandidate) {
    return api.delete(`${API_BASE}/candidate/${idCandidate}`);
  }
}