# Expense Tracker App - Code Style Guide

## 🎯 Overview

This guide documents the coding standards and conventions used in the Expense Tracker React application.

## 📋 File and Folder Structure

### Naming Conventions

**Components**
- PascalCase for component files: `UserOnboarding.js`, `ExpenseForm.js`
- Each component has a corresponding CSS file: `UserOnboarding.css`
- Index files for barrel exports: `index.js`

**Folders**
- kebab-case for folders: `/components`, `/pages`, `/services`, `/hooks`, `/context`, `/utils`

**Functions & Variables**
- camelCase for functions and variables: `formatCurrency()`, `handleSubmit()`
- UPPER_SNAKE_CASE for constants: `API_BASE_URL`, `CATEGORIES`

**CSS Classes**
- kebab-case for CSS classes: `.expense-form`, `.summary-card`
- BEM naming convention for complex components: `.expense-item__header`, `.expense-item__amount`

## 🏗️ Component Structure

### Basic Component Template

```javascript
import React, { useState } from 'react';
import './MyComponent.css';

/**
 * MyComponent - Description of what this component does
 * 
 * Props:
 * - prop1 (type): Description
 * - prop2 (type): Description
 */
const MyComponent = ({ prop1, prop2 }) => {
  const [state, setState] = useState(null);

  // Event handlers
  const handleChange = (e) => {
    setState(e.target.value);
  };

  return (
    <div className="my-component">
      {/* JSX */}
    </div>
  );
};

export default MyComponent;
```

### Component JSDoc Format

```javascript
/**
 * ComponentName - Brief description
 * 
 * Longer description explaining the purpose,
 * usage patterns, and any important notes.
 * 
 * @component
 * @example
 * <ComponentName prop1="value" prop2={data} />
 */
```

## 🎣 Custom Hooks Structure

```javascript
import { useContext } from 'react';
import { MyContext } from '../context/MyContext';

/**
 * useMyHook - Description of hook functionality
 * 
 * @returns {Object} Hook values and functions
 * @throws {Error} If used outside required provider
 */
export const useMyHook = () => {
  const context = useContext(MyContext);
  
  if (!context) {
    throw new Error('useMyHook must be used within a Provider');
  }
  
  return context;
};
```

## 📡 API Service Pattern

```javascript
/**
 * Brief description of what the endpoint does
 * @param {type} paramName - Parameter description
 * @returns {Promise<type>} Response description
 */
const functionName = (paramName) =>
  fetchRequest('/endpoint', {
    method: 'POST',
    body: JSON.stringify(data),
  });
```

## 🎨 CSS Standards

### Component CSS Template

```css
/* Component Name Styles */

.component-name {
  /* Container styles */
}

.component-name h1 {
  /* Element styles */
}

.component-name .section-name {
  /* Section-specific styles */
}

/* Responsive Design */
@media (max-width: 768px) {
  /* Tablet styles */
}

@media (max-width: 480px) {
  /* Mobile styles */
}
```

### CSS Best Practices

1. **Class Naming**: Use kebab-case
2. **Specificity**: Keep specificity low (use single class when possible)
3. **Mobile First**: Write mobile styles first, then add larger breakpoints
4. **Color Variables**: Use consistent colors from color scheme
5. **Spacing**: Use consistent margin and padding values
6. **Responsive**: Always include mobile, tablet, and desktop breakpoints

### Common Breakpoints

```css
/* Mobile */
@media (max-width: 480px) { }

/* Tablet */
@media (max-width: 768px) { }

/* Tablet & Desktop */
@media (min-width: 768px) { }

/* Desktop */
@media (min-width: 900px) { }
```

## 📝 Code Comments

### JSDoc Comments

```javascript
/**
 * Function name - One-line description
 * 
 * Longer description if needed,
 * explaining purpose and usage.
 * 
 * @param {type} paramName - Parameter description
 * @param {type} [optionalParam] - Optional parameter
 * @returns {type} Description of return value
 * @throws {ErrorType} When this error occurs
 * 
 * @example
 * functionName(param1, param2);
 */
```

### Inline Comments

```javascript
// Use for explaining complex logic
const value = complexCalculation(); // Why this calculation?

// Avoid obvious comments
const name = 'John'; // Setting name - NOT NEEDED
```

