import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addressRequest } from 'store/app/actions'
import { AppState } from 'store/rootReducer'
import Map from 'components/Map'
import { Car } from 'store/drivers/type'
import { ClickEventValue } from 'google-map-react'
import { orderCreate } from 'store/order/actions'
import { formatDate } from 'utils/utlis'

const Home = () => {
    const [address, setAddress] = useState<string>('')
    const [noAddress, setNoAddress] = useState<boolean>(false)
    const [crow, setCrow] = useState<Car>()
    const [submit, setSubmit] = useState<boolean>(false)

    const dispatch = useDispatch()
    const {
        coordinates,
        address: responseAddress,
        error: addressError,
    } = useSelector<AppState, any>((state) => state.app)

    const { data: drivers } = useSelector<AppState, any>(
        (state) => state.drivers
    )

    const { error: orderError, data: order } = useSelector<AppState, any>(
        (state) => state.order
    )

    useEffect(() => {
        if (drivers.length > 0) {
            setCrow(drivers[0])
        }
    }, [drivers])

    useEffect(() => {
        addressError ? setNoAddress(true) : setNoAddress(false)
        setAddress(responseAddress)
    }, [addressError, responseAddress, setNoAddress])

    const handleSubmit = () => {
        setSubmit(true)
        if (responseAddress === '' || !crow) {
            // show error
            return
        }

        dispatch(
            orderCreate({
                source_time: formatDate(),
                crew_id: crow.crew_id,
                addresses: [
                    {
                        address: responseAddress.address,
                        lat: coordinates.lat,
                        lng: coordinates.lng,
                    },
                ],
            })
        )
        setSubmit(false)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setSubmit(false)
        if (address === '') {
            return
        }
        dispatch(addressRequest(0, address))
    }

    const handleMapClick = (locations: ClickEventValue) => {
        setSubmit(false)
        const location = `${locations.lat},${locations.lng}`
        dispatch(addressRequest(1, location))
    }

    return (
        <div className="h-100 row w-100">
            <div className="col-6 h-100 p-5 d-flex flex-column">
                {addressError && (
                    <div className="alert alert-danger" role="alert">
                        {addressError}
                    </div>
                )}
                {orderError && (
                    <div className="alert alert-danger" role="alert">
                        {orderError}
                    </div>
                )}
                {order.order_id && (
                    <div className="alert alert-success" role="alert">
                        Order created successfully
                    </div>
                )}
                <div>
                    <div className="form-group">
                        <label htmlFor="from">From</label>
                        <input
                            type="text"
                            className={`form-control ${
                                submit && (addressError || !address)
                                    ? 'error-input'
                                    : ''
                            }`}
                            id="from"
                            value={address}
                            placeholder="Street, Number (Abovyan Street, 18)"
                            onChange={(e) => setAddress(e.target.value)}
                            onBlur={handleBlur}
                        />
                        {submit && (addressError || !address) && (
                            <div className="inval-feedback">
                                This place is required
                            </div>
                        )}
                    </div>
                    {crow && (
                        <div className="list-group mb-3">
                            <div className="list-group-item list-group-item-action flex-column align-items-start">
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">
                                        {crow.car_color} {crow.car_mark}{' '}
                                        {crow.car_model}
                                    </h5>
                                    <small>{crow.distance} (m)</small>
                                </div>
                                <p className="mb-1">
                                    {crow.driver_name} {crow.driver_phone}
                                </p>
                            </div>
                        </div>
                    )}
                    <button
                        onClick={handleSubmit}
                        type="button"
                        className="btn btn-primary"
                        disabled={addressError ? true : false}
                    >
                        Order
                    </button>
                </div>
                <div className="dropdown-divider mt-4 mb-4"></div>

                {drivers && (
                    <ul className="list-group mt-3">
                        {drivers.map((driver: Car) => (
                            <li
                                key={driver.crew_id}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                {driver.car_color} {driver.car_mark}{' '}
                                {driver.car_model}
                                <span className="badge badge-primary badge-pill">
                                    {driver.distance} (m)
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="col-6 h-100">
                <Map
                    handleMapClick={handleMapClick}
                    lat={coordinates?.lat}
                    lng={coordinates?.lng}
                    drivers={drivers}
                    noAddress={noAddress}
                />
            </div>
        </div>
    )
}

export default Home
