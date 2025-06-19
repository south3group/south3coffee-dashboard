import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { month: '一月', sales: 2400 },
  { month: '二月', sales: 1398 },
  { month: '三月', sales: 2800 },
  { month: '四月', sales: 1600 },
  { month: '五月', sales: 5200 },
  { month: '六月', sales: 6000 },
  { month: '七月', sales: 3800 },
  { month: '八月', sales: 3200 },
  { month: '九月', sales: 1800 },
  { month: '十月', sales: 1400 },
  { month: '十一月', sales: 1500 },
  { month: '十二月', sales: 1700 },
];

const BarChartComponent = () => {
  return (
    <div className="chart-box">
      <h5 className="chart-title">2025年度月營業額</h5>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis
            ticks={[2000, 4000, 6000, 8000]}
            tickFormatter={(value) => `${value / 1000}k`}
          />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sales" fill="#9E7813" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
