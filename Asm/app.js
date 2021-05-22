var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");

var indexRouter = require("./routes/account/login");
var usersRouter = require("./routes/users");
var productRouter = require("./routes/product/product");
var newProductRouter = require("./routes/product/new-product");
var categoryRouter = require("./routes/category/category");
var registerRouter = require("./routes/account/register");
var editProductRouter = require("./routes/product/edit-product");
var newCategoryRouter = require("./routes/category/new-category");
var editCategoryRouter = require("./routes/category/edit-category");
var orderRouter = require("./routes/product/order");
var apiRouter = require("./routes/api");
var mongoose = require("mongoose");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected!"))
  .catch((err) => console.log("DB error", err));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.JWT_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productRouter);
app.use("/new-product", newProductRouter);
app.use("/category", categoryRouter);
app.use("/edit-product", editProductRouter);
app.use("/register", registerRouter);
app.use("/new-category", newCategoryRouter);
app.use("/edit-category", editCategoryRouter);
app.use("/api", apiRouter);
app.use("/order", orderRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
