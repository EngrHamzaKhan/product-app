import { ENDPOINTS } from "../util/config";

export const login = async (username: string, password: string) => {
  try {
    console.log("login");
    const response = await fetch(ENDPOINTS.signin, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Invalid login credentials");
    }

    return await response.json(); 
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const response = await fetch(ENDPOINTS.refresh, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    return await response.json(); 
  } catch (error) {
    console.error("Token refresh failed:", error);
    throw error;
  }
};
