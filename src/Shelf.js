import React from 'react'
import ListBooks from './ListBooks'

function Shelf(props){
    return(
        <div>
        
            <div className="bookshelf">
                  <h2 className="bookshelf-title">{props.title}</h2>
                  <div className="bookshelf-books">
                    <ListBooks allBooks={props.allBooks} shelf={props.shelf } onChangeBookState={props.onChangeBookState}/>
                  
                  </div>
                </div>
            
        </div>
    )
}
export default Shelf