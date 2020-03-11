const express = require("express");
const path = require("path");
const PORT = 3000;

const app = express();
//write code below
//set up the express app to handle data parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const reservations = [
  {
    routeName: "katie",
    name: "Katie",
    email: "kcbobbe@gmail.com",
    phoneNumber: "8088088888",
    uniqueId: "10"
  },
  {
    routeName: "bobbe",
    name: "Bobbe",
    email: "bobbe@gmail.com",
    phoneNumber: "8888888",
    uniqueId: "20"
  },
  {
    routeName: "bobbe2",
    name: "Mary",
    email: "bobbe@gmail.com",
    phoneNumber: "8888888",
    uniqueId: "23"
  },
  {
    routeName: "Joe",
    name: "Mark",
    email: "bobbe@.com",
    phoneNumber: "8888888",
    uniqueId: "20"
  }
]

const waitList = []

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/home.html"))
})

app.get("/tables", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/view.html"))
})

app.get("/reserve", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/make.html"))
})

app.get("/api/reservations", (req, res) => {
  return res.json(reservations)
})

app.get("/api/waitlist", (req, res) => {
  return res.json(waitList)
})

app.get("/api/reservations/:reservation", (req, res) => {
  const reservation = req.params.reservation;

  console.log(reservation)

  let found;

  reservations.forEach(reserv => {
    // console.log(char)
    if (reservation === reserv.routeName) {
      found = reserv;
      return res.json(reserv)
    }
  })
  return res.json(false);
  // res.end();
})

app.post("/api/reservations" , (req, res) => {
  const newReservation = req.body;
  newReservation.routeName = req.body.name.split(" ").join("").toLowerCase();
  console.log(newReservation);
  if (reservations.length < 5){
    reservations.push(newReservation);
    res.json(newReservation);
  } else {
    waitList.push(newReservation);
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening port: ${PORT}`)
})