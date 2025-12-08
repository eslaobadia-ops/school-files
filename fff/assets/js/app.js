async function apiFetch(path, opts = {}) {
  const url = API_BASE + path;
  const headers = opts.headers || {};
  if (localStorage.getItem('token')) headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
  if (!opts.headers) opts.headers = headers;
  const res = await fetch(url, opts);
  const data = await res.json().catch(()=>({}));
  return { status: res.status, ok: res.ok, data };
}

function saveUser(user, token) {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', token);
}
function logout() {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  location.href = 'login.html';
}
