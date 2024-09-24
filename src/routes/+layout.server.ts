import { PUBLIC_BUILDER_API_KEY } from "$env/static/public";
import { fetchEntries } from "@builder.io/sdk-svelte";
import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

const fetchAndValidateEntries = async (
  model: string,
  fetch: () => any,
  query?: Record<string, any>
) => {
  const res = await fetchEntries({
    model,
    apiKey: PUBLIC_BUILDER_API_KEY,
    staleCacheSeconds: 60 * 60,
    cacheSeconds: 0,
    query: query ?? {},
    fetch,
  });

  return res && res.length > 0 ? res.map((item) => item.data) : [];
};

export const load: LayoutServerLoad = async ({ params, fetch }) => {
  try {
    const queryOne = await fetchAndValidateEntries("event-teaser", fetch, {
      $or: [
        {
          startDate: { $lte: Date.now() },
          endDate: { $gte: Date.now() },
        },
        {
          startDate: { $exists: false },
          endDate: { $exists: false },
        },
      ],
    });

    const queryTwo = await fetchAndValidateEntries("event-teaser", fetch, {
      startDate: { $lte: Date.now() },
      endDate: { $gte: Date.now() },
    });

    return {
      queryOne: queryOne, // always returns empty no matter what
      queryTwo: queryTwo, // returns the expected data, but query one is the one we need
    };
  } catch (err) {
    error(500, JSON.stringify(err));
  }
};
