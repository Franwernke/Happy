import React, { useEffect, useState } from 'react';

import '../styles/pages/orphanages-map.css';

import mapIcon from '../utils/mapIcon';
import mapMarkerImg from '../images/map-marker.svg';
import { FiPlus, FiArrowRight } from 'react-icons/fi';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import api from '../services/api';

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

function OrphanagesMap() {
    const [ orphanages, setOrphanages ] = useState<Orphanage[]>([]);
        
    useEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data);
        })
    }, [])

    return (
        <div id="page-map">
            <aside>
                <header>
                    <Link to="/">
                        <img src={mapMarkerImg} alt="Happy"/>
                    </Link>

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong> São Paulo </strong>
                    <span> São Paulo </span>
                </footer>
            </aside>

            <MapContainer
                center={[-23.5524134,-46.6134788]}
                zoom={15}
                style={{width: "100%", height: "100%"}}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                
                {orphanages.map(orphanage => {
                    return (
                        <Marker
                            icon={mapIcon}
                            position={[orphanage.latitude ,orphanage.longitude ]}
                            key={orphanage.id}
                        >
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                {orphanage.name}
                                <Link to={`/orphanages/${orphanage.id}`}>
                                    <FiArrowRight size={20} color="#FFF"></FiArrowRight>
                                </Link>
                            </Popup>
                        </Marker>
                    )
                })}
            </MapContainer>

            <Link to='/orphanages/create' className="create-orphanage">
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div>
    );
}

export default OrphanagesMap;