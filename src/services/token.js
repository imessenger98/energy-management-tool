const getLocalAccessToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.accessToken;
};
const getRefreshToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.refreshToken;
};

const updateLocalAccessToken = (token) => {
  const user = JSON.parse(localStorage.getItem('user'));
  user.accessToken = token;
  localStorage.setItem('user', JSON.stringify(user));
};

const tokenFunctions = {
  getLocalAccessToken,
  updateLocalAccessToken,
  getRefreshToken,
};
export default tokenFunctions;
