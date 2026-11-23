export const healthPage=`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>MentorLagbe API</title>
  <style>
    :root{color-scheme:dark;--ink:#effbf8;--muted:#a9c5bf;--teal:#59d3bd;--deep:#071916;--card:#102b27;--line:#245149}
    *{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;overflow:hidden;background:radial-gradient(circle at 18% 20%,#164a40 0,transparent 34%),radial-gradient(circle at 82% 78%,#173c53 0,transparent 30%),var(--deep);color:var(--ink);font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif}
    body:before,body:after{content:"";position:fixed;width:220px;height:220px;border:1px solid #70e7d322;border-radius:50%;animation:float 7s ease-in-out infinite}body:before{top:-90px;right:-70px}body:after{left:-90px;bottom:-100px;animation-delay:-3s}
    .card{position:relative;width:min(520px,calc(100% - 32px));padding:32px 34px;border:1px solid var(--line);border-radius:22px;background:linear-gradient(145deg,#12332edb,#0d2420e8);box-shadow:0 28px 70px #0007;backdrop-filter:blur(18px)}
    .brand{display:flex;align-items:center;gap:10px;font-size:17px;font-weight:850}.logo{display:grid;place-items:center;width:36px;height:36px;border-radius:11px;background:var(--teal);color:#07201c;box-shadow:0 8px 24px #59d3bd35}.logo svg{width:21px}
    .status{display:inline-flex;align-items:center;gap:8px;margin-top:27px;padding:7px 11px;border:1px solid #5ce0c757;border-radius:999px;background:#183f38;color:#8ce8d7;font-size:10px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}.dot{width:7px;height:7px;border-radius:50%;background:#65e6ce;box-shadow:0 0 0 0 #65e6ce88;animation:pulse 1.8s infinite}
    h1{max-width:430px;margin:15px 0 10px;font-family:Georgia,serif;font-size:clamp(34px,5vw,48px);line-height:1.02;letter-spacing:-.045em}h1 span{color:var(--teal)}p{max-width:430px;margin:0;color:var(--muted);font-size:14px;line-height:1.6}
    .loader{height:4px;margin:24px 0 20px;overflow:hidden;border-radius:99px;background:#21443e}.loader:after{content:"";display:block;width:45%;height:100%;border-radius:inherit;background:linear-gradient(90deg,transparent,var(--teal),transparent);animation:load 1.8s ease-in-out infinite}
    .foot{display:flex;align-items:center;justify-content:space-between;gap:14px;color:#789e97;font-size:11px}.button{display:inline-flex;padding:9px 13px;border-radius:9px;background:var(--teal);color:#08221e;text-decoration:none;font-size:12px;font-weight:800}
    @keyframes pulse{70%{box-shadow:0 0 0 10px transparent}}@keyframes load{from{transform:translateX(-110%)}to{transform:translateX(245%)}}@keyframes float{50%{transform:translateY(22px) scale(1.05)}}
    @media(max-width:560px){.card{padding:25px 22px}.status{margin-top:22px}.foot{align-items:flex-start;flex-direction:column}}
  </style>
</head>
<body>
  <main class="card">
    <div class="brand"><span class="logo"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m2 10 10-5 10 5-10 5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/></svg></span>MentorLagbe</div>
    <div class="status"><span class="dot"></span>All systems operational</div>
    <h1>The API is <span>online.</span></h1>
    <p>MentorLagbe is ready to connect learners with the right mentors. Authentication, tuition, application, and payment services are running normally.</p>
    <div class="loader" aria-label="Service heartbeat"></div>
    <div class="foot"><span>mentorlagbe-api · Production</span><a class="button" href="https://mentorlagbe.vercel.app">Visit website</a></div>
  </main>
</body>
</html>`;
