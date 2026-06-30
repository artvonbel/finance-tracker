export default function TransactionList({ transactions, onDelete }) {
  if (transactions.length === 0) {
    return <p className="text-gray-500 text-center py-4">Нет транзакций</p>;
  }

  return (
    <ul className="space-y-2">
      {transactions.map((t) => (
        <li key={t.id} className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm border border-gray-100">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${t.type === 'income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {t.type === 'income' ? 'Доход' : 'Расход'}
              </span>
              <span className="font-medium">{t.category}</span>
            </div>
            <div className="text-sm text-gray-500">
              {t.date} — <span className={t.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                {t.type === 'income' ? '+' : '-'}{t.amount.toFixed(2)} ₽
              </span>
            </div>
          </div>
          <button
            onClick={() => onDelete(t.id)}
            className="text-red-500 hover:text-red-700 text-xl font-bold px-2"
          >
            ×
          </button>
        </li>
      ))}
    </ul>
  );
}
