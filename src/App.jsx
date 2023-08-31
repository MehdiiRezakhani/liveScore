import React, { useEffect, useState} from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
//components
import Header from './components/header';
import Container from './components/Container';

export const GamesContext = React.createContext()
export const DateContext = React.createContext()
export const SearchContext = React.createContext()

export default function App() {
  const getData = async (date) => {
    const {data ,status} = await axios.get(`https://core-sport-api.zarebin.ir/api/football/fixtures/?date=${date}`)
    if(status === 200 || status === 201) return data
    return {}
  }
  const [gamesData, setGamesData] = useState({});
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const dateValue = {date, setDate}
  const [search ,setSearch] = useState("")
  const searchValue = {search, setSearch}
  useEffect(() => {
    getData(date).then((data) => {
      setGamesData(data)
    }).catch(
      toast.error("خطا در دریافت اطلاعات")
    )
  } ,[date])

  return (
    <div className='appContainer'>
      <GamesContext.Provider value={gamesData} >
        <DateContext.Provider value={dateValue} >
          <SearchContext.Provider value={searchValue}>
            <Header/>
            <Container/>
          </SearchContext.Provider>
        </DateContext.Provider>
      </GamesContext.Provider>
    </div>
  )
}
