import { useState, useMemo, lazy, Suspense } from 'react';
import { useTransactions } from './hooks/useTransactions';
import Header from './components/Header';
import Balance from './components/Balance';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Filter from './components/Filter';
import ExportButton from './components/ExportButton';

const Chart = lazy(() => import('./components/Chart'));

function App() {
  const { transactions, addTransaction, deleteTransaction } = useTransactions();
  const [filter, setFilter] = useState('all');
  const [chartType, setChartType] = useState('expense');

  const filteredTransactions = useMemo(() => {
    if (filter === 'all') return transactions;
    return transactions.filter(t => t.type === filter);
  }, [transactions, filter]);

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const monthTransactions = useMemo(() => {
    return transactions.filter(t => {
      const d = new Date(t.date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    });
  }, [transactions, currentMonth, currentYear]);

  const totalBalance = useMemo(() => {
    return transactions.reduce((acc, t) => acc + (t.type === 'income' ? t.amount : -t.amount), 0);
  }, [transactions]);

  const monthIncomes = useMemo(() => {
    return monthTransactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  }, [monthTransactions]);

  const monthExpenses = useMemo(() => {
    return monthTransactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  }, [monthTransactions]);

  const chartDataExpense = useMemo(() => {
    const expenseByCategory = monthTransactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});
    return Object.entries(expenseByCategory).map(([name, value]) => ({ name, value }));
  }, [monthTransactions]);

  const chartDataIncome = useMemo(() => {
    const incomeByCategory = monthTransactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});
    return Object.entries(incomeByCategory).map(([name, value]) => ({ name, value }));
  }, [monthTransactions]);

  const chartData = chartType === 'expense' ? chartDataExpense : chartDataIncome;

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <Header>
          <div className="flex flex-wrap items-center gap-2">
            <Filter filter={filter} onFilterChange={setFilter} />
            <ExportButton transactions={transactions} />
          </div>
        </Header>

        <Balance balance={totalBalance} incomes={monthIncomes} expenses={monthExpenses} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <TransactionForm onAdd={addTransaction} />
          </div>
          <div>
            <Suspense fallback={<div className="bg-white p-4 rounded-lg shadow-md h-80 flex items-center justify-center text-gray-500">Загрузка графика...</div>}>
              <Chart data={chartData} type={chartType} onTypeChange={setChartType} />
            </Suspense>
          </div>
        </div>

        <div>
          <TransactionList transactions={filteredTransactions} onDelete={deleteTransaction} />
        </div>
      </div>
    </div>
  );
}

export default App;