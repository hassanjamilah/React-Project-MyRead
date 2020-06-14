import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf'
import SearchBook from './SearchBook'
class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    allBooks:[]
  }

 onChangeBookState = (book) => {

  let oldBooks = this.state.allBooks;
  for(let i = 0 ; i<oldBooks.length; i++){
    if (oldBooks[i].id === book.id){
     console.log(oldBooks[i].id , book.shelf) 
     oldBooks[i].shelf = book.shelf
    }
  
  }
  this.setState(
    (currentState)=>({
 
      allBooks:oldBooks
    })
  )
 
 }

 componentDidMount(){
  BooksAPI.getAll()
  .then((allBooks)=>{
    console.log('my books:' , allBooks);
    this.setState(()=>({
      allBooks
    }))
  })
 }


  render() {
    return (
      
      <div className="app">
    
       {/* <Book book={this.state.allBooks[0]}/> */}
       {<SearchBook allBooks={this.state.allBooks} onChangeBookState={(book)=>this.onChangeBookState(book)}/>}
     
       <button onClick={this.onChangeBookState}>Hello</button>
        {
          this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
              <Shelf shelf='currentlyReading' allBooks={this.state.allBooks} title='Currently Reading' onChangeBookState={(book)=>this.onChangeBookState(book)}/>
              <Shelf shelf='wantToRead' allBooks={this.state.allBooks} onChangeBookState={this.onChangeBookState} title='Want to Read'/>
            
      
               
                <Shelf shelf='read' allBooks={this.state.allBooks } onChangeBookState={this.onChangeBookState} title='Read'/>
              </div>
            </div>
            <a className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </a>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
