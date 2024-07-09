export const handleSelect = (image,setSelectedImage,state,setState) => {
    setSelectedImage(image)
    const exist = state.find((png) => png.id === image.id)
    if (!exist) {
        setState([...state, image])
    } else {
        setState(state.filter((png) => png.id !== image.id))
    }
  }