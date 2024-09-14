import cors from "cors";
import "dotenv/config";
import express from "express";
import nodemailer from "nodemailer";

const port = 6996;
const app = express();

app.use(cors({
    origin: '*',
    methods: ['POST'],
    allowedHeaders: ['Content-Type']
  }));

// app.use(cors({ options: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// console.log(process.env.my_username); // check username
// console.log(process.env.my_password); // check password


app.post("/test", (req, res) => console.log("hello"));

app.post("/sendEmail", (req, res) => {
    const { name, email, message } = req.body;
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.my_username,
            pass: process.env.my_password,
        },
    });

    let msg = {
        from: process.env.my_username,
        to: process.env.my_username,
        subject: "hello",
        text: `${name} with email ${email} has a message for you - ${message}`,
    };

    transporter
        .sendMail(msg)
        .then((info) => {
            console.log("Email Sent: " + info.response);
            res.status(200).send("Email sent successfully");
        })
        .catch((err) => {console.log(err);});
});

app.listen(port, () => console.log("Server has started at port = " + port));
