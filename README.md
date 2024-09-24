# Problem

The task is to render currently published and active events (such with startDate in the past and endDate in the future or such with no startDate and endDate set) from a builder.io space. The query for this is defined inside `src/routes/+layout.server.ts`, where two queries exist to query against the MongoDB: `queryOne` and `queryTwo`. **queryOne falsly returns an empty array**. The queries are defined as follows:

```typescript
const queryOne = {
  $or: [
    {
      startDate: {
        $lte: new Date(),
      },
      endDate: {
        $gte: new Date(),
      },
    },
    {
      startDate: {
        $exists: false,
      },
      endDate: {
        $exists: false,
      },
    },
  ],
};

const queryTwo = {
  startDate: {
    $lte: new Date(),
  },
  endDate: {
    $gte: new Date(),
  },
};
```

# How to setup your builder.io space

1. Create a new builder.io space.
2. Create a new `data`-model, named "EventTeaser" (slug: `event-teaser`)
3. Add one field to the data-model:
   - `text` (type: `text`)
4. Create at least two entries of the `EventTeaser`-data-model.
5. Schedule all created events with differing start and end dates. Make sure that some are in the past, some are in the present (currently live) and some are in the future.
6. Connect your public key to the repo by adding `PUBLIC_BUILDER_API_KEY` to a new `.env`-file in the root of the repository.
7. Run `npm i` to install all deps.
8. Run `npm run dev` to start the dev server.
9. Observe the console, it should print two lines containing all currently published `event-teasers`.
