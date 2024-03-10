import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axious from 'axios'
import app from '../../../api'

const BASE_URL = 'http://127.0.0.1:8000'

function Menu() {
    const { restaurant_name } = useParams()
    const [menues, setMenues] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    async function fetchMenu(restaurant_name) {
        try {
            setIsLoading(true);
            const response = await app.get(`${BASE_URL}/${restaurant_name}`)
            setMenues(response.data)
        }
        catch (error) {
            console.log('error', error)
        }
        finally {
            setIsLoading(false);
        }
    }

    async function deleteMenu(name_menu) {
        try {
            setIsLoading(true)
            await app.delete(`${BASE_URL}/${restaurant_name}/${name_menu}`)
            await fetchMenu(restaurant_name)
        } catch (error) {
            console.log('error', error)
        }
        finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchMenu(restaurant_name)
    }
        , [])

    return (
        <>
            <section className="grid place-items-center bg-emerald-900 p-16 min-h-screen">
                {isLoading && (<p className="border border-gray-200 p-10 rounded-md bg-white flex flex-col justify-center items-centertext-2xl font-bold mb-1">Loading..</p>)}
                {!isLoading && <div>
                    {
                        menues.map((menu, index) => (
                            <div key={index} className="border border-gray-200 p-10 mb-4 rounded-md bg-white flex flex-col justify-center items-center">
                                <h2 className="text-2xl font-bold mb-2">{menu._Food__name}</h2>
                                <p className="font-bold mb-1">
                                    Type : {menu._Food__type}
                                </p>
                                <div>
                                    {Object.entries(menu._Food__size).map(([key, value]) => (
                                        <div className="table-row" key={key}>
                                            <div>{key} +{value}</div>
                                        </div>
                                    ))}
                                </div>
                                <p className="font-bold mb-1">
                                    Price : {menu._Food__price}
                                </p>
                                <button class="bg-green-600 text-white px-4 py-2 rounded mb-2">Edit</button>
                                <button class="bg-red-600 text-white px-4 py-2 rounded"
                                    onClick={async () => {
                                        await deleteMenu(menu._Food__name)
                                    }}
                                >Delete</button>
                            </div>
                        ))}
                </div>}
            </section>
        </>
    )
}

export default Menu