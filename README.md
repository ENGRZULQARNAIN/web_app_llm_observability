# OBAM AI - LLM Observability Platform

## Overview
OBAM AI is a powerful LLM observability platform that provides complete visibility into AI applications. It enables monitoring, tracking, and optimization of LLM systems.

## System Architecture
```mermaid
graph TD
    A[Frontend - React] --> B[Authentication Service]
    A --> C[Analytics Service]
    A --> D[Dashboard Service]
    B --> E[User Management]
    C --> F[Data Processing]
    D --> G[Monitoring]
    E --> H[Database]
    F --> H
    G --> H
```

## Use Case Diagram
```mermaid
graph TD
    subgraph Actors
        GU[Guest User]
        RU[Registered User]
        SYS[System]
    end

    subgraph Guest Features
        LP[View Landing Page]
        DEMO[View Demo]
        CONT[Contact Support]
        REG[Register]
        LOG[Login]
        RESET[Reset Password]
    end

    subgraph Protected Features
        DASH[View Dashboard]
        ANAL[View Analytics]
        PROF[Manage Profile]
        VER[Verify Account]
    end

    GU --> LP
    GU --> DEMO
    GU --> CONT
    GU --> REG
    GU --> LOG
    GU --> RESET
    RU --> DASH
    RU --> ANAL
    RU --> PROF
    RU --> VER
    SYS --> REG
    SYS --> LOG
    SYS --> RESET
    SYS --> VER
```

## Features
- 🔐 Secure Authentication System
- 📊 Real-time Analytics Dashboard
- 📈 LLM Performance Monitoring
- 👤 User Profile Management
- 📱 Responsive Design
- 🔄 Real-time Data Updates

## Tech Stack
- Frontend: React.js
- Styling: Tailwind CSS
- Authentication: Custom Auth System
- State Management: React Context
- Routing: React Router
- Build Tool: Vite

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
1. Clone the repository
```bash
git clone [repository-url]
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

## Project Structure
```
src/
├── assets/        # Static assets
├── components/    # Reusable components
├── context/       # React context providers
├── Graphs/        # Data visualization components
├── pages/         # Page components
├── services/      # API services
└── App.jsx        # Main application component
```

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Contact
For support or inquiries, please visit our contact page or reach out to our support team.
