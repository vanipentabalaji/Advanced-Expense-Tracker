# Expense Tracker App - Architecture & System Design

## 🏗️ Application Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                       React Application                     │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              App.js (Root Component)                 │   │
│  │  - Provides UserProvider & ExpenseProvider           │   │
│  │  - Routes to UserOnboarding or Dashboard             │   │
│  └──────────────┬───────────────────────────────────────┘   │
│                 │                                             │
│  ┌──────────────▼───────────────────────────────────────┐   │
│  │         Context Providers (Global State)              │   │
│  │  ┌────────────────────────────────────────────┐      │   │
│  │  │  UserContext                               │      │   │
│  │  │  - user data                               │      │   │
│  │  │  - loading state                           │      │   │
│  │  │  - error messages                          │      │   │
│  │  └────────────────────────────────────────────┘      │   │
│  │  ┌────────────────────────────────────────────┐      │   │
│  │  │  ExpenseContext                            │      │   │
│  │  │  - expenses array                          │      │   │
│  │  │  - loading state                           │      │   │
│  │  │  - error messages                          │      │   │
│  │  └────────────────────────────────────────────┘      │   │
│  └──────────────┬───────────────────────────────────────┘   │
│                 │                                             │
│  ┌──────────────▼───────────────────────────────────────┐   │
│  │      Custom Hooks (State Accessors)                  │   │
│  │  ┌────────────────┐  ┌────────────────┐              │   │
│  │  │ useUser()      │  │ useExpense()   │              │   │
│  │  │ - Gets context │  │ - Gets context │              │   │
│  │  │ - Validates    │  │ - Validates    │              │   │
│  │  └────────────────┘  └────────────────┘              │   │
│  └──────────────┬───────────────────────────────────────┘   │
│                 │                                             │
│  ┌──────────────▼───────────────────────────────────────┐   │
│  │          Components Layer                            │   │
│  │  ┌────────────────────────────────────────────┐      │   │
│  │  │  Pages (Combine Components)                │      │   │
│  │  │  - Dashboard.js                            │      │   │
│  │  │  - UserOnboarding.js                       │      │   │
│  │  └────────────────────────────────────────────┘      │   │
│  │  ┌────────────────────────────────────────────┐      │   │
│  │  │  Smart Components (Connected)              │      │   │
│  │  │  - ExpenseForm                             │      │   │
│  │  │  - ExpenseList                             │      │   │
│  │  │  - ExpenseSummary                          │      │   │
│  │  └────────────────────────────────────────────┘      │   │
│  │  ┌────────────────────────────────────────────┐      │   │
│  │  │  Presentational Components (Pure)          │      │   │
│  │  │  - Header                                  │      │   │
│  │  │  - Alert                                   │      │   │
│  │  │  - LoadingSpinner                          │      │   │
│  │  └────────────────────────────────────────────┘      │   │
│  └──────────────┬───────────────────────────────────────┘   │
│                 │                                             │
│  ┌──────────────▼───────────────────────────────────────┐   │
│  │         Services Layer (API Integration)             │   │
│  │  ┌────────────────────────────────────────────┐      │   │
│  │  │  api.js                                    │      │   │
│  │  │  - fetchRequest() - Base HTTP handler      │      │   │
│  │  │  - userAPI - User endpoints                │      │   │
│  │  │  - expenseAPI - Expense endpoints          │      │   │
│  │  └────────────────────────────────────────────┘      │   │
│  └──────────────┬───────────────────────────────────────┘   │
│                 │                                             │
│  ┌──────────────▼───────────────────────────────────────┐   │
│  │        Utilities Layer (Helper Functions)            │   │
│  │  ┌────────────────────────────────────────────┐      │   │
│  │  │  helpers.js                                │      │   │
│  │  │  - formatCurrency()                        │      │   │
│  │  │  - formatDate()                            │      │   │
│  │  │  - calculateTotal()                        │      │   │
│  │  │  - isValidEmail()                          │      │   │
│  │  │  - And more...                             │      │   │
│  │  └────────────────────────────────────────────┘      │   │
│  └──────────────────────────────────────────────────────┘   │
│                 │                                             │
└─────────────────┼─────────────────────────────────────────────┘
                  │
