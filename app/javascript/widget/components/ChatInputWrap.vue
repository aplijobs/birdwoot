<template>
  <div class="chat-input-container">
    <div
      class="chat-message--input shadow-sm"
      :class="containerClass"
      @keydown.esc="hideEmojiPicker"
    >
      <resizable-text-area
        id="chat-input"
        ref="chatInput"
        v-model="userInput"
        :aria-label="$t('CHAT_PLACEHOLDER')"
        :placeholder="$t('CHAT_PLACEHOLDER')"
        class="form-input user-message-input is-focused"
        :class="inputColor"
        @typing-off="onTypingOff"
        @typing-on="onTypingOn"
        @focus="onFocus"
        @blur="onBlur"
      />
      <div class="button-wrap">
        <chat-attachment-button
          v-if="showAttachment"
          :class="$dm('text-black-900', 'dark:text-slate-100')"
          :on-attach="onSendAttachment"
        />
        <button
          v-if="hasEmojiPickerEnabled"
          class="icon-button flex justify-center items-center"
          aria-label="Emoji picker"
          @click="toggleEmojiPicker"
        >
          <fluent-icon icon="emoji" :class="emojiIconColor" />
        </button>
        <emoji-input
          v-if="showEmojiPicker"
          v-on-clickaway="hideEmojiPicker"
          :on-click="emojiOnClick"
          @keydown.esc="hideEmojiPicker"
        />
      </div>
    </div>
    <chat-send-button
      v-if="showSendButton"
      :on-click="handleButtonClick"
      :color="widgetColor"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mixin as clickaway } from 'vue-clickaway';

import ChatAttachmentButton from 'widget/components/ChatAttachment.vue';
import ChatSendButton from 'widget/components/ChatSendButton.vue';
import configMixin from '../mixins/configMixin';
import FluentIcon from 'shared/components/FluentIcon/Index.vue';
import ResizableTextArea from 'shared/components/ResizableTextArea';
import darkModeMixin from 'widget/mixins/darkModeMixin.js';

const EmojiInput = () => import('shared/components/emoji/EmojiInput');

export default {
  name: 'ChatInputWrap',
  components: {
    ChatAttachmentButton,
    ChatSendButton,
    EmojiInput,
    FluentIcon,
    ResizableTextArea,
  },
  mixins: [clickaway, configMixin, darkModeMixin],
  props: {
    onSendMessage: {
      type: Function,
      default: () => {},
    },
    onSendAttachment: {
      type: Function,
      default: () => {},
    },
  },

  data() {
    return {
      userInput: '',
      showEmojiPicker: false,
      isFocused: false,
    };
  },

  computed: {
    ...mapGetters({
      widgetColor: 'appConfig/getWidgetColor',
      isWidgetOpen: 'appConfig/getIsWidgetOpen',
    }),
    showAttachment() {
      return this.hasAttachmentsEnabled && this.userInput.length === 0;
    },
    showSendButton() {
      return this.userInput.length > 0;
    },
    inputColor() {
      return `${this.$dm('bg-white', 'dark:bg-slate-600')}
        ${this.$dm('text-black-900', 'dark:text-slate-50')}`;
    },
    emojiIconColor() {
      return this.showEmojiPicker
        ? `text-woot-500 ${this.$dm('text-black-900', 'dark:text-slate-100')}`
        : `${this.$dm('text-black-900', 'dark:text-slate-100')}`;
    },
    containerClass() {
      let containerClass = `${this.$dm('bg-white ', 'dark:bg-slate-600')}`;
      if (this.isFocused) containerClass += ' is-focused';
      return containerClass;
    },
  },
  watch: {
    isWidgetOpen(isWidgetOpen) {
      if (isWidgetOpen) {
        this.focusInput();
      }
    },
  },
  destroyed() {
    document.removeEventListener('keypress', this.handleEnterKeyPress);
  },
  mounted() {
    document.addEventListener('keypress', this.handleEnterKeyPress);
    if (this.isWidgetOpen) {
      this.focusInput();
    }
  },

  methods: {
    onBlur() {
      this.isFocused = false;
    },
    onFocus() {
      this.isFocused = true;
    },
    handleButtonClick() {
      if (this.userInput && this.userInput.trim()) {
        this.onSendMessage(this.userInput);
      }
      this.userInput = '';
      this.focusInput();
    },
    handleEnterKeyPress(e) {
      if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
        this.handleButtonClick();
      }
    },
    toggleEmojiPicker() {
      this.showEmojiPicker = !this.showEmojiPicker;
    },
    hideEmojiPicker(e) {
      if (this.showEmojiPicker) {
        e.stopPropagation();
        this.toggleEmojiPicker();
      }
    },
    emojiOnClick(emoji) {
      this.userInput = `${this.userInput}${emoji} `;
    },
    onTypingOff() {
      this.toggleTyping('off');
    },
    onTypingOn() {
      this.toggleTyping('on');
    },
    toggleTyping(typingStatus) {
      this.$store.dispatch('conversation/toggleUserTyping', { typingStatus });
    },
    focusInput() {
      this.$refs.chatInput.focus();
    },
  },
};
</script>

<style scoped lang="scss">
@import '~widget/assets/scss/variables.scss';
@import '~widget/assets/scss/mixins.scss';

.chat-input-container {
  display: flex;
  align-items: flex-end;
  gap: $space-small;
}

.chat-message--input {
  align-items: flex-end;
  display: flex;
  padding: 0 $space-small 0 $space-slab;
  border-radius: 7px;
  flex: 1;

  &.is-focused {
    box-shadow: 0 0 0 1px $color-woot, 0 0 2px 3px $color-primary-light;
  }
}

.emoji-dialog {
  right: 0;
  top: -302px;
  max-width: 100%;

  &::before {
    right: $space-one;
  }
}

.button-wrap {
  display: flex;
  align-items: center;
  padding-left: $space-small;
  margin: auto 0 $space-small;
}

.user-message-input {
  border: 0;
  height: $space-large;
  min-height: $space-large;
  max-height: 2.4 * $space-mega;
  resize: none;
  padding: $space-smaller 0;
  margin-top: $space-small;
  margin-bottom: $space-small;
}
</style>
