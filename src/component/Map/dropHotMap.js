import React, {useState} from 'react'
import {DROPPED} from '../../queries'
import ReactMapGL, {Marker, Popup, Source, Layer} from 'react-map-gl';
import {heatmapLayer, circleLayer} from './heatMapStyle'
import {useQuery} from "@apollo/react-hooks";

export default function DropHotMap (props) {

  const [viewport, setViewport] = useState({
    width: 850,
    height: 850,
    latitude: 0,
    longitude: 0,
    zoom: 1
  });
  const [popupInfo, setPopupInfo] = useState(undefined);
  const [data, setData] = useState(undefined);

  const {loading: droppedLoading, error: droppedError, data: dropped} = useQuery(DROPPED,{
    onCompleted: async ({ dropped }) => {
      setData({
          type: 'FeatureCollection',
          features: dropped.map((drop, index) => {
            return ({type: 'Feature', geometry: {type: 'Point', coordinates: [drop.location.longitude, drop.location.latitude]}});
          })
      });
    }
  });

  const renderPopup = () => {
    return popupInfo && (
        <Popup tipSize={5}
               anchor="top"
               longitude={popupInfo.location.longitude}
               latitude={popupInfo.location.latitude}
               closeOnClick={false}
               onClose={() => setPopupInfo(undefined)} >
            <div style={{minWidth: 100}}>
              <p>Drop: {popupInfo.text}</p>
              <p>Author: {popupInfo.author.username}</p>
              <p>Likes: {popupInfo.likeCount}</p>
              <p>Dislikes: {popupInfo.dislikeCount}</p>
            </div>
        </Popup>
    );
  };

  return (
      <div className="pa4 flex justify-center">
        <ReactMapGL
            {...viewport}
            onViewportChange={(viewport) => setViewport(viewport)}
            mapboxApiAccessToken={'pk.eyJ1IjoidWdvYmFsZGluIiwiYSI6ImNqdnRjbnJhYjBqbTE0NnBtZGEybDh3MXQifQ.ToxXU_JQcUS1zR-wxl7sbQ'}
            mapStyle="mapbox://styles/mapbox/dark-v9">
            {data && (
                <Source type="geojson" data={data}>
                    <Layer {...heatmapLayer} />
                    <Layer {...circleLayer} onClick={dd => console.log(dd)}/>
                </Source>
            )}
          {renderPopup()}
        </ReactMapGL>

      </div>

  )
}