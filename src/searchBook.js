import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import './App.css'
import Book from './book'
//serach book component,the default of  books in this component is 'none'
class SearchBook extends Component{
  state = {
    result:[]
  }
//serach function
  updateQuery = (query) => {
    if (query) {
      BooksAPI.search(query).then(books => {
        if (books.length) {
          books.map(book=>{
            this.props.books.map(shelfBook=>{
              if(book.id==shelfBook.id){
                book.shelf=shelfBook.shelf
              }
            })
          })
          this.setState({
            result: books
          })
          console.log(books)
        } else {
          this.setState({
            result: []
          })
        }
      })
    } else {
      this.setState({
        result: []
      })
    }
  }
  render(){
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={(event) => this.updateQuery(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.result.length>0&&this.state.result.map((book)=>(
              <Book
                shelf={book.shelf}
                key={book.id}
                updateShelfDate={this.props.update}
                info={book}
              />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}
export default SearchBook
