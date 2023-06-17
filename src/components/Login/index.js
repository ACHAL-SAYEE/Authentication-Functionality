import './index.css'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {Component} from 'react'

class Login extends Component {
  onSubmitSuccess = jwtTkoken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtTkoken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    console.log(errorMsg)
  }

  submitForm = async event => {
    event.preventDefault()

    const userDetails = {username: 'rahul', password: 'rahul@2021'}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg">
        <h1>Please Login</h1>
        <form onSubmit={this.submitForm}>
          <button type="submit">Login with Sample creds</button>
        </form>
      </div>
    )
  }
}

export default Login
