# 🛒 E-Commerce Dashboard

A modern e-commerce dashboard built with Next.js 14, React Query, and TypeScript.

## 🚀 Live Demo

[View Demo]https://training-ecommerce-dashboard.vercel.app/

## ✨ Features

- 📦 Product listing with search and filters
- 🛍️ Shopping cart with quantity management
- 📊 Dashboard with statistics
- 🎨 Modern UI with Tailwind CSS
- ⚡ Optimized with React Query caching
- 🧪 Unit tested with Jest & Testing Library
- 📱 Fully responsive

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Context API + useReducer
- **Data Fetching:** React Query
- **Testing:** Jest + React Testing Library
- **Deployment:** Vercel

## 🏗️ Architecture

- **Server Components** for data fetching and SEO
- **Client Components** for interactivity
- **React Query** for caching and data synchronization
- **Context API** with optimized re-renders (separated state/actions)

## 🚀 Getting Started
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## 📁 Project Structure
```
├── app/                  # Next.js pages (App Router)
├── components/           # Reusable components
├── contexts/            # React Context providers
├── hooks/               # Custom hooks
├── lib/                 # Types and utilities
└── __tests__/           # Unit tests
```

## 🧪 Testing
```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
```
