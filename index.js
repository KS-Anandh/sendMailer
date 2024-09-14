import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.APP_USERNAME, 
    pass: process.env.APP_PASSWORD
  },
});
app.post('/send-otp', async (req, res) => {
  const { email, otp } = req.body;
  const mailOptions = {
    from: process.env.APP_USERNAME,
    to: email,
    subject: 'Verification code from IOTEX',
    text: `Your OTP code is : ${otp}`
  };
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('OTP sent successfully');
  } catch (error) {
    res.status(500).send('Error sending email');
  }
});
app.get('/',(req,res)=>{
  try{res.send("Api running..");}
  catch{}
})
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
