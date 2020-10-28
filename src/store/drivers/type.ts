export interface InfoData {
    source_time: string
    addresses: [
        {
            address: string
            lat: number
            lng: number
        }
    ]
}

export interface Car {
    crew_id: number
    car_mark: string
    car_model: string
    car_color: string
    car_number: string
    driver_name: string
    driver_phone: number
    lat: number
    lon: number
    distance: number
}
