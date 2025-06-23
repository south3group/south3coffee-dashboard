import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCredentials } from '../../store/authSlice';
import axios from 'axios';

import Header from '../../components/Header/Header';
import { images } from '../../constants/image';

const AdminLogin = () => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState('');

  const navigate = useNavigate();
  const { token, isAuthChecked } = useSelector((state) => state.auth);

  // 如果是登入狀態就導向其他頁面
  useEffect(() => {
    if (token && isAuthChecked) {
      navigate('/');
    }
  }, [token, isAuthChecked, navigate]);

  const apiUrl = import.meta.env.VITE_API_URL;
  const route = `${apiUrl}/api/v1/users/login`;

  const dispatch = useDispatch();

  const clearInputs = () => {
    setAccount('');
    setPassword('');
  };

  // 控制 modal
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  const loginHandler = () => {
    const accountRegex =
      /^[a-zA-Z0-9._%+-]{1,64}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/;

    if (account.trim() === '' || password.trim() === '') {
      setModalMsg('帳號密碼不可為空');
      setIsOpen(true);
      clearInputs();
      return;
    } else if (!accountRegex.test(account) || account.length > 100) {
      setModalMsg('管理者不存在或密碼輸入錯誤');
      setIsOpen(true);
      clearInputs();
      return;
    } else if (!passwordRegex.test(password)) {
      setModalMsg('管理者不存在或密碼輸入錯誤');
      setIsOpen(true);
      clearInputs();
      return;
    }

    axios
      .post(route, {
        email: account,
        password: password,
      })
      .then((res) => {
        const token = res.data.data.token;
        const name = res.data.data.user.name;
        const role = res.data.data.user.role;

        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('username', name);

        console.log(res)

        dispatch(setCredentials({ token, role, username: name }));

        clearInputs();
        navigate('/');
      })
      .catch((err) => {
        const msg = err.response?.data?.message || '發生錯誤';
        setModalMsg(msg);
        setIsOpen(true);
        clearInputs();
      });
  };

  return (
    <>
      <Header />
      <div className="auth-bg d-flex justify-content-center align-items-center ">
        <div className="shadow auth-custom">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <img
              src={images.logoDark}
              alt="dark logo"
              className="logo-custom"
            />
            <h4 className="display-6 text-center text-coffee-primary-600">
              管理員登入
            </h4>
          </div>

          <form className="form-custom">
            <div className="form-input-custom">
              <label
                htmlFor="memberEmail"
                className="form-label form-label-custom text-coffee-primary-900"
              >
                管理員帳號
              </label>
              <input
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                type="email"
                className="form-control form-control-custom rounded-0"
                id="memberEmail"
                placeholder="請輸入管理員帳號/Email"
                maxLength={100}
              />
            </div>

            <div className="form-input-custom">
              <label
                htmlFor="memberPassword"
                className="form-label form-label-custom text-coffee-primary-900"
              >
                管理員密碼
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control form-control-custom rounded-0"
                id="memberPassword"
                placeholder="請輸入管理員密碼"
              />
            </div>
          </form>

          <button
            type="button"
            className="btn btn-coffee-primary-700 btn-style w-100 rounded-0 border-0"
            onClick={loginHandler}
          >
            登入
          </button>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className="modal show fade d-block custom-modal"
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog custom-modal-dialog">
            <div className="modal-content custom-modal-content">
              <div className="modal-header custom-modal-header">
                <h5 className="custom-modal-title">系統通知</h5>
                <button
                  type="button"
                  className="custom-modal-close"
                  onClick={() => setIsOpen(false)}
                >
                  ✕
                </button>
              </div>
              <div className="modal-body custom-modal-body">{modalMsg}</div>
              <div className="modal-footer custom-modal-footer">
                <button
                  type="button"
                  className="custom-modal-btn"
                  onClick={() => setIsOpen(false)}
                >
                  關閉
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminLogin;
