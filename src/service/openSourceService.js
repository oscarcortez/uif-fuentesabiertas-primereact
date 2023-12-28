import axios from "axios";
import { authenticateService } from "./authenticateService";
export class openSourceService {
  async findAll() {
    const authService = new authenticateService();
    const responseAuth = authService.currentUser();

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${responseAuth.token}`,
    };
    const response = await axios.get(
      `http://localhost:8075/api/v1/opensources/page?nroPage=1&pageSize=50`,
      { headers }
    );
    return response.data;
  }
}
