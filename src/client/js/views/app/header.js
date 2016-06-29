import Backbone from 'backbone'
import $ from 'jquery'

class HeaderView extends Backbone.View {
  get el () { return $('.header') }
  get events () {
    return {
      'click #change-username': 'changeUsername'
    }
  }

  initialize () {
    this.btnChange = $('#change-username')
    this.username = $('#username')
  }

  changeUsername (ev) {
    if (localStorage.user)
      this.username.val(JSON.parse(localStorage.user).username)
    Chat.chatProfileView.showFormPopup(ev)
  }
}

export default HeaderView
