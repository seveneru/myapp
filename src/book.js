import React, { Component } from 'react'
import './App.css'
import BookShelfChanger from './bookShelfChanger'
//book component
class Book extends Component{
  render(){
    return(
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.imgLinks})` }}></div>
          <BookShelfChanger shelf={this.props.shelf} updateShelf={this.props.updateShelfDate} id={this.props.id} title={this.props.title} authors={this.props.authors} imgLinks={this.props.imgLinks}/>
        </div>
        <div className="book-title">{this.props.title}</div>
        <div className="book-authors">{this.props.authors}</div>
      </div>
    )
  }
}
export default Book
