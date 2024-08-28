import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const PieChartCustom = ({ data }) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      className="dark:bg-secondary-900 dark:text-primary-50 p-2 rounded-md"
    >
      <PieChart>
        <Legend
          verticalAlign="middle"
          align="right"
          layout="vertical"
          height={9}
          iconSize={9}
        />
        <Pie
          data={data}
          cx="50%"
          cy="40%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={2}
          dataKey="value"
          isAnimationActive={true}
        >
          <text x={"50%"} y={"50%"} textAnchor="middle">
            Centro
          </text>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              className="cursor-pointer"
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartCustom;
