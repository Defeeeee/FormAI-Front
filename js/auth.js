function isLoggedIn() {
  const token = sessionStorage.getItem('token');
  return !!token;
}

function redirectIfNotLoggedIn() {
  if (window.location.pathname !== '/' && !isLoggedIn()) {
    window.location.href = '/login';
  }
}

function logout() {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('id');
  window.location.href = '/login';
}

export { redirectIfNotLoggedIn, logout };
