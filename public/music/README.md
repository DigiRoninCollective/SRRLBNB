# Music Folder

## How to Add Your Own MP3s

1. **Place your MP3 files in this folder** (`/public/music/`)
   - Example: `track1.mp3`, `track2.mp3`, etc.

2. **Update the tracks array** in `src/components/SpotifyPlayer.jsx`:

```javascript
const tracks = [
  { title: 'Your Song Name', artist: 'Artist Name', file: '/music/track1.mp3' },
  { title: 'Another Song', artist: 'Artist Name', file: '/music/track2.mp3' },
  { title: 'Third Song', artist: 'Artist Name', file: '/music/track3.mp3' },
  // Add more tracks here...
];
```

3. **Save the file** and the player will automatically reload with your music!

## Tips

- Make sure your MP3 filenames match what you put in the `file` property
- Use descriptive names for your tracks
- The player will automatically move to the next track when one finishes
- All tracks will loop continuously

## Example

If you have a file named `shark-attack.mp3`, add it like this:

```javascript
{ title: 'Shark Attack', artist: 'SRRL', file: '/music/shark-attack.mp3' }
```

Enjoy your music! 🎵
