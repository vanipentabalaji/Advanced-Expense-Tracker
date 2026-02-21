# Expense Tracker App - Quick Reference Guide

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

## 📂 Important File Locations

| Component | Location |
|-----------|----------|
| Main App | `src/App.js` |
| Dashboard | `src/pages/Dashboard.js` |
| User Onboarding | `src/components/UserOnboarding.js` |
| Expense Form | `src/components/ExpenseForm.js` |
| Expense List | `src/components/ExpenseList.js` |
| API Service | `src/services/api.js` |
| User Context | `src/context/UserContext.js` |
| Expense Context | `src/context/ExpenseContext.js` |
| Utilities | `src/utils/helpers.js` |

## 🎣 Using Hooks

### Access User Data
```javascript
import { useUser } from '../hooks/useUser';

const MyComponent = () => {
  const { user, updateUser, clearUser } = useUser();
  // Use user data and functions
};
```

### Access Expense Data
```javascript
import { useExpense } from '../hooks/useExpense';

const MyComponent = () => {
  const { 
    expenses, 
    addExpenseItem, 
    updateExpenseItem, 
    removeExpenseItem 
  } = useExpense();
  // Use expense data and functions
};
```

## 📡 API Calls

### User Registration
```javascript
import { userAPI } from '../services/api';

const userData = {
  username: 'John',
  gmail: 'john@example.com',
  monthlyLimit: 5000
};

await userAPI.onboardUser(userData);
```

### Add Expense
```javascript
import { expenseAPI } from '../services/api';

const expenseData = {
  description: 'Groceries',
  amount: 50.00,
  expenseDate: '2024-01-20',
  category: 'Food & Dining'
};

await expenseAPI.addExpense(userId, expenseData);
```

### Get All Expenses
```javascript
const expenses = await expenseAPI.getExpenses(userId);
```

### Update Expense
```javascript
await expenseAPI.updateExpense(expenseId, updatedData);
```

### Delete Expense
```javascript
await expenseAPI.deleteExpense(expenseId);
```

## 🎨 Styling a Component

### Create New Component CSS
```css
/* src/components/MyComponent.css */

.my-component {
  background: white;
  padding: 20px;
  border-radius: 8px;
}

.my-component h1 {
  color: #333;
  font-size: 20px;
}

/* Mobile responsive */
@media (max-width: 480px) {
  .my-component {
    padding: 10px;
  }
}
```

## 🔧 Common Patterns

### Form Validation
```javascript
const [errors, setErrors] = useState({});

const validateForm = () => {
  const newErrors = {};
  
  if (!formData.field) {
    newErrors.field = 'Field is required';
  }
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

### Error Handling in API Calls
```javascript
try {
  setLoading(true);
  const result = await apiCall();
  // Process result
} catch (error) {
  setError(error.message);
} finally {
  setLoading(false);
}
```

### Conditional Rendering
```javascript
{isLoading && <LoadingSpinner />}
{!isLoading && error && <Alert type="error" message={error} />}
{!isLoading && !error && <Content />}
```

## 📝 Utility Functions

### Date Formatting
```javascript
import { formatDate, formatDateForInput, getMonthYear } from '../utils/helpers';

formatDate('2024-01-20')         // "January 20, 2024"
formatDateForInput('2024-01-20') // "2024-01-20"
getMonthYear('2024-01-20')       // "January 2024"
```

### Currency Formatting
```javascript
import { formatCurrency } from '../utils/helpers';

formatCurrency(1234.56) // "$1,234.56"
```

### Data Analysis
```javascript
import { 
  calculateTotal, 
  calculateTotalByCategory,
  groupByCategory 
} from '../utils/helpers';

const total = calculateTotal(expenses);
const byCategory = calculateTotalByCategory(expenses);
const grouped = groupByCategory(expenses);
```

### Validation
```javascript
import { isValidEmail, isRequired } from '../utils/helpers';

isValidEmail('test@example.com')  // true
isRequired('value')                // true
```

## 🎯 Component Props Pattern

```javascript
/**
 * ComponentName - Description
 * 
 * Props:
 * - prop1 (string): Description
 * - prop2 (number): Description
 * - onAction (function): Callback function
 */
const MyComponent = ({ prop1, prop2, onAction }) => {
  // Component code
};
```

## 🔄 State Management Flow

```
Component State
    ↓
Context Provider
    ↓
Custom Hook
    ↓
Component Usage
```

## 📱 Responsive Breakpoints

```css
/* Mobile (default) */
/* Write mobile-first styles here */

/* Tablet */
@media (max-width: 768px) {
  /* Override for tablet */
}

/* Desktop */
@media (max-width: 900px) {
  /* Override for larger screens */
}
```

## 🧪 Testing Component

```javascript
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Text')).toBeInTheDocument();
  });
});
```

## 🐛 Debugging Tips

### React DevTools
1. Install extension in browser
2. Inspect components
3. Check props and state
4. Modify state in real-time

### Network Inspection
1. Open DevTools → Network tab
2. Check API requests
3. View request/response data
4. Verify headers

### Console Logging
```javascript
console.log('Debug info:', value);
console.error('Error:', error);
console.warn('Warning:', warning);
```

## 🚀 Environment Variables

### Create .env file
```
REACT_APP_API_URL=http://localhost:8080/expense-tracker
REACT_APP_DEBUG=true
```

### Use in Code
```javascript
const apiUrl = process.env.REACT_APP_API_URL;
```

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| react | UI library |
| react-dom | DOM rendering |
| react-scripts | Build tools |

## 🔗 Context Setup

### In App.js
```javascript
import { UserProvider } from './context/UserContext';
import { ExpenseProvider } from './context/ExpenseContext';

function App() {
  return (
    <UserProvider>
      <ExpenseProvider>
        <AppContent />
      </ExpenseProvider>
    </UserProvider>
  );
}
```

## 📚 File Organization

```
expense-tracker-app/
├── src/
│   ├── components/          # Reusable components
│   ├── pages/              # Page components
│   ├── services/           # API services
│   ├── hooks/              # Custom hooks
│   ├── context/            # Context providers
│   ├── utils/              # Utility functions
│   ├── App.js
│   ├── index.js
│   └── *.css               # Global styles
├── public/                 # Static files
├── package.json
└── .env.example
```

## 🎯 Common Issues & Solutions

### Port 3000 Already in Use
```bash
# Windows: Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3000
kill -9 <PID>
```

### Dependencies Not Installing
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### API Connection Failed
1. Check backend is running on correct port
2. Verify API URL in .env
3. Check CORS configuration
4. Check network tab in DevTools

### Styling Not Applied
1. Verify CSS file is imported
2. Check class names match
3. Inspect element in DevTools
4. Clear browser cache

## 🔗 Useful Links

- [React Docs](https://react.dev/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS-Tricks](https://css-tricks.com/)
- [JavaScript.info](https://javascript.info/)

## 💡 Pro Tips

1. Use browser DevTools for debugging
2. Keep components small and focused
3. Use meaningful variable names
4. Document complex logic
5. Test frequently during development
6. Use version control (git)
7. Create branches for new features
8. Review code before committing

---

**Save this for quick reference!** 📌
