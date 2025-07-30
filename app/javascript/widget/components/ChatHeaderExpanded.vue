<script>
import { mapGetters } from 'vuex';
import HeaderActions from './HeaderActions.vue';
import darkModeMixin from '../mixins/darkModeMixin';

export default {
  name: 'ChatHeaderExpanded',
  components: {
    HeaderActions,
  },
  mixins: [darkModeMixin],
  props: {
    avatarUrl: {
      type: String,
      default: '',
    },
    introHeading: {
      type: String,
      default: '',
    },
    introBody: {
      type: String,
      default: '',
    },
    showPopoutButton: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({}),
  },
};
</script>

<template>
  <header
    class="header-expanded header-responsive py-6 px-5 relative box-border w-full"
    :class="dm('bg-white', 'dark:bg-slate-900')"
  >
    <div
      class="flex items-start"
      :class="[avatarUrl ? 'justify-between' : 'justify-end']"
    >
      <img
        v-if="avatarUrl"
        class="h-12 rounded-full"
        :src="avatarUrl"
        alt="Avatar"
      />
      <HeaderActions :show-popout-button="showPopoutButton" />
    </div>
    <h2
      v-dompurify-html="introHeading"
      class="mt-4 text-2xl mb-1.5 font-medium text-n-slate-12 line-clamp-4"
    />
    <p
      v-dompurify-html="formatMessage(introBody)"
      class="text-lg leading-normal text-n-slate-11 [&_a]:underline line-clamp-6"
    />
  </header>
</template>

<style scoped lang="scss">
@import 'widget/assets/scss/variables';

.header-responsive {
  max-width: $break-point-tablet;
  margin: 0 auto;
}
</style>
