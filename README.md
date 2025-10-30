# Elevatos Manager - Interactive Prototype

A comprehensive centralized management application for elevator projects across Latin America.

## Features

- **Multi-language Support**: Portuguese, English, and Spanish
- **Dark/Light Theme**: Toggle between light and dark modes
- **Interactive Dashboard**: KPI cards, charts, and recent activity
- **Project Management**: View, filter, and manage elevator projects
- **Project Details**: Track progress through 4 stages (Venda, Fabricação, Instalação, Pós-venda)
- **Interactive Map**: Visual representation of projects across South America
- **Feedback System**: Submit and view project feedback with star ratings
- **Reports & Analytics**: Comprehensive analytics with charts and country breakdown
- **Profile Management**: User profile with edit capabilities
- **Local Persistence**: All data persists in browser localStorage

## Mock Data Structure

### Projects (144 total)
- **Brazil**: 45 projects
- **Argentina**: 32 projects
- **Chile**: 28 projects
- **Colombia**: 21 projects
- **Mexico**: 18 projects

### Project Statuses
1. **Venda** (Sales) - Blue
2. **Fabricação** (Manufacturing) - Yellow
3. **Instalação** (Installation) - Purple
4. **Pós-venda** (After-sales) - Green

### Feedback Stats
- Initial average rating: 4.8/5.0
- Total reviews: 234
- 6 pre-populated feedback entries

### Monthly Data
- 6 months of historical data (Oct-Mar)
- Revenue and cost tracking
- Project count trends

## How to Customize Mock Data

### Editing Project Data
Open `/app/frontend/src/lib/mockData.js` and modify:

```javascript
// Change country distribution
const counts = { 
  BR: 45,  // Brazil project count
  AR: 32,  // Argentina project count
  CL: 28,  // Chile project count
  CO: 21,  // Colombia project count
  MX: 18   // Mexico project count
};

// Modify monthly data
export const monthlyData = [
  { month: 'Oct', projects: 18, revenue: 2100000, costs: 1400000 },
  // Add or modify months here...
];
```

### Editing Feedback
```javascript
export const feedbackData = [
  {
    id: 1,
    projectId: projects[0].id,
    projectName: projects[0].name,
    name: 'João Silva',
    rating: 5,
    comment: 'Your feedback text here',
    suggestions: 'Your suggestions here',
    date: '2024-03-15',
  },
  // Add more feedback entries...
];
```

### Editing User Profile
```javascript
export const currentUser = {
  name: 'Roberto Silva',
  email: 'roberto.silva@elevatos.com',
  role: 'Gerente de Projetos',
  department: 'Operações',
  avatar: 'RS',
  permissions: 'Administrador',
  stats: {
    totalProjects: 28,
    concluded: 22,
    rating: 4.8,
  },
};
```

## Interactive Features

### Login Page
- Email and password fields (any credentials work - it's a demo)
- Password visibility toggle
- Navigates to Dashboard on login

### Dashboard
- 4 KPI cards: Total Projects, Revenue, Growth %, Active Clients
- Line chart: Revenue vs Costs over 6 months
- Bar chart: Monthly projects
- Projects by Status (progress bars)
- Projects by Country (horizontal bar chart)
- Recent Activity feed

### Projects Page
- Filter by status and country
- Card-based project grid
- Click any card to view project details
- Shows progress, budget, manager info

### Project Detail Page
- Overview cards: Budget, Start/End dates, Manager
- 4-stage process visualization with progress bars
- "Mark as Complete" buttons to advance stages
- Mock attachments list
- Updates persist in localStorage

### Map Page
- Visual South America map with project markers
- Marker colors represent project status
- Click markers to view project summary
- Direct navigation to project details
- Legend showing status colors

### Feedback Page
- Project selector dropdown
- Interactive 5-star rating component
- Comment and suggestions fields
- Average rating card (updates on new feedback)
- Recent feedback list
- Rating calculation includes new submissions

### Reports & Analytics
- Same KPI cards as Dashboard
- Combined bar chart: Projects & Revenue
- Country breakdown table with satisfaction ratings
- Projects by Status progress bars

### Profile Page
- User avatar and info display
- Quick stats: Projects Managed, Concluded, Rating
- Edit Profile modal
- Change Password modal
- Notifications preferences modal

## Language Support

### Switching Languages
Click the globe icon in the header and select:
- 🇧🇷 Português (default)
- 🇺🇸 English
- 🇪🇸 Español

All UI text updates instantly. Translations are in `/app/frontend/src/lib/translations.js`.

## Theme Support

Click the sun/moon icon in the header to toggle between light and dark modes. Theme preference persists in localStorage.

## Data Persistence

All changes are stored in browser localStorage:
- Authentication state
- Language preference
- Theme preference
- Project updates
- Stage progress
- New feedback entries
- Updated feedback stats
- Profile edits

To reset all data, clear browser localStorage:
```javascript
localStorage.clear();
```

## Technology Stack

- **React** with React Router for navigation
- **Tailwind CSS** for styling
- **Shadcn/ui** components
- **Recharts** for data visualization
- **Lucide React** for icons
- **Sonner** for toast notifications
- **LocalStorage** for data persistence

## Color System

- **Primary**: Blue (#3B82F6) - Professional enterprise color
- **Success**: Green - For completed stages
- **Warning**: Yellow - For manufacturing stage
- **Info**: Light Blue - For sales stage
- **Destructive**: Red - For errors

## Responsive Design

- Mobile-first approach
- Breakpoints:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- Collapsible sidebar on mobile
- Responsive charts and tables

## File Structure

```
/app/frontend/src/
├── components/
│   ├── ui/              # Shadcn components
│   └── DashboardLayout.js
├── contexts/
│   └── AppContext.js   # Global state management
├── lib/
│   ├── mockData.js     # All mock data
│   └── translations.js # i18n translations
├── pages/
│   ├── LoginPage.js
│   ├── DashboardPage.js
│   ├── ProjectsPage.js
│   ├── ProjectDetailPage.js
│   ├── MapPage.js
│   ├── FeedbackPage.js
│   ├── ReportsPage.js
│   └── ProfilePage.js
├── App.js
├── index.css
└── main.jsx
```

## Demo Credentials

Any email and password will work - authentication is simulated.

Example:
- Email: demo@elevatos.com
- Password: demo123

## Known Limitations

- No actual backend - all operations are client-side
- Map uses simplified SVG representation instead of real map API
- File attachments are mock data only
- No actual authentication - any credentials work
- Data resets if localStorage is cleared

## Future Enhancements (if backend added)

- Real authentication with JWT
- Database persistence
- Real-time updates with WebSockets
- Interactive map with Leaflet or Mapbox
- File upload for attachments
- Email notifications
- Advanced filtering and search
- Export reports to PDF/Excel
- User roles and permissions

---

**© 2024 Elevatos Manager. All rights reserved.**