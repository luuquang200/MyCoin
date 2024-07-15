import { useState } from "react";
import axios from "axios";
import * as bip39 from "bip39";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ENDPOINTS } from "../config";

const CreateWallet = ({ onWalletCreated }) => {
  const [password, setPassword] = useState("");
  const [mnemonic, setMnemonic] = useState([]);
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [step, setStep] = useState(1);
  const [verificationWords, setVerificationWords] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [errors, setErrors] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [address, setAddress] = useState("");
  const [showPrivateKeyPopup, setShowPrivateKeyPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!password) return;

    try {
      const response = await axios.get(ENDPOINTS.GET_MNEMONIC_WORDS);
      const mnemonicArray = response.data.mnemonic.split(" ");
      setMnemonic(mnemonicArray);
      setShowMnemonic(true);
      setStep(2);
    } catch (error) {
      console.error("Error generating mnemonic:", error);
    }
  };

  const handleVerificationSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    for (let i = 0; i < verificationWords.length; i++) {
      const { index } = verificationWords[i];
      if (selectedWords[index] !== mnemonic[index]) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      handleCreateWallet();
    } else {
      setErrors("Incorrect words selected. Please try again.");
    }
  };

  const handleCreateWallet = async () => {
    setLoading(true);
    try {
      const response = await axios.post(ENDPOINTS.CREATE_WALLET, {
        password,
        mnemonic: mnemonic.join(" "),
      });
      setPrivateKey(response.data.privateKey);
      setAddress(response.data.address);
      setShowPrivateKeyPopup(true);
    } catch (error) {
      console.error("Error creating wallet:", error);
      setErrors("Error creating wallet. Please try again.");
    }
    setLoading(false);
  };

  const handleWordSelect = (index, word) => {
    const updatedSelectedWords = [...selectedWords];
    updatedSelectedWords[index] = word;
    setSelectedWords(updatedSelectedWords);
  };

  const generateVerificationWords = () => {
    const shuffledIndices = mnemonic.map((_, index) => index).sort(() => 0.5 - Math.random());
    const selectedIndices = shuffledIndices.slice(0, 4);

    const words = selectedIndices.map((index) => ({
      index,
      word: mnemonic[index],
      options: shuffleArray([mnemonic[index], ...getRandomWords(2)]),
    }));

    setVerificationWords(words);
  };

  const shuffleArray = (array) => {
    return array.sort(() => 0.5 - Math.random());
  };

  const getRandomWords = (count) => {
    const words = bip39.wordlists.english;
    let randomWords = [];
    while (randomWords.length < count) {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      if (!mnemonic.includes(randomWord)) {
        randomWords.push(randomWord);
      }
    }
    return randomWords;
  };

  const handleClosePopup = (address) => {
    setShowPrivateKeyPopup(false);
    onWalletCreated(address);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 text-gray-800">
      <ToastContainer />
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        {step === 1 && (
          <form onSubmit={handlePasswordSubmit}>
            <h2 className="mb-6 text-3xl font-semibold text-teal-600">Create Wallet</h2>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="w-full px-4 py-2 text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors text-lg font-medium">
              Generate Mnemonic
            </button>
          </form>
        )}
        {step === 2 && showMnemonic && (
          <div>
            <h2 className="mb-6 text-3xl font-semibold text-teal-600">Secret Recovery Phrase</h2>
            <p className="mb-6 text-gray-700 mt-6 p-4 bg-slate-200 rounded-lg text-justify">
              This is the recovery phrase for your wallet. You and you alone have access to it. 
              It can be used to restore your wallet. 
              Best practices for your recovery phrase 
              are to write it down on paper and store it somewhere secure. Resist temptation to 
              email it to yourself or screenshot it.
            </p>
            <ul className="mb-6 grid grid-cols-2 gap-x-4">
              {mnemonic.map((word, index) => (
                <li key={index} className="flex items-center mb-2">
                  <span className="mr-2 text-gray-700">{index + 1}.</span>
                  <span className="px-2 py-1 bg-gray-200 rounded">{word}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => {
                generateVerificationWords();
                setStep(3);
              }}
              className="w-full px-4 py-2 text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors text-lg font-medium"
            >
              Next
            </button>
          </div>
        )}
        {step === 3 && (
          <form onSubmit={handleVerificationSubmit}>
            <h2 className="mb-6 text-3xl font-semibold text-teal-600">Verify Recovery Phrase</h2>
            {verificationWords.map(({ index, options }) => (
              <div key={index} className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Select the word for position {index + 1}
                </label>
                <div className="flex space-x-2">
                  {options.map((option, i) => (
                    <div
                      key={i}
                      className={`flex-1 px-4 py-2 border rounded-lg cursor-pointer text-center ${
                        selectedWords[index] === option ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-800'
                      }`}
                      onClick={() => handleWordSelect(index, option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {errors && <p className="text-red-500">{errors}</p>}
            <button type="submit" className="w-full px-4 py-2 text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors text-lg font-medium">
              Verify
            </button>
          </form>
        )}
        {showPrivateKeyPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
                </div>
              ) : (
                <>
                  <h2 className="mb-4 text-xl font-semibold">Your Private Key</h2>
                  <p className="mb-4">Please store this private key securely. You will need it to access your wallet in the future.</p>
                  <div className="mb-4 p-4 bg-gray-100 rounded-lg">
                    <p className="break-all">{privateKey}</p>
                  </div>
                  <button
                    onClick={() => handleClosePopup(address)}
                    className="w-full px-4 py-2 text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    Close
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateWallet;
