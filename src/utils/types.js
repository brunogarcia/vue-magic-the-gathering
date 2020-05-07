import PropTypes from '@znck/prop-types';

const card = PropTypes.shape({
  id: PropTypes.string.isRequired,
  playing: PropTypes.bool.isRequired,
  favourite: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  text: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
});

const cards = PropTypes.arrayOf(card).isRequired;

export default {
  card,
  cards,
};
