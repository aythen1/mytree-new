import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Badge1 from '../../assets/Badge_01.svg'
import Badge2 from '../../assets/Badge_02.svg'
import Badge3 from '../../assets/Badge_03.svg'
import Badge4 from '../../assets/Badge_04.svg'
import Badge5 from '../../assets/Badge_05.svg'
import Badge6 from '../../assets/Badge_06.svg'
import Badge7 from '../../assets/Badge_07.svg'
import Badge8 from '../../assets/Badge_08.svg'
import Badge9 from '../../assets/Badge_09.svg'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData, updateUser } from '../../redux/actions/user'

const BadgesModal = ({ onClose }) => {
  const { userData } = useSelector((state) => state.users)
  const dispatch = useDispatch()

  const handleUpdateBadge = (badge) => {
    dispatch(updateUser({ userId: userData.id, userData: { badge } })).then(
      (res) => dispatch(getUserData(userData.id))
    )
    onClose()
  }
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#fff',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        padding: 20
      }}
    >
      <Text
        style={{
          textAlign: 'center',
          marginTop: 8,
          marginBottom: 20,
          fontSize: 16,
          fontWeight: '600'
        }}
      >
        ¡Elige tu insignia!
      </Text>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          gap: 10,
          flexWrap: 'wrap'
        }}
      >
        <TouchableOpacity onPress={() => handleUpdateBadge('badge1')}>
          <Badge1 width={55} height={55} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleUpdateBadge('badge2')}>
          <Badge2 width={55} height={55} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleUpdateBadge('badge3')}>
          <Badge3 width={55} height={55} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleUpdateBadge('badge4')}>
          <Badge4 width={55} height={55} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleUpdateBadge('badge5')}>
          <Badge5 width={55} height={55} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleUpdateBadge('badge6')}>
          <Badge6 width={55} height={55} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleUpdateBadge('badge7')}>
          <Badge7 width={55} height={55} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleUpdateBadge('badge8')}>
          <Badge8 width={55} height={55} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleUpdateBadge('badge9')}>
          <Badge9 width={55} height={55} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default BadgesModal
