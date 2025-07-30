<script>
import { mapGetters } from 'vuex';
import { getContrastingTextColor } from '@chatwoot/utils';
import nextAvailabilityTime from 'widget/mixins/nextAvailabilityTime';
import configMixin from 'widget/mixins/configMixin';
import availabilityMixin from 'widget/mixins/availability';
import { IFrameHelper } from 'widget/helpers/utils';
import { CHATWOOT_ON_START_CONVERSATION } from '../constants/sdkEvents';
import CustomButton from 'shared/components/Button.vue';
import darkModeMixin from '../mixins/darkModeMixin';

export default {
  name: 'TeamAvailability',
  components: {
    CustomButton,
  },
  mixins: [configMixin, nextAvailabilityTime, availabilityMixin, darkModeMixin],
  props: {
    availableAgents: {
      type: Array,
      default: () => {},
    },
    hasConversation: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['startConversation'],

  computed: {
    ...mapGetters({
      widgetColor: 'appConfig/getWidgetColor',
      availableMessage: 'appConfig/getAvailableMessage',
      unavailableMessage: 'appConfig/getUnavailableMessage',
    }),
    textColor() {
      return getContrastingTextColor(this.widgetColor);
    },
    agentAvatars() {
      return this.availableAgents.map(agent => ({
        name: agent.name,
        avatar: agent.avatar_url,
        id: agent.id,
      }));
    },
    headerMessage() {
      return this.isOnline
        ? this.availableMessage || this.$t('TEAM_AVAILABILITY.ONLINE')
        : this.unavailableMessage || this.$t('TEAM_AVAILABILITY.OFFLINE');
    },
    isOnline() {
      const { workingHoursEnabled } = this.channelConfig;
      const anyAgentOnline = this.availableAgents.length > 0;

      if (workingHoursEnabled) {
        return this.isInBetweenTheWorkingHours;
      }
      return anyAgentOnline;
    },
  },
  methods: {
    startConversation() {
      this.$emit('startConversation');
      if (!this.hasConversation) {
        IFrameHelper.sendMessage({
          event: 'onEvent',
          eventIdentifier: CHATWOOT_ON_START_CONVERSATION,
          data: { hasConversation: false },
        });
      }
    },
  },
};
</script>

<template>
  <div
    class="flex flex-col gap-3 w-full shadow outline-1 outline outline-n-container rounded-xl bg-n-background dark:bg-n-solid-2 px-5 py-4"
  >
    <div class="flex items-center justify-between gap-2">
      <div class="flex flex-col gap-1">
        <div class="font-medium text-n-slate-12 line-clamp-2">
          {{ headerMessage }}
        </div>
        <div class="text-xs leading-4 mt-1">
          {{ replyWaitMessage }}
        </div>
      </div>
    </div>
    <CustomButton
      class="font-medium"
      block
      :bg-color="widgetColor"
      :text-color="textColor"
      @click="startConversation"
    >
      {{
        hasConversation ? $t('CONTINUE_CONVERSATION') : $t('START_CONVERSATION')
      }}
    </CustomButton>
  </div>
</template>

<style scoped lang="scss">
@import 'widget/assets/scss/variables';

.responsive-container {
  max-width: $break-point-tablet;
  margin: 0 auto;
  width: 100%;
}
</style>
