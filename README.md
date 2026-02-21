# Advanced Expense Tracker

A full-stack expense management application built with **React** (frontend) and **Spring Boot** (backend), designed to help users track, analyze, and manage their personal expenses with ease.

## 🎯 Features

- **User Management**: Secure user registration
- **Expense Tracking**: Add, edit, and delete expenses with categories
- **Budget Management**: Set budget limits and monitor spending
- **Analytics & Reports**: Visual breakdowns by category with charts
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Instant expense updates across components
- **Database Support**: MySQL with H2 for development/testing

## 📋 Tech Stack

### Frontend
- **React 19**: Modern JavaScript library for UI
- **Context API**: State management
- **CSS3**: Responsive styling
- **React Testing Library**: Component testing

### Backend
- **Spring Boot 3.5.0**: Enterprise Java framework
- **Spring Data JPA**: Object-relational mapping
- **Spring Web**: REST API development
- **MySQL/H2 Database**: Persistent data storage
- **Lombok**: Reduce boilerplate code
- **Apache Commons**: Utility functions

### Development
- **Java 17**: Latest LTS version
- **Maven**: Build and dependency management
- **Node.js 14+**: JavaScript runtime

## 🚀 Quick Start

### Prerequisites
- **Java 17** JDK
- **Node.js 14+** with npm
- **MySQL** (for production) or use H2 (for development)
- **Git**

### Backend Setup
```bash
cd Advanced-Expense-Tracker

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```
Backend will be available at `http://localhost:8080`

### Frontend Setup
```bash
cd expense-tracker-frontend

# Install dependencies
npm install

# Start development server
npm start
```
Frontend will open at `http://localhost:3000`

## 📁 Project Structure

```
Advanced-Expense-Tracker/
├── src/                           # Spring Boot backend
│   ├── main/
│   │   ├── java/com/example/     # Java source code
│   │   │   └── expensetracker/
│   │   │       ├── controller/   # REST controllers
│   │   │       ├── service/      # Business logic
│   │   │       ├── repository/   # Data access
│   │   │       └── model/        # Entity classes
│   │   └── resources/
│   │       └── application.properties  # Configuration
│   └── test/                     # Unit tests
│
├── expense-tracker-frontend/      # React frontend
│   ├── src/
│   │   ├── components/           # Reusable React components
│   │   ├── pages/                # Page-level components
│   │   ├── context/              # React Context (state management)
│   │   ├── services/             # API client
│   │   ├── hooks/                # Custom React hooks
│   │   └── utils/                # Helper utilities
│   ├── public/                   # Static assets
│   └── package.json
│
├── pom.xml                       # Maven configuration
├── mvnw / mvnw.cmd              # Maven wrapper scripts
└── README.md
```

## 🔧 Configuration

### Environment Variables (Frontend)
Create a `.env` file in `expense-tracker-frontend/`:
```
REACT_APP_API_BASE_URL=http://localhost:8080/api
```

### Database Configuration (Backend)
Edit `src/main/resources/application.properties`:
```properties
# MySQL Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/expense_tracker
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update

# Or use H2 for development
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.username=sa
spring.h2.console.enabled=true
```

## 🧪 Testing

### Backend Tests
```bash
mvn test
```

### Frontend Tests
```bash
cd expense-tracker-frontend
npm test
```

## 📦 Building for Production

### Backend Build
```bash
mvn clean package
# JAR file created in target/expensetracker-0.0.1-SNAPSHOT.jar
```

### Frontend Build
```bash
cd expense-tracker-frontend
npm run build
# Production-ready files in build/ directory
```

## 📚 Documentation

- **Frontend Documentation**: [expense-tracker-frontend/README.md](expense-tracker-frontend/README.md)
- **Architecture Guide**: [expense-tracker-frontend/ARCHITECTURE.md](expense-tracker-frontend/ARCHITECTURE.md)
- **Coding Standards**: [expense-tracker-frontend/CODING_STANDARDS.md](expense-tracker-frontend/CODING_STANDARDS.md)
- **Setup Guide**: [expense-tracker-frontend/SETUP.md](expense-tracker-frontend/SETUP.md)

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👥 Authors

- **Vanipenta Balaji** - Initial development

## 🆘 Support

For questions or issues:
1. Check existing [GitHub Issues](../../issues)
2. Create a new issue with detailed description
3. Provide screenshots or logs when applicable

## 🗺️ Roadmap

- [ ] Multi-user collaboration features
- [ ] Budget alerts and notifications
- [ ] Data export (CSV, PDF)
- [ ] Mobile app
- [ ] Advanced analytics and forecasting
- [ ] Recurring expenses
- [ ] Receipt scanning with OCR

---

**Last Updated**: February 2026  
