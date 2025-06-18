import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: '嘉義阿里山咖啡豆(500g)', value: 1200 },
  { name: '雜形柳葉濾紙100張', value: 675 },
  { name: '哥倫比雅咖啡豆(300g)', value: 283 },
  { name: '雜形濾杯', value: 128 },
];

const COLORS = ['#9E7813', '#B1913C', '#C3A964', '#D6C28D'];

const PieChartComponent = () => {
  return (
    <div className="chart-box">
      <h5 className="chart-title">本月熱銷商品</h5>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <div className="custom-legend">
        {data.map((entry, index) => (
          <div key={index} className="legend-item">
            <span
              className="legend-color"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="legend-label">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartComponent;
