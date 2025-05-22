<template>
  <div
    class="card-message chat-bubble agent"
    :class="$dm('bg-white', 'dark:bg-slate-700')"
  >
    <img v-if="mediaUrl" class="media" :src="mediaUrl" />
    <div class="card-body">
      <h4 v-if="title" class="title" :class="$dm('text-black-900', 'dark:text-slate-50')">
        {{ title }}
      </h4>
      <p class="body" :class="$dm('text-black-900', 'dark:text-slate-100')">
        {{ description }}
      </p>
      <card-button
        v-for="action in actions"
        :key="action.id"
        :action="action"
      />
    </div>
  </div>
</template>

<script>
import CardButton from 'shared/components/CardButton.vue';

export default {
  components: {
    CardButton,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    mediaUrl: {
      type: String,
      default: '',
    },
    actions: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped lang="scss">
@import '~widget/assets/scss/variables.scss';
@import '~dashboard/assets/scss/mixins.scss';

.card-message {
  padding: $space-small;
  border-radius: $space-small;
  overflow: hidden;

  .title {
    font-size: $font-size-default;
    font-weight: $font-weight-medium;
    margin-top: $space-smaller;
    margin-bottom: $space-smaller;
    line-height: 1.5;
  }

  .body {
    margin-bottom: $space-smaller;
  }

  .media {
    @include border-light;
    width: 100%;
    object-fit: contain;
    max-height: 150px;
    border-radius: 5px;
  }

  .action-button + .action-button {
    background: $color-white;
    @include thin-border($color-woot);
    color: $color-woot;
  }
}
</style>
<template>
  <div
    class="card-message chat-bubble agent bg-n-background dark:bg-n-solid-3 max-w-56 rounded-lg overflow-hidden"
  >
    <img
      class="w-full object-contain max-h-[150px] rounded-[5px]"
      :src="mediaUrl"
    />
    <div class="card-body">
      <h4
        class="!text-base !font-medium !mt-1 !mb-1 !leading-[1.5] text-n-slate-12"
      >
        {{ title }}
      </h4>
      <p class="!mb-1 text-n-slate-11">
        {{ description }}
      </p>
      <CardButton v-for="action in actions" :key="action.id" :action="action" />
    </div>
  </div>
</template>
