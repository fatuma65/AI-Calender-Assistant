# AI Calender Assistant

This is a Node.js based application that helps users manage their events and scedules efficiently. It provides features such as event creation, reminder scheduling, and daily schedule summaries via email. 

## Features

- Event Management: Create, update, delete and retrieve events.
- Reminders: Schedule specific reminders for events.
- Daily Summaries: Recieve an email summarizing the day's events every morning.
- Google Calender Intergration: Sync with Google Calender to manage events automatically.

## Tech Stack

### Backend :- 
- Main Lnguange: TypeScript
- RunTime: Node.js
- Framework: Express
- Database: PostgreSQL with Prisma ORM
- Scheduler: Node-Cron
- Notifications: Nodemailer for email notifications

### FrontEnd :-
- React (To be implemented in the future)

## Getting Started

### Prerequisities
- Node.js (v16 or later)
- PostgreSQL 16
- Yarn or npm
- Prisma CLI 

### Setup

1. Clone the repository
```
git clone https://github.com/fatuma65/AI-Calender-Assitant.git
cd backend
```

2. Install dependencies
```
npm install
// or
yarn install
```

3. Create a .env file in your root directory and ass the following environment variables.
```
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
GOOGLE_API_KEY=<your-google-api-key>
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
REDIRECT_URL=<your-redirect-url>
GITHUB_TOKEN=<your-github-openai-gpt-4o-key>
```

4. Set up the database
```
npx prisma migrate dev --name init
```

5. Start the development server
```
npm run dev
// or
yarn run dev
```

## API Endpoints

### Events
<table>
<thead>
<tr>
<th>Endpoint</th>
<th>Method</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>api/events</td>
<td>POST</td>
<td>Create a new event</td>
</tr>
<tr>
<td>api/events/:id</td>
<td>GET</td>
<td>Retrieve event details</td>
</tr>
<tr>
<td>api/events/:id</td>
<td>PUT</td>
<td>Update an existing event</td>
</tr>
<tr>
<td>api/events/:id</td>
<td>DELETE</td>
<td>Delete an event</td>
</tr>

</tbody>
</table>

### Reminders
<table>
<thead>
<tr>
<th>Endpoint</th>
<th>Method</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>/reminders/event</td>
<td>POST</td>
<td>Schedule a reminder for an event</td>
</tr>
<tr>
<td>/reminders/daily</td>
<td>POST</td>
<td>Schedule daily notifications</td>
</tr>
</tbody>
</table>

## Development Scripts

- Start Dev Server:
```
npm run dev
```

- Build
```
npx tsc
```

- Database Migration 
```
npx prisma migrate dev
```

## Future Features

- Push notification for reminders
- SMS notifications using Twillo
- Advanced scheduling with time intensity

## Contributions

Contributions are welcome! Please follow the following steps
1. Fork the repository
2. Create a new branch
```git checkout -b feature-name```
3. Make your changes and commit them
4. Push your changes
```git push origin feature-name```
5. Submit a pull request.