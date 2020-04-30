/**
 * Map voices before stored them
 *
 * @param {object} voices - The voices to map
 * @returns {object} - The voices mapped
 */
export default function mapVoices(voices) {
  return voices.map((voice) => ({
    ...voice,
    play: false,
    favourite: false,
  }));
}
