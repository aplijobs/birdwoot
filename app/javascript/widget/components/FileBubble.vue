<template>
  <div class="file flex flex-row items-center p-3 cursor-pointer">
    <div class="icon-wrap" :style="{ color: textColor }">
      <fluent-icon icon="document" size="28" type="solid" />
    </div>
    <div class="meta">
      <div class="link-wrap mb-1">
        <a
          class="download"
          rel="noreferrer noopener nofollow"
          target="_blank"
          :style="{ color: textColor }"
          :href="url"
        >
          <div class="title" :class="titleColor" :style="{ color: textColor }">
            {{ title }}
          </div>
          {{ $t('COMPONENTS.FILE_BUBBLE.DOWNLOAD') }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import FluentIcon from 'shared/components/FluentIcon/Index.vue';
import darkModeMixin from 'widget/mixins/darkModeMixin.js';
import { getContrastingTextColor } from '@chatwoot/utils';

export default {
  components: {
    FluentIcon,
  },
  mixins: [darkModeMixin],
  props: {
    url: {
      type: String,
      default: '',
    },
    isInProgress: {
      type: Boolean,
      default: false,
    },
    widgetColor: {
      type: String,
      default: '',
    },
    isUserBubble: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    title() {
      return this.isInProgress
        ? this.$t('COMPONENTS.FILE_BUBBLE.UPLOADING')
        : decodeURI(this.fileName);
    },
    fileName() {
      return this.url.substring(this.url.lastIndexOf('/') + 1);
    },
    contrastingTextColor() {
      return getContrastingTextColor(this.widgetColor);
    },
    textColor() {
      return this.isUserBubble && this.widgetColor
        ? this.contrastingTextColor
        : '';
    },
    titleColor() {
      return !this.isUserBubble
        ? this.$dm('text-black-900', 'dark:text-slate-50')
        : '';
    },
  },
  methods: {
    openLink() {
      const win = window.open(this.url, '_blank');
      win.focus();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~widget/assets/scss/variables.scss';

.file {
  padding: $space-slab $space-normal !important;
  .icon-wrap {
    font-size: $font-size-mega;
    color: $color-woot;
    line-height: 1;
    margin-left: $space-smaller;
    margin-right: $space-small;
  }

  .title {
    text-decoration: underline;
    font-weight: $font-weight-medium;
    font-size: $font-size-default;
    margin: 0 0 4px 0;
  }

  .download {
    color: $color-woot;
    font-weight: $font-weight-medium;
    margin: 0;
    font-size: $font-size-small;
    text-decoration: none;
  }

  .link-wrap {
    line-height: 1;
  }
  .meta {
    padding-right: $space-smaller;
  }
}
</style>
