import { useNavigate, useParams, useSearchParams } from "react-router-dom"

import styles from "./Map.module.css"

export default function Map() {
  const navigate = useNavigate()

  const { id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const lat = searchParams.get("lat")
  const lng = searchParams.get("lng")

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>
        Map
        <p>
          Position: {lng}, {lat}
        </p>
        <button onClick={() => setSearchParams({ lat: 23, lng: 25 })}>
          Change Position
        </button>
      </h1>
    </div>
  )
}
