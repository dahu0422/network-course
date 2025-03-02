import { useNavigate } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { useGeolocation } from "@/hooks/useGeolocation"
import useUrlPosition from "@/hooks/useUrlPosition"
import { useCities } from "@/contexts/CitiesContext"

import AMapLoader from "@amap/amap-jsapi-loader"
import Button from "@/components/Button"

import styles from "./Map.module.css"

export default function Map() {
  const mapRef = useRef(null)
  const navigate = useNavigate()
  const { cities } = useCities()
  const [mapPosition, setMapPosition] = useState({ lat: 0, lng: 0 })
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation()
  const [mapLat, mapLng] = useUrlPosition()

  function detectClick({ lat, lng }) {
    navigate(`form?lat=${lat}&lng=${lng}`)
  }

  useEffect(() => {
    if (cities.length === 0) return // 如果 cities 为空，则不执行地图初始化逻辑
    window._AMapSecurityConfig = {
      securityJsCode: "8679ae5f87fcadc81fd97be150999c52",
    }
    AMapLoader.load({
      key: "2ef4a96cfd68274daf2efe76a3092656",
      version: "2.0",
      plugins: [],
    })
      .then((AMap) => {
        mapRef.current = new AMap.Map("mapContainer", {
          viewMode: "3D",
          zoom: 11,
          center: [
            mapPosition.lat || 116.3912757,
            mapPosition.lng || 39.906217,
          ],
        })
        mapRef.current.on("click", (e) =>
          detectClick({ lat: e.lnglat.lat, lng: e.lnglat.lng })
        )
        //构造点标记
        cities.forEach((city) => {
          const { lat, lng } = city.position
          var marker = new AMap.Marker({
            icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
            position: [lng, lat],
          })
          //单独将点标记和矢量圆形添加到地图上
          mapRef.current.add(marker)
        })
      })
      .catch((e) => {
        console.log(e)
      })
    return () => {
      mapRef.current?.destroy()
    }
  }, [cities])

  // 当 mapLat 或 mapLng 变化时，设置地图中心点
  useEffect(() => {
    if (mapRef.current && mapLng && mapLat) {
      mapRef.current.setCenter([mapLng, mapLat])
      if (mapLat && mapLng) setMapPosition({ lat: mapLat, lng: mapLng })
    }
  }, [mapLng, mapLat])

  useEffect(() => {
    if (geolocationPosition) {
      mapRef.current.setCenter([
        geolocationPosition.lng,
        geolocationPosition.lat,
      ])
    }
  }, [geolocationPosition])

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button onClick={getPosition} type="position">
          {isLoadingPosition ? "Loading..." : "Use Your Position"}
        </Button>
      )}
      <div style={{ height: "100%" }} id="mapContainer"></div>
    </div>
  )
}
