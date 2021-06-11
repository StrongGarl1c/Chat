import { useState } from 'react';

function Chatbox({ sendMessage, activeContact }) {
  const [message, setMessage] = useState('');

  function handleInput(e) {
    const input = e.target.value;
    setMessage(input);
  }

  function onSubmit(e) {
    e.preventDefault();
    sendMessage(message);
    setMessage('');
  }

  return (
    <section>
      {typeof activeContact == 'string' ? (
        activeContact
      ) : (
        <>
          {activeContact.image}
          <div>{activeContact.name}</div>
          <hr />
          <div>
            {activeContact.chatHistory.map((item, index) => {
              return (
                <p
                  key={index}
                  className={
                    item.from === 'You'
                      ? 'chatbox__message__outcoming'
                      : 'chatbox__message__incoming'
                  }
                >
                  {item.message} {item.date}
                </p>
              );
            })}
          </div>
        </>
      )}
      {typeof activeContact !== 'string' ? (
        <form onSubmit={onSubmit}>
          <input
            value={message}
            placeholder="Type your message"
            onChange={handleInput}
            autoFocus
          />
          <button type="submit">{'=>'}</button>
        </form>
      ) : null}
    </section>
  );
}

export default Chatbox;
