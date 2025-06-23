import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuth, logout } from '../../store/authSlice';
import { images } from '../../constants/image';

const AdminSidebar = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dispatch = useDispatch();
  const { token, username, isAuthChecked, role } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const location = useLocation();

  const [_, setMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthChecked) {
      if (!token || role !== 'ADMIN') {
        dispatch(logout());
        // window.location.href = 'https://south3group.github.io/south3coffee/login';
        navigate('/login');
      }
    }
  }, [isAuthChecked, token, role, dispatch, navigate]);

  const sidebarItems = [
    { title: '會員中心', path: '/admin' },
    { title: '訂單管理', path: '/admin/orders' },
    { title: '商品管理', path: '/admin/products' },
    { title: '數據中心', path: '/admin/data_center' },
    { title: '聆聽意見箱', path: '/admin/feedback' },
  ];

  // 登出
  const handleLogout = () => {
    dispatch(logout());
    // window.location.href = 'https://south3group.github.io/south3coffee/login';
    navigate('/login');
  };

  // 控制收合
  const handleToggle = (e) => {
    e.preventDefault();
    setSidebarOpen(!sidebarOpen);
  };

  // 控制 body 加 sidebar-toggle
  useEffect(() => {
    if (sidebarOpen) {
      document.body.classList.add('sidebar-toggle');
    } else {
      document.body.classList.remove('sidebar-toggle');
    }
  }, [sidebarOpen]);

  return (
    <div className="admin-sidebar-style">
      {/* 手機版 */}
      <nav className="navbar  d-md-none bg-coffee-primary-700 sticky-top shadow nav-brand member-navbar">
        <div className="container-fluid container-width">
          <Link to="/" className="navbar-brand nav-logo">
            <img
              src={images.logoIcon}
              alt="coffee logo"
              className="logo-icon"
            />
            <span className="logo-text text-coffee-secondary-300">
              築豆咖啡
            </span>
          </Link>

          {/* 使用者大頭貼 */}
          <div className="user-dropdown-wrapper">
            <button
              className="border-0 bg-transparent profile-btn"
              onClick={() => {
                setUserDropdownOpen(!userDropdownOpen);
                setMenuOpen(false);
              }}
            >
              <img
                src={images.profile}
                alt="user"
                className="d-md-none rounded-circle mobile-profile"
              />
            </button>
          </div>
        </div>
      </nav>
      {userDropdownOpen && (
        <>
          <div
            className="member-mobile-menu-overlay"
            onClick={() => setUserDropdownOpen(false)}
          ></div>

          {/* 使用者選單 */}
          <div
            className={`member-mobile-menu d-md-none ${userDropdownOpen ? 'open' : ''}`}
          >
            <ul className="px-0">
              {sidebarItems.map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.path}
                    className="dropdown-item"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    setUserDropdownOpen(false);
                  }}
                  className="dropdown-item"
                >
                  登出
                </button>
              </li>
            </ul>
          </div>
        </>
      )}

      {/* 桌電版 */}
      <div className=" d-flex min-vh-100">
        <aside
          className={`sidebar ${sidebarOpen ? 'open' : ''} sidebar-custom  bg-coffee-primary-700 d-none d-md-flex flex-column`}
        >
          {/* scale */}
          <div className="d-flex flex-row-reverse">
            <button
              type="button"
              onClick={handleToggle}
              className={`scale-btn bg-coffee-primary-700 border-0 ${sidebarOpen ? 'position-fixed' : ''}`}
              style={{ top: 0, left: 0 }}
            >
              <img src={images.scale} alt="scale button" />
            </button>
          </div>

          {/* 內容 */}
          <div className="sidebar-detail-custom">
            {/* LOGO */}
            <strong>
              <Link
                to="/"
                className="sidebar-logo d-flex flex-column d-md-block align-bottom align-items-center"
              >
                <img
                  src={images.logoIcon}
                  alt="coffee logo"
                  className="logo-icon"
                />
                <span className="logo-text text-coffee-secondary-300">
                  築豆咖啡
                </span>
              </Link>
            </strong>

            <p className="page-name m-0">後臺管理中心</p>

            {/* 選單 */}
            <div className="overflow-auto">
              <div className="menu-custom">
                {sidebarItems.map((item, i) => (
                  <Link
                    key={i}
                    to={item.path}
                    className={`sidebar-link menu-custom-detail ${location.pathname === item.path ? 'active' : ''}`}
                  >
                    <span>{item.title}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bottom-style mt-auto">
              {/* profile */}
              <div className="d-flex flex-column flex-md-row align-items-center profile-style">
                <img src={images.profile} alt="profile photo" />
                <span className="m-0 text-coffee-primary-000 span-custom">
                  {username || 'Admin'}
                </span>
              </div>

              {/* 登出 */}
              <button
                type="button"
                className="sidebar-logout border border-primary-300 text-center text-decoration-none"
                onClick={handleLogout}
              >
                <span className="text-coffee-primary-000">登出</span>
              </button>
            </div>
          </div>
        </aside>

        {/* 內容 */}
        <main className="member-main flex-grow-1">
          <div className="main-content">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminSidebar;
