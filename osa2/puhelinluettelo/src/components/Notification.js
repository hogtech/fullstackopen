const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  let text = message;
  let position = text.search("Information");
  let position2 = text.search("Error");
  if (position !== -1 || position2 !== -1) {
    return <div className="error">{message}</div>;
  } else {
    return <div className="success">{message}</div>;
  }
};

export default Notification;
