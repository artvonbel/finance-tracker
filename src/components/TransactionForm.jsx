// src/components/TransactionForm.jsx
import { useState } from 'react';
import { CATEGORIES } from '../constants';

export default function TransactionForm({ onAdd }) {
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) {
      alert('Введите корректную сумму (> 0)');
      return;
    }
    if (!category) {
      alert('Выберите категорию');
      return;
    }
    onAdd({
      type,
      amount: parseFloat(amount),
      category,
      date,
    });
    // Очищаем поля (кроме даты и типа)
    setAmount('');
    setCategory('');
  };

  const categories = CATEGORIES[type] || [];

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md space-y-3">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setType('income')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
            type === 'income' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Доход
        </button>
        <button
          type="button"
          onClick={() => setType('expense')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
            type === 'expense' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Расход
        </button>
      </div>

      <input
        type="number"
        placeholder="Сумма"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
        min="0.01"
        step="0.01"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      >
        <option value="">Выберите категорию</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
      >
        Добавить
      </button>
    </form>
  );
}