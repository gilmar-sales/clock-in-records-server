import { GqlModuleOptions } from '@nestjs/graphql';

const graphqlOptions: GqlModuleOptions = {
  autoSchemaFile: 'src/schema.gql',
  context: ({ req }) => ({ req }),
  playground: true,
  installSubscriptionHandlers: true,
};

export default graphqlOptions;
