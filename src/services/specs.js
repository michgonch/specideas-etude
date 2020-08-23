import api from "../api.axios";

class SpecsService {
  get(id) {
    return api.get(`/specs/${id}`);
  }

  getAll() {
    return api.get("/specs");
  }

  create(data) {
    return api.post("/specs", data);
  }

  update(id, data) {
    return api.put(`/specs/${id}`, data);
  }

  delete(id) {
    return api.delete(`/specs/${id}`);
  }

  findByTitle(title) {
    return api.get(`/specs?title=${title}`);
  }
};

export default new SpecsService();