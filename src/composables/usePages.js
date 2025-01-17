// src/composables/usePagination.js
import { computed, ref } from "vue";

export function usePagination(items, itemsPerPage = 5) {
  const currentPage = ref(1);

  // Calculate the total number of pages based on the total items and itemsPerPage
  const totalPages = computed(() =>
    Math.ceil(items.value.length / itemsPerPage)
  );

  // Return the paginated list based on the current page
  const paginatedItems = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.value.slice(startIndex, endIndex);
  });

  // Function to go to a specific page
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  };

  return {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
  };
}
