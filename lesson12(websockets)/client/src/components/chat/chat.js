import React, { Component } from 'react'
import Message from '../message'
import Send from '../send'
import { socket } from './socket'
import './chat.css'

class Chat extends Component {
  socket = socket
  state = {
    currentUser: '',
    messages: [],
    message: '',
    isLogin: false,
    users: {},
  }

  componentDidMount() {
    this.socket.on('message', (data) => {
      if (this.state.isLogin) {
        this.setState(({ messages }) => {
          const newMessages = [...messages]
          if (newMessages.length > 10) {
            newMessages.shift()
          }
          return {
            messages: [...newMessages, { user: data.user, text: data.message }],
          }
        })
      }
    })

    this.socket.on('users', (data) => {
      this.setState({ users: data })
    })
  }

  changeMessage = (e) => {
    this.setState({ message: e.target.value })
  }

  changeName = (e) => {
    this.setState({ currentUser: e.target.value })
  }

  inputName = () => {
    const user = this.state.currentUser
    if (user !== '') {
      this.setState({ currentUser: user, isLogin: true })
      this.socket.emit('change:name', user)
    }
  }

  sendMessage = (e) => {
    e.preventDefault()
    const { currentUser, message } = this.state
    if (message.trim().length) {
      this.socket.emit('message', {
        user: currentUser,
        message: message.trim(),
      })
      this.setState({ message: '' })
    }
  }

  render() {
    const { messages, message, currentUser, isLogin, users } = this.state
    if (!isLogin) {
      return (
        <main className="form-signin">
          <h4 className="form-floating mb-3">Пожалуйста представьтесь</h4>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              value={currentUser}
              onChange={this.changeName}
              placeholder="Введите ваш никнейм"
              id="floatingInput"
            />
            <label for="floatingInput">Nickname</label>
          </div>
          <button
            className="w-100 btn btn-lg btn-primary"
            onClick={this.inputName}>
            Войти
          </button>
        </main>
      )
    }

    return (
      <div className="container">
        <div className="row align-items-start">
          <div className="message-list col-md-9">
            <Send
              value={message}
              onChange={this.changeMessage}
              onSend={this.sendMessage}
            />
            <div className="messages">
              {messages.map((item, key) => (
                <Message item={item} key={key} currentUser={currentUser} />
              ))}
            </div>
          </div>
          <ul className="list-group col-md-3">
            {Object.entries(users).map((el) => (
              <li className="list-group-item" key={el[0]}>
                {el[1]}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Chat
