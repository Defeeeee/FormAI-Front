function isLoggedIn() {
  const token = sessionStorage.getItem('token');
  return !!token;
}

function redirectIfNotLoggedIn() {
  if (window.location.pathname !== '/' && !isLoggedIn()) {
    window.location.href = '/login';
  }
}

function redirectIfLoggedIn() {
  if ((window.location.pathname === '/login' || window.location.pathname === '/register')  && isLoggedIn()) {
    window.location.href = '/dashboard';
  }
}

function logout() {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('id');
  window.location.href = '/login';
}

export { redirectIfNotLoggedIn, logout, redirectIfLoggedIn};
