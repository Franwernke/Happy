import React, { FormEvent, useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import { LeafletMouseEvent }from 'leaflet';

import { FiPlus } from "react-icons/fi";

import Sidebar from '../components/Sidebar'
import mapIcon from '../utils/mapIcon';

import '../styles/pages/create-orphanage.css';

export default function CreateOrphanage() {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpening_Hours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);

  
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  function HandleMapClick() {
    useMapEvents({
      click: (event : LeafletMouseEvent) => {
        const { lat, lng } = event.latlng;        
        
        setPosition({
          latitude: lat,
          longitude: lng,
        })
      }
    });
    return null;
  }

  function handleSubmit (event: FormEvent) {
    event.preventDefault();

    console.log({
      position,
      name,
      about,
      instructions,
      opening_hours
    })
  }

  return (
    <div id="page-create-orphanage">

      <Sidebar></Sidebar>

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <MapContainer 
              center={[-23.5524134,-46.6134788]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
            >
              <TileLayer 
                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              { position.latitude !== 0 && (
                <Marker 
                  interactive={false} 
                  icon={mapIcon} 
                  position={[position.latitude, position.longitude]} 
                />
              )}

              <HandleMapClick/>
              
            </MapContainer>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input 
                id="name" 
                value={name} 
                onChange={event => setName(event.target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea 
                id="name" 
                maxLength={300} 
                value={about} 
                onChange={event => setAbout(event.target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="uploaded-image">

              </div>

              <button className="new-image">
                <FiPlus size={24} color="#15b6d6" />
              </button>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea 
                id="instructions"
                value={instructions}
                onChange={event => setInstructions(event.target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de Funcionamento</label>
              <input 
                id="opening_hours" 
                value={opening_hours} 
                onChange={event => setOpening_Hours(event.target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                  type="button" 
                  onClick={(event) => setOpenOnWeekends(false)} 
                  className={!open_on_weekends ? 'active' : ''}
                >
                  Sim
                </button>
                <button 
                  type="button" 
                  onClick={(event) => setOpenOnWeekends(true)} 
                  className={open_on_weekends ? 'active not' : ''}
                  >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
