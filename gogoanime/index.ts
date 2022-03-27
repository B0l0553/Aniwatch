import axios from 'axios'; 
const api = 'http://192.168.1.81:65535';

const config = {
  headers: { 'Key': 'b252d1fe1c0c16d001027c2fce9b6529' }
}

async function GetNewSeason(page: number) {
  var res = await axios.get(`${api}/NewSeasons/${page}`, config)
  return await res.data;
}

async function GetPopularSub(page: number) {
  const res = await axios.get(`${api}/Popular/${page}`, config);
  return await res.data
}

async function GetPopularDub(page: number) {
  const res = await axios.get(`${api}/PopularD/${page}`, config);
  return await res.data
}

async function Search(query: string) {
  var res = await axios.get(`${api}/search/${query}`, config)
  return await res.data
}

async function GetAnime(_anime_name: string) {
  var res = await axios.get(`${api}/getanime/${_anime_name}`, config)
  return await res.data
}

async function WatchAnime(episode_id: string) {
  var res = await axios.get(`${api}/getEpisode/${episode_id}`, config)
  return await res.data
}

export {
  GetNewSeason,
  WatchAnime,
  Search,
  GetAnime,
  GetPopularSub,
  GetPopularDub
}