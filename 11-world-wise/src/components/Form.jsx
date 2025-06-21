// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import { useEffect, useState } from "react"
import { useCities } from "../contexts/CitiesContext"
import useUrlPosition from "@/hooks/useUrlPosition"
import { useNavigate } from "react-router-dom"

import Button from "./Button"
import BackButton from "./BackButton"
import Spinner from "./Spinner"
import Message from "./Message"
import Datepicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"
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
  const { createCity, isLoading } = useCities()

  const navigator = useNavigate()

  useEffect(() => {
    async function fetchCity() {
      if (!lat || !lng) return
      try {
        setIsLoadingGeocoding(true)
        const res = await fetch(`${BASE_URL}?key=${key}&location=${lng},${lat}`)
        const data = await res.json()
        setCountry(data.regeocode.addressComponent.country)
        setCityName(data.regeocode.addressComponent.province)
      } catch (error) {
        console.error("There was an error loading data", error)
      } finally {
        setIsLoadingGeocoding(false)
      }
    }
    fetchCity()
  }, [lat, lng])

  async function handleSubmit(e) {
    if (!cityName || !date) return
    e.preventDefault()

    const newCity = { cityName, country, date, notes, position: { lat, lng } }
    createCity(newCity)
    await navigator("/app/cities")
  }

  if (isLoadingGeocoding) return <Spinner />

  if (!lat && !lng)
    return <Message message="Start by clicking somewhere on the map" />

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
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
        <Datepicker
          selected={date}
          onChange={(e) => setDate(e.target.value)}
          dateFormat="dd/MM/yyyy"
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
