<template>
  <v-select
    v-model="sort"
    :items="items"
    solo
    dense
    single-line
    hide-details
    menu-props="auto"
    label="Sort cards"
    @input="onSelectItem"
  >
    <template v-slot:prepend>
      <OrderIcon
        class="d-none d-sm-block"
        role="img"
        aria-label="Order icon"
      />
    </template>

    <template v-slot:append>
      <SelectArrowIcon
        class="d-none d-md-block"
        role="img"
        aria-label="Select arrow icon"
      />
    </template>

    <template v-slot:item="{ item }">
      <span class="text-capitalize">{{ item }}</span>
    </template>

    <template v-slot:selection="{ item }">
      <span
        class="d-none d-sm-block text-capitalize">
        {{ item }}
      </span>

      <OrderIcon
        role="img"
        class="d-block d-sm-none"
        aria-label="Order icon"
      />
    </template>
  </v-select>
</template>

<script>
import { mapActions } from 'vuex';
import constants from '@/utils/constants';
import OrderIcon from '@/assets/order.svg';
import SelectArrowIcon from '@/assets/select-arrow.svg';

const { SORT } = constants;

export default {
  name: 'SortFilter',

  data: () => ({
    sort: SORT.ASC,
    items: [SORT.ASC, SORT.DESC],
  }),

  components: {
    OrderIcon,
    SelectArrowIcon,
  },

  methods: {
    ...mapActions({
      saveSort: 'cards/saveSort',
      sortCards: 'cards/sortCards',
    }),

    onSelectItem() {
      this.saveSort(this.sort);
      this.sortCards();
    },
  },
};
</script>
