# Expense Tracker App - Feature Documentation

## 🎯 Core Features

### 1. User Onboarding

**File**: `src/components/UserOnboarding.js`

**Features**:
- Register new users with username, email, and monthly budget limit
- Form validation with error messages
- Success notification on registration
- Auto-redirect to dashboard

**Key Functions**:
- `validateForm()`: Validates all form fields
- `handleSubmit()`: Submits user data to backend
- `handleChange()`: Updates form state

**API Endpoint**: `POST /expense-tracker/onBoard/users`

---

### 2. Expense Management

#### Add/Edit Expenses

**File**: `src/components/ExpenseForm.js`

**Features**:
- Add new expenses with description, amount, date, category
- Edit existing expenses
- Form validation
- Category selection from predefined list
- Date picker

**Categories Available**:
- Food & Dining
- Transportation
- Shopping
- Entertainment
- Utilities
- Healthcare
- Education
- Other

**API Endpoints**:
- `POST /expense-tracker/add-expenses/{userId}` - Add new
- `PUT /expense-tracker/update-expenses/{expenseId}` - Update

#### View Expenses

**File**: `src/components/ExpenseList.js`

**Features**:
- Display all expenses in a list
- Show description, amount, date, category for each expense
- Edit button for each expense
- Delete button with confirmation
- Responsive design for mobile/tablet/desktop

**API Endpoint**: `GET /expense-tracker/getAllExpenses/{userId}`

#### Delete Expenses

**Features**:
- Confirmation dialog before deletion
- Immediate removal from UI
- Error handling with alerts

**API Endpoint**: `DELETE /expense-tracker/delete-expenses/{expenseId}`

---

### 3. Budget Management

**File**: `src/components/ExpenseSummary.js`

**Features**:

#### Summary Cards
- **Total Expenses**: Sum of all expenses
- **Monthly Limit**: User's budget limit
- **Remaining Budget**: Available budget (Limit - Total)
- **Budget Usage**: Visual progress bar showing percentage used

#### Visual Indicators
- Green color for normal spending
- Red color for budget exceeded
- Progress bar for visual representation

#### Category Breakdown
- List of all categories with their totals
- Helps identify spending patterns

---

### 4. User Interface

#### Header Component

**File**: `src/components/Header.js`

**Features**:
- Display app title and subtitle
- Show logged-in user information (name, email)
- Logout button
- Sticky positioning at top

#### Dashboard Layout

**File**: `src/pages/Dashboard.js`

**Features**:
- Header
- Budget summary section
- Add expense button
- Expense form (toggle)
- Expense list
- Responsive grid layout

#### Alert Component

**File**: `src/components/Alert.js`

**Features**:
- Show success, error, warning, info messages
- Auto-dismiss after 5 seconds
- Manual close button
- Smooth animations

#### Loading Spinner

**File**: `src/components/LoadingSpinner.js`

**Features**:
- Animated spinner
- Loading message
- Centered layout

---

## 🔄 Data Flow

### User Onboarding Flow

```
UserOnboarding Component
    ↓
Form Validation
    ↓
API Call: POST /onBoard/users
    ↓
Update UserContext
    ↓
Store in localStorage
    ↓
Redirect to Dashboard
```

### Expense Management Flow

```
ExpenseForm Component
    ↓
Form Validation
    ↓
API Call: POST/PUT /expenses
    ↓
Update ExpenseContext
    ↓
Update ExpenseList Display
```

---

## 🎨 Styling Approach

### Component-Scoped CSS
- Each component has its own CSS file
- Scoped to component using class names
- Prevents style conflicts

### Responsive Design
- Mobile first approach
- Breakpoints: 480px, 600px, 768px, 900px
- Flexbox and CSS Grid for layout

### Color Scheme
- Primary: `#667eea` (Indigo)
- Secondary: `#764ba2` (Purple)
- Success: `#28a745` (Green)
- Danger: `#dc3545` (Red)
- Neutral: `#f5f7fa` (Light Gray)

---

## 🔧 Utility Functions

### Date Utilities

```javascript
formatDate(date)              // "January 20, 2024"
formatDateForInput(date)      // "2024-01-20" (for input fields)
getMonthYear(date)            // "January 2024"
parseDateFromInput(dateStr)   // Converts string to Date object
```

