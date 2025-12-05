# Deploying SmartResume Pro to Netlify

This guide outlines how to deploy the **SmartResume Pro** application to Netlify.

## Prerequisites
*   A [Netlify](https://www.netlify.com/) account.
*   A GitHub, GitLab, or Bitbucket account (recommended for continuous deployment) OR the Netlify CLI installed locally.

## Method 1: Continuous Deployment (Recommended)
This method automatically redeploys your site whenever you push changes to your git repository.

1.  **Push to Git**: Ensure your project is pushed to a repository on GitHub, GitLab, or Bitbucket.
2.  **Log in to Netlify**: Go to [app.netlify.com](https://app.netlify.com).
3.  **Add New Site**: Click **"Add new site"** > **"Import an existing project"**.
4.  **Connect Provider**: Select your git provider (e.g., GitHub) and authorize Netlify.
5.  **Select Repository**: Choose the `Resume-Builder` repository.
6.  **Configure Build**: Netlify should automatically detect the settings for Next.js:
    *   **Build command**: `npm run build`
    *   **Publish directory**: `.next` (Netlify usually handles this automatically with the Next.js plugin)
    *   **Runtime**: **Next.js** (Netlify typically auto-installs `@netlify/plugin-nextjs`).

7.  **Environment Variables**: If you have any environment variables (e.g., API keys), add them under "Advanced" settings.
    *   *Note: This project currently does not rely on external API keys.*

8.  **Deploy**: Click **"Deploy site"**.

## Method 2: Netlify CLI (Manual Deploy)
If you don't want to connect a git repository, you can deploy from your command line.

1.  **Install CLI**:
    ```bash
    npm install netlify-cli -g
    ```

2.  **Build Locally**:
    ```bash
    npm run build
    ```

3.  **Deploy**:
    ```bash
    netlify deploy
    # Follow the prompts.
    # For publish directory, ensure it picks up the Next.js output (usually '.next' or handled by the plugin).
    ```

4.  **Production Deploy**:
    ```bash
    netlify deploy --prod
    ```

## Troubleshooting
*   **Build Failures**: Check the "Deploy Log" in Netlify. Common issues include missing dependencies or strict type errors (which we have recently fixed!).
*   **Page Not Found**: Ensure `next.config.ts` is correctly configured. Netlify's Next.js Runtime v5 generally requires zero config.
