import React from 'react';

// Define the interface for the FinnItem component
interface FinnItemProps {
    itemData: {
        heading: string;
    }
}

export const FinnItem: React.FC<FinnItemProps> = ({ itemData }) => {
    return (
        <div className="finn-item">
          <h4>{itemData.heading}</h4>
          {/* Render other item properties here */}
        </div>
      );
}