### Currency Utilities

```javascript
formatCurrency(amount, currency)  // "$1,234.56"
```

### Data Analysis

```javascript
calculateTotal(expenses)              // Sum of all amounts
calculateTotalByCategory(expenses)    // Object with totals per category
groupByCategory(expenses)             // Array grouped by category
```

### Validation

```javascript
isValidEmail(email)      // Validates email format
isRequired(value)        // Checks if value is not null/undefined/empty
```

---

## 🌐 API Integration

### API Base URL
Default: `http://localhost:8080/expense-tracker`
Configurable via `.env` file: `REACT_APP_API_URL`

### Error Handling
- API errors displayed as alerts
- Network errors caught and logged
- User-friendly error messages

### Request/Response Format

**Request Headers**:
```javascript
{
  'Content-Type': 'application/json'
}
```

**Response Format**:
```javascript
// Success: Returns data object
// Error: Throws error with message property
```

---

## 📱 Mobile Responsiveness

### Breakpoints
- **Mobile** (< 480px): Single column layout, stacked buttons
- **Tablet** (480px - 768px): Two column grid where applicable
- **Desktop** (> 768px): Full multi-column layout

### Mobile Optimizations
- Touch-friendly button sizes (44px min height)
- Readable font sizes (14px minimum)
- Swipe-friendly navigation
- Efficient use of screen space

---

## 🔐 Data Persistence

### Client-Side
- User data stored in `localStorage`
- Key: `currentUser`
- Persists across sessions

### Server-Side
- All expenses stored in backend database
- Fetched on dashboard load
- Updated with each operation

---

## 🐛 Error Scenarios

### Network Errors
```javascript
// Displayed as error alert
"Failed to load expenses"
"Failed to save expense"
```

### Validation Errors
```javascript
// Field-level errors shown below input
"Email is required"
"Amount must be a positive number"
```

### API Errors
```javascript
// Backend error messages displayed
"User not found"
"Expense already deleted"
```

---

## 🚀 Performance Considerations

### Optimizations
1. Component composition prevents unnecessary re-renders
2. Context API for efficient state management
3. CSS Grid and Flexbox for efficient layouts
4. Lazy loading can be added for future enhancements

### Scalability
1. Modular component structure
2. Centralized API service
3. Reusable utility functions
4. Easy to add new features

---

## 📚 Component Hierarchy

```
App
├── UserProvider
│   └── ExpenseProvider
│       └── AppContent
│           ├── UserOnboarding (if not logged in)
│           └── Dashboard (if logged in)
│               ├── Header
│               ├── ExpenseSummary
│               └── ExpenseSection
│                   ├── ExpenseForm (conditional)
│                   └── ExpenseList
│                       └── ExpenseItem (multiple)
```

---

## 🎯 Future Feature Ideas

1. **Search & Filter**
   - Search expenses by description
   - Filter by date range
   - Filter by category

2. **Charts & Analytics**
   - Pie chart for category breakdown
   - Line chart for spending trends
   - Monthly comparison

3. **Export**
   - Export to CSV
   - Export to PDF
   - Email reports

4. **Advanced Features**
   - Recurring expenses
   - Budget alerts
   - Multi-currency support
   - Dark mode

5. **User Features**
   - Change profile information
   - Change password
   - Delete account
   - Multiple users

---

## 📖 Code Examples

### Adding a New Component

```javascript
// src/components/NewComponent.js
import React from 'react';
import './NewComponent.css';

/**
 * NewComponent - Description
 */
const NewComponent = ({ prop }) => {
  return <div className="new-component">{prop}</div>;
};

export default NewComponent;
```

### Adding a New API Endpoint

```javascript
// src/services/api.js
export const myAPI = {
  getMyData: (id) =>
    fetchRequest(`/my-data/${id}`, {
      method: 'GET',
    }),
};
```

### Using a Custom Hook

```javascript
import { useExpense } from '../hooks/useExpense';

const MyComponent = () => {
  const { expenses, addExpenseItem } = useExpense();
  // Use the hook...
};
```

---

**Last Updated**: February 2024
