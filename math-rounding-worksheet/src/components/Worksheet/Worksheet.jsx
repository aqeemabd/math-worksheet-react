import React, { useState } from "react";
import "./Worksheet.css";
import { data } from "../../assets/data";
import db from "../../config/connection.js";

import Alert from "../reusable/Alert/Alert.jsx";

const Worksheet = () => {
  const apiKey = db.API_URL;

  let [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index].question);
  const [selectedOption, setSelectedOption] = useState(null);
  const [optionValid, setOptionValid] = useState(false);
  let [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [username, setUsername] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [alert, setAlert] = useState(null);
  const [isLast, setIsLast] = useState(false);

  const showAlert = (message, type) => {
    setAlert({ message, type });
  };

  const handleInputChange = (e) => {
    const name = e.target.value;
    setUsername(name);
    setIsValid(name.trim() !== "");
  };

  const startQuiz = () => {
    if (isValid) {
      setIsStarted(true);
    }
  };

  const nextBtn = () => {
    if (index < data.length - 1) {
      if (selectedOption === data[index].answer) {
        setScore(++score);
      }

      setIndex(++index);
      setQuestion(data[index].question);
      setSelectedOption(null);
      setOptionValid(false);

      if (index === data.length - 1) {
        setIsLast(true);
      }
    } else {
      submit(true);
    }
  };

  const resetBtn = () => {
    setScore(0);
    setIndex(0);
    setQuestion(data[0].question);
    setSelectedOption(null);
    setIsLast(false);
  };

  const againBtn = () => {
    setScore(0);
    setIndex(0);
    setQuestion(data[0].question);
    setSelectedOption(null);
    setIsStarted(false);
    setIsCompleted(false);
    setUsername("");
    setIsValid(false);
    setOptionValid(false);
    setIsLast(false);
  };

  const submit = async (flag) => {
    const postData = {
      username: username,
      score: score,
    };

    try {
      const res = await fetch(`${apiKey}/api/ranking-add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      showAlert(
        "Test score logged! Check the dashboard for details.",
        "success"
      );

      setIsCompleted(flag);
    } catch (error) {
      setIsCompleted(flag);
      showAlert("Test score not logged!", "error");
    }
  };

  return (
    <>
      {alert && <Alert {...alert} onClose={() => setAlert(null)} />}
      <h1 className="worksheet_title">Math Rounding Worksheet</h1>
      <div className="worksheet_wrapper">
        {!isStarted ? (
          <div className="start_wrapper">
            <div>
              <p>Insert your name:</p>
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={handleInputChange}
              />
            </div>
            <button
              style={{
                margin: "20px",
                backgroundColor: isValid ? "#4CAF50" : "red",
                cursor: isValid ? "pointer" : "not-allowed",
              }}
              onClick={startQuiz}
            >
              Start
            </button>
          </div>
        ) : !isCompleted ? (
          <div className="question_wrapper">
            <div className="question_header">
              <p>
                {index + 1} of {data.length} Question
              </p>
            </div>

            <div className="question_body">
              <p>
                {index + 1}. {question}
              </p>
              {data[index].options.map((option, index) => {
                return (
                  <div key={index}>
                    <input
                      type="radio"
                      id={option}
                      name="option"
                      value={option}
                      checked={selectedOption == option}
                      onChange={() => {
                        setSelectedOption(option);
                        setOptionValid(true);
                      }}
                    />
                    <label htmlFor={option}>{option}</label>
                  </div>
                );
              })}
              <div className="question_btn_wrapper">
                <button
                  style={{
                    backgroundColor: optionValid ? "#4CAF50" : "#000",
                    cursor: optionValid ? "pointer" : "not-allowed",
                  }}
                  className="nextBtn"
                  onClick={nextBtn}
                  disabled={!optionValid}
                >
                  {isLast ? "Submit" : "Next"}
                </button>
                <button className="resetBtn" onClick={resetBtn}>
                  Reset
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="question_score">
            <p>Your score is</p>
            <h5 className="score">
              {score} / {data.length}
            </h5>
            {score < 6 ? (
              <p className="score_message">
                Nice try! You're on your way to mastering number rounding, but
                there's still room for improvement. Keep practicing, stay
                focused, and challenge yourself to get a higher score. Every
                attempt brings you closer to perfection. Give it another
                shot—you've got this!
              </p>
            ) : (
              <p className="score_message">
                Congratulations, Math Master! You've unlocked the secrets of
                number rounding. Your skills in precision and accuracy are truly
                impressive. Now, go forth and tackle any rounding challenge with
                confidence!
              </p>
            )}
            <div className="resultBtn_wrapper">
              <a className="dashboardBtn" href="/ranking">
                Dashboard
              </a>
              <button onClick={againBtn}>Play Again</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Worksheet;
