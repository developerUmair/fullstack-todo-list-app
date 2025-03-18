import apiClient from "./client";

export const signIn = async (credentials) => {
  try {
    const response = await apiClient.post("/auth/sign-in", credentials);
    console.log("response SignIn", response)
    if (response.data.data.accessToken) {
      localStorage.setItem("accessToken", response.data.data.accessToken);
      apiClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.accessToken}`;
    }
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("Authentication failed");
  }
};

export const signUp = async (userData) => {
  try {
    const response = await apiClient.post("/auth/sign-up", userData);
    console.log("response SignUp", response)
    return response.data;
  } catch (error) {
    throw error?.response
      ? error.response.data
      : new Error("Registeration failed!");
  }
};

export const signOut = () => {
    localStorage.removeItem('accessToken');
    delete apiClient.defaults.headers.common['Authorization'];
    window.location.href = "/sign-in"
  };


  export const isAuthenticated = () => {
    return !!localStorage.getItem("accessToken"); 
};

  
