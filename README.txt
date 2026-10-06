# Birthday Surprise — Final Build

A mobile-first interactive birthday experience for Boimalyn.

## Flow

1. 60-second countdown
2. Inspirational quote at 50 / 40 / 30 / 20 / 10 seconds
3. Countdown reaches 0
4. Candle interaction
5. New-age entry
6. Private birthday wish + seal; the opening prayer audio loops until the wish is sealed
7. Birthday song starts
8. Six interactive questions
9. New-chapter reveal
10. Memory corner
11. Birthday mood selection
12. Prayer for the new year
13. Final reveal + confetti

## Files

- `index.html` — structure and content
- `style.css` — responsive design, animation and accessibility styling
- `script.js` — all interaction logic
- `audio/` — place the birthday MP3 here
- `images/` — place birthday photos here when the Memory Corner is personalized
- `FINAL_AUDIT.txt` — pre-send checklist

## Required before sending

Place the permitted birthday song at:

`audio/birthday-song.mp3`

Add the real photos to the Memory Corner before publishing the final version.

## Important

The private birthday wish is not transmitted anywhere in this build. It is only used to validate that a wish was entered and is then cleared from the form.

For GitHub Pages, publish the entire project folder. Keep the folder structure intact.


FINAL POLISH UPDATE
- Miss Minute is contextual and moves into the current level instead of staying fixed over the page.
- The music control is now part of normal page flow and cannot be covered by Miss Minute.
- The main birthday experience is gated into one level at a time. Each level must be completed before the next is revealed.
- Candle interaction now requires beating Miss Minute at Rock, Paper, Scissors before each candle can be extinguished. Draws and losses require another attempt.
- After all five candles are out, the age and wish stages continue normally.


PERSONAL MEDIA ADDED
- images/birthday-portrait.png
- images/birthday-memory-group.png
- video/birthday-memory.mp4
These are already wired into the Memory Corner in index.html.


FINAL MEDIA CHECK
The birthday song has been added as audio/birthday-song.mp3.


Final UX update: the countdown now keeps Miss Minute beneath the timer and above the bottom guidance message. Countdown quotes remain above the timer. A pre-countdown headphone prompt asks the recipient to put on AirPods or headphones before starting the 60-second experience.

PRAYER MEDIA
- The short prayer audio is in audio/birthday-prayer.mp3 and begins when she presses "I'm ready" before the 60-second countdown.
- The prayer video is in video/birthday-prayer.mp4 and appears at the very end of the experience after the final reveal.

FINAL POLISH ADDITIONS
- Back button added to every experience level and pre-experience screen except the opening countdown itself.
- One-level-at-a-time navigation preserved: the next level is hidden until the current level is completed.
- Added a five-cat sketch hunt: find exactly 5 cats among 15 similar line-art sketches.
- Added celebration overlays and confetti every time a candle is successfully extinguished.
- Added stronger Gen-Z / baddie-inspired visual direction: hot pink, black-plum, bold pills, stickers, glossy cards and punchier microcopy while keeping readability high.
- Added a proper Continue button after the wish has already been sealed so the Back button does not trap the user.
- Added a Continue button to the prayer/faith level so it can advance to the final surprise.


LATEST FIXES
- Opening prayer audio loops through the opening countdown, candle stage, age stage, and wish stage; it stops and resets when the wish is sealed.
- The entered age is stored and displayed on the chapter reveal.
- The chapter title selected in the final question is displayed directly beneath the entered age.
- Birthday copy was rewritten to sound more personal, conversational, sweet, and emotionally direct rather than generic.


OPENING AUDIO UPDATE
- Opening prayer audio removed. audio/birthday-audio-1.mp3 (~44s) plays first when she presses "I'm ready"; audio/birthday-audio-2.mp3 (~63s) follows when it ends. Both stop when the wish is sealed. The end-of-experience prayer VIDEO is unchanged.
