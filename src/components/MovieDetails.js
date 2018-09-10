import React, {Component} from 'react';
import { getImage} from '../utils/getMovie';

class MovieDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
        pathname: this.props.pathname,
    };
    this.toString = this.toString.bind(this);
    this.checkImageExists = this.checkImageExists.bind(this);
  };

  toString (arr) {
    return arr.map(r =>{ return JSON.stringify(r)}).join(',')
  };

  renderList = arr => arr.filter(el =>el[0]!=='Poster' ).map((item, index) => {
     return  <div key={index} className='detail-row'> 
              <div className='movie-attr'>{item[0]}</div>
              <div className='movie-value'>{typeof item[1] ==='string'? item[1]: this.toString(item[1])}</div>
            </div>
    }
  );

  checkImageExists (url) {
    getImage(url).then( 
      value => { 
        if (value.status===200 && url !==undefined) {
          console.log("no Error get image", value);
          document.querySelector('.detail img').setAttribute('src', this.props.movie.Poster);
          return true;
        } else {
          return false;
        }
      }
    ).catch(err => console.error(err));
  }

  render() {
    if (this.props.movie) {
      let movieAsArray= Object.entries(this.props.movie);
      movieAsArray.pop(); //get rid of the 'response true'

      return <div  className={`detail ${this.props.pathname!=='/' ? 'show' : 'hide'}`} >
        <div className={`img ${this.props.movieTitle!=='' ? 'show' : 'hide'}`}>
          <img src={ this.props.movie.Poster!==undefined && this.props.movie.Poster!=='N/A' && this.checkImageExists(this.props.movie.Poster)? this.props.movie.Poster:''} alt='poster' />
        </div>
        {this.renderList(movieAsArray)}
      </div>
    }else {
      return null;
    }
  };

}

export default MovieDetails;
