import Backbone from 'backbone'
import $ from 'jquery'

class SendMessage extends Backbone.View {
  get el () { return $('#chat-form') }
  get events () {
    return {
      'submit': 'sendMessage',
      'keypress': 'matchEnter',
      'click #btn-emojis': 'showEmojis',
      'click #emojis .emoji': 'insertEmoji'
    }
  }

  initialize () {
    this.$textarea = this.$el.find('#form-message')
    this.$emojis = this.$el.find('#emojis')
    this.$body = this.$el.closest('body')
    this.$body.click(this.hideEmojis.bind(this))
  }

  matchEnter (ev) {
    if (window.matchMedia("(min-width : 800px)").matches){
      if (ev.keyCode === 13 && !ev.shiftKey) {
        ev.preventDefault()
        this.$el.submit()
      }
    }
  }

  sendMessage (ev) {
    ev.preventDefault()
    let exp = /.\S/i
    let text = this.$textarea.val()
    if (exp.test(text)) {
      Chat.events.trigger('message:send', text)
      this.$textarea
        .val('')
        .focus()
    }
  }

  showEmojis (ev) {
    ev.stopPropagation()
    ev.preventDefault()
    this.$emojis.fadeToggle(200)
  }
  hideEmojis (ev) {
    this.$emojis.fadeOut(200)
  }

  insertEmoji (ev) {
    let $emoji = $(ev.target)[0]
    this.$textarea
      .val(this.$textarea.val() + `${$emoji.alt}`)
      .focus()
  }

}

export default SendMessage
