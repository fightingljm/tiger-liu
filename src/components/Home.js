import React from 'react';

import { Carousel } from 'react-bootstrap';

class Home extends React.Component {
  constructor() {
    super();
    this.state={

    }
  }
  render(){
    return(
      <div style={{width:'770px',margin:'80px auto'}}>
        <Carousel interval={2000}>
          <Carousel.Item>
            <img width={770} height={455} alt="900x500" src="https://fightingljm.github.io/images/tiger1.jpg"/>
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img width={770} height={455} alt="900x500" src="https://fightingljm.github.io/images/tiger2.jpg"/>
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img width={770} height={455} alt="900x500" src="https://fightingljm.github.io/images/tiger3.jpg"/>
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    )
  }
}

export default Home;
