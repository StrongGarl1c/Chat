import './App.css';
import { useState, useEffect, useCallback } from 'react';
import Chatbox from './Chatbox';
import Contacts from './Contacts';
import Contact from './Contact';

function App() {
  const [contactList, setContactList] = useState([
    new Contact('Alice Freeman', [
      {
        message: 'You are the worst!',
        date: new Date('Jun 12 2017').toDateString(),
      },
    ]),
    new Contact('Josefina', [
      {
        message: 'We are loosing money! Quick!',
        date: new Date('Feb 18 2017').toDateString(),
      },
    ]),
    new Contact('Velaquez', [
      { message: 'hello', date: new Date('Feb 18 2017').toDateString() },
    ]),
  ]);
  const [activeContact, setActiveContact] = useState(contactList[0]);

  function addChatHistory(message) {
    setContactList((prevState) => {
      return prevState.map((item) =>
        item.name === activeContact.name
          ? {
              ...item,
              chatHistory: [
                ...item.chatHistory,
                { message, date: new Date().toDateString() },
              ],
            }
          : item,
      );
    });
  }

  const selectActiveContact = useCallback((contact) => {
    setActiveContact(contact);
  }, []);

  useEffect(() => {
    setActiveContact(
      contactList.find((item) => item.name === activeContact.name),
    );
  }, [contactList, activeContact]);

  return (
    <>
      <h2>Chats</h2>
      <Contacts
        selectActiveContact={selectActiveContact}
        contactList={contactList}
      />

      <Chatbox
        addChatHistory={addChatHistory}
        activeContact={activeContact}
        chatHistory={activeContact.chatHistory}
      />
    </>
  );
}

export default App;
