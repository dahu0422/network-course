// import { useParams, useSearchParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useCities } from "@/contexts/CitiesContext"
import AMapLoader from "@amap/amap-jsapi-loader"

import styles from "./Map.module.css"

export default function Map() {
  let map = null
  const { cities } = useCities()
  console.log(cities)

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
        map = new AMap.Map("mapContainer", {
          viewMode: "3D",
          zoom: 11,
          center: [116.3912757, 39.906217],
        })
        //构造点标记
        cities.forEach((city) => {
          const { lat, lng } = city.position
          var marker = new AMap.Marker({
            icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
            position: [lng, lat],
          })
          //单独将点标记和矢量圆形添加到地图上
          map.add(marker)
        })
      })
      .catch((e) => {
        console.log(e)
      })
    return () => {
      map?.destroy()
    }
  }, [cities]) // 添加 cities 作为依赖项

  return <div className={styles.mapContainer} id="mapContainer" />
}
