import React, { useEffect, useState } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

const Maps = ({ onClose, setLocation }) => {
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    if (searchValue) {
      setLocation(searchValue)
      onClose()
    }
  }, [searchValue])

  return (
    <GooglePlacesAutocomplete
      placeholder={'Buscar'}
      query={{
        key: 'AIzaSyBH0Ey-G2PbWkSCLyGG1A9TCg9LDPlzQpc',
        language: 'es'
      }}
      enablePoweredByContainer={false}
      styles={{ container: { width: '90%', height: '100%', top: 30 } }}
      fetchDetails={true}
      onPress={(data, details = null) => {
        setSearchValue(data.description)
      }}
      onFail={(error) => console.log(error)}
      requestUrl={{
        url: 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
        useOnPlatform: 'web'
      }}
    />
  )
}

export default Maps
