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
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
            <Card shadow="sm" key={itemData.id} isPressable onPress={() => console.log("item pressed")}>
                <CardBody className="overflow-visible p-0">
                    {/* Check if image exists before rendering */}
                    {itemData.image && <img src={itemData.image.url} alt={itemData.heading} />}
                </CardBody>
                <CardFooter className="text-small justify-between">
                    <b>{itemData.heading}</b>
                    {/* Check if price exists before rendering */}
                    {itemData.price && <p className="text-default-500">{itemData.price.amount} kr</p>}
                </CardFooter>
            </Card>
        </div>
    );
}