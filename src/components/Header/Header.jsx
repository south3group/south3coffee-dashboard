import { Link, useNavigate, useLocation } from 'react-router-dom';
import { images } from '../../constants/image';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuth } from '../../store/authSlice';

import '../../constants/image';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const { token, isAuthChecked } = useSelector((state) => state.auth);
  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // 已登入不能進登入相關頁
  useEffect(() => {
    if (isAuthChecked && token && ['/login'].includes(location.pathname)) {
      navigate('');
    }
  }, [isAuthChecked, token, navigate, location.pathname]);

  return (
    <nav className="navbar navbar-expand-md bg-coffee-primary-700 sticky-top shadow nav-brand">
      <div className="container-fluid container-width">
        <a
          href="https://south3group.github.io/south3coffee/"
          className="navbar-brand nav-logo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={images.logoIcon} alt="coffee logo" className="logo-icon" />
          <span className="logo-text text-coffee-secondary-300">築豆咖啡</span>
        </a>

        {/* 手機版 */}
        <div className="d-flex d-md-none align-items-center ms-auto gap-2 mobile-custom">
          {/* 漢堡按鈕 */}
          <button
            className="hamburger-btn"
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {menuOpen && (
          <>
            <div
              className="mobile-menu-overlay"
              onClick={() => setMenuOpen(false)}
            ></div>

            {/* 側邊選單 */}
            <div className="mobile-menu d-md-none">
              <ul className="px-0">
                <li>
                  <Link to="/login" onClick={() => setMenuOpen(false)}>
                    登入
                  </Link>
                </li>
              </ul>
            </div>
          </>
        )}

        {/* 桌電版 */}
        <ul className="navbar-nav ms-auto d-none d-md-flex align-items-center navbar-menu">
          <li className="nav-item dropdown hover-dropdown">
            <Link to="/login" className="nav-link nav-link-custom ">
              登入
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
