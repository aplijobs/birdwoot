<template>
  <div class="chat-bubble-wrap">
    <div
      v-if="
        !isCards && !isOptions && !isForm && !isArticle && !isCards && !isCSAT
      "
      class="chat-bubble agent"
      :class="$dm('bg-white', 'dark:bg-slate-700 has-dark-mode')"
    >
      <div
        v-dompurify-html="formatMessage(message, false)"
        class="message-content"
        :class="$dm('text-black-900', 'dark:text-slate-50')"
      />
      <email-input
        v-if="isTemplateEmail"
        :message-id="messageId"
        :message-content-attributes="messageContentAttributes"
      />

      <integration-card
        v-if="isIntegrations"
        :message-id="messageId"
        :meeting-data="messageContentAttributes.data"
      />
    </div>
    <div v-if="isOptions">
      <chat-options :message="message" />
    </div>
    <chat-form
      v-if="isForm && !messageContentAttributes.submitted_values"
      :items="messageContentAttributes.items"
      :button-label="messageContentAttributes.button_label"
      :submitted-values="messageContentAttributes.submitted_values"
      @submit="onFormSubmit"
    />
    <div v-if="isCards">
      <chat-card
        v-for="item in messageContentAttributes.items"
        :key="item.title"
        :media-url="item.media_url"
        :title="item.title"
        :description="item.description"
        :actions="item.actions"
      />
    </div>
    <div v-if="isArticle">
      <chat-article :items="messageContentAttributes.items" />
    </div>
    <customer-satisfaction
      v-if="isCSAT"
      :message-content-attributes="messageContentAttributes.submitted_values"
      :message-id="messageId"
    />
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
import messageFormatterMixin from 'shared/mixins/messageFormatterMixin';
import ChatCard from 'shared/components/ChatCard';
import ChatForm from 'shared/components/ChatForm';
import ChatOptions from 'shared/components/ChatOptions';
import ChatArticle from './template/Article';
import EmailInput from './template/EmailInput';
import CustomerSatisfaction from 'shared/components/CustomerSatisfaction';
import darkModeMixin from 'widget/mixins/darkModeMixin.js';
import IntegrationCard from './template/IntegrationCard';

export default {
  name: 'AgentMessageBubble',
  components: {
    ChatArticle,
    ChatCard,
    ChatForm,
    ChatOptions,
    EmailInput,
    CustomerSatisfaction,
    IntegrationCard,
  },
  mixins: [messageFormatterMixin, darkModeMixin],
  props: {
    message: { type: String, default: null },
    contentType: { type: String, default: null },
    messageType: { type: Number, default: null },
    messageId: { type: Number, default: null },
    messageContentAttributes: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    isTemplate() {
      return this.messageType === 3;
    },
    isTemplateEmail() {
      return this.contentType === 'input_email';
    },
    isCards() {
      return this.contentType === 'cards';
    },
    isOptions() {
      return this.contentType === 'input_select';
    },
    isForm() {
      return this.contentType === 'form';
    },
    isArticle() {
      return this.contentType === 'article';
    },
    isCSAT() {
      return this.contentType === 'input_csat';
    },
    isIntegrations() {
      return this.contentType === 'integrations';
    },
    hasResponse() {
      return Boolean(this.messageContentAttributes.submitted_values);
    },
  },
  mounted() {
    if (this.isOptions && !this.hasResponse) {
      this.setOptions(this.messageContentAttributes.items);
      this.setCallback(this.onOptionSelect);
    }
  },
  methods: {
    ...mapActions('conversation', [
      'sendMessage',
    ]),
    ...mapMutations({
      setOptions: 'conversation/setQuickRepliesOptions',
      setCallback: 'conversation/setQuickRepliesCallback',
    }),
    async onOptionSelect(selectedOption) {
      await this.$store.dispatch('message/update', {
        submittedValues: [selectedOption],
        messageId: this.messageId,
      });
      this.setOptions([]);
      // Scroll to bottom once the quick reply is clicked
      const container = document.getElementById('conversation-container');
      container.scrollTo(0, container.scrollHeight);
    },
    onFormSubmit(formValues) {
      const formValuesAsArray = Object.keys(formValues).map(key => ({
        name: key,
        value: formValues[key],
      }));
      this.onResponse({
        submittedValues: formValuesAsArray,
        messageId: this.messageId,
      });
    },
  },
};
</script>
