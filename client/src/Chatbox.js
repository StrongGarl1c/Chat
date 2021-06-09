import { useState } from 'react';

function Chatbox({ addChatHistory, activeContact, chatHistory }) {
  const [message, setMessage] = useState('');

  function handleInput(e) {
    const input = e.target.value;
    setMessage(input);
  }

  function onSubmit(e) {
    e.preventDefault();
    addChatHistory(message);
    setMessage('');
  }

  return (
    <section>
      {activeContact.image}
      <div>{activeContact.name}</div>
      <hr />
      <div>
        {chatHistory.map((item, index) => {
          return (
            <p key={index}>
              {item.message} {item.date}
            </p>
          );
        })}
      </div>
      <form onSubmit={onSubmit}>
        <input
          value={message}
          placeholder="Type your message"
          onChange={handleInput}
          autoFocus
        />
        <button type="submit">{'=>'}</button>
      </form>
    </section>
  );
}

export default Chatbox;
