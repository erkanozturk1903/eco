# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/361e1dcc-1b9e-4e48-8aac-1854eb2b0adc

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/361e1dcc-1b9e-4e48-8aac-1854eb2b0adc) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/361e1dcc-1b9e-4e48-8aac-1854eb2b0adc) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

---

## 🚀 Railway Deployment

This project is configured for easy deployment on Railway.

### Prerequisites

- A [Railway account](https://railway.app)
- A GitHub repository with this code
- Supabase project (already configured)

### Deployment Steps

#### Option 1: Deploy via GitHub (Recommended)

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Railway deployment hazırlığı"
   git push origin main
   ```

2. **Create a new Railway project:**
   - Go to [Railway Dashboard](https://railway.app/dashboard)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose this repository
   - Railway will auto-detect the configuration from `railway.json`

3. **Configure Environment Variables:**
   Go to your Railway project → Variables tab and add:
   ```
   VITE_SUPABASE_PROJECT_ID=your_project_id
   VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
   VITE_SUPABASE_URL=https://your-project.supabase.co
   NODE_ENV=production
   ```

4. **Deploy:**
   - Railway will automatically build and deploy
   - You'll receive a URL like: `https://your-app.up.railway.app`

#### Option 2: Deploy via Railway CLI

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init

# Set environment variables
railway variables --set VITE_SUPABASE_URL=https://your-project.supabase.co
railway variables --set VITE_SUPABASE_PUBLISHABLE_KEY=your_key
railway variables --set VITE_SUPABASE_PROJECT_ID=your_project_id

# Deploy
railway up
```

### Post-Deployment Configuration

#### Update Supabase Auth URLs

After deployment, add your Railway URL to Supabase:

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Navigate to: Authentication → URL Configuration
3. Add to "Redirect URLs":
   ```
   https://your-app.up.railway.app/**
   ```
4. Update "Site URL":
   ```
   https://your-app.up.railway.app
   ```

### Local Testing

Before deploying, test the production build locally:

```bash
# Install dependencies (including serve)
npm install

# Build the project
npm run build

# Test production build
npm start
```

The app will be available at `http://localhost:3000`

### Monitoring

After deployment, monitor your application:
- **Logs:** Railway Dashboard → Deployments → View Logs
- **Metrics:** Railway Dashboard → Metrics tab
- **Health:** The app includes a healthcheck at `/`

### Custom Domain

To add a custom domain:
1. Go to Railway Dashboard → Settings → Domains
2. Click "Add Custom Domain"
3. Follow the DNS configuration instructions

### Troubleshooting

**Build fails:**
- Check Railway build logs for errors
- Ensure all environment variables are set correctly

**App doesn't load:**
- Verify the `start` command is working: `npm start`
- Check that `serve` package is installed

**Authentication issues:**
- Confirm Supabase redirect URLs include your Railway domain
- Verify environment variables are correctly set

**404 on page refresh:**
- The `serve -s` flag enables SPA mode, handling client-side routing
