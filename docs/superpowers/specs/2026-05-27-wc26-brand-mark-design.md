# WC26 Brand Mark Design

## Objective

Replace the previous artwork with a WC2026-specific football that works as
both the favicon and the header icon. The mark must be unmistakably a football,
realistic, symmetric, and premium, while remaining legible at `16px`, `22px`,
and `30px`.

## Visual Direction

The mark is a premium match ball with three defining elements:

- Symmetric pearl-white and navy panels with realistic seams.
- Restrained, symmetric navy curves on the white panels.
- A large, clean `26` optically centered inside the front white panel, as
  though printed on an official tournament ball.

The result avoids external orbits and asymmetric compositions. At reduced
sizes it preserves a clear football silhouette and the visual centering of the
`26`.

## Implementation

`wc26-ball-premium.png` is the transparent `512x512` master asset. It is used
in the header, while `favicon-32x32.png`, `favicon.ico`, and
`apple-touch-icon.png` are derived from the same high-quality raster.

The header keeps its existing dimensions: the icon remains `22px` on mobile
and `30px` on desktop. Only its internal artwork changes.

## Compatibility And Tests

Tests confirm that:

- The document serves the versioned PNG favicon and retains the ICO fallback.
- The header reuses the same premium artwork as the favicon.
- PNG assets retain their dimensions, transparency, and coherent derivation.
- The favicon no longer depends on an emoji or the rejected SVG emblem.

Final validation includes a visual render of GitHub Pages at mobile and
desktop sizes, together with a tab preview on a dark background.
