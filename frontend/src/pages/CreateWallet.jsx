import { useState } from "react";
import axios from "axios";
import * as bip39 from "bip39";
import { ENDPOINTS } from "../config";

const CreateWallet = ({ onWalletCreated }) => {
  const [password, setPassword] = useState("");
  const [mnemonic, setMnemonic] = useState([]);
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [step, setStep] = useState(1);
  const [verificationWords, setVerificationWords] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [errors, setErrors] = useState("");

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
      // console.log("Correct words selected. Wallet created.");
    } else {
      setErrors("Incorrect words selected. Please try again.");
    }
  };

  const handleCreateWallet = async () => {
    try {
      const response = await axios.post(ENDPOINTS.CREATE_WALLET, {
        password,
        mnemonic: mnemonic.join(" "),
      });
      onWalletCreated(response.data.address);
    } catch (error) {
      console.error("Error creating wallet:", error);
      setErrors("Error creating wallet. Please try again.");
    }
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

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        {step === 1 && (
          <form onSubmit={handlePasswordSubmit}>
            <h2 className="mb-4 text-xl font-semibold">Create Wallet</h2>
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
            <button type="submit" className="w-full px-4 py-2 text-white bg-teal-600 rounded-lg">Generate Mnemonic</button>
          </form>
        )}
        {step === 2 && showMnemonic && (
          <div>
            <h2 className="mb-4 text-xl font-semibold">Secret Recovery Phrase</h2>
            <ul className="mb-4">
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
              className="w-full px-4 py-2 text-white bg-teal-600 rounded-lg"
            >
              Next
            </button>
          </div>
        )}
        {step === 3 && (
          <form onSubmit={handleVerificationSubmit}>
            <h2 className="mb-4 text-xl font-semibold">Verify Recovery Phrase</h2>
            {verificationWords.map(({ index, options }) => (
              <div key={index} className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Select the word for position {index + 1}
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={selectedWords[index] || ""}
                  onChange={(e) => handleWordSelect(index, e.target.value)}
                >
                  <option value="">Select a word</option>
                  {options.map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}
            {errors && <p className="text-red-500">{errors}</p>}
            <button type="submit" className="w-full px-4 py-2 text-white bg-teal-600 rounded-lg">
              Verify
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateWallet;
