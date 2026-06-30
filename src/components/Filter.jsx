export default function Filter({ filter, onFilterChange }) {
  return (
    <select
      value={filter}
      onChange={(e) => onFilterChange(e.target.value)}
      className="px-3 py-2 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 w-full sm:w-auto min-w-[120px]"
    >
      <option value="all">📋 Все</option>
      <option value="income">📈 Доходы</option>
      <option value="expense">📉 Расходы</option>
    </select>
  );
}
