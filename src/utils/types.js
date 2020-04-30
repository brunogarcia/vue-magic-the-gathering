import PropTypes from '@znck/prop-types';

const voice = PropTypes.shape({
  id: PropTypes.string.isRequired,
  playing: PropTypes.bool.isRequired,
  favourite: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
});

const voices = PropTypes.arrayOf(voice).isRequired;

export default {
  voice,
  voices,
};
