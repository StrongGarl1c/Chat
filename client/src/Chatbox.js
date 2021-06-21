import { useState, useEffect, useRef } from 'react';
import { IoSendOutline } from 'react-icons/io5';
import { AiOutlineCheckCircle, AiOutlineArrowUp } from 'react-icons/ai';

function Chatbox({ sendMessage, activeContact }) {
  const [message, setMessage] = useState('');
  const chatEnd = useRef(null);

  useEffect(() => {
    function scrollToBottom() {
      chatEnd.current?.scrollIntoView();
    }
    scrollToBottom();
  }, [activeContact]);

  function handleInput(e) {
    const input = e.target.value;
    setMessage(input);
  }

  function onSubmit(e) {
    e.preventDefault();
    if (message) {
      sendMessage(message);
      setMessage('');
    } else {
      return;
    }
  }

  return (
    <div className="chatbox">
      {typeof activeContact !== 'object' ? (
        <p className="chatbox__placeholder">{activeContact}</p>
      ) : (
        <>
          <div className="chatbox__active__contact">
            <div className="contact__wrapper__image">
              {activeContact.image}
              <div className="contact__wrapper__image__icon">
                <AiOutlineCheckCircle />
              </div>
            </div>
            <h4>{activeContact.name}</h4>
            <div
              className="chatbox__back_arrow"
              onClick={() => window.document.body.scrollIntoView()}
            >
              <AiOutlineArrowUp />
            </div>
          </div>
          <div className="chatbox__chat">
            {activeContact.chatHistory.map((item, index) => {
              return (
                <div key={index} className="chatbox_message_wrapper">
                  <div
                    className={
                      item.from === 'You'
                        ? 'chatbox__message__outcoming'
                        : 'chatbox__message__incoming'
                    }
                  >
                    {item.from !== 'You' ? (
                      <div>{activeContact.image}</div>
                    ) : null}
                    <p
                      className={
                        item.from === 'You'
                          ? 'chatbox__message__outcoming__text'
                          : 'chatbox__message__incoming__text'
                      }
                    >
                      {item.message}
                    </p>
                  </div>
                  <p
                    className={
                      item.from === 'You'
                        ? 'chatbox__message__outcoming__date'
                        : 'chatbox__message__incoming__date'
                    }
                  >
                    {new Date(item.date).toLocaleString()}
                  </p>
                </div>
              );
            })}
          </div>
        </>
      )}
      {typeof activeContact !== 'string' ? (
        <>
          <div ref={chatEnd}></div>
          <form onSubmit={onSubmit}>
            <input
              value={message}
              placeholder="Type your message"
              onChange={handleInput}
              autoFocus
            />
            <button type="submit">
              <IoSendOutline />
            </button>
          </form>
        </>
      ) : null}
    </div>
  );
}

export default Chatbox;
