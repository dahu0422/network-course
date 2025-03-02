// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import { useEffect, useState } from "react"
import useUrlPosition from "@/hooks/useUrlPosition"

import Button from "./Button"
import BackButton from "./BackButton"

import styles from "./Form.module.css"

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt())
  return String.fromCodePoint(...codePoints)
}

const BASE_URL = "https://restapi.amap.com/v3/geocode/regeo"
const key = "b09251ce5fd7c9139cfeb49cc14cad33"

function Form() {
  const [lat, lng] = useUrlPosition()
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false)
  const [cityName, setCityName] = useState("")
  const [country, setCountry] = useState("")
  const [date, setDate] = useState(new Date())
  const [notes, setNotes] = useState("")

  useEffect(() => {
    async function fetchCity() {
      try {
        setIsLoadingGeocoding(true)
        const res = await fetch(`${BASE_URL}?key=${key}&location=${lng},${lat}`)
        const data = await res.json()
        setCountry(data.regeocode.addressComponent.country)
        setCityName(data.regeocode.addressComponent.province)
      } catch (error) {
        console.error("There was an error loading data")
      } finally {
        setIsLoadingGeocoding(false)
      }
    }
    fetchCity()
  }, [lat, lng])

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  )
}

export default Form
