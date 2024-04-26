import { TouchableOpacity, Image } from 'react-native'
import React from 'react'

const Checkbox = ({checked,setChecked}) => {
  return (
    <TouchableOpacity onPress={()=>setChecked && setChecked(!checked)}>
    {checked ? <Image contentFit='cover' style={{width:20,height:20}} source={require('../assets/checked.png')}/> : <Image contentFit='cover' style={{width:20,height:20}} source={require('../assets/notchecked.png')}/>}
  </TouchableOpacity>
  )
}

export default Checkbox