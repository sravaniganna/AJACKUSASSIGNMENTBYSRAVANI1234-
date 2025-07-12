const express = require("express");
const path = require("path");
const cons = require("consolidate");

const app = express();
const PORT = 3000;

// Use Freemarker with consolidate
app.engine("ftl", cons.freemarker);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ftl");

// Static files
app.use("/public", express.static(path.join(__dirname, "public")));

// Render dashboard with JSON
app.get("/", (req, res) => {
  const employees = require("./public/data/employees.json");
  res.render("dashboard.ftl", { employees });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
