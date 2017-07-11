import React from 'react'
import './App.css'
import Book from './book'
import { Link } from 'react-router-dom'

class ShowBook extends React.Component{
  render(){
    return(
      <div className = "list-books" >
        <div className="list-books-title">
          <h1>
            MyReads
          </h1>
        </div>
      <div className = "list-books-content" > {
        this.props.shelfs.map((shelf, index) => (
          <div key={shelf}>
            <div className="bookshelf">
              <h2 className="bookshelf-title">{shelf}</h2>
              <div className="bookshelf-books">
                <ol key={index} className="books-grid">
                  {this.props.books.map((book, index) => (book.shelf === shelf && (<Book key={index} shelf={book.shelf} info={book} updateShelfDate={this.props.update} />)))}
                </ol>
              </div>
            </div>
          </div>))}
      </div>
      <div className="open-search" >
        <Link to='/search'>Add a book</Link>
      </div>
  </div>
)
}
}
export default ShowBook
