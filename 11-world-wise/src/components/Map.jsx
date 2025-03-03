import { useNavigate } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { useGeolocation } from "@/hooks/useGeolocation"
import useUrlPosition from "@/hooks/useUrlPosition"
import { useCities } from "@/contexts/CitiesContext"

import AMapLoader from "@amap/amap-jsapi-loader"
import Button from "@/components/Button"

import styles from "./Map.module.css"

export default function Map() {
  const navigate = useNavigate()
  const mapRef = useRef(null)
  const { cities } = useCities()
  const [mapInstance, setMapInstance] = useState(null); // 地图实例
  const [markerInstances, setMarkerInstances] = useState([]); // 覆盖物实例
  const [mapPosition, setMapPosition] = useState({ lat: 0, lng: 0 })
  const { isLoading: isLoadingPosition, position: geolocationPosition, getPosition } = useGeolocation()
  const [mapLat, mapLng] = useUrlPosition()

  function detectClick({ lat, lng }) {
    navigate(`form?lat=${lat}&lng=${lng}`)
  }

  useEffect(() => {
    window._AMapSecurityConfig = {
      securityJsCode: "8679ae5f87fcadc81fd97be150999c52",
    }

    AMapLoader.load({
      key: "2ef4a96cfd68274daf2efe76a3092656",
      version: "2.0",
      plugins: [],
    })
      .then((AMap) => {
        const map = new AMap.Map(mapRef.current, {
          viewMode: "3D",
          zoom: 11,
          center: [ mapPosition.lng || 116.3912757, mapPosition.lat || 39.906217 ],
        })
        setMapInstance(map);

        map.on("click", (e) =>
          detectClick({ lat: e.lnglat.lat, lng: e.lnglat.lng })
        )
      })
      .catch((e) => {
        console.log(e)
      })
    return () => {
      mapInstance?.destroy()
    }
  }, [])

  // 更新覆盖物
  useEffect(() => {
    if(!mapInstance || !cities) return

    // 清除旧覆盖物
    markerInstances.forEach((marker) => {
      mapInstance.remove(marker)
    })

    // 添加新的覆盖物
    const newMarkers = cities.map((city) => {
      const {lat, lng} = city.position
      return new AMap.Marker({
        icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
        position: [lng, lat],
      })
    })

    // 将覆盖物添加到地图上
    newMarkers.forEach((marker) => mapInstance.add(marker))

    // 更新覆盖物实例
    setMarkerInstances(newMarkers);
  }, [cities, mapInstance])

  // 当 mapLat 或 mapLng 变化时，设置地图中心点
  useEffect(() => {
    if (mapInstance && mapLng && mapLat) {
      mapInstance.setCenter([mapLng, mapLat])
      if (mapLat && mapLng) setMapPosition({ lat: mapLat, lng: mapLng })
    }
  }, [mapLng, mapLat])

  useEffect(() => {
    if (geolocationPosition) {
      mapInstance.setCenter([ geolocationPosition.lng, geolocationPosition.lat])
    }
  }, [geolocationPosition, mapInstance])

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button onClick={getPosition} type="position">
          {isLoadingPosition ? "Loading..." : "Use Your Position"}
        </Button>
      )}
      <div style={{ height: "100%" }} ref={mapRef}></div>
    </div>
  )
}
