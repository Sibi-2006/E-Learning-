export const setToken = (token)=>{
    localStorage.setItem("token",token);
}
export const SetUser = (user)=>{
    localStorage.setItem("user", JSON.stringify(user));
}

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getUser = () => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
};
