Object.defineProperty(exports, '__esModule', { value: true });

const core = require('@sentry/core');

// Inline PiniaPlugin type

const createSentryPiniaPlugin = (
  options = {
    attachPiniaState: true,
    addBreadcrumbs: true,
    actionTransformer: action => action,
    stateTransformer: state => state,
  },
) => {
  const plugin = ({ store }) => {
    options.attachPiniaState !== false &&
      core.getGlobalScope().addEventProcessor((event, hint) => {
        try {
          // Get current timestamp in hh:mm:ss
          const timestamp = new Date().toTimeString().split(' ')[0];
          const filename = `pinia_state_${store.$id}_${timestamp}.json`;

          hint.attachments = [
            ...(hint.attachments || []),
            {
              filename,
              data: JSON.stringify(store.$state),
            },
          ];
        } catch (_) {
          // empty
        }

        return event;
      });

    store.$onAction(context => {
      context.after(() => {
        const transformedActionName = options.actionTransformer
          ? options.actionTransformer(context.name)
          : context.name;

        if (
          typeof transformedActionName !== 'undefined' &&
          transformedActionName !== null &&
          options.addBreadcrumbs !== false
        ) {
          core.addBreadcrumb({
            category: 'action',
            message: transformedActionName,
            level: 'info',
          });
        }

        /* Set latest state to scope */
        const transformedState = options.stateTransformer ? options.stateTransformer(store.$state) : store.$state;
        const scope = core.getCurrentScope();
        const currentState = scope.getScopeData().contexts.state;

        if (typeof transformedState !== 'undefined' && transformedState !== null) {
          const client = core.getClient();
          const options = client && client.getOptions();
          const normalizationDepth = (options && options.normalizeDepth) || 3; // default state normalization depth to 3
          const piniaStateContext = { type: 'pinia', value: transformedState };

          const newState = {
            ...(currentState || {}),
            state: piniaStateContext,
          };

          core.addNonEnumerableProperty(
            newState,
            '__sentry_override_normalization_depth__',
            3 + // 3 layers for `state.value.transformedState
              normalizationDepth, // rest for the actual state
          );

          scope.setContext('state', newState);
        } else {
          scope.setContext('state', {
            ...(currentState || {}),
            state: { type: 'pinia', value: 'undefined' },
          });
        }
      });
    });
  };

  return plugin;
};

exports.createSentryPiniaPlugin = createSentryPiniaPlugin;
//# sourceMappingURL=pinia.js.map
