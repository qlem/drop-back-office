import React, {useState} from 'react'
import { DROPPED } from '../../queries'
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import DropPin from "./dropPin";
import {useQuery} from "@apollo/react-hooks";


export default function DropMap (props) {

  const [viewport, setViewport] = useState({
    width: 800,
    height: 800,
    latitude: 0,
    longitude: 0,
    zoom: 1
  });
  const [popupInfo, setPopupInfo] = useState(undefined);
  const {loading: droppedLoading, error: droppedError, data} = useQuery(DROPPED);

  const _renderMarker = () => {
    if (data) {
      return data.dropped.map((drop, index) => {
        return (
            <Marker
                key={`marker-${index}`}
                longitude={drop.location.longitude}
                latitude={drop.location.latitude} >
              <DropPin size={20} onClick={() => setPopupInfo(drop)} />
            </Marker>
        );
      })
    }
  };

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
        >
          { _renderMarker() }
          {renderPopup()}
        </ReactMapGL>

      </div>

  )
}