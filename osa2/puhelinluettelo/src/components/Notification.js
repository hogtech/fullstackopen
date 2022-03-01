const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  let text = message;
  let position = text.search("Information");
  if (position !== -1) {
    return <div className="error">{message}</div>;
    alert("it does!");
  } else {
    return <div className="success">{message}</div>;
  }
};

export default Notification;
