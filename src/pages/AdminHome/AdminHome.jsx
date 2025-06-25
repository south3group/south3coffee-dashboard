import {  useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuth, logout } from '../../store/authSlice';
import axios from 'axios';


import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import PieChartComponent from '../../components/PieChartComponent/PieChartComponent';
import BarChartComponent from '../../components/BarChartComponent/BarChartComponent';

import { images } from '../../constants/image';

const AdminHome = () => {
  const navigate = useNavigate();
  const [shipmentData, setShipmentData] = useState({
    unshippedCount: 0,
    shippedThisMonthCount: 0,
  });
  const [revenue, setRevenue] = useState(0);
  const [newOrders, setNewOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showTopBtn, setShowTopBtn] = useState(false);

  const dispatch = useDispatch();
  const { token, isAuthChecked, role } = useSelector((state) => state.auth);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // top 按鈕
  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // 使用環境變數作為 API 基礎 URL
        const baseUrl = import.meta.env.VITE_API_URL;

        // 設定 API 請求的 headers
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        };
        
        // 取得出貨數據
        const shipResponse = await axios.get(
          `${baseUrl}/api/v1/admin/orders/is_ship`,
          config
        );
        const { unshipped_count, shipped_this_month_count } = shipResponse.data.data;
        setShipmentData({
          unshippedCount: unshipped_count,
          shippedThisMonthCount: shipped_this_month_count,
        });

        // 取得營業額數據
        const revenueResponse = await axios.get(
          `${baseUrl}/api/v1/admin/orders/revenue`,
          config
        );
        const { revenue: monthlyRevenue } = revenueResponse.data.data;
        setRevenue(monthlyRevenue);

        // 取得最新訂單
        const ordersResponse = await axios.get(
          `${baseUrl}/api/v1/admin/orders/new`,
          config
        );
        setNewOrders(ordersResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // 只有在有 token 時才發送請求
    if (token) {
      fetchData();
    }
  }, [token]); // 添加 token 作為依賴

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthChecked) {
      if (!token || role !== 'ADMIN') {
        dispatch(logout());
        navigate('/login');
      }
    }
  }, [isAuthChecked, token, role, dispatch, navigate]);


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
                  <p className="sales-overview-box-text">
                    {shipmentData.unshippedCount}
                  </p>
                </div>
                <div className="sales-overview-box">
                  <p className="sales-overview-box-title">本月已出貨</p>
                  <p className="sales-overview-box-text">
                    {shipmentData.shippedThisMonthCount}
                  </p>
                </div>
                <div className="sales-overview-box">
                  <p className="sales-overview-box-title">月營業額</p>
                  <div className="sales-overview-box-text">
                    <p className="sales-overview-box-text-currency">NTD$</p>
                    <p className="sales-overview-box-text-num m-0">
                      {revenue.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* 最新訂單 */}
              <p className="admin-home-title m-0">最新訂單</p>
              <div className="new-orders">
                {/* 手機版 */}
                <div className="d-flex d-md-none orders-custom-mobile">
                  {isLoading ? (
                    <div className="p-3 text-center">載入中...</div>
                  ) : newOrders.length === 0 ? (
                    <div className="p-3 text-center">目前沒有訂單</div>
                  ) : (
                    newOrders.map((order) => (
                      <div key={order.id} className="order-card">
                        <div className="text-group">
                          <p className="orders-num">{order.display_id}</p>
                          <div className="order-info-group">
                            <div className="order-info-left">
                              <p className="left-title m-0">總金額</p>
                              <p className="order-info-price">
                                NTD${' '}
                                <span className="left-text">
                                  {order.total_price.toLocaleString()}
                                </span>
                              </p>
                            </div>
                            <div className="order-info-left">
                              <p className="left-title m-0">付款狀態</p>
                              <p className="left-text">
                                {order.is_paid ? '已付款' : '未付款'}
                              </p>
                            </div>
                            <div className="order-info-left">
                              <p className="left-title m-0">出貨狀態</p>
                              <p className="left-text">
                                {order.is_ship ? '已出貨' : '未出貨'}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="edit-icon">
                          <img src={images.editIcon} alt="edit icon-detail" />
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* 桌面版 */}
                <table className="d-none d-md-table table orders-custom-table m-0">
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
                        訂購商品
                      </th>
                      <th scope="col" className="orders-custom-style-th">
                        訂購人
                      </th>
                      <th scope="col" className="orders-custom-style-th">
                        訂單金額
                      </th>
                      <th scope="col" className="orders-custom-style-th">
                        付款狀態
                      </th>
                      <th scope="col" className="orders-custom-style-th">
                        出貨狀態
                      </th>
                      <th scope="col" className="orders-custom-style-th">
                        建立時間
                      </th>
                    </tr>
                  </thead>
                  <tbody className="orders-custom-tbody">
                    {isLoading ? (
                      <tr>
                        <td colSpan="8" className="text-center p-3">
                          載入中...
                        </td>
                      </tr>
                    ) : newOrders.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="text-center p-3">
                          目前沒有訂單
                        </td>
                      </tr>
                    ) : (
                      newOrders.map((order) => (
                        <tr key={order.id}>
                          <td className="orders-custom-tbody-th">
                            <div className="edit-icon">
                              <img src={images.editIcon} alt="edit icon" />
                            </div>
                          </td>
                          <td className="orders-custom-tbody-th">
                            {order.display_id}
                          </td>
                          <td className="orders-custom-tbody-th">
                            {order.first_product_name}
                          </td>
                          <td className="orders-custom-tbody-th">
                            {order.user_email}
                          </td>
                          <td className="orders-custom-tbody-th">
                            NTD$ {order.total_price.toLocaleString()}
                          </td>
                          <td className="orders-custom-tbody-th">
                            {order.is_paid ? '已付款' : '未付款'}
                          </td>
                          <td className="orders-custom-tbody-th">
                            {order.is_ship ? '已出貨' : '未出貨'}
                          </td>
                          <td className="orders-custom-tbody-th">
                            {order.created_time}
                          </td>
                        </tr>
                      ))
                    )}
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

      {/* top */}
      {showTopBtn && (
        <button className="back-to-top" onClick={scrollToTop}>
          <img src={images.topBtn} alt="back to top btn" />
        </button>
      )}
    </>
  );
};

export default AdminHome;
