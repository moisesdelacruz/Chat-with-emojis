export function textFormat (text) {
  let exp = {
    http: /(\b(https?|ftps?|git):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig,
    blank: /\r?\n/g
  }
  return text.replace(exp.http, '<a href="$1" target="_blank">$1</a>')
              .replace(exp.blank, '<br/>')
              .replace(/:\)/, '😀')
              .replace(/:D/, '😆')
              .replace(/o:/i, '😇')
              .replace(/;\)/, '😉')
              .replace(/:p/i, '😋')
              .replace(/:\*/, '😘')
              .replace(/<3/, '❤')
              .replace(/;\(/, '😥')
              .replace(/:\(/, '😒')
              .replace(/:\//, '😏')
              .replace(/:o/i, '😱')
              .replace(/x\)/i, '😲')
              .replace(/\(y\)/i, '👍')
}

export function showNotification (message) {
  let titulo = `Tienes un nuevo mensaje de ${message.username}`
  let options = {
    icon: "/img/logo.png",
    body: message.text
  }

  if (Notification) {
    if (Notification.permission === 'granted') {
      var newNoti = new Notification(titulo, options)
      setTimeout(newNoti.close.bind(newNoti), 6000)
    }
  }

}
