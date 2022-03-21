import axios from 'axios'; 
const api = 'http://localhost:65535';

async function GetNewSeason(page: number) {
  var res = await axios.get(`${api}/NewSeasons/${page}`)
  return await res.data;
}

async function GetPopularSub(page: number) {
  const res = await axios.get(`${api}/Popular/${page}`);
  return await res.data
}

async function GetPopularDub(page: number) {
  const res = await axios.get(`${api}/PopularD/${page}`);
  return await res.data
}

async function Search(query: string) {
  var res = await axios.get(`${api}/search/${query}`)
  return await res.data;
}

async function GetAnime(_anime_name: string) {
  var res = await axios.get(`${api}/GetAnime/${_anime_name}`)
  return await res.data;
}

async function WatchAnime(episode_id: number) {
  var res = await axios.get(`${episode_id}`)
  return await res.data;
}

export {
  GetNewSeason,
  WatchAnime,
  Search,
  GetAnime,
  GetPopularSub,
  GetPopularDub
}