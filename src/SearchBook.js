import React from 'react'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
import {Link} from 'react-router-dom'
class SearchBook extends React.Component {
    state={
        query:'',
        searchBooks:[]

    }

    handleSearch = (e)=>{
        console.log(e.targer)
    }

    updateQuery = (query)=>{
        this.setState(()=>({
            query: query
        }))
        console.log(query)
        BooksAPI.search(query)
        .then((books)=>{
            const {allBooks } = this.props
            if (books){
                for (let y = 0;y<books.length;y++){
                    for (let i=0;i<allBooks.length;i++){
                        if (books[y].id === allBooks[i].id){
                            books[y].shelf = allBooks[i].shelf
                            break;
                        }
                    } 
                }
                this.setState((currentState)=>{
                    currentState.searchBooks = books
                })
                console.log(books)
            }
            
        })
    }
  
 
    onSerarchChangeBookState  =  (book) => {
        
        console.log('on search change book')

        let oldBooks = this.state.searchBooks;
        let founded = false;
        for(let i = 0 ; i<oldBooks.length; i++){
          if (oldBooks[i].id === book.id){
           console.log(oldBooks[i].id , book.shelf) 
           oldBooks[i].shelf = book.shelf
           founded = true;
          }
        
        }
        if (founded === false && book.shelf != null){
          
          console.log('old books before' ,  oldBooks)
          oldBooks.push(book)
          console.log('old books after' ,  oldBooks)
         
        } 
        this.setState(
          (currentState)=>({
       
            allBooks:oldBooks
          })
        )
    }

    componentDidMount(){
        console.log('Did mount')
        BooksAPI.search('android')
        .then((books)=>{
            this.setState((currentState)=>{
                currentState.searchBooks = books
            })
            console.log('books 11' , books)
        })
    }

    
    render() {
        const { query ,searchBooks} = this.state
        const {allBooks , onChangeBookState} = this.props
        

        const filteredBooks = query === '' ?
        allBooks:
        searchBooks
        // allBooks.filter((b) => (b.title.toLowerCase().includes(query.toLowerCase()) ))

        return (
            <div className="search-books">
                <div className="search-books-bar">
                <Link
                to='/'
                className="close-search"
                ></Link>
                    {/* <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button> */}
                    <div className="search-books-input-wrapper">
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                        <input type="text" placeholder="Search by title or author" 
                        value={query}
                         onChange={(event) => this.updateQuery(event.target.value)}

                        />

                    </div>
                </div>
                <div className="search-books-results">
                <ListBooks allBooks={filteredBooks} shelf='' onChangeBookState= {onChangeBookState}  onSerarchChangeBookState={(book)=>this.onSerarchChangeBookState(book)}/>
                    <ol className="books-grid"></ol>
                </div>
            </div>
        )
    }
}
export default SearchBook