function Contacts({ selectActiveContact, contactList }) {
  return (
    <>
      {contactList
        .sort(
          (a, b) =>
            Date.parse(b.chatHistory[b.chatHistory.length - 1].date) -
            Date.parse(a.chatHistory[a.chatHistory.length - 1].date),
        )
        .map((contact, index) => {
          const lastMessage =
            contact.chatHistory[contact.chatHistory.length - 1];
          return (
            <div key={index} onClick={() => selectActiveContact(contact)}>
              {contact.image}
              <div className="contacts__name">
                {contact.name}
                <br />
                {`${lastMessage.message} ${lastMessage.date}`}
              </div>
              <hr />
            </div>
          );
        })}
    </>
  );
}

export default Contacts;
