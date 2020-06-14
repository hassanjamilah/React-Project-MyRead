import React from 'react'
import Book from './Book'

class ListBooks extends React.Component {

    render() {
        const { allBooks, shelf ,onChangeBookState} = this.props
        const filteredBooks = shelf === '' ?
        allBooks:
        allBooks.filter((b) => (b.shelf === shelf))
        return (
            <div>
            <button onClick={onChangeBookState}>Hi all</button>
                <ol className="books-grid">
                    {
                        filteredBooks.map((book) => (
                            <li key={book.id}><Book book={book} onChangeBookState={onChangeBookState} /></li>
                        ))
                    }
                </ol>
            </div>
        )
    }
}

export default ListBooks