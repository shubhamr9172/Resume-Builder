# Deploying Smart Resume Pro to Netlify

This guide provides step-by-step instructions to host your Next.js application on Netlify.

## Prerequisites

*   A [Netlify](https://www.netlify.com/) account.
*   Your project code pushed to a Git provider (GitHub, GitLab, or Bitbucket) OR the Netlify CLI installed.

---

## Option 1: Deploy via Git (Recommended)

This is the best method as it automatically redeploys your site whenever you push changes to your repository.

### Step 1: Push your code to GitHub
1.  If you haven't already, create a repository on GitHub.
2.  Push your local code to the repository:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin <your-repo-url>
    git push -u origin main
    ```

### Step 2: Connect to Netlify
1.  Log in to your [Netlify dashboard](https://app.netlify.com/).
2.  Click **"Add new site"** > **"Import from an existing project"**.
3.  Select **GitHub** (or your Git provider).
4.  Authorize Netlify to access your repositories.
5.  Search for and select your `smart-resume-pro` repository.

### Step 3: Configure Build Settings
Netlify should automatically detect that this is a Next.js project. Verify the following settings:

*   **Build Command:** `npm run build` (or `next build`)
*   **Publish Directory:** `.next` (Netlify handles Next.js automatically, so you might see it default to `.next` or leave it blank if using the Next.js Runtime)

> **Note:** Netlify automatically installs the `@netlify/plugin-nextjs` to handle Server-Side Rendering (SSR) and API routes.

### Step 4: Deploy
1.  Click **"Deploy Site"**.
2.  Netlify will start building your site. You can watch the deployment log.
3.  Once finished, you will get a URL like `https://your-site-name.netlify.app`.

---

## Option 2: Deploy via Netlify CLI (Manual)

Use this if you want to deploy from your command line without connecting a Git repository.

### Step 1: Install Netlify CLI
Open your terminal and run:
```bash
npm install -g netlify-cli
```

### Step 2: Build your project
Run the build command locally to ensure everything works:
```bash
npm run build
```

### Step 3: Deploy
1.  Run the deploy command:
    ```bash
    netlify deploy
    ```
2.  Follow the prompts:
    *   **"What would you like to do?"**: Select *Create & configure a new site*.
    *   **"Team"**: Select your team.
    *   **"Site name"**: Choose a unique name or leave blank for a random one.
    *   **"Publish directory"**: Type `.next` (or the folder where your static assets are if you did a static export). *However, for a standard Next.js app, the CLI might try to configure the Next.js runtime automatically.*

    > **Important:** For a full production deploy (not a draft), run:
    ```bash
    netlify deploy --prod
    ```

---

## Troubleshooting

### Build Failures
*   **Check Logs:** Look at the "Deploy log" in Netlify to see the specific error.
*   **Environment Variables:** If your app uses `.env` files, make sure to add them in Netlify under **Site Settings > Build & deploy > Environment variables**.

### Page Not Found / 404
*   Ensure your `next.config.ts` is correct.
*   If using client-side routing, Netlify usually handles this with the Next.js plugin.

### "Command not found"
*   Ensure `package.json` has the correct `build` script.
