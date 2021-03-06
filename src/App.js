import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './component/Form'
import List from './component/List'
const data = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: 'Reduct',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1
  }
]
class App extends Component {
  constructor(){
    super()
    this.state = {
      data,
      search:""
    }
  }
  componentDidMount(){
    fetch(`http://hn.algolia.com/api/v1/search?query=redux`)
    .then(res => res.json())
    .then(data => this.setState ({data: data.hits}))
  }
  changeHandler(keyword){
    this.setState({
      search: keyword
    })
    fetch(`http://hn.algolia.com/api/v1/search?query=${this.state.search}`)
    .then(res => res.json())
    .then(data => this.setState ({data: data.hits}))
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="App-intro">
          <List data={this.state.data} search={this.state.search}>
          </List>
          <Form changeHandler={(keyword)=>this.changeHandler(keyword)}>
          </Form>
        </div>
      </div>
    );
  }
}

export default App;
