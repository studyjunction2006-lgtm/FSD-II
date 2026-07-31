import { createSelector } from "@reduxjs/toolkit";

/* Basic Selectors */

export const selectPosts = (state) => state.posts.posts;

export const selectSearch = (state) => state.posts.search;

export const selectCategory = (state) => state.posts.category;

/* Memoized Selector */

export const selectFilteredPosts = createSelector(
  [selectPosts, selectSearch, selectCategory],

  (posts, search, category) => {
    console.log("Filtering posts...");

    return posts.filter((post) => {
      const matchesSearch = post.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || post.category === category;

      return matchesSearch && matchesCategory;
    });
  }
);

/* Derived State */

export const selectStatistics = createSelector(
  [selectFilteredPosts],

  (filteredPosts) => {
    const totalPosts = filteredPosts.length;

    const totalLikes = filteredPosts.reduce(
      (sum, post) => sum + post.likes,
      0
    );

    const averageLikes =
      totalPosts === 0 ? 0 : Math.round(totalLikes / totalPosts);

    let categories = {};

    filteredPosts.forEach((post) => {
      categories[post.category] =
        (categories[post.category] || 0) + 1;
    });

    let popularCategory = "None";

    let max = 0;

    for (let key in categories) {
      if (categories[key] > max) {
        max = categories[key];
        popularCategory = key;
      }
    }

    return {
      totalPosts,
      totalLikes,
      averageLikes,
      popularCategory,
    };
  }
);