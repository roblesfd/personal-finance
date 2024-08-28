import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const LineChartCustom = ({ data }) => {
  const lineNames = Object.keys(data[0]).filter((key) => key !== "name");
  const generateLines = lineNames.map((nombre, index) => (
    <Line key={index} type="natural" dataKey={nombre} stroke="#8884d8" />
  ));

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      className="dark:bg-secondary-900 dark:text-primary-900 p-2 rounded-md"
    >
      <LineChart data={data}>
        <Legend
          verticalAlign="middle"
          align="right"
          layout="vertical"
          height={20}
          iconSize={15}
        />
        {generateLines}
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartCustom;
