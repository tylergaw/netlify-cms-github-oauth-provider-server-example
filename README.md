# NetlifyCMS GitHub OAuth Provider Server Example

[https://glitch.com/edit/#!/netlify-cms-github-oauth-provider-example](https://glitch.com/edit/#!/netlify-cms-github-oauth-provider-example)

A working example of a custom GitHub OAuth Provider for NetlifyCMS.

This is the server side. The side that handles the GitHub OAuth handshake.

The client side is available on GitHub: [https://github.com/tylergaw/netlify-cms-github-oauth-provider-client-example](https://github.com/tylergaw/netlify-cms-github-oauth-provider-client-example)

## What You Need to Do

### 1. Remix this Glitch

You'll need your [own copy](https://glitch.com/edit/#!/netlify-cms-github-oauth-provider-example).

### 2. Create a GitHub OAuth App

On GitHub, go to Settings > Developer Settings > OAuth apps > New OAuth app. Or use this [direct link](https://github.com/settings/applications/new).

Complete the form using the following values.

**Application name**: Anything you want to call it. This won't effect functionality.

**Homepage URL**: This *must* be the URL to your remix of this Glitch. Go to Show > In a New Window and grab the URL from there. You'll also use this in your NetlifyCMS config.yml

**Application description**: Anything you want. This won't effect functionality.

**Authorization callback URL**: This *must* be the URL to your remix of this Glitch followed by `/callback`. If you need a path other than `callback`, you can change that in `index.js`.

![A Screenshot of the New OAuth app form on github.com](https://cdn.glitch.com/31f07835-3db8-41b9-aa39-d4ef6b7dd9d0%2Fgithub-oauth-app-screenshot.png?v=1565456986343)

### 3. Add Your OAuth App's Client ID and Secret to .env

In this Glitch, you'll find a `.env` file. In it you'll see `OAUTH_CLIENT_ID` and `OAUTH_CLIENT_SECRET` both without values.

In GitHub, go to the GitHub OAuth App you created in step 2. Locate the Client ID and Client Secret. Set those to the `OAUTH_CLIENT_ID` and `OAUTH_CLIENT_SECRET` in `.evn`

![A screenshot of a GitHub OAuth Provider App client id and secret section with redacted values](https://cdn.glitch.com/31f07835-3db8-41b9-aa39-d4ef6b7dd9d0%2Fgithub-oauth-client-and-secret.png?v=1565457996910)