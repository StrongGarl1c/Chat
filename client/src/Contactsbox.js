import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { GoPerson } from 'react-icons/go';
function Contactsbox({ selectActiveContact, contactList, clearNewMessages }) {
  const [search, setSearch] = useState('');

  function handleSearchInput(e) {
    const input = e.target.value;
    setSearch(input);
  }

  return (
    <div className="contactsbox">
      <div className="contactsbox__header">
        <div className="contactsbox__profile">
          <GoPerson />
          <div className="contact__wrapper__image__icon">
            <AiOutlineCheckCircle />
          </div>
        </div>
        <form>
          <div className="contactsbox__svg">
            <BiSearch />
          </div>
          <input
            type="search"
            value={search}
            placeholder="Search or start new chat"
            onChange={handleSearchInput}
          />
        </form>
      </div>
      <h2>Chats</h2>
      {contactList
        .sort(
          (a, b) =>
            Date.parse(b.chatHistory[b.chatHistory.length - 1].date) -
            Date.parse(a.chatHistory[a.chatHistory.length - 1].date),
        )
        .filter((contact) => {
          if (search.length) {
            return contact.name.toLowerCase().includes(search.toLowerCase());
          } else {
            return contact;
          }
        })
        .map((contact, index) => {
          const lastMessage =
            contact.chatHistory[contact.chatHistory.length - 1];
          return (
            <div
              key={contact.id}
              onClick={() => {
                selectActiveContact(contact);
                setSearch('');
                clearNewMessages(contact.id);
              }}
              className="contact__wrapper"
            >
              <div className="contact__wrapper__image">
                {contact.image}
                <div className="contact__wrapper__image__icon">
                  <AiOutlineCheckCircle />
                </div>
              </div>
              <div className="contact__wrapper__text">
                <h4>
                  {`${contact.name} `}
                  <span className="contact__wrapper__text__notification">
                    {contact.newMessages > 0 ? contact.newMessages : ''}
                  </span>
                </h4>
                <p>{`${lastMessage.message}`}</p>
              </div>
              <div>{`${lastMessage.date}`}</div>
            </div>
          );
        })}
    </div>
  );
}

export default Contactsbox;
