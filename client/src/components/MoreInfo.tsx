import { useState } from "react";

interface Props {
    name: string;
    description: string;
    price: Number;
    image: string;
    stock_left: Number;
    weight: string;
    colour: string;
    material: string;
}

const MoreInfo = ({ name, description, price, image, material, stock_left, weight, colour }: Props) => {

    const [quantity, setQuantity] = useState(1);

    const handleIncrease = () => {
        setQuantity((prev) => prev + 1);
    };

    const handleDecrease = () => {
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    };

    return (
        <>
            <div className="flex md:flex-row m-28">
                <div className="py-20 px-16 pr-16 flex-1 w-full md:w-1/2 lg:w-1/2 flex">
                    <img
                        src={image}
                        className="w-full h-full aspect-square object-cover border border-gray-300"
                        alt={name}
                    />
                </div>

                <div className="py-36 pr-8 flex-1 w-full md:w-1/2 lg:w-[40%] max-w-lg flex flex-col">
                    <div className="my-2 font-bold text-3xl">{name}</div>
                    <div className="my-2 text-xl max-w-full break-words">{description}</div>
                    <hr className="my-4 border-gray-400" />

                    <div className="my-2 font-bold text-2xl">₹ {price.toString()}</div>
                    <hr className="my-4 border-gray-400" />
                    <div className="flex items-center my-2">
                        <div className="font-bold pr-4">Quantity : </div>
                        <button onClick={handleDecrease} className="bg-white text-black px-3 py-1 border">
                            -
                        </button>
                        <span className="mx-2">{quantity}</span>
                        <button onClick={handleIncrease} className="bg-white text-black px-3 py-1 border">
                            +
                        </button>
                    </div>
                    <hr className="my-4 border-gray-400" />

                    <div className="my-2 text-lg">
                        <span className="font-bold">Items left in stock : </span>
                        {stock_left.toString()}
                    </div>
                    <div className="my-2 text-lg">
                        <span className="font-bold">Colour : </span>
                        {colour}
                    </div>
                    <div className="my-2 text-lg">
                        <span className="font-bold">Weight : </span>
                        {weight}
                    </div>
                    <div className="my-2 text-lg">
                        <span className="font-bold">Material : </span>
                        {material}
                    </div>
                    <hr className="my-4 border-gray-400" />

                    <div>
                        <button className="mb-2 h-11 w-full rounded-md bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">Buy now</button>
                    </div>
                    <div>
                        <button className="mb-2 h-11 w-full rounded-md bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">Add to Cart</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MoreInfo;