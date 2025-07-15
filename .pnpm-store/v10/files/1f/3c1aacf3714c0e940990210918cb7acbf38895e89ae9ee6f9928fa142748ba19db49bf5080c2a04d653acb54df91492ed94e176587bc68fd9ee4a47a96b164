type PiniaPlugin = (context: {
    store: {
        $id: string;
        $state: unknown;
        $onAction: (callback: (context: {
            name: string;
            after: (callback: () => void) => void;
        }) => void) => void;
    };
}) => void;
type SentryPiniaPluginOptions = {
    attachPiniaState?: boolean;
    addBreadcrumbs?: boolean;
    actionTransformer?: (action: any) => any;
    stateTransformer?: (state: any) => any;
};
export declare const createSentryPiniaPlugin: (options?: SentryPiniaPluginOptions) => PiniaPlugin;
export {};
//# sourceMappingURL=pinia.d.ts.map
