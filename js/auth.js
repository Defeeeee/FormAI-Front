function isLoggedIn() {
  const token = sessionStorage.getItem('token');
  return !!token;
}

function redirectIfNotLoggedIn() {
  if (!isLoggedIn()) {
    window.location.href = '/login';
  }
}
