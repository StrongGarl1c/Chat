import { useState } from 'react';

function Contactsbox({ selectActiveContact, contactList, clearNewMessages }) {
  const [search, setSearch] = useState('');

  function handleSearchInput(e) {
    const input = e.target.value;
    setSearch(input);
    console.log(
      contactList.filter((contact) =>
        contact.name.toLowerCase().includes(search.toLocaleLowerCase()),
      ),
    );
  }

  return (
    <>
      <input value={search} placeholder="Search" onChange={handleSearchInput} />
      <button type="reset" onClick={() => setSearch('')}>
        X
      </button>
      <h2>Chats</h2>
      {search.length > 0
        ? contactList
            .sort(
              (a, b) =>
                Date.parse(b.chatHistory[b.chatHistory.length - 1].date) -
                Date.parse(a.chatHistory[a.chatHistory.length - 1].date),
            )
            .filter((contact) =>
              contact.name.toLowerCase().includes(search.toLocaleLowerCase()),
            )
            .map((contact, index) => {
              const lastMessage =
                contact.chatHistory[contact.chatHistory.length - 1];
              return (
                <div
                  key={index}
                  onClick={() => {
                    selectActiveContact(contact);
                    setSearch('');
                  }}
                >
                  {contact.image}
                  <div className="contacts__name">
                    {contact.name}
                    <br />
                    {`${lastMessage.message} ${lastMessage.date} ${
                      contact.newMessages > 0 ? contact.newMessages : ''
                    }`}
                  </div>
                  <hr />
                </div>
              );
            })
        : contactList
            .sort(
              (a, b) =>
                Date.parse(b.chatHistory[b.chatHistory.length - 1].date) -
                Date.parse(a.chatHistory[a.chatHistory.length - 1].date),
            )
            .map((contact, index) => {
              const lastMessage =
                contact.chatHistory[contact.chatHistory.length - 1];
              return (
                <div
                  key={index}
                  onClick={() => {
                    selectActiveContact(contact);
                    clearNewMessages(contact.id);
                  }}
                >
                  {contact.image}
                  <div className="contacts__name">
                    {contact.name}
                    <br />
                    {`${lastMessage.message} ${lastMessage.date} ${
                      contact.newMessages > 0 ? contact.newMessages : ''
                    }`}
                  </div>
                  <hr />
                </div>
              );
            })}
    </>
  );
}

export default Contactsbox;
