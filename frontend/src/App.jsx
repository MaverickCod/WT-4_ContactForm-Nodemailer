import axios from "axios"
import { useState } from 'react'
import './App.css'
function App() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [dataSaved, setDataSaved] = useState("")
  
  async function handleSubmit(e) {
    e.preventDefault();
    try{const response = await axios.post("https://nodemailer-backend-4x97.onrender.com:6996/sendEmail", {
      name, 
      email, 
      message 
    });
    if (response.status === 200 && response.statusText === "ok"){
      setDataSaved(!dataSaved);
    }}
    catch(e){
      console.log(e);
    }
  }


  return (
    <>
    {dataSaved ? <p className="Success">Email has been sent</p> : " "}
      <h2>Contact Form</h2>
      <form action="" onSubmit={handleSubmit}>
        <input 
        type="text" 
        placeholder='Enter your Name' 
        value={name}
        onChange={(e) => setName(e.target.value)}
         />
        <input 
        type="text" 
        placeholder='Enter your email' 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
         name="" 
         value={message}
         placeholder='Enter your Message'
         onChange={(e) => setMessage(e.target.value)}
         ></textarea>

         <button type="submit">Send Email</button>
      </form>
    </>
  )
}

export default App
