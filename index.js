const express = require("express");
const tiny = require("tiny-json-http");

const client_id = process.env.OAUTH_CLIENT_ID;
const client_secret = process.env.OAUTH_CLIENT_SECRET;
const authUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=repo,user`;
const tokenUrl = "https://github.com/login/oauth/access_token";

const app = express();

// NetlifyCMS doesn't use this root page. It's only for dev purposes
app.get("/", (req, res) => {
  res.send(`<a href="${authUrl}">Login with Github</a>`);
});

// NetlifyCMS expects to land on a page at /auth.
app.get("/auth", (req, res) => res.redirect(authUrl));

app.get("/callback", async (req, res) => {
  const data = {
    code: req.query.code,
    client_id,
    client_secret
  };
  
  try {
    const { body } = await tiny.post({ 
      url: tokenUrl, 
      data, 
      headers: {
        // GitHub returns a string by default, ask for JSON to make the reponse easier to parse.
        "Accept": "application/json" 
      } 
    });
    
    const postMsgContent = {
      token: body.access_token,
      provider: "github"
    };
    
    // This is what talks to the NetlifyCMS page. Using window.postMessage we give it the
    // token details in a format it's expecting
    const script = `
    <script>
    (function() {
      function recieveMessage(e) {
        console.log("recieveMessage %o", e);
        
        // send message to main window with the app
        window.opener.postMessage(
          'authorization:github:success:${JSON.stringify(postMsgContent)}', 
          e.origin
        );
      }

      window.addEventListener("message", recieveMessage, false);
      window.opener.postMessage("authorizing:github", "*");
    })()
    </script>`;
    
    return res.send(script);
    
  } catch (err) {
    // If we hit an error we'll handle that here
    console.log(err);
    res.redirect("/?error=😡");
  }
});

app.listen(process.env.PORT);