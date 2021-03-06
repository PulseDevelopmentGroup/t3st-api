declare var WEBHOOK_URL: string;

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request: Request): Promise<Response> {
  const { pathname } = new URL(request.url);

  switch (pathname) {
    case "/api/apply":
      const formData = await request.formData();

      const email = formData.get("email");
      const user = formData.get("ubisoftAccount");
      const message = `A new nerd thinks he's good enough to join T3ST
      
Email: ${email}
Username: ${user}`;

      await fetch(WEBHOOK_URL, {
        method: "POST",
        body: JSON.stringify({
          content: message,
        }),
        headers: {
          "content-type": "application/json",
        },
      });

      return Response.redirect("https://t3st.games");
    default:
      return Response.redirect("https://t3st.games");
  }
}
