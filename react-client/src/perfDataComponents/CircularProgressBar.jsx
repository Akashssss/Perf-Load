/* eslint-disable react/prop-types */

import { CircularProgressbar } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";


export default function CircularProgressBar({ percentage, aspect, belowText = false }) {


    const getStyles = (percent) => {
        if (percent < 25) {
            return { pathColor: "#4CAF50", trailColor: "#DFF8E1" }; // Green
        } else if (percent < 50) {
            return { pathColor: "#03A9F4", trailColor: "#D9F4FF" }; // Cyan
        } else if (percent < 75) {
            return { pathColor: "#FF9800", trailColor: "#FFE4C2" }; // Orange
        } else {
            return { pathColor: "#E91E63 ", trailColor: "#FFD9E6" }; // Pink
        }
    };

    const { pathColor, trailColor } = getStyles(percentage);
    return (
        <div className='flex justify-center items-center flex-col m-2 '>
           <div style={{width:aspect ,height:aspect}}>
           <CircularProgressbar background={true}
                value={percentage}
                maxValue={100}
                strokeWidth={10}
                text={`${percentage}%`}
                styles={{
                    path: {
                        stroke: pathColor,
                        strokeLinecap: 'butt',
                        //transform: 'rotate(0.25turn)',
                        //transformOrigin: 'center center',
                    },
                    trail: {
                        stroke: trailColor,
                        strokeLinecap: 'butt',

                    },
                    text: {
                        // Text color
                        fill: '#f88',
                        // Text size
                        fontSize: '12px',
                    },
                    background: {
                        fill: '#FFFFFF00',
                    },
                }}
            />
           </div>
            {belowText && <p className='mt-1'>Percentage: {percentage}%</p>}

        </div> 
    );
}