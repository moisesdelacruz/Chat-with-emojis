export function textFormat (text) {
  let exp = {
    http: /(\b(https?|ftps?|git):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig,
    blank: /\r?\n/g
  }
  return text.replace(exp.http, '<a href="$1" target="_blank">$1</a>')
              .replace(exp.blank, '<br/>')
              .replace(/:\)/, twemoji.parse('😀'))
              .replace(/:D/, twemoji.parse('😆'))
              .replace(/o:/i, twemoji.parse('😇'))
              .replace(/;\)/, twemoji.parse('😉'))
              .replace(/:p/i, twemoji.parse('😋'))
              .replace(/:\*/, twemoji.parse('😘'))
              .replace(/<3/, twemoji.parse('❤'))
              .replace(/;\(/, twemoji.parse('😥'))
              .replace(/:o\(/i, twemoji.parse('😱'))
              .replace(/\(y\)/i, twemoji.parse('👍'))
}
