const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const loginForm = document.getElementById('logInForm');
const inputLogin = document.getElementById('login');
const inputPassword = document.getElementById('password');
const buttonOut = document.querySelector('.button-out');
const userName = document.querySelector('.user-name');

const login = (user) => {
  buttonAuth.style.display = 'none';
  buttonOut.style.display = 'flex';
  userName.style.display = 'flex';
  userName.textContent = user.login;
  closeModal();
};

const logout = () => {
  buttonAuth.style.display = 'flex';
  buttonOut.style.display = 'none';
  userName.style.display = 'none';
  userName.textContent = '';
  localStorage.removeItem('user');
};

buttonAuth.addEventListener('click', () => {
  modalAuth.style.display = 'flex';
});

function closeModal() {
  modalAuth.style.display = 'none';
}

modalAuth.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal-auth') || event.target.classList.contains('close-auth')) {
    closeModal();
  }
});

buttonOut.addEventListener('click', () => {
  logout();
});

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const user = {
    login: inputLogin.value,
    password: inputPassword.value,
  };
  if (user.login.trim() === '') {
    alert('Вы не ввели логин! \nЭто поле обязательно для заполнения!');
    return;
  }
  localStorage.setItem('user', JSON.stringify(user));
  login(user);
});

if (localStorage.getItem('user')) {
  login(JSON.parse(localStorage.getItem('user')));
}