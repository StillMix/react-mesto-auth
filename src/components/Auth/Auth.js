
export default class Auth {
  constructor(config) {
      this._url = config.url;
      this._headers = config.headers;
  }

  register(password, email) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          password: password,
          email: email,
        })
    }).then((response) => {
      try {
        if (response.status === 201){
          return response.json();
        }
      } catch(e){
        return (e)
      }
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
}

authorize(password, email) {
  return fetch(`${this._url}/signin`, {
    method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email,
      })
  }) .then((response => {
    return response.json()
  }))
  .then((data) => {
    console.log(data)
    if (data.token){
      localStorage.setItem('token', data.token);
      return data;
    }else{
      return data
    }
  })
  .catch(err => console.log(err))
}

getContent(token){
  return fetch(`${this._url}/users/me`, {
    method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
  })
  .then(res => {return res.json()})
  .then(data => {return data})
  .catch(err => console.log(err))
}

}

export const mestoAuth = new Auth({
  url: 'https://auth.nomoreparties.co',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
})


