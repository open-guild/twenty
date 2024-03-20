import { Meta, StoryObj } from '@storybook/react';

import { SettingsIntegrationDetail } from '~/pages/settings/integrations/SettingsIntegrationDetail';
import {
  PageDecorator,
  PageDecoratorArgs,
} from '~/testing/decorators/PageDecorator';
import { graphqlMocks } from '~/testing/graphqlMocks';

const meta: Meta<PageDecoratorArgs> = {
  title: 'Pages/Settings/Integrations/SettingsIntegrationDetail',
  component: SettingsIntegrationDetail,
  decorators: [PageDecorator],
  args: {
    routePath: '/settings/integrations/:integrationKey',
    routeParams: { ':integrationKey': 'postgresql' },
  },
  parameters: {
    msw: graphqlMocks,
  },
};

export default meta;

export type Story = StoryObj<typeof SettingsIntegrationDetail>;

export const Default: Story = {};
