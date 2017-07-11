import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBook from './searchBook'
import Book from './book'
import ShowBook from './showBook'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'

class BooksApp extends React.Component {
    state = {
      //three shelfs to show
      shelfs: ['currentlyReading', 'wantToRead', 'read'],
      books: []

    }
    //get books information from server
    componentDidMount() {
      BooksAPI.getAll().then((books) => {
        console.log('books', books);
        this.setState({
          books:books
        })
      })
    }
    //update shelf information when change book's shelf
    update = (e, c) => {
      BooksAPI.update(c, e)
      let books = this.state.books;
      console.log(e, c);
      books.map(book => {
        (book.id === c.id) && (book.shelf = e)
      });
      this.setState({
        books: books
      })
    }
    //if book exist on shelf,then use update,neither add search book to shelf
    add = (e, c) => {
      if(c.shelf!=='none'){
        this.update(e,c)
      }else{
        BooksAPI.update(c, e);
        console.log(c, e)
        c.shelf = e;
        console.log(this.state.books);
        this.setState({
          books: this.state.books.concat(c)
        })
        alert('Add Complete!')
        console.log(this.state.books);
      }
    }
    render() {
      console.log(this.state.books)
      return (
        <div className="app">
        <Route path='/search' render={() =>
          (<SearchBook books={this.state.books} update={this.add}/>)}/>
        <Route exact path='/' render={
            () =>
            (<ShowBook shelfs={this.state.shelfs} books={this.state.books} update={this.update}/>)
      }/>
      </div>)
    }
  }
    export default BooksApp
