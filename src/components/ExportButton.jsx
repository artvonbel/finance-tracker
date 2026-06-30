// src/components/ExportButton.jsx
export default function ExportButton({ transactions }) {
  const exportToCSV = () => {
    if (transactions.length === 0) {
      alert('Нет данных для экспорта');
      return;
    }

    // Заголовки CSV
    const headers = ['Дата', 'Тип', 'Категория', 'Сумма', 'ID'];
    
    // Форматируем каждую транзакцию в строку CSV
    const rows = transactions.map(t => {
      const type = t.type === 'income' ? 'Доход' : 'Расход';
      return [t.date, type, t.category, t.amount.toFixed(2), t.id];
    });

    // Собираем всё в CSV-строку
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    // Создаём Blob и ссылку для скачивания
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' }); // BOM для Excel
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `transactions_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={exportToCSV}
      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium text-sm"
    >
      📥 Скачать отчёт
    </button>
  );
}