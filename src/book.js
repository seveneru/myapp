import React, { Component } from 'react'
import './App.css'
import BookShelfChanger from './bookShelfChanger'
//book component
class Book extends Component{
  render(){
    return(
      <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.info.imageLinks.thumbnail})` }}></div>
          <BookShelfChanger shelf={this.props.shelf} info={this.props.info} updateShelf={this.props.updateShelfDate} />
        </div>
        <div className="book-title">{this.props.info.title}</div>
        <div className="book-authors">{this.props.info.authors}</div>
      </div>
      </li>
    )
  }
}
export default Book
