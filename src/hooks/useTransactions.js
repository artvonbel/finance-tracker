// src/hooks/useTransactions.js
import { useState, useEffect } from 'react';
import { getTransactions, saveTransactions } from '../utils/storage';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState(() => {
    const data = getTransactions();
    return data;
  });

  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

  const addTransaction = (newTransaction) => {
    const tx = {
      ...newTransaction,
      id: Date.now() + Math.random().toString(36).slice(2),
      date: newTransaction.date || new Date().toISOString().split('T')[0],
    };
    setTransactions(prev => [tx, ...prev]);
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return { transactions, addTransaction, deleteTransaction };
};