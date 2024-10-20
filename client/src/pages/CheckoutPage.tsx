import React, { useState } from 'react'
import Navbar from '../components/Navbar'

interface OrderItem {
    name: string
    quantity: number
    unit: string
    price: number
}

interface CheckoutFormProps {
    orderItems?: OrderItem[]
}

export const CheckoutPage: React.FC<CheckoutFormProps> = ({ orderItems = [
    { name: "Newspapers", quantity: 5, unit: "kgs", price: 50 }
] }) => {
    const [formData, setFormData] = useState({
        phone: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        instructions: ''
    })

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target
        setFormData(prevData => ({ ...prevData, [name]: value }))
    }

    const totalQuantity = orderItems.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const deliveryCharges = 50
    const grandTotal = totalPrice + deliveryCharges

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log('Form submitted:', formData)
        //Backend API.....hehey...Love u abhiii
    }

    return (
        <div className="container mx-auto p-4">
            <Navbar/>
            <div className="grid md:grid-cols-2 gap-8 pt-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="Enter your phone number"
                                pattern="[0-9]{10}"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter your email address"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                                required
                            />
                        </div>
                        <h3 className="text-2xl font-semibold mt-6 mb-4">Shipping Address</h3>
                        <div>
                            <label htmlFor="street" className="block text-sm font-medium text-gray-700">Street Address</label>
                            <input
                                type="text"
                                id="street"
                                name="street"
                                value={formData.street}
                                onChange={handleInputChange}
                                placeholder="Enter your street address"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    placeholder="Enter your city"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                                <input
                                    type="text"
                                    id="state"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    placeholder="Enter your state"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="zip" className="block text-sm font-medium text-gray-700">ZIP / Postal Code</label>
                            <input
                                type="text"
                                id="zip"
                                name="zip"
                                value={formData.zip}
                                onChange={handleInputChange}
                                pattern="[0-9]{6}"
                                placeholder="Enter your ZIP code"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none "
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Complete Order
                        </button>
                    </form>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-2xl font-semibold mb-4">Order Summary</h3>
                    <div className="space-y-4">
                        {orderItems.map((item, index) => (
                            <div key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                <span>{item.name}</span>
                                <span>{item.quantity} {item.unit} x ₹{item.price.toFixed(2)} = ₹{(item.quantity * item.price).toFixed(2)}</span>
                            </div>
                        ))}
                        <div className="border-t pt-4">
                            <div className="flex justify-between">
                                <span>Total Quantity</span>
                                <span>{totalQuantity}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Total Price</span>
                                <span>₹{totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Delivery Charges</span>
                                <span>₹{deliveryCharges.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg mt-2">
                                <span>Grand Total</span>
                                <span>₹{grandTotal.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}