"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import axios from "axios";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);

  // TEST
  type Option = {
    value: string;
    label: string;
  };

  const options: Option[] = [
    { value: "c", label: "City Of Sydney" },
    { value: "u", label: "UTS" },
    { value: "b", label: "BHP" },
  ];
  const options2: Option[] = [
    { label: "ChatGPT Model 3.5--turbo", value: "chatgpt" },
    { label: "Blazon", value: "blazon" },
    { label: "Immutable", value: "immutable" },
    { label: "Idk 2", value: "idk2" },
  ];

  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [selectedOption2, setSelectedOption2] = useState<Option | null>(null);

  const handleOptionSelect = (option: Option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };
  const handleOptionSelect2 = (option: Option) => {
    setSelectedOption2(option);
    setIsDropdownOpen2(false);
  };
  // END
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [chatLog, setChatLog] = useState();
  // Form handler
  const formSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    setIsLoading(true);

    sendMessage(inputValue);

    setInputValue("");
  };
  // This function calls the python backend
  const sendMessage = (message: String) => {
    console.log("hi");
    axios
      .post("http://127.0.0.1:8080/generate", {
        prompt: message,
        option: selectedOption!.value,
      })
      .then((response) => {
        console.log(response);
        setIsLoading(false);
        setChatLog(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <main>
      <div className="container mx-auto px-4 ">
        <p className="text-center text-2xl m-4 mb-2 font-bold">
          Choose your topic and ask a question in the prompt.
        </p>
        <p className="text-center text-base px-4 mb-4">
          First, choose your topic and an AI model. Ask a question in the prompt
          on your left. <br />
          The response will be available on the right.
        </p>
        {/* <div className="mt-4 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div> */}

        <div className="flex flex-row">
          <div className="basis-1/4">
            {/* Accordion */}
            <div className="w-full flex justify-center">
              <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className="w-full m-2 text-white bg-[#669bbc] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-left inline-flex items-center justify-between dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="flex-1 mr-2">
                  {selectedOption ? selectedOption.label : "Select your topic"}
                </span>
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              {/* Dropdown menu */}
              <div
                id="dropdown"
                className={`z-10 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 w-1/5 ${
                  isDropdownOpen ? "block" : "hidden"
                }`}
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                >
                  {options.map((option) => (
                    <li key={option.value}>
                      <button
                        type="button"
                        onClick={() => handleOptionSelect(option)}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left"
                      >
                        {option.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* End of Accordion */}
            {/* Accordion 2 */}
            <div className="w-full flex justify-center">
              <button
                id="dropdownDefaultButton2"
                data-dropdown-toggle="dropdown2"
                className="w-full m-2 text-white bg-[#669bbc] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-left inline-flex items-center justify-between dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
                onClick={() => setIsDropdownOpen2(!isDropdownOpen2)}
              >
                <span className="flex-1 mr-2">
                  {selectedOption2
                    ? selectedOption2.label
                    : "Select your AI model"}
                </span>
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              {/* Dropdown menu */}
              <div
                id="dropdown2"
                className={`z-10 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 w-1/5 ${
                  isDropdownOpen2 ? "block" : "hidden"
                }`}
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton2"
                >
                  {options2.map((option) => (
                    <li key={option.value}>
                      <button
                        type="button"
                        onClick={() => handleOptionSelect2(option)}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left"
                      >
                        {option.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* End of Accordion */}
            <form className="m-2" onSubmit={formSubmit}>
              <div className="flex flex-col justify-center">
                <textarea
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  rows={6}
                  placeholder="Enter your question"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      formSubmit(e);
                    }
                  }}
                />
                <button
                  type="submit"
                  className=" m-6 mx-10 text-white bg-[#669bbc] hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          {/* Response */}
          <div className="basis-3/4 mx-4 my-2 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="w-5 h-5 mr-3 -ml-1 text-blue-500 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM12 20a8 8 0 01-8-8H0c0 6.627 5.373 12 12 12v-4zm5-5.291A7.962 7.962 0 0116 12h-4c0 3.042 1.135 5.824 3 7.938l1-2.647z"
                  />
                </svg>
                <span>Loading...</span>
              </div>
            ) : (
              <p className="mb-3 font-normal text-lg text-gray-700 dark:text-gray-400">
                {chatLog ? (
                  chatLog
                ) : (
                  <span className="text-gray-400 opacity-50">
                    The response will be here...
                  </span>
                )}
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
