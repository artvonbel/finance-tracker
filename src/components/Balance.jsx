// src/components/Balance.jsx
export default function Balance({ balance, incomes, expenses }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="text-center">
        <p className="text-sm text-gray-500">Общий баланс</p>
        <p className={`text-3xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {balance.toFixed(2)} ₽
        </p>
      </div>
      <div className="flex justify-around mt-3">
        <div>
          <p className="text-sm text-gray-500">Доходы за месяц</p>
          <p className="text-lg font-semibold text-green-600">{incomes.toFixed(2)} ₽</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Расходы за месяц</p>
          <p className="text-lg font-semibold text-red-600">{expenses.toFixed(2)} ₽</p>
        </div>
      </div>
    </div>
  );
}