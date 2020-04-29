import constants from '@/utils/constants';

const { TAGS } = constants;

/**
 * Map tags before stored them
 *
 * @param {object} voices - The voices list
 * @returns {Array<string>} - The tags list sorted by name
 */
export default function mapTags(voices) {
  return voices
    .map((voice) => voice.tags)
    .reduce((accumulator, tags) => {
      const tag = tags.filter((item) => !accumulator.includes(item));
      return [...accumulator, ...tag];
    }, [TAGS.ALL])
    .sort();
}
