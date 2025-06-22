import {  useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuth, logout } from '../../store/authSlice';

import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import PieChartComponent from '../../components/PieChartComponent/PieChartComponent';
import BarChartComponent from '../../components/BarChartComponent/BarChartComponent';

import { images } from '../../constants/image';

const AdminHome = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { token, isAuthChecked, role } = useSelector(
    (state) => state.auth,
  );

  // useEffect(() => {
  //   dispatch(checkAuth());
  // }, [dispatch]);

  // useEffect(() => {
  //   if (isAuthChecked) {
  //     if (!token || role !== 'ADMIN') {
  //       dispatch(logout());
  //       window.location.href = 'https://south3group.github.io/south3coffee/login';
  //       navigate('/login');

  //     }
  //   }
  // }, [isAuthChecked, token, role, dispatch, navigate]);

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <div className="flex-grow-1">
          <AdminSidebar>
            <div className="admin-home-style w-100">
              {/* 出貨 & 營業額 */}
              <div className="sales-overview">
                <div className="sales-overview-box">
                  <p className="sales-overview-box-title">未出貨</p>
                  <p className="sales-overview-box-text">2,327</p>
                </div>
                <div className="sales-overview-box">
                  <p className="sales-overview-box-title">本月已出貨</p>
                  <p className="sales-overview-box-text">18,369</p>
                </div>
                <div className="sales-overview-box">
                  <p className="sales-overview-box-title">月營業額</p>
                  <div className="sales-overview-box-text">
                    <p className="sales-overview-box-text-currency">NTD$</p>
                    <p className="sales-overview-box-text-num m-0">2,347,615</p>
                  </div>
                </div>
              </div>

              {/* 最新訂單 */}
              <p className="admin-home-title m-0">最新訂單</p>
              <div className="new-orders">
                {/* 手機版 */}
                <div className="d-flex d-md-none orders-custom-mobile">
                  {/* 一筆訂單*/}
                  <div className="order-card">
                    <div className="text-group">
                      <p className="orders-num">2384896540045</p>
                      <div className="order-info-group">
                        <div className="order-info-left">
                          <p className="left-title m-0">總金額</p>
                          <p className="order-info-price">
                            NTD$ <span className="left-text">500</span>
                          </p>
                        </div>
                        <div className="order-info-left">
                          <p className="left-title m-0">付款狀態</p>
                          <p className="left-text">已付款</p>
                        </div>
                        <div className="order-info-left">
                          <p className="left-title m-0">出貨狀態</p>
                          <p className="left-text">已出貨</p>
                        </div>
                      </div>
                    </div>
                    <div className="edit-icon">
                      <img src={images.editIcon} alt="edit icon-detail" />
                    </div>
                  </div>
                  {/* 一筆訂單*/}
                  <div className="order-card">
                    <div className="text-group">
                      <p className="orders-num">2384896540045</p>
                      <div className="order-info-group">
                        <div className="order-info-left">
                          <p className="left-title m-0">總金額</p>
                          <p className="order-info-price">
                            NTD$ <span className="left-text">500</span>
                          </p>
                        </div>
                        <div className="order-info-left">
                          <p className="left-title m-0">付款狀態</p>
                          <p className="left-text">已付款</p>
                        </div>
                        <div className="order-info-left">
                          <p className="left-title m-0">出貨狀態</p>
                          <p className="left-text">已出貨</p>
                        </div>
                      </div>
                    </div>
                    <div className="edit-icon">
                      <img src={images.editIcon} alt="edit icon-detail" />
                    </div>
                  </div>
                  {/* 一筆訂單*/}
                  <div className="order-card">
                    <div className="text-group">
                      <p className="orders-num">2384896540045</p>
                      <div className="order-info-group">
                        <div className="order-info-left">
                          <p className="left-title m-0">總金額</p>
                          <p className="order-info-price">
                            NTD$ <span className="left-text">500</span>
                          </p>
                        </div>
                        <div className="order-info-left">
                          <p className="left-title m-0">付款狀態</p>
                          <p className="left-text">已付款</p>
                        </div>
                        <div className="order-info-left">
                          <p className="left-title m-0">出貨狀態</p>
                          <p className="left-text">已出貨</p>
                        </div>
                      </div>
                    </div>
                    <div className="edit-icon">
                      <img src={images.editIcon} alt="edit icon-detail" />
                    </div>
                  </div>
                  {/* 一筆訂單*/}
                  <div className="order-card">
                    <div className="text-group">
                      <p className="orders-num">2384896540045</p>
                      <div className="order-info-group">
                        <div className="order-info-left">
                          <p className="left-title m-0">總金額</p>
                          <p className="order-info-price">
                            NTD$ <span className="left-text">500</span>
                          </p>
                        </div>
                        <div className="order-info-left">
                          <p className="left-title m-0">付款狀態</p>
                          <p className="left-text">已付款</p>
                        </div>
                        <div className="order-info-left">
                          <p className="left-title m-0">出貨狀態</p>
                          <p className="left-text">已出貨</p>
                        </div>
                      </div>
                    </div>
                    <div className="edit-icon">
                      <img src={images.editIcon} alt="edit icon-detail" />
                    </div>
                  </div>
                  {/* 一筆訂單*/}
                  <div className="order-card">
                    <div className="text-group">
                      <p className="orders-num">2384896540045</p>
                      <div className="order-info-group">
                        <div className="order-info-left">
                          <p className="left-title m-0">總金額</p>
                          <p className="order-info-price">
                            NTD$ <span className="left-text">500</span>
                          </p>
                        </div>
                        <div className="order-info-left">
                          <p className="left-title m-0">付款狀態</p>
                          <p className="left-text">已付款</p>
                        </div>
                        <div className="order-info-left">
                          <p className="left-title m-0">出貨狀態</p>
                          <p className="left-text">已出貨</p>
                        </div>
                      </div>
                    </div>
                    <div className="edit-icon">
                      <img src={images.editIcon} alt="edit icon-detail" />
                    </div>
                  </div>
                </div>

                {/* 桌面版 */}
                <table className="d-none d-md-table table orders-custom-table m-0 ">
                  <thead className="orders-custom-style">
                    <tr>
                      <th
                        scope="col"
                        className="orders-custom-style-th col-edit"
                      >
                        編輯
                      </th>
                      <th scope="col" className="orders-custom-style-th">
                        訂單編號
                      </th>
                      <th scope="col" className="orders-custom-style-th">
                        Email
                      </th>
                      <th scope="col" className="orders-custom-style-th">
                        購買品項
                      </th>
                      <th scope="col" className="orders-custom-style-th">
                        總金額
                      </th>
                      <th scope="col" className="orders-custom-style-th">
                        付款狀態
                      </th>
                      <th scope="col" className="orders-custom-style-th">
                        出貨狀態
                      </th>
                    </tr>
                  </thead>
                  <tbody className="orders-custom-tbody">
                    {/* 一筆資料 */}
                    <tr>
                      <th
                        scope="row"
                        className="orders-custom-tbody-th col-edit"
                      >
                        <div className="col-edit-icon">
                          <img src={images.editIcon} alt="edit icon" />
                        </div>
                      </th>
                      <td className="orders-custom-tbody-td">2384896540045</td>
                      <td className="orders-custom-tbody-td">
                        goodgoodeat@gmail.com
                      </td>
                      <td className="orders-custom-tbody-td">
                        嘉義阿里山咖啡豆(500g)
                      </td>
                      <td className="orders-custom-tbody-td price-box">
                        <p className="m-0">NTD$</p>
                        <p className="m-0">1,000</p>
                      </td>
                      <td className="orders-custom-tbody-td">已付款</td>
                      <td className="orders-custom-tbody-td">已出貨</td>
                    </tr>
                    {/* 一筆資料 */}
                    <tr>
                      <th
                        scope="row"
                        className="orders-custom-tbody-th col-edit"
                      >
                        <div className="col-edit-icon">
                          <img src={images.editIcon} alt="edit icon" />
                        </div>
                      </th>
                      <td className="orders-custom-tbody-td">2384896540045</td>
                      <td className="orders-custom-tbody-td">
                        goodgoodeat@gmail.com
                      </td>
                      <td className="orders-custom-tbody-td">
                        嘉義阿里山咖啡豆(500g)
                      </td>
                      <td className="orders-custom-tbody-td price-box">
                        <p className="m-0">NTD$</p>
                        <p className="m-0">1,000</p>
                      </td>
                      <td className="orders-custom-tbody-td">已付款</td>
                      <td className="orders-custom-tbody-td">已出貨</td>
                    </tr>
                    {/* 一筆資料 */}
                    <tr>
                      <th
                        scope="row"
                        className="orders-custom-tbody-th col-edit"
                      >
                        <div className="col-edit-icon">
                          <img src={images.editIcon} alt="edit icon" />
                        </div>
                      </th>
                      <td className="orders-custom-tbody-td">2384896540045</td>
                      <td className="orders-custom-tbody-td">
                        goodgoodeat@gmail.com
                      </td>
                      <td className="orders-custom-tbody-td">
                        嘉義阿里山咖啡豆(500g)
                      </td>
                      <td className="orders-custom-tbody-td price-box">
                        <p className="m-0">NTD$</p>
                        <p className="m-0">1,000</p>
                      </td>
                      <td className="orders-custom-tbody-td">已付款</td>
                      <td className="orders-custom-tbody-td">已出貨</td>
                    </tr>
                    {/* 一筆資料 */}
                    <tr>
                      <th
                        scope="row"
                        className="orders-custom-tbody-th col-edit"
                      >
                        <div className="col-edit-icon">
                          <img src={images.editIcon} alt="edit icon" />
                        </div>
                      </th>
                      <td className="orders-custom-tbody-td">2384896540045</td>
                      <td className="orders-custom-tbody-td">
                        goodgoodeat@gmail.com
                      </td>
                      <td className="orders-custom-tbody-td">
                        嘉義阿里山咖啡豆(500g)
                      </td>
                      <td className="orders-custom-tbody-td price-box">
                        <p className="m-0">NTD$</p>
                        <p className="m-0">1,000</p>
                      </td>
                      <td className="orders-custom-tbody-td">已付款</td>
                      <td className="orders-custom-tbody-td">已出貨</td>
                    </tr>
                    {/* 一筆資料 */}
                    <tr>
                      <th
                        scope="row"
                        className="orders-custom-tbody-th col-edit"
                      >
                        <div className="col-edit-icon">
                          <img src={images.editIcon} alt="edit icon" />
                        </div>
                      </th>
                      <td className="orders-custom-tbody-td">2384896540045</td>
                      <td className="orders-custom-tbody-td">
                        goodgoodeat@gmail.com
                      </td>
                      <td className="orders-custom-tbody-td">
                        嘉義阿里山咖啡豆(500g)
                      </td>
                      <td className="orders-custom-tbody-td price-box">
                        <p className="m-0">NTD$</p>
                        <p className="m-0">1,000</p>
                      </td>
                      <td className="orders-custom-tbody-td">已付款</td>
                      <td className="orders-custom-tbody-td">已出貨</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <button type="button" className="more-btn">
                <p className="m-0 more-btn-text">查看更多</p>
              </button>

              {/* 數據報表 */}
              <p className="m-0 admin-home-title ">數據報表</p>
              <div className="chart-custom">
                <PieChartComponent />
                <BarChartComponent />
              </div>

              <button type="button" className="more-btn">
                <p className="m-0 more-btn-text">查看更多</p>
              </button>
            </div>
          </AdminSidebar>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
