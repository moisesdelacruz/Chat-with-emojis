import Backbone from 'backbone'
import uid from 'uid'
import moment from 'moment'
import es from 'moment/locale/es'

class User extends Backbone.Model {
  default () {
    let id = uid(9)
    return { id: id, username: `Guest-${id}`, join: moment().format() }
    /*localStorage.setItem('username', data.username)
    return data*/
  }

  initialize () {
    if(!localStorage.user)
      this.attributes = this.default()
    else
      this.attributes = JSON.parse(localStorage.user)
  }

}


export default User
