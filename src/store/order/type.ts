export interface InfoData {
    source_time: string
    crew_id: number
    addresses: [
        {
            address: string
            lat: number
            lng: number
        }
    ]
}

export interface Order {
    order_id: number
}
