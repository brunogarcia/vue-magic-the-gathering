<template>
  <v-select
    v-model="sort"
    :items="items"
    solo
    dense
    single-line
    hide-details
    menu-props="auto"
    label="Sort voices"
    @input="onSelectItem"
  >
    <template v-slot:prepend>
      <OrderIcon />
    </template>

    <template v-slot:append>
      <SelectArrowIcon />
    </template>

    <template v-slot:item="{ item }">
      <span class="white--text text-capitalize">{{ item }}</span>

    </template>
        <template v-slot:selection="{ item }">
      <span class="white--text text-capitalize">{{ item }}</span>
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
      saveSort: 'voices/saveSort',
      sortVoices: 'voices/sortVoices',
    }),

    onSelectItem() {
      this.saveSort(this.sort);
      this.sortVoices();
    },
  },
};
</script>
