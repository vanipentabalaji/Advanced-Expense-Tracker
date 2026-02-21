# Expense Tracker App - React Frontend

A modern, responsive React application for tracking personal expenses with budget management features.

## 📋 Project Structure

```
expense-tracker-app/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Alert.js         # Alert notification component
│   │   ├── ExpenseForm.js   # Form for adding/editing expenses
│   │   ├── ExpenseList.js   # List of expenses
│   │   ├── ExpenseSummary.js # Summary and statistics
│   │   ├── Header.js        # Navigation header
│   │   ├── LoadingSpinner.js # Loading indicator
│   │   ├── UserOnboarding.js # User registration form
│   │   └── *.css            # Component-specific styles
│   ├── context/             # React Context for state management
│   │   ├── ExpenseContext.js
│   │   └── UserContext.js
│   ├── hooks/               # Custom React hooks
│   │   ├── useExpense.js
│   │   └── useUser.js
│   ├── pages/               # Page-level components
│   │   ├── Dashboard.js     # Main dashboard page
│   │   └── Dashboard.css
│   ├── services/            # API services
│   │   └── api.js           # API client and endpoints
│   ├── utils/               # Utility functions
│   │   └── helpers.js       # Helper functions
│   ├── App.js               # Main app component
│   ├── App.css              # App styles
│   ├── index.js             # Entry point
│   └── index.css            # Global styles
├── public/
│   └── index.html
├── package.json
├── .env.example             # Environment variables template
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 14+ 
- npm or yarn
- Backend server running on `http://localhost:8080`

### Installation

1. **Clone the repository**
   ```bash
   cd expense-tracker-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```bash
   cp .env.example .env
   ```

4. **Configure API URL** (if needed)
   - Edit `.env` and set `REACT_APP_API_URL` to your backend URL

### Running the Application

**Development Mode**
```bash
npm start
```
The app will open at `http://localhost:3000`

**Build for Production**
```bash
npm run build
```

**Run Tests**
```bash
npm test
```

## 🏗️ Architecture

### State Management
- **UserContext**: Manages user authentication and profile data
- **ExpenseContext**: Manages expense list and operations

### Custom Hooks
- `useUser()`: Access and manage user state
- `useExpense()`: Access and manage expense state

### API Layer
- Centralized API service in `services/api.js`
- RESTful endpoints for user and expense operations
- Proper error handling and response parsing

## 📱 Features

### User Management
- **User Onboarding**: Register new users with username, email, and monthly budget limit
- **User Profile**: Display user information in header
- **Logout**: Clear user session and return to onboarding

### Expense Tracking
- **Add Expenses**: Create new expense entries with description, amount, date, and category
- **Edit Expenses**: Modify existing expense records
- **Delete Expenses**: Remove expense entries with confirmation
- **View Expenses**: Display all expenses in an organized list

### Budget Management
- **Monthly Limit**: Set and track monthly spending limit
- **Summary Statistics**: Display total expenses, remaining budget, and usage percentage
- **Category Breakdown**: View spending by category
- **Budget Alerts**: Visual indication when budget is exceeded

### Categories
- Food & Dining
- Transportation
- Shopping
- Entertainment
- Utilities
- Healthcare
- Education
- Other

## 🎨 Styling

- **Component-scoped CSS**: Each component has its own CSS file
- **Responsive Design**: Mobile-first approach with breakpoints at 480px, 600px, 768px, 900px
- **Modern UI**: Gradient backgrounds, smooth transitions, and consistent color scheme
- **Accessibility**: Semantic HTML and proper contrast ratios

### Color Scheme
- Primary: `#667eea` (Indigo)
- Secondary: `#764ba2` (Purple)
- Success: `#28a745` (Green)
- Danger: `#dc3545` (Red)
- Neutral: `#f5f7fa` (Light Gray)

## 🔧 Utility Functions

### Date Formatting
- `formatDate(date)`: Convert to readable format (e.g., "January 20, 2024")
- `formatDateForInput(date)`: Format for input fields (YYYY-MM-DD)
- `getMonthYear(date)`: Extract month and year

### Currency
- `formatCurrency(amount, currency)`: Format numbers as currency

### Data Analysis
- `groupByCategory(expenses)`: Group expenses by category
- `calculateTotal(expenses)`: Sum all expenses
- `calculateTotalByCategory(expenses)`: Sum expenses by category

### Validation
- `isValidEmail(email)`: Validate email format
- `isRequired(value)`: Check if value is provided

## 📡 API Endpoints

### User Endpoints
- `POST /expense-tracker/onBoard/users` - Register new user
- `GET /expense-tracker/users/{userId}` - Get user profile

### Expense Endpoints
- `POST /expense-tracker/add-expenses/{userId}` - Add new expense
- `GET /expense-tracker/getAllExpenses/{userId}` - Get all expenses
- `PUT /expense-tracker/update-expenses/{expenseId}` - Update expense
- `DELETE /expense-tracker/delete-expenses/{expenseId}` - Delete expense

## 🔐 Data Persistence

- User data stored in browser's `localStorage`
- Expenses managed through backend API
- Session preserved on page refresh

## 📲 Responsive Breakpoints

| Breakpoint | Width | Use Case |
|-----------|-------|----------|
| Mobile   | < 480px | Small phones |
| Tablet   | 480px - 768px | Medium devices |
| Desktop  | > 768px | Large screens |

## 🐛 Error Handling

- API error messages displayed in alert notifications
- Form validation with field-level error messages
- Graceful fallbacks for missing data
- Automatic alert dismissal after 5 seconds

## 📚 Code Standards

- **React Hooks**: Functional components with hooks
- **JSDoc Comments**: Comprehensive function documentation
- **ESLint Config**: React and Jest configurations included
- **Component Composition**: Reusable and maintainable components
- **Custom Hooks**: Abstraction of stateful logic

## 🛠️ Technologies Used

- **React 19.2.0**: UI library
- **React Hooks**: State management
- **Context API**: Global state management
- **CSS3**: Styling with flexbox and grid
- **Fetch API**: HTTP requests
- **localStorage**: Client-side storage

## 🚧 Future Enhancements

- [ ] Add expense filtering and search
- [ ] Implement expense charts and graphs
- [ ] Add data export functionality (CSV, PDF)
- [ ] Dark mode support
- [ ] Multi-language support
- [ ] Recurring expenses
- [ ] Budget goals and targets
- [ ] Expense categories customization
- [ ] Receipt image upload
- [ ] Email notifications for budget alerts

## 📝 License

This project is licensed under the MIT License.

## 👥 Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## 📧 Support

For issues or questions, please contact the development team.

