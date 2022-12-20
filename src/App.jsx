import { FormControl, FormLabel, Select, VStack } from '@chakra-ui/react'
import axios from 'axios';
import { useEffect, useState } from 'react'

const apiKey = "mIDW4OaTsKanR37IkHVN0jpfJrcedv";

function App() {
  const [idProvinsi, setIdProvinsi] = useState(null);
  const [provinsiElement, setProvinsiElement] = useState(null);
  useEffect(() => {
    callProvinsiApi(setProvinsiElement);
  }, []);

  const [idKota, setIdKota] = useState(null);
  const [kotaElement, setKotaElement] = useState(null);
  useEffect(() => {
    callKotaApi(setKotaElement, idProvinsi);
  }, [idProvinsi]);

  const [idKecamatan, setIdKecamatan] = useState(null);
  const [kecamatanElement, setKecamatanElement] = useState(null);
  useEffect(() => {
    callKecamatanApi(setKecamatanElement, idKota);
  }, [idKota]);

  const [idKelurahan, setIdKelurahan] = useState(null);
  const [kelurahanElement, setKelurahanElement] = useState(null);
  useEffect(() => {
    callKecamatanApi(setKelurahanElement, idKota);
  }, [idKecamatan]);

  const containerStyle = {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  }

  return (
    <div style={containerStyle}>
      <VStack width="50%" gap="1rem">
        <FormControl>
          <FormLabel>Provinsi</FormLabel>
          <Select placeholder="Pilih Provinsi" onChange={(e) => setIdProvinsi(e.target.value)}>
            {provinsiElement}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Kota</FormLabel>
          <Select placeholder="Pilih Kota" onChange={(e) => setIdKota(e.target.value)}>
            {kotaElement}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Kecamatan</FormLabel>
          <Select placeholder="Pilih Kecamatan" onChange={(e) => setIdKecamatan(e.target.value)}>
            {kecamatanElement}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Kelurahan</FormLabel>
          <Select placeholder="Pilih Kelurahan">
            {kelurahanElement}
          </Select>
        </FormControl>
      </VStack>
    </div>
  )
}

async function callProvinsiApi(setProvinsiElement) {
  const result = await axios.get(`https://api.goapi.id/v1/regional/provinsi?api_key=${apiKey}`)
  const element = result.data.data.map((value) => (<option value={value.id}>{value.name}</option>))
  setProvinsiElement(element);
}

async function callKotaApi(setKotaElement, provinsiId) {
  const result = await axios.get(`https://api.goapi.id/v1/regional/kota?api_key=${apiKey}&provinsi_id=${provinsiId}`)
  const element = result.data.data.map((value) => (<option value={value.id}>{value.name}</option>))
  setKotaElement(element);
}

async function callKecamatanApi(setKelurahanElement, kotaId) {
  const result = await axios.get(`https://api.goapi.id/v1/regional/kecamatan?api_key=${apiKey}&kota_id=${kotaId}`)
  const element = result.data.data.map((value) => (<option value={value.id}>{value.name}</option>))
  setKelurahanElement(element);
}

export default App