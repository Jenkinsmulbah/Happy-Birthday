# Birthday Surprise — Experience Upgrade

## Preserved
- 60-second opening countdown
- Headphone gate
- Miss Minute commentary
- Five-candle Rock/Paper/Scissors challenge
- Age input
- Private birthday wish flow
- Birthday song and music control
- Six-question interaction
- Cat-finding challenge
- Dynamic new-year chapter title
- Existing photo, memory video, prayer audio, and prayer video

## Added / upgraded
- Centralized application state with localStorage persistence
- Single controlled audio controller to prevent competing audio sessions
- Dynamic age/title propagation into later reveals
- 21-item personal observation system with explicit placeholders instead of invented memories
- Page-based personal letter architecture
- More deliberate final reveal: age → year title → birthday message → optional final surprise
- Optional final surprise hook
- Local time-capsule message storage
- Graceful in-memory fallback when localStorage is unavailable
- Reduced-motion support for the new interaction layers
- Mobile-first styling for the new sections
- Restart/reset control

## Privacy
The birthday wish and time-capsule message are stored locally in the browser for this prototype. No external API, analytics, or tracking was added.

## Content still requiring the creator
Replace the bracketed placeholders in `script.js`:
- `experienceContent.observations` — 21 real observations/memories
- `letterContent` — the actual personal letter

Do not replace these with invented memories. They are intentionally explicit placeholders.

## Validation performed
- JavaScript syntax check with Node
- HTML ID uniqueness check
- JavaScript DOM-selector check against HTML IDs
- `data-next` route check
- `data-prev` route check
- Static inspection of state, wish sealing, audio controller, final reveal, and time-capsule references

A real browser/device test is still required for autoplay behavior, media playback, touch interaction, viewport rendering, and the exact timing of animations.
