const express = require("express");

const app = express();

const PORT = process.env.PORT || 5000;

//we can use also regex in route
// app.use(/.*fly$/, (req,res) => {
//     res.send("only ac will work because b is optional")
// })

// app.use("/user", (req,res) => {
//     res.send("HAHAHHAHAHAHAHA")
// })

// app.use("/ab*c", (req,res) => {
//     res.send("only ac will work because b is optional")
// })

// app.use("/ab+c", (req,res) => {
//     res.send("only ac will work because b is optional")
// })



app.get(("/user"), (req,res ) => {
    console.log(req.query);
    res.send({firstname: "Ramit", lastname: "Sonar"})
})

//dynamic routing
app.get(("/user/:userId/:name/:password"), (req,res ) => {
    console.log(req.params);
    res.send({firstname: "Ramit", lastname: "Sonar"})
})


// app.post(("/user"), (req,res ) => {
//     res.send("data save sucessfully in database")
// })

// app.delete(("/user"), (req,res ) => {
//     res.send("data deleted sucessfully")
// })


// app.use("/test",(req,res) => {
//     res.send("Hello from the server!")
// })//request handlers 

// app.use("/hello/h2",(req,res) => {
//     res.send("Hello Hello Hello from h2!")
// })

// app.use("/hello",(req,res) => {
//     res.send("Hello Hello Hello!")
// })

// app.use("/",(req,res) => {
//     res.send("Hello From the Dashboard")
// })

app.listen(PORT, () => {
    console.log(`Server is successfully listening on port ${PORT}`);
})//listen for the incoming request 