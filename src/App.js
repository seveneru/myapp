import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBook from './searchBook'
import Book from './book'
import {
  Route
} from 'react-router-dom'
import {
  Link
} from 'react-router-dom'

class BooksApp extends React.Component {
    state = {
      /**
       * TODO: Instead of using this state variable to keep track of which page
       * we're on, use the URL in the browser's address bar. This will ensure that
       * users can use the browser's back and forward buttons to navigate between
       * pages, as well as provide a good URL they can bookmark and share.
       */
      //three shelfs to show
      shelfs: ['currentlyReading', 'wantToRead', 'read'],
      books: []

    }
    //get books information from server
    componentDidMount() {
      BooksAPI.getAll().then((books) => {
        console.log('books', books);
        this.setState({
          books: books.map((book) => ({
            id: book.id,
            shelf: book.shelf,
            imageLinks: (book.imageLinks && book.imageLinks.thumbnail),
            title: book.title,
            authors: book.authors
          }))
        })
      })
    }
    //update shelf information when change book's shelf
    update = (e, c) => {
      BooksAPI.update(c, e);
      let books = this.state.books;
      console.log(e, c);
      books.map(book => {
        (book.title === c.title) && (book.shelf = e)
      });
      this.setState({
        books: books
      })
    }
    //add search book to shelf
    add = (e, c) => {
      let f = true
      this.state.books.map(book => {
        if (book.id === c.id) {
          f = false
          alert('You have already add this book!')
          return
        }
      })
      if (f) {
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
        <div className = "app" >
        //search page
        <Route path = '/search'
        render = {() =>
          (<SearchBook update = {this.add}/>)
          }
          />
          //home page
          <Route exact path = '/'
          render = {
            () =>
            ( <div className = "list-books" >
              <div className = "list-books-title" >
              <h1 > MyReads </h1> < /div >
              <div className = "list-books-content" > {
                this.state.shelfs.map(shelf => (
                  <div key = {shelf} >
                  <div className = "bookshelf" >
                  <h2 className = "bookshelf-title" > {
                    shelf
                  } </h2>
                  <div className = "bookshelf-books" >
                  <ol className = "books-grid" > {
                    this.state.books.map(book => (book.shelf === shelf && ( < li key = {
                        book.title
                      } > < Book key = {
                        book.title
                      }
                      id = {
                        book.id
                      }
                      shelf = {
                        book.shelf
                      }
                      title = {
                        book.title
                      }
                      authors = {
                        book.authors
                      }
                      imgLinks = {
                        book.imageLinks
                      }
                      updateShelfDate = {
                        this.update
                      }
                      /></li > )))
                  } </ol>
                  </div >
                  </div>
                  </div >
                ))
              } </div>
              <div className = "open-search" >
              <Link to = '/search' > Add a book < /Link>
              </div>
              </div>
            )
          }
          />
          </div >
        )
      }
    }
    export default BooksApp
