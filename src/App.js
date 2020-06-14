import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf'
import SearchBook from './SearchBook'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    allBooks: []
  }

  onChangeBookState = (book) => {

    let oldBooks = this.state.allBooks;
    let founded = false;
    for (let i = 0; i < oldBooks.length; i++) {
      if (oldBooks[i].id === book.id) {
        console.log(oldBooks[i].id, book.shelf)
        oldBooks[i].shelf = book.shelf
        founded = true;
      }

    }
    if (founded === false && book.shelf != null) {

      console.log('old books before', oldBooks)
      oldBooks.push(book)
      console.log('old books after', oldBooks)

    }
    this.setState(
      (currentState) => ({

        allBooks: oldBooks
      })

    )

    BooksAPI.update(book, book.shelf)
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((allBooks) => {
        console.log('my books:', allBooks);
        this.setState(() => ({
          allBooks
        }))
      })
  }
  render() {
    return (
      <div className="app">
        <Route
          path='/SearchBook'
          render={() => (
            <SearchBook allBooks={this.state.allBooks} onChangeBookState={(book) => this.onChangeBookState(book)} />
          )}
        ></Route>
        <Route
          exact path='/'
          render={() => (
            <div>
              <Shelf shelf='currentlyReading' allBooks={this.state.allBooks} title='Currently Reading' onChangeBookState={(book) => this.onChangeBookState(book)} />
              <Shelf shelf='wantToRead' allBooks={this.state.allBooks} onChangeBookState={this.onChangeBookState} title='Want to Read' />



              <Shelf shelf='read' allBooks={this.state.allBooks} onChangeBookState={this.onChangeBookState} title='Read' />
              <Link className="open-search"
                to='/SearchBook'
              >
                <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
              </Link>
            </div>

          )}
        ></Route>
      </div>
    )
  }

  // render() {
  //   return (

  // <div className="app">



  //  <Route exact path='/'
  //  render={()=>(
  //   <div className="list-books">
  //       <div className="list-books-title">
  //         <h1>MyReads</h1>
  //       </div>
  //       <div className="list-books-content">

  //       </div>

  //     </div>
  //  )}
  //  ></Route>


  // </div> 


}

export default BooksApp
