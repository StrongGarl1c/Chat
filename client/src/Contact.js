export function getRandomColor() {
  const color = Math.floor(Math.random() * 16777215).toString(16);
  if (color.length > 5) {
    return `#${color}`;
  } else {
    return getRandomColor();
  }
}

class Contact {
  constructor(id, name, chatHistory) {
    this.id = id;
    this.name = name;
    this.chatHistory = chatHistory;
    this.image = (
      <div
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          color: 'white',
          textShadow: '-1px 0 black',
          backgroundColor: getRandomColor(),
          textAlign: 'center',
          display: 'table-cell',
          verticalAlign: 'middle',
        }}
      >
        {this.name[0].toUpperCase()}
      </div>
    );
    this.newMessages = 0;
  }
}

export default Contact;
