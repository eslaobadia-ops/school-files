const jsonServer = require("json-server");
const auth = require("json-server-auth");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = jsonServer.create();
const router = jsonServer.router("db.json");

app.use(cors());
app.use(jsonServer.defaults());
app.use(jsonServer.bodyParser);

app.db = router.db;

const ADMIN_ROUTES = ["/users", "/students", "/results", "/announcements"];

function verifyAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ error: "No token provided." });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "secret");
    if (decoded.role !== "admin") {
      return res.status(403).json({ error: "Admin access only." });
    }
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token." });
  }
}

app.use((req, res, next) => {
  if (
    ["POST", "PUT", "PATCH", "DELETE"].includes(req.method) &&
    ADMIN_ROUTES.some((path) => req.url.startsWith(path))
  ) {
    return verifyAdmin(req, res, next);
  }
  next();
});

app.use(auth);
app.use(router);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Backend running on port " + PORT);
});