┌─────────────────▼─────────────────────────────────────────────┐
│              Backend API (External)                           │
├─────────────────────────────────────────────────────────────────┤
│  - POST   /expense-tracker/onBoard/users                       │
│  - GET    /expense-tracker/users/{userId}                      │
│  - POST   /expense-tracker/add-expenses/{userId}               │
│  - GET    /expense-tracker/getAllExpenses/{userId}             │
│  - PUT    /expense-tracker/update-expenses/{expenseId}         │
│  - DELETE /expense-tracker/delete-expenses/{expenseId}         │
└─────────────────────────────────────────────────────────────────┘
```

## 📊 Component Hierarchy

```
App
├── UserProvider (Context)
│   └── ExpenseProvider (Context)
│       └── AppContent
│           ├── UserOnboarding
│           │   └── Form Fields
│           │       ├── Input: username
│           │       ├── Input: email
│           │       └── Input: monthlyLimit
│           │
│           └── Dashboard
│               ├── Header
│               │   ├── App Title
│               │   └── User Info
│               │
│               ├── ExpenseSummary
│               │   ├── Summary Cards
│               │   │   ├── Total Expenses
│               │   │   ├── Monthly Limit
│               │   │   ├── Remaining Budget
│               │   │   └── Budget Usage %
│               │   │
│               │   └── Category Breakdown
│               │       └── Category Items (List)
│               │
│               └── ExpenseSection
│                   ├── Add Expense Button
│                   │
│                   ├── ExpenseForm (conditional)
│                   │   ├── Input: description
│                   │   ├── Input: amount
│                   │   ├── Input: date
│                   │   ├── Select: category
│                   │   └── Buttons: Submit, Cancel
│                   │
│                   └── ExpenseList
│                       └── ExpenseItem (multiple)
│                           ├── Description
│                           ├── Category Badge
│                           ├── Amount
│                           ├── Date
│                           └── Buttons: Edit, Delete
```

## 🔄 Data Flow Diagram

### User Onboarding Flow

```
User Registration Form
    │
    ├─ Input Validation
    │   └─ validatForm()
    │
    ├─ API Call
    │   └─ userAPI.onboardUser(userData)
    │       └─ Fetch POST to backend
    │
    ├─ State Update
    │   └─ updateUser() in UserContext
    │       └─ Store in localStorage
    │
    └─ Navigation
        └─ Redirect to Dashboard
```

### Expense Management Flow

```
Add/Edit Expense
    │
    ├─ Form Input
    │   └─ Update local formData state
    │
    ├─ Submit Form
    │   └─ Validate Form Data
    │       ├─ Check required fields
    │       ├─ Validate amounts
    │       └─ Show validation errors
    │
    ├─ API Call
    │   ├─ If adding: expenseAPI.addExpense()
    │   ├─ If editing: expenseAPI.updateExpense()
    │   └─ Fetch POST/PUT to backend
    │
    ├─ Context Update
    │   └─ addExpenseItem() or updateExpenseItem()
    │       └─ Update ExpenseContext state
    │
    ├─ Component Re-render
    │   └─ ExpenseList updates with new data
    │
    └─ User Feedback
        ├─ Show success message
        ├─ Clear form
        └─ Close form (if modal)
```

### Expense Deletion Flow

```
Delete Button Click
    │
    ├─ Show Confirmation Dialog
    │   └─ User confirms deletion
    │
    ├─ API Call
    │   └─ expenseAPI.deleteExpense(expenseId)
    │       └─ Fetch DELETE to backend
    │
    ├─ Context Update
    │   └─ removeExpenseItem(expenseId)
    │       └─ Filter out deleted item
    │
    ├─ Component Re-render
    │   └─ ExpenseList updates
    │
    └─ User Feedback
        └─ Show success notification
```

## 🔌 API Integration Pattern

```
Component
    │
    └─ useExpense Hook
        │
        └─ expenseAPI Service
            │
            ├─ fetchRequest() Base Function
            │   │
            │   ├─ Set Headers
            │   ├─ Make Fetch Call
            │   ├─ Handle Response
            │   └─ Handle Errors
            │
            └─ Endpoint Functions
                │
                ├─ addExpense()
                ├─ getExpenses()
                ├─ updateExpense()
                └─ deleteExpense()
                    │
                    └─ Backend API
```

## 🎯 State Management Structure

```
UserContext
├─ user (object)
│   ├─ id
│   ├─ username
│   ├─ gmail
│   └─ monthlyLimit
│
├─ loading (boolean)
├─ error (string | null)
│
├─ updateUser(userData)
├─ clearUser()
├─ setLoading(bool)
└─ setError(message)

