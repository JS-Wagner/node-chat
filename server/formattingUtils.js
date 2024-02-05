//Verifica el tipo del mensaje de texto provisto
export function formatMessage(message) { 
    if (isLink(message)) {
      return { type: 'link', text: message, url: message };
    } else {
      return { type: 'text', text: message };
    }
  }
  
  //Verifica si el texto provisto es un hipervinculo
  export function isLink(text) { 
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    return urlRegex.test(text);
  }
  