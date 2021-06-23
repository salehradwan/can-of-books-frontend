import React from 'react';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';

class BestBooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serverUrl: process.env.REACT_APP_PORT,
            userEmail: this.props.auth0.user.email,
            booksData: []
        }
    }

    componentDidMount = () => {
        axios.get(`${this.state.serverUrl}/books?email=${this.state.userEmail}`).then(response => {
            this.setState({
                booksData: response.data.books
            })
        }).catch(
            error => {
                alert(error.message);
            }
        );
    }
    render() {
        return (
            <>
                <h2>My Books</h2>
                {this.state.booksData.length > 0 && this.state.booksData.map((book, idx) => (
                    
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

export default withAuth0(BestBooks);