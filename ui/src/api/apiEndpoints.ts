const apiEndpoints = {
  auth: {
    login: "/login",
    signup: "/register",
  },
  owner: {
    waiters: {
      getAllWaiters: "/api/owner/employees/waiters",
      getWaiterById: "/api/owner/employees/waiters/{{id}}",
      createWaiter: "/api/owner/employees/waiters",
      deleteWaiter: "/api/owner/employees/waiters/{{id}}",
      updateWaiter: "/api/owner/employees/waiters/{{id}}",
    },
    chefs: {
      getAllChefs: "/api/owner/employees/chefs",
      getChefById: "/api/owner/employees/chefs/{{id}}",
      createChef: "/api/owner/employees/chefs",
      deleteChef: "/api/owner/employees/chefs/{{id}}",
      updateChef: "/api/owner/employees/chefs/{{id}}",
    },
    plates: {
      getAllPlates: "/api/owner/plates",
      getPlateById: "/api/owner/plates/{{id}}",
      createPlate: "/api/owner/plates",
      deletePlate: "/api/owner/plates/{{id}}",
      updatePlate: "/api/owner/plates/{{id}}",
    },
    reservations: {
      getAllReservations: "/api/owner/reservations",
      deleteReservation: "/api/owner/reservations/{{id}}",
    },
    statistics: {
      getRestaurantStatistics: "/api/owner/statistiques",
    },
    restaurant: {
      getOwnerRestaurant: "/api/owner/restaurant",
      updateRestaurant: "/api/owner/restaurant/{{id}}",
    },
  },
  client: {
    makeReservation: "/api/client/reservation/{{id}}",
    checkAvailability: "/api/client/reservation/availability/{{id}}",
    makeReview: "/api/client/review/{{id}}",
  },
  restaurants: {
    getAllRestaurants: "/api/restaurants",
    getRestaurantById: "/api/restaurants/{{id}}",
  },
  plates: {
    getRestaurantPlatesById: "/api/plates/{{id}}",
  },
  reviews: {
    getRestaurantReviewsById: "/api/reviews/{{id}}",
  },
  reservations: {
    getRestaurantTodayReservationsById: "/api/reservations/{{id}}",
  },
};

export default apiEndpoints;
