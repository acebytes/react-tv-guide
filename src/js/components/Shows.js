import React from "react"
import { withRouter } from 'react-router-dom'
import Header from "./Header"

class Shows extends React.Component {
    
  constructor() {
    super()
    this.state={items:[]}
  }

  componentDidMount(){
    fetch(`http://api.tvmaze.com/schedule?country=GB`)
    .then(result=>result.json())
    .then(items=>this.setState({items}))
  }

  navigate(value) {
    this.props.history.push("/show/"+value);
  }

  render() {

    return(
      <div>
        <Header />
        <div className="grid-container shows-list">

          {this.state.items.length ?
            this.state.items.map(item=>
              <div onClick={()=>this.navigate(item.show.id)} className="grid" key={item.id}>
                <img src={item.show.image.medium} />
                <h2>{item.show.name}</h2>
                {item.show.rating.average > 0 &&
                  <p>Rating: {item.show.rating.average} / 10</p>
                }
              </div>
              ) 
            : <div>Loading...</div>
          }
        </div>
      </div>
   )
  }
}

export default withRouter(Shows);