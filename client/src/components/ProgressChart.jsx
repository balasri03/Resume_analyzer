import { PieChart, Pie, Cell } from 'recharts';

const ProgressChart = ({ result }) => {
  const percentage = result.score; // Your progress value (0-100)

  const data = [
    { name: 'Completed', value: percentage },
    { name: 'Remaining', value: 100 - percentage },
  ];

  const COLORS = ['#4ade80', '#e5e7eb'];  // Green and Gray

  return (
    <div style={{ width: 200, height: 200, position: 'relative' }}>
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}  // Controls doughnut thickness
          outerRadius={80}
          startAngle={90}
          endAngle={-270} // To make it start from top
          paddingAngle={0}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cornerRadius={10} />
          ))}
        </Pie>
      </PieChart>

      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '20px',
        fontWeight: 'bold'
      }}>
        {percentage}%
      </div>
    </div>
  );
};

export default ProgressChart;
