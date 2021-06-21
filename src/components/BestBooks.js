import React from 'react';

class BestBooks extends React.Component {
    render() {
        return (
            <>
                <h2>My Books</h2>
                {this.props.books.length && this.props.books.map((book, idx) => (
                    
                    <>
                        <div key={idx}>
                            {book.name}
                        </div>
                        <div key={idx}>
                            {book.description}
                        </div>
                        <div key={idx}>
                            {book.status}
                        </div>
                    </>
                ))}
            </>
        )
    }
}

export default BestBooks;