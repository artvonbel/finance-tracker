import { memo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF6361', '#BC5090', '#58508D'];

const Chart = memo(function Chart({ data, type, onTypeChange }) {
  const handleTypeChange = (newType) => {
    if (newType !== type) onTypeChange(newType);
  };

  const title = type === 'expense' ? 'Расходы по категориям' : 'Доходы по категориям';

  const isAnimationActive = data && data.length <= 10;

  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md" style={{ height: 300 }}>
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-gray-500 text-center">Нет данных для диаграммы</p>
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => handleTypeChange('expense')}
              className={`px-3 py-1 text-sm rounded ${type === 'expense' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Расходы
            </button>
            <button
              onClick={() => handleTypeChange('income')}
              className={`px-3 py-1 text-sm rounded ${type === 'income' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Доходы
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md" style={{ height: 320 }}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-center font-medium text-gray-700 flex-1">{title}</h3>
        <div className="flex gap-1">
          <button
            onClick={() => handleTypeChange('expense')}
            className={`px-2 py-0.5 text-xs rounded ${type === 'expense' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Расходы
          </button>
          <button
            onClick={() => handleTypeChange('income')}
            className={`px-2 py-0.5 text-xs rounded ${type === 'income' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Доходы
          </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={90}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
            isAnimationActive={isAnimationActive} 
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value.toFixed(2)} ₽`} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
});

export default Chart;