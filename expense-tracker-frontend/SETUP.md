# Expense Tracker App - Setup Guide

## 🎯 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create a `.env` file in the project root:
```bash
cp .env.example .env
```

Edit `.env` to set your backend API URL:
```
REACT_APP_API_URL=http://localhost:8080/expense-tracker
```

### 3. Start Development Server
```bash
npm start
```

The application will open at `http://localhost:3000`

## 🔧 Troubleshooting

### Port 3000 Already in Use
```bash
# On Windows (PowerShell)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On macOS/Linux
lsof -i :3000
kill -9 <PID>
```

### Backend Connection Issues
- Ensure your backend is running on `http://localhost:8080`
- Check the API URL in `.env`
- Verify CORS is enabled in your backend
- Check browser console for network errors

### Module Not Found Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

### React DevTools
Install React Developer Tools extension in your browser for better debugging.

## 📦 Building for Production
```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

## 🧪 Testing
```bash
npm test
```

## 📚 Project Structure Explained

### `/components`
Reusable UI components with their own CSS files. Each component is self-contained and can be used in multiple pages.

### `/pages`
Page-level components that combine multiple smaller components to create full pages.

### `/services`
API client and service layer for handling all HTTP requests to the backend.

### `/hooks`
Custom React hooks for accessing and managing global state (Context API).

### `/context`
React Context providers for managing global state (users and expenses).

### `/utils`
Pure utility functions for common operations like date formatting, currency conversion, etc.

## 🎨 Customizing Styles

All components use CSS files in the same directory. To customize:

1. Find the component CSS file (e.g., `ExpenseForm.css`)
2. Modify the styles as needed
3. Changes will hot-reload in development mode

### Global Styles
- `src/index.css` - Global styles and resets
- `src/App.css` - App-level styles

## 🌐 API Configuration

### Development
```
REACT_APP_API_URL=http://localhost:8080/expense-tracker
```

### Production
```
REACT_APP_API_URL=https://your-api-domain.com/expense-tracker
```

## 📝 Adding New Features

### Add a New Component
1. Create component file: `src/components/MyComponent.js`
2. Create styles file: `src/components/MyComponent.css`
3. Add JSDoc comments and exports
4. Update `src/components/index.js` for barrel export

### Add a New Context
1. Create context file: `src/context/MyContext.js`
2. Define Provider component
3. Export from `src/context/index.js`
4. Use in `App.js` to wrap components

### Add a New Hook
1. Create hook file: `src/hooks/useMyHook.js`
2. Use context inside the hook
3. Export from `src/hooks/index.js`

### Add API Endpoints
1. Update `src/services/api.js`
2. Add new endpoint functions
3. Use in components via the service

## 🚀 Deployment Options

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag and drop 'build' folder to Netlify
```

### Traditional Server
```bash
npm run build
# Copy contents of 'build' folder to web server
```

## 💡 Tips & Tricks

### Browser DevTools
- Use React DevTools extension for component inspection
- Use Network tab to debug API calls
- Check Console for errors and warnings

### Performance
- Components use React.memo and custom hooks for optimization
- CSS Grid and Flexbox for efficient layouts
- Lazy loading can be added for pages

### Debug Mode
Add this to `App.js` to enable additional logging:
```javascript
if (process.env.NODE_ENV === 'development') {
  console.log('Development mode enabled');
}
```

## 📚 Further Reading

- [React Documentation](https://react.dev/)
- [Context API Guide](https://react.dev/reference/react/useContext)
- [Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [CSS Best Practices](https://developer.mozilla.org/en-US/docs/Web/CSS)

## 🤝 Getting Help

If you encounter issues:
1. Check the browser console for errors
2. Review the API response in Network tab
3. Check backend logs
4. Verify environment configuration
5. Clear cache and reinstall dependencies

---

**Happy coding! 🎉**
