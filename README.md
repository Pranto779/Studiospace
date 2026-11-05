StudioSpace

StudioSpace is a website where creators can find and book creative
studios. Studio owners can add their studios, manage their listings, and
share their spaces with other creators.

Live Website
Live Site:(https://studiospace-pt1p.vercel.app/)
Client Repository: https://github.com/Pranto779/Studiospace
Server Repository: https://github.com/Pranto779/Studiospace-srv
Main Features
Users can register and sign in with email and password.
Google login is available for users.
Users can explore studios and browse them by category.
The home page shows featured studios from the database.
Users can see studio details, location, hourly price, and amenities.
Logged-in users can add a new studio and manage their own listings.
Users can book a studio and see their bookings.
The website uses toast messages to show success and error
notifications.
The website has loading states and empty states.
The design is responsive for mobile, tablet, and desktop.
Technologies I Used
Frontend
Next.js
React
TypeScript
Tailwind CSS
Shadcn UI / Lucide React
Swiper.js
Backend
Node.js
Express.js
MongoDB
Authentication
Better Auth
MongoDB Adapter
Google OAuth
Run the Project Locally
1. Clone the client project
git clone ADD_YOUR_CLIENT_GITHUB_URL
cd your-client-folder
npm install
2. Add environment variables

Create a .env.local file in the client project and add the require


Use the variable names required by your code. Never upload real
passwords, API secrets, or database credentials to GitHub.

3. Start the backend server

Clone the server project in a separate terminal:

git clone ADD_YOUR_SERVER_GITHUB_URL
cd your-server-folder
npm install

Add the required server environment variables in the server's .env
file. Make sure MongoDB is connected and the server uses port 8000 or
the port configured in your project.

Start the backend:

npm run dev

If your project does not have a dev script, use the start command
configured in your package.json.

4. Start the frontend

Open another terminal in the client project and run:

npm run dev

Open https://studiospace-pt1p.vercel.app
 in your browser.

Database

The project uses MongoDB to store studio listings and booking
information. The current database name is StudioSpace. Make sure your
MongoDB connection string is valid and your database access settings
allow the server to connect.

Notes
The backend must be running when the frontend requests data from
SERVER_BASE_URL.
Set the correct environment variables in Vercel before deploying.
After changing production environment variables, redeploy the
project.
Do not commit .env or .env.local files to GitHub.
