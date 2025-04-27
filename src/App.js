import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('')
  const submitHandler = (e)=>{
    e.preventDefault();
    axios.post('https://gemini-app-orpin.vercel.app/getResponse',{
      question:question
    })
    .then(res=>{
      setResponse(res.data.response)
      setQuestion('');
    })
    .catch(err=>{
      console.log(err)
    })
  }

  const speakHandler = ()=>{
    const sound=new SpeechSynthesisUtterance(response);
    window.speechSynthesis.speak(sound);
  }
  const stopHandler = ()=>{
    window.speechSynthesis.cancel();
  }


  return (
    <div className="App">
      <div className='user'>
        <div className='profilepic'>
            <img className='pic' alt='profile pic' src={require('../src/assets/user.png')}/>
        </div>
        <p className='label'>Question</p>
        <textarea value={question} onChange={(e)=>{setQuestion(e.target.value)}}/>
        <button  onClick={submitHandler}>Send</button>
      </div>
      <div className='gemini'>
      <div className='profilepic'>
            <img className='pic' alt='profile pic' src={require('../src/assets/gemini.png')}/>
        </div>
        <p className='label'>Gemini</p>
        <textarea value={response}/>
        <div className='speak'>
            <button className='btn1' onClick={speakHandler}>Speak</button>
            <button className='btn2' onClick={stopHandler}>Stop</button>
        </div>
      </div>
    </div>
  );
}

export default App;
