document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expenseForm');
    const expenseList = document.getElementById('expenseList');
  
    expenseForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const description = document.getElementById('description').value;
      const amount = document.getElementById('amount').value;
  
      try {
        await fetch('/expenses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ description, amount }),
        });
  
        expenseForm.reset();
        loadExpenses();
      } catch (error) {
        console.error('Error adding expense:', error);
      }
    });
  
    const loadExpenses = async () => {
      try {
        const response = await fetch('/expenses');
        const expenses = await response.json();
  
        expenseList.innerHTML = '';
        expenses.forEach((expense) => {
          const li = document.createElement('li');
          li.textContent = `${expense.description}: $${expense.amount.toFixed(2)} on ${new Date(expense.date).toLocaleDateString()}`;
          expenseList.appendChild(li);
        });
      } catch (error) {
        console.error('Error loading expenses:', error);
      }
    };
  
    // Load expenses on page load
    loadExpenses();
  });
  