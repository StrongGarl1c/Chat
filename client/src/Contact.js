class Contact {
  constructor(id, name, chatHistory) {
    this.id = id;
    this.name = name;
    this.chatHistory = chatHistory;
    this.color = Math.floor(Math.random() * 16777215).toString(16);
    this.image = (
      <div
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          color: 'white',
          textShadow: '-1px 0 black',
          backgroundColor: `#${this.color}`,
          textAlign: 'center',
          display: 'table-cell',
          verticalAlign: 'middle',
        }}
      >
        {this.name[0].toUpperCase()}
      </div>
    );
  }
}

export default Contact;
