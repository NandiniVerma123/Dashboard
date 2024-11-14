import jsVectorMap from 'jsvectormap';
import 'jsvectormap/dist/css/jsvectormap.css';
import { useEffect } from 'react';
import '../../js/us-aea-en';

const MapOne = () => {
  useEffect(() => {
    const mapOne = new jsVectorMap({
      selector: '#mapOne',
      map: 'us_aea_en',
      zoomButtons: true,

      regionStyle: {
        initial: {
          fill: '#A6E3E9', 
          stroke: '#3B82F6', 
          "stroke-width": 1,
          fillOpacity: 0.9,
        },
        hover: {
          fillOpacity: 1,
          fill: '#FF5733',
        },
        selected: {
          fill: '#FFD700', 
        },
        selectedHover: {
          fill: '#FFAA00', 
        },
      },
      
      regionLabelStyle: {
        initial: {
          fontFamily: 'Arial, sans-serif',
          fontSize: '12px',
          fontWeight: 'bold',
          fill: '#2F4F4F', 
        },
        hover: {
          cursor: 'pointer',
          fontSize: '13px',
          fill: '#FFFFFF',
        },
      },

      labels: {
        regions: {
          render(code: string) {
            return code.split('-')[1];
          },
        },
      },
    });

    return () => {
      mapOne && mapOne.destroy(); 
    };
  }, []);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-7">
      <h4 className="mb-2 text-xl font-semibold text-black dark:text-white">
       World Map
      </h4>
      <div id="mapOne" className="mapOne map-btn h-90"></div>
    </div>
  );
};

export default MapOne;