## 🔄 State Management

### Using Context

```javascript
import { useUser } from '../hooks/useUser';

const MyComponent = () => {
  const { user, updateUser } = useUser();
  
  // Use state values and functions
};
```

### Reducer Pattern (if needed)

```javascript
const initialState = { /* ... */ };

const reducer = (state, action) => {
  switch (action.type) {
    case 'ACTION_TYPE':
      return { ...state, prop: action.payload };
    default:
      return state;
  }
};
```

## ✅ Form Handling

### Form Validation

```javascript
const validateForm = () => {
  const errors = {};
  
  if (!formData.field) {
    errors.field = 'Field is required';
  }
  
  setErrors(errors);
  return Object.keys(errors).length === 0;
};
```

### Error Display

```javascript
{errors.fieldName && (
  <span className="error-text">{errors.fieldName}</span>
)}
```

## 🧪 Testing Pattern

```javascript
// Example test structure
describe('ComponentName', () => {
  it('should render correctly', () => {
    // test code
  });
  
  it('should handle user input', () => {
    // test code
  });
});
```

## 🚫 Code Smells to Avoid

1. **Prop Drilling**: Use Context for deeply nested state
2. **Inline Objects**: Extract objects to constants
3. **Magic Numbers**: Use named constants
4. **Deep Nesting**: Keep components simple
5. **Large Components**: Split into smaller components
6. **Unused Variables**: Clean up unused imports and variables

### Example: Avoid Inline Objects

❌ **Bad**
```javascript
const MyComponent = () => {
  return <Child data={{ a: 1, b: 2, c: 3 }} />;
};
```

✅ **Good**
```javascript
const defaultData = { a: 1, b: 2, c: 3 };

const MyComponent = () => {
  return <Child data={defaultData} />;
};
```

## 🎯 Best Practices

### Error Handling

```javascript
try {
  const result = await apiCall();
  setData(result);
} catch (error) {
  console.error('Error message:', error);
  setError(error.message || 'Failed to load data');
} finally {
  setLoading(false);
}
```

### Async Operations

```javascript
useEffect(() => {
  let isMounted = true;

  const fetchData = async () => {
    try {
      const result = await apiCall();
      if (isMounted) {
        setData(result);
      }
    } catch (error) {
      if (isMounted) {
        setError(error);
      }
    }
  };

  fetchData();

  return () => {
    isMounted = false;
  };
}, []);
```

### Conditional Rendering

✅ **Good**
```javascript
{isLoading && <LoadingSpinner />}
{!isLoading && error && <Alert type="error" message={error} />}
{!isLoading && !error && <Content />}
```

## 🎨 CSS Architecture

### Naming Methodology (BEM)

```css
/* Block */
.card { }

/* Block Element */
.card__header { }
.card__content { }
.card__footer { }

/* Block Element Modifier */
.card__button--primary { }
.card__button--secondary { }
.card--featured { }
```

### Color Variables

Primary colors used throughout the app:
- Primary Blue: `#667eea`
- Secondary Purple: `#764ba2`
- Success Green: `#28a745`
- Danger Red: `#dc3545`
- Neutral Gray: `#f5f7fa`

## 📦 Import Organization

```javascript
// 1. React imports
import React, { useState, useEffect } from 'react';

// 2. Component imports
import Header from '../components/Header';

// 3. Hook imports
import { useUser } from '../hooks/useUser';

// 4. Service imports
import { userAPI } from '../services/api';

// 5. Utility imports
import { formatCurrency } from '../utils/helpers';

// 6. Style imports
import './MyComponent.css';
```

## ✨ Performance Tips

1. Use React.memo for pure components
2. Use useCallback for event handlers passed as props
3. Use useMemo for expensive calculations
4. Avoid inline function definitions in render
5. Use key prop correctly in lists
6. Lazy load components and routes when appropriate

## 🔒 Security Practices

1. Validate all user inputs
2. Sanitize data before display
3. Use HTTPS for API calls
4. Never store sensitive data in localStorage
5. Implement proper error messages (no sensitive info)
6. Use environment variables for sensitive config

## 📚 References

- [React Documentation](https://react.dev/)
- [JavaScript Standard Style](https://standardjs.com/)
- [CSS-Tricks](https://css-tricks.com/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

**Last Updated**: February 2024
