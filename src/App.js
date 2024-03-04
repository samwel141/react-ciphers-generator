/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import "./App.css"
import { numbers, upperCaseLetters, lowerCaseLetters, specialCharacters } from './character'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { COPY_Fail, COPY_SUCCESS } from './message';
import ParticleAnimation from 'react-particle-animation'
import Particles from 'react-particle-animation';
import ParticleBackground from './Particles';

function App() {

  const [cipher, setCipher] = useState("")
  const [cipherLength, setCipherLength] = useState(26)
  const [includeUpperCase, setIncludeUpperCase] = useState(false)
  const [includeLowerCase, setIncludeLowerCase] = useState(false)
  const [includeNumbers, setIncludeNumbers] = useState(false)
  const [includeSymbols, setIncludeSymbols] = useState(false)
  const handleGenerateCipher = () => {
    if (!includeUpperCase && !includeLowerCase && !includeNumbers && !includeSymbols) {
      notify("To generate Cipher you must select atleast one checkbox", true)
    }
    else {
      let characterList = ""
      if (includeNumbers) {
        characterList = characterList + numbers
      }
      if (includeUpperCase) {
        characterList = characterList + upperCaseLetters
      }
      if (includeLowerCase) {
        characterList = characterList + lowerCaseLetters
      }
      if (includeSymbols) {
        characterList = characterList + specialCharacters
      }
      setCipher(createCipher(characterList))
      notify("Cipher is generated successfully", false)
    }


  }
  const createCipher = (characterList) => {
    let cipher = ""
    const characterListLength = characterList.length
    for (let i = 0; i < cipherLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength)
      cipher = cipher + characterList.charAt(characterIndex)
    }
    return cipher
  }
  const copyToClipboard = (cipher) => {

    navigator.clipboard.writeText(cipher)
  }
  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else {
      toast(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

  }
  const handleCopyCipher = (e) => {
    if (cipher === "") {
      notify(COPY_Fail, true)
    }
    else {
      copyToClipboard(cipher)
      notify(COPY_SUCCESS)
    }

  }


  return (
    <div className="App">
    <div className="container">
      <div className="generator">
        <h2 className="generator__header">
         Ciphers Generator
        </h2>
        <div className="generator__password">
          <h3 >{cipher}</h3>
          <button className="copy__btn">
            <i onClick={handleCopyCipher} className="far fa-clipboard"></i>
          </button>
        </div>
        <div className="form-group">
          <label htmlFor="password-strength">Password length</label>
          <input className="pw" defaultValue={cipherLength} onChange={(e) => setCipherLength(e.target.value)} type="number" id="password-stregth" name="password-strength" max="26" min="8" />
        </div>
        <div className="form-group">
          <label htmlFor="uppercase-letters">Add Uppercase Letters</label>
          <input checked={includeUpperCase} onChange={(e) => setIncludeUpperCase(e.target.checked)} type="checkbox" id="uppercase-letters" name="uppercase-letters" />
        </div>
        <div className="form-group">
          <label htmlFor="lowercase-letters">Add Lowercase Letters</label>
          <input checked={includeLowerCase} onChange={(e) => setIncludeLowerCase(e.target.checked)} type="checkbox" id="lowercase-letters" name="lowercase-letters" />
        </div>
        <div className="form-group">
          <label htmlFor="include-numbers">Include Numbers</label>
          <input checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} type="checkbox" id="include-numbers" name="include-numbers" />
        </div>
        <div className="form-group">
          <label htmlFor="include-symbols">Include Symbols</label>
          <input checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} type="checkbox" id="include-symbols" name="include-symbols" />
        </div>
        <button onClick={handleGenerateCipher} className="generator__btn">
          Generate Cipher
        </button>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  </div>
  );
}

export default App;
