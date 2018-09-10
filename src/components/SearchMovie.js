import React, {Component} from 'react';
import {getMovie} from '../utils/getMovie';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import MovieDetails from './MovieDetails';

class SearchMovie extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
        movieTitle: '',
        searchTitle: '',
        pathname:'/',
        movie:{},
     };

    this.titleChange = this.titleChange.bind(this);
    this.showDetails = this.showDetails.bind(this);
    this.backHome = this.backHome.bind(this);
  };

  render () {  
    return (
      <div className="search-movie">
        <form className={`search ${this.state.pathname==='/' ? 'show' : 'hide'}`} >
          <input 
          type={'search'}
          onChange={this.titleChange}
          placeholder={'Search Movie by Name'}
        />
        </form>
        <Router basename={process.env.REACT_APP_BASE_URL}>
            <Route  render={() => (
                  <div className='button-container'>
                      <div onClick={this.showDetails}  className={`movie-name ${this.state.pathname==='/' ? 'show' : 'hide'}`}  >    
                        <Link to={`${this.state.movie? this.state.movie.imdbID:'/'}`} className={`movie ${this.state.pathname==='/' ? 'show' : 'hide'}`} >{this.state.movieTitle}</Link><br />
                        <p className={`cta ${this.state.movieTitle!=='' ? 'show' : 'hide'}`}>Click the movie name for details</p>
                      </div>
 
                      <button onClick={this.backHome} className={`back-home ${this.state.pathname!=='/' ? 'show' : 'hide'}`} >    
                        <Link to='/'>Back Home</Link>
                      </button>
                  </div>
                  )
              } />
          </Router>
        <MovieDetails movie={this.state.movie} pathname={window.location.pathname} movieTitle={this.state.movieTitle} />
      </div> 
    )
  };

  showDetails () {
    this.setState(
      Object.assign(this.state, {'pathname':this.state.movie.imdbID})
    );

    //console.log("showDetails", window.location.pathname);
  };

  titleChange (e) {
    
    if (e) {
      let title = e.target.value;
      getMovie(title).then( 
        value => { 
          if (value.Title){
           this.setState({
              movieTitle: value.Title,
              searchTitle: title,
              movie:value,
              pathname: '/',
              }
            )
          } else {
            this.setState({
              movieTitle: '',
              searchTitle: title,
              movie:{},
              pathname: '/',
              }
            )
          }
        }
      ).catch(err => console.log(err));
    }
  };

  backHome () {
    this.setState(Object.assign(this.state, {pathname:'/'})
    )
  };
}

export default SearchMovie;