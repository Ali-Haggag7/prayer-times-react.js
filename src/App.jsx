import './index.css';
import Prayer from './component/prayer';
import { useEffect, useState } from 'react';

function App() {

  const [prayerTimes, setPrayerTimes] = useState({})
  const [dateTime, setDateTime] = useState("")
  const [city, setCity] = useState("Cairo")



  const cities = [  
    { name: "القاهرة", value: "Cairo" },
    { name: "الاسكندرية", value: "Alexandria" },
    { name: "الجيزة", value: "Giza" },
    { name: "المنصورة", value: "Mansoura" },
    { name: "أسوان", value: "Aswan" },
    { name: "قنا", value: "Qena" },
    { name: "الأقصر", value: "Luxor" },
    { name: "القليوبية", value: "Qalyubia" },
    { name: "الشرقية", value: "Sharqia" },
    { name: "الدقهلية", value: "Dakahlia" },
    { name: "البحيرة", value: "Beheira" },
    { name: "المنيا", value: "Minya" },
    { name: "المنوفية", value: "Menoufia" },
    { name: "الغربية", value: "Gharbia" },
    { name: "الفيوم", value: "Fayoum" },
    { name: "أسيوط", value: "Asyut" },
    { name: "سوهاج", value: "Sohag" },
    { name: "بني سويف", value: "Beni Suef" },
    { name: "كفر الشيخ", value: "Kafr El Sheikh" },
    { name: "الاسماعيلية", value: "Ismailia" },
    { name: "دمياط", value: "Damietta" },
    { name: "بورسعيد", value: "Port Said" },
    { name: "السويس", value: "Suez" },
    { name: "البحر الاحمر", value: "Red Sea" },
    { name: "الوادي الجديد", value: "New Valley" },
    { name: "مطروح", value: "Matrouh" },
    { name: "شمال سيناء", value: "North Sinai" },
    { name: "جنوب سيناء", value: "South Sinai" },
  ]



  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch(`https:api.aladhan.com/v1/timingsByCity/time=${dateTime}?city=${city}&country=Egypt&method=5`);
        const data_prayer = await response.json()

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
              {cities.map((city_Obj) => (
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
