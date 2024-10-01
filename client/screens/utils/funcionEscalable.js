import { Dimensions, PixelRatio } from "react-native";

// Obtiene el ancho y el alto de la pantalla del dispositivo
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Define un ancho base para tu diseño (el diseño inicial)
const BASE_WIDTH = 375; // Ancho de referencia, puede ser el ancho de un iPhone 6/7/8

/**
 * Escala un tamaño según el ancho de la pantalla actual, en comparación con el ancho base.
 * @param {number} size - Tamaño en px que deseas escalar
 * @returns {number} - Tamaño escalado
 */
export const scaleSize = (size) => {
  const scale = SCREEN_WIDTH / BASE_WIDTH;
  return Math.round(PixelRatio.roundToNearestPixel(size * scale));
};

/**
 * Escala la fuente según el ancho de la pantalla actual, en comparación con el ancho base.
 * @param {number} size - Tamaño de la fuente en px
 * @returns {number} - Tamaño de la fuente escalado
 */
export const scaleFont = (size) => {
  return scaleSize(size);
};
