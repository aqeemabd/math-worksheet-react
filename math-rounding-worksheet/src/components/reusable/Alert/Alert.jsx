import React, { useEffect, useState } from "react";
import "./Alert.css";

const Alert = ({ message, type = "info", onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 500);
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`alert ${visible ? "show" : "hide"} ${type}`}>
      {message}
    </div>
  );
};

export default Alert;
