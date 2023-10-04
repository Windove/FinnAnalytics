import React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";

// Define the interface for the FinnItem component
interface FinnItemProps {
    itemData: {
        heading: string;
        id: number;
        image?: {
            url: string;
        }
        price?: {
            amount: number;
        }
    }
}

export const FinnItem: React.FC<FinnItemProps> = ({ itemData }) => {
    return (
        <div>
            <Card
                shadow="sm"
                key={itemData.id}
                isPressable onPress={() => console.log("item pressed")}
                style={{ width: '300px', height: '400px' }}
            >
                <CardBody className="overflow-visible p-0 h-5/6">
                    {/* Check if image exists before rendering */}
                    {
                        itemData.image &&
                        <img
                            src={itemData.image.url}
                            alt={itemData.heading}
                            className='w-full h-full object-cover'
                        />}
                </CardBody>
                <CardFooter className="text-small justify-between h-1/6 overflow-hidden">
                    <b className="whitespace-nowrap overflow-hidden text-overflow-ellipsis">{itemData.heading}</b>
                    {/* Check if price exists before rendering */}
                    {itemData.price && <p className="whitespace-nowrap overflow-hidden text-overflow-ellipsis text-default-500">{itemData.price.amount} kr</p>}
                </CardFooter>
            </Card>
        </div>
    );
}