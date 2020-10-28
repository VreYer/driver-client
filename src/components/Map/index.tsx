import React, { useState, useEffect } from 'react'
import GoogleMapReact, { ClickEventValue } from 'google-map-react'
import Marker from '../Marker'
import { Car } from 'store/drivers/type'

interface MapProps {
    address?: string
    lat?: number
    lng?: number
    drivers?: Car[]
    noAddress?: boolean
    handleMapClick: (value: ClickEventValue) => void
}

const Map: React.FC<MapProps> = ({
    address,
    lat,
    lng,
    drivers,
    noAddress,
    handleMapClick,
}) => {
    const [center, setCenter] = useState<{ lat: number; lng: number }>({
        lat: 40.1772,
        lng: 44.50349,
    })
    const [errorMarker, setErrorMarker] = useState<{
        lat: number
        lng: number
    }>({
        lat: 0,
        lng: 0,
    })
    const [zoom] = useState<number>(14)

    const handleClick = (value: ClickEventValue) => {
        handleMapClick(value)
        setErrorMarker(value)
    }

    useEffect(() => {
        if (lat && lng) {
            setCenter({
                lat: lat,
                lng: lng,
            })
        }
    }, [lat, lng])

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: '' }}
                defaultCenter={{ lat: 40.1772, lng: 44.50349 }}
                center={center}
                defaultZoom={zoom}
                onClick={handleClick}
            >
                <Marker lat={lat} lng={lng} name={address} color="yellow" />
                {noAddress && (
                    <Marker
                        lat={errorMarker.lat}
                        lng={errorMarker.lng}
                        name={address}
                        color="red"
                    />
                )}
                {drivers &&
                    drivers.map((element) => (
                        <Marker
                            key={element.crew_id}
                            lat={element.lat}
                            lng={element.lon}
                            name={`${element.car_mark} ${element.car_model}`}
                            color="green"
                        />
                    ))}
            </GoogleMapReact>
        </div>
    )
}

export default Map
