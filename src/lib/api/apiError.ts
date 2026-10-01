import axios from "axios";

export const getApiErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const data = error.response?.data;

    console.error("API ERROR");
    console.error("Status:", status);
    console.error("Response:", data);
    console.error("URL:", error.config?.url);
    console.error("Method:", error.config?.method);

    if (typeof data === "string") {
      return data;
    }

    if (data?.message) {
      return data.message;
    }

    if (data?.error) {
      return data.error;
    }

    if (status === 400) {
      return "Invalid request.";
    }

    if (status === 401) {
      return "Invalid email or password.";
    }

    if (status === 403) {
      return "You are not authorized to access this account.";
    }

    if (status === 404) {
      return "Login API endpoint was not found.";
    }

    if (status === 500) {
      return "Server error. Please try again later.";
    }

    return `Request failed${status ? ` (${status})` : ""}.`;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred.";
};