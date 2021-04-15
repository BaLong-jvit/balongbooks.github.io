
import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import './Slide.css';

class Slide extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            advertHomeImage: {}
        }
        this.getImageAdvert = this.getImageAdvert.bind(this);
    }

    componentDidMount() {

        this.getImageAdvert();
    }
    getImageAdvert() {
        return fetch(`http://localhost:4000/api/v1/home/adverts/image`, {
            method: 'GET',
            headers: {
                advertId: this.props.advert.id
            }
        }).then(response => { return response.json() }).then(responseJson => {
            this.setState({ advertHomeImage: responseJson.image });
        })
    }
    render() {
        return (
            <Row>
                <Col sm={6} className='item'>
                    <h1><span>B-Long</span> Bookstore</h1>
                    <h2>{this.props.advert.name}</h2>
                    <p>{this.props.advert.short_description} </p>
                    <Link to={`/adverts/${this.props.advert.path}`} type="button" className="btn btn-default get">Get it now</Link>
                    <span>* Thời gian: từ <strong>{this.props.advert.begin}</strong> đến <strong>{this.props.advert.finish}</strong> </span>
                </Col>
                <Col sm={6}>
                    <img src={`http://localhost:4000/image/${this.state.advertHomeImage.path}/${this.state.advertHomeImage.name}`} className="girl img-responsive" alt="" />
                    <img src="http://localhost:4000/image/home/pricing.png" className="pricing" alt="" />
                </Col>
            </Row>
        )

    }
}
export default Slide;
