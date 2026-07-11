import { ImageResponse } from 'next/og'

// Métadonnées de l'image
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

// Croix pharmaceutique verte (#2D7A5C) sur fond blanc.
// Satori (moteur d'ImageResponse) ne supporte que flexbox + positionnement
// absolu — la croix est donc dessinée avec deux barres absolues, pas en grid.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          background: '#FFFFFF',
        }}
      >
        {/* Barre verticale */}
        <div
          style={{
            position: 'absolute',
            left: 12,
            top: 5,
            width: 8,
            height: 22,
            borderRadius: 2,
            background: '#2D7A5C',
          }}
        />
        {/* Barre horizontale */}
        <div
          style={{
            position: 'absolute',
            left: 5,
            top: 12,
            width: 22,
            height: 8,
            borderRadius: 2,
            background: '#2D7A5C',
          }}
        />
      </div>
    ),
    { ...size },
  )
}
