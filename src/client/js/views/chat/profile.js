import Backbone from 'backbone'
import $ from 'jquery'

class Profile extends Backbone.View {
  get el () { return $('#form-popup') }
  get events () {
    return {
      'submit': 'setUsername'
    }
  }

  initialize () {
    this.$parent = this.$el.closest('.layoud-wrapper-form')
    this.$inputUsername = this.$el.find('#username')
    this.$opacity = $('#opacity')
    //this.listenTo(this.model, 'change', this.render, this)
    this.$opacity.click(this.hideFormPopup.bind(this))
    if (!localStorage.user) {
      this.showFormPopup()
    }
  }

  showFormPopup (ev) {
    if (ev) ev.preventDefault()
    this.$opacity.show()
    this.$parent.fadeIn(400)
  }

  hideFormPopup (ev) {
    if (ev) ev.preventDefault()
    this.$opacity.hide()
    this.$parent.fadeOut(400)
    this.$inputUsername.val('')
  }

  setUsername (ev) {
    if (ev) ev.preventDefault()

    let username = this.$inputUsername.val()
    let exp = /^[a-z\d_]{4,15}$/i

    if (exp.test(username)) {
      this.model.set('username', username)
      this.hideFormPopup()
      localStorage.user = JSON.stringify(this.model.toJSON())
      this.$inputUsername.removeClass('alert')
    } else {
      this.$inputUsername.addClass('alert')
    }
  }
}

export default Profile
