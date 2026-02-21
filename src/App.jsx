import './index.css';
import Prayer from './component/prayer';
import { useEffect, useState } from 'react';
import { cities } from './component/data';

function App() {

  const [prayerTimes, setPrayerTimes] = useState({})
  const [dateTime, setDateTime] = useState("")
  const [city, setCity] = useState("Cairo")
  const [allCities,setAllCities] = useState(cities)




  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Egypt&method=5`);
        const data_prayer = await response.json()
        console.log(data_prayer.data.timings);
        

        setPrayerTimes(data_prayer.data.timings)
        setDateTime(data_prayer.data.date.gregorian.date)
      }
      catch (error) {
        console.error(error);
      }
    }

    fetchPrayerTimes()
  }, [city])


  const formatTimes = (time) => {
    if (!time) {
      return "00:00"
    }

    let [hours, minutes] = time.split(":").map(Number)
    const perd = hours >= 12 ? "PM" : "AM"
    hours = hours % 12 || 12
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${perd}`
  }


  return (
    <section>
      <div className="container">
        <div className="top_sec">
          <div className="city">
            <h3>المدينه</h3>
            <select onChange={(e) => setCity(e.target.value)}>
              {allCities.map((city_Obj) => (
                <option key={city_Obj.value} value={city_Obj.value}>{city_Obj.name}</option>
              ))}
            </select>
          </div>
          <div className="date">
            <h3>التاريخ</h3>
            <h4>{dateTime}</h4>
          </div>
        </div>

        <Prayer name="الفجر" time={formatTimes(prayerTimes.Fajr)} />
        <Prayer name="الظهر" time={formatTimes(prayerTimes.Dhuhr)} />
        <Prayer name="العصر" time={formatTimes(prayerTimes.Asr)} />
        <Prayer name="المغرب" time={formatTimes(prayerTimes.Maghrib)} />
        <Prayer name="العشاء" time={formatTimes(prayerTimes.Isha)} />

      </div>
    </section>
  );
}

export default App;
