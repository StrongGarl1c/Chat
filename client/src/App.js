import './App.css';
import { useState, useEffect, useCallback } from 'react';
import Chatbox from './Chatbox';
import Contacts from './Contacts';
import Contact from './Contact';

function App() {
  const [contactList, setContactList] = useState([]);
  const [activeContact, setActiveContact] = useState(
    'Select a chat to start messaging',
  );

  useEffect(() => {
    async function getContacts() {
      try {
        const res = await fetch('http://localhost:5000/api');
        const data = await res.json();
        const list = data.map(
          (contact) =>
            new Contact(contact._id, contact.name, contact.chatHistory),
        );
        setContactList(list);
      } catch (error) {
        console.error(error);
      }
    }
    getContacts();
  }, []);

  function sendMessage(message) {
    function addMessage(newMessage, fromWhom) {
      setContactList((prevState) => {
        return prevState.map((item) =>
          item.id === activeContact.id
            ? {
                ...item,
                chatHistory: [
                  ...item.chatHistory,
                  {
                    message: newMessage,
                    date: new Date().toDateString(),
                    from: fromWhom,
                  },
                ],
              }
            : item,
        );
      });
    }
    addMessage(message, 'You');

    async function sendMessageToDatabase() {
      try {
        const res = await fetch('http://localhost:5000/api', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: activeContact.id,
            newMessage: {
              message,
              date: new Date().toDateString(),
              from: activeContact.name,
            },
          }),
        });
        const msg = await res.json();
        setTimeout(() => {
          addMessage(msg, activeContact.name);
        }, Math.round(Math.random() * (15 - 10) + 10) * 1000);
      } catch (error) {
        console.error(error);
      }
    }
    sendMessageToDatabase();
  }

  const selectActiveContact = useCallback((contact) => {
    setActiveContact(contact);
  }, []);

  useEffect(() => {
    function getActiveContact() {
      const user = contactList.find((item) => item.id === activeContact.id);
      if (user) {
        setActiveContact(user);
      }
    }
    getActiveContact();
  }, [contactList, activeContact]);

  return (
    <>
      <h2>Chats</h2>
      <Contacts
        selectActiveContact={selectActiveContact}
        contactList={contactList}
      />
      <Chatbox sendMessage={sendMessage} activeContact={activeContact} />
    </>
  );
}

export default App;
