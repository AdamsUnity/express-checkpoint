const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 4000;

//middleware function to check day of the week and time of the day
const workingDaysMiddleware = (req, res, next) => {
  const currentDate = new Date();
  const dayOfWeek = currentDate.getDay();
  console.log(dayOfWeek);
  const currentHour = currentDate.getHours();
  console.log(currentHour);

  // Check if it's a working day (Monday to Friday)
  const isworkingTime =
    dayOfWeek >= 1 && dayOfWeek <= 5 && currentHour >= 9 && currentHour < 17;
  if (!isworkingTime) {
    return res.send(
      "This site is only available during working days (Monday to Friday between 0900hrs to 1700hrs)."
    );
  }
  next(); // Continue with the route
};
app.use(workingDaysMiddleware);
app.use(express.static("public"));

//  EJS Set up
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
console.log(__dirname);

// Routes
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/services", (req, res) => {
  res.render("services");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

//  server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
