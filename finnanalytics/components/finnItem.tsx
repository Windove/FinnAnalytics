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
        canonical_url: string;
    }
}

export const FinnItem: React.FC<FinnItemProps> = ({ itemData }) => {
    return (
        <div>
            <Card
                shadow="sm"
                key={itemData.id}
                isPressable onPress={() => window.open(itemData.canonical_url, '_blank')}
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
                <CardFooter className="grid grid-cols-[4fr,1fr] gap-2 text-small h-1/6 overflow-hidden">
                    <div className="whitespace-nowrap overflow-hidden text-overflow-ellipsis w-full text-left">
                        <b className="whitespace-nowrap overflow-hidden text-overflow-ellipsis">{itemData.heading}</b>
                    </div>
                    <div className='m-0 p-0 justify-self-end'>
                        {itemData.price && <p className="whitespace-nowrap overflow-hidden text-overflow-ellipsis text-default-500 justify-self-end">{itemData.price.amount} kr</p>}
                    </div>
                </CardFooter>

            </Card>
        </div>
    );
}