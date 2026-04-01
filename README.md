# Finance Dashboard

A responsive personal finance dashboard built with plain HTML, CSS, and JavaScript. It includes a dashboard overview, transaction management, insights, charts, theme switching, role-based controls, and local browser persistence.

## Overview

This project is structured as a modular static frontend app instead of a single large HTML file.

The codebase is divided into:

- `index.html` for the page structure
- `assets/css/` for separated styling concerns
- `assets/js/data/` for constants and seed data
- `assets/js/state/` for shared app state
- `assets/js/utils/` for formatting and calculations
- `assets/js/ui/` for UI interactions like theme, navigation, modal, and toast
- `assets/js/charts/` for chart rendering logic
- `assets/js/sections/` for feature-specific page behavior
- `assets/js/services/` for storage and export helpers

This approach makes the project easier to maintain, extend, debug, and review.

## Features

- Dashboard summary cards for balance, income, expenses, and savings
- Balance trend chart using Chart.js
- Spending-by-category doughnut chart
- Recent transactions preview
- Full transactions table with:
- Search
- Type filter
- Category filter
- Month filter
- Sorting
- Pagination
- Add, edit, and delete transaction actions in admin mode
- Role switching between admin and viewer
- Insights section with summary cards and additional charts
- Spending heatmap by category across months
- CSV and JSON export
- Dark/light theme toggle
- Local storage persistence for transactions, role, and theme
- Responsive layout for desktop and mobile

## Project Structure

```text
finance-dashboard/
├─ index.html
├─ README.md
├─ finance-dashboard.html
└─ assets/
   ├─ css/
   │  ├─ base.css
   │  ├─ layout.css
   │  ├─ components.css
   │  ├─ dashboard.css
   │  ├─ transactions.css
   │  ├─ insights.css
   │  └─ responsive.css
   └─ js/
      ├─ app.js
      ├─ data/
      │  ├─ constants.js
      │  └─ transactions.js
      ├─ state/
      │  └─ store.js
      ├─ utils/
      │  ├─ calculations.js
      │  └─ format.js
      ├─ ui/
      │  ├─ navigation.js
      │  ├─ role.js
      │  ├─ theme.js
      │  ├─ modal.js
      │  └─ toast.js
      ├─ charts/
      │  ├─ trendChart.js
      │  ├─ categoryChart.js
      │  ├─ monthlyCompareChart.js
      │  └─ savingsChart.js
      ├─ sections/
      │  ├─ dashboard.js
      │  ├─ transactions.js
      │  └─ insights.js
      └─ services/
         ├─ storage.js
         └─ export.js
```

## Setup Instructions

### Option 1: Open directly in the browser

Because this is a static frontend project, you can run it without installing dependencies.

1. Open the project folder.
2. Open `index.html` in your browser.

### Option 2: Run with a local server

Using a local server is recommended for a cleaner development workflow.

If you use VS Code:

1. Install the Live Server extension.
2. Right-click `index.html`.
3. Click `Open with Live Server`.

If you use Python:

```bash
python -m http.server 5500
```

Then open:

```text
http://localhost:5500
```

## How It Works

### 1. Data layer

Seed transaction data is stored in `assets/js/data/transactions.js`, while reusable constants such as month labels and category colors live in `assets/js/data/constants.js`.

The transaction records in `assets/js/data/transactions.js` are sample demo data created for this project to test the UI, charts, filters, and transaction flows. They are not pulled from a live API, real financial account, or third-party dataset.

### 2. State management

Shared application state is maintained in `assets/js/state/store.js`. This includes:

- transactions
- current role
- theme mode
- sorting state
- pagination state
- active edit state
- filter values

### 3. UI behavior

UI interactions are separated into focused modules:

- `navigation.js` handles section switching and mobile sidebar behavior
- `theme.js` manages dark/light mode
- `role.js` controls admin/viewer access changes
- `modal.js` handles add/edit transaction workflows
- `toast.js` shows notifications

### 4. Feature sections

Each major screen has its own logic:

- `dashboard.js` updates summary cards and recent transactions
- `transactions.js` handles filtering, sorting, pagination, and table rendering
- `insights.js` generates insight cards and the heatmap

### 5. Charts

Chart logic is split into separate files so each chart can be updated independently:

- trend chart
- category chart
- monthly comparison chart
- savings rate chart

### 6. Persistence

`storage.js` uses `localStorage` so the app remembers:

- your transactions
- selected role
- selected theme

## Feature Explanation

### Dashboard

The dashboard provides a quick financial summary for the latest tracked month. It calculates income, expenses, savings, and total balance from the current transaction dataset.

### Transactions

The transactions section is designed for data management. Users can search, filter, sort, paginate, export data, and in admin mode, create or modify transactions.

### Insights

The insights section summarizes patterns in spending and savings. It highlights top categories, average spend, month-over-month changes, and visualizes category spending across time.

### Theme and responsiveness

The interface supports both dark and light themes and adapts for smaller screens using responsive CSS and a collapsible mobile sidebar.