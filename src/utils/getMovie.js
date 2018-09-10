import config from '../config';

export async function getMovie(title)
{
  let response = await fetch(config.api.getMovieUrl + '&t=' + title);
  let json = await response.json();
  return json;
}

export async function getImage(title)
{
  let response = await fetch(title);
  return response;
}