ExpenseContext
├─ expenses (array)
│   └─ [
│       {
│         id,
│         description,
│         amount,
│         expenseDate,
│         category
│       },
│       ...
│     ]
│
├─ loading (boolean)
├─ error (string | null)
│
├─ addExpenseItem(expense)
├─ updateExpenseItem(id, expense)
├─ removeExpenseItem(id)
├─ setAllExpenses(array)
├─ clearExpenses()
├─ setLoading(bool)
└─ setError(message)
```

## 📂 File Organization

```
src/
│
├── components/
│   ├── index.js                 (Barrel export)
│   ├── UserOnboarding.js
│   ├── UserOnboarding.css
│   ├── ExpenseForm.js
│   ├── ExpenseForm.css
│   ├── ExpenseList.js
│   ├── ExpenseList.css
│   ├── ExpenseSummary.js
│   ├── ExpenseSummary.css
│   ├── Header.js
│   ├── Header.css
│   ├── Alert.js
│   ├── Alert.css
│   ├── LoadingSpinner.js
│   └── LoadingSpinner.css
│
├── pages/
│   ├── Dashboard.js
│   └── Dashboard.css
│
├── services/
│   └── api.js
│
├── hooks/
│   ├── index.js
│   ├── useUser.js
│   └── useExpense.js
│
├── context/
│   ├── index.js
│   ├── UserContext.js
│   └── ExpenseContext.js
│
├── utils/
│   └── helpers.js
│
├── App.js
├── App.css
├── index.js
└── index.css
```

## 🔐 Security Architecture

```
User Input
    │
    ├─ Client-Side Validation
    │   ├─ Required fields check
    │   ├─ Format validation (email)
    │   ├─ Range validation (amounts)
    │   └─ Show error messages
    │
    ├─ Form Submission
    │   ├─ Validate again
    │   ├─ Show loading state
    │   └─ Disable submit button
    │
    ├─ API Request
    │   ├─ Set proper headers
    │   ├─ JSON stringify data
    │   └─ HTTPS protocol
    │
    ├─ Error Handling
    │   ├─ Catch network errors
    │   ├─ Parse API errors
    │   ├─ Show user-friendly messages
    │   └─ Log errors safely
    │
    └─ Data Storage
        ├─ User data in localStorage
        ├─ No sensitive data stored
        ├─ Clear on logout
        └─ Handle localStorage access safely
```

## 📱 Responsive Design Architecture

```
Desktop Layout (> 900px)
├─ Header (full width, sticky)
├─ Summary Cards (4 column grid)
├─ Main Content Area
│   ├─ Sidebar (if needed)
│   └─ Content (full width)
└─ Footer

Tablet Layout (600px - 900px)
├─ Header (full width, sticky)
├─ Summary Cards (2 column grid)
├─ Main Content Area
│   └─ Single Column Content
└─ Footer

Mobile Layout (< 600px)
├─ Header (responsive, collapsible menu)
├─ Summary Cards (1 column stack)
├─ Main Content Area
│   └─ Single Column, Touch-Friendly
└─ Footer

Touch Interactions
├─ Button min-height: 44px
├─ Spacing: 12px+ between clickables
├─ Readable fonts: 14px+
├─ Modal-friendly forms
└─ Full-width inputs
```

## 🚀 Performance Optimization Strategy

```
Component Rendering
├─ Functional Components with Hooks
├─ Memoization (React.memo when needed)
├─ useCallback for handlers
└─ useMemo for expensive calculations

State Management
├─ Context API (no Redux overhead)
├─ Minimal re-renders
├─ Separate concerns into contexts
└─ Custom hooks for abstraction

CSS Optimization
├─ Component-scoped CSS
├─ No unused styles
├─ Flexbox/Grid for layouts
└─ No inline styles

Bundle Optimization
├─ Code splitting ready
├─ Lazy loading capable
├─ Tree-shaking compatible
└─ Production build optimized
```

## 🔄 Request/Response Flow

```
Component
    │
    └─ Service Function (userAPI/expenseAPI)
        │
        ├─ fetchRequest()
        │   │
        │   ├─ Build URL
        │   ├─ Set Headers
        │   │   └─ Content-Type: application/json
        │   │
        │   ├─ Make Fetch Call
        │   │   └─ Config: method, body, headers
        │   │
        │   ├─ Check Response Status
        │   │   ├─ OK (2xx) → Parse JSON
        │   │   └─ Error → Throw Error
        │   │
        │   └─ Handle Response/Errors
        │       └─ Return data or throw error
        │
        └─ Component Receives Result
            ├─ Success
            │   ├─ Update Context
            │   ├─ Show Success Message
            │   └─ Update UI
            │
            └─ Error
                ├─ Set Error State
                ├─ Show Error Alert
                └─ Log Error
```

## 💾 Data Persistence Strategy

```
User Data
├─ Primary: Backend Database
├─ Cache: localStorage (currentUser key)
├─ Sync: On login/logout
└─ Clear: On logout

Expense Data
├─ Primary: Backend Database
├─ Cache: ExpenseContext (RAM)
├─ Fetch: On dashboard load
├─ Sync: On add/edit/delete
└─ Clear: On logout

Session Management
├─ User stored in localStorage
├─ Restored on page refresh
├─ Persists across tabs
└─ Cleared on logout
```

---

## 🎯 Summary

This architecture provides:
- ✅ Clean separation of concerns
- ✅ Scalable component structure
- ✅ Efficient state management
- ✅ Proper error handling
- ✅ Security best practices
- ✅ Responsive design support
- ✅ Performance optimization
- ✅ Easy maintenance and extensibility

**Last Updated**: February 2024
