import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { withRouter } from 'react-router';
import './Cart.css';
import CartItem from './CartItem/CartItem';

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listCarts: [],
            reloadList: true
        }
        this.deleteCart = this.deleteCart.bind(this);
    }

    componentDidMount() {
        this.getListCarts();
        document.title = 'Giỏ hàng | Bá Long BookStore';
    }

    getListCarts() {
        if (localStorage.username && localStorage.password) {
            return fetch(`http://localhost:4000/api/v1/carts/get-carts`, {
                method: 'GET',
                headers: {
                    username: localStorage.username,
                    password: localStorage.password
                }
            }).then(response => { return response.json() }).then(responseJson => {
                this.setState({
                    listCarts: responseJson.carts
                });
                console.log(this.state.listCarts);
            })
        } else {
            let arrayBooks = [];
            let listCart = [];
            if (localStorage.carts) {
                arrayBooks = JSON.parse(localStorage.carts);
            }
            let idBook = [...new Set(arrayBooks)];
            idBook.map(id => {
                let amount = 0;
                arrayBooks.map(item => {
                    if (id === item) {
                        amount++;
                    }
                })
                listCart.push({ book_id: id, amount: amount });
            })
            this.setState({ listCarts: listCart })
        }
    }
    deleteCart(item) {
        console.log(item);
        let list = [];
        this.state.listCarts.map(cart => {
            if (cart !== item) {
                return list.push(cart);
            }
        })
        this.setState({ listCarts: list });
    }
    render() {
        return (
            <Container>
                <div className='wp-cart'>
                    <h2>Giỏ hàng</h2>
                    <div className='cart-list'>
                        {
                            (this.state.listCarts.length === 0) ? (
                                <div className='cart-notify'>
                                    <p>Giỏ hàng trống</p>
                                </div>
                            ) : (
                                    <div>
                                        {
                                            this.state.listCarts && this.state.listCarts.map((cart, key) => {
                                                return <CartItem key={key} cart={cart} deleteCart={this.deleteCart} />
                                            })
                                        }
                                    </div>
                                )
                        }
                    </div>
                    <div className='cart-bottom'>
                        <Button variant='' className='btn-thanhtoan'>Thanh toán</Button>
                    </div>
                </div>
            </Container>
        );
    }
}
export default withRouter(Cart);