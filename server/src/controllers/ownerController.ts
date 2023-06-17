import { NextFunction, Request, Response } from "express";
import WaiterRepository from "../repositories/waiterRepository";
import RestaurantRepository from "../repositories/restaurantRepository";
import { hashPassword } from "../utils/password";
import UserRepository from "../repositories/userRepository";
import executeMethodsWithTransaction from "../utils/transaction";
import WaiterModel from "../models/waiterModel";
import { UserModel } from "../models/userModel";
import { UserType } from "../types/types";
import ChefRepository from "../repositories/chefRepository";
import ChefModel from "../models/chefModel";
import PlateRepository from "../repositories/plateRepository";
import ReservationRepository from "../repositories/reservationRepository";
import StatisticRepository from "../repositories/statisticRepository";

interface CustomRequest extends Request {
  user: {
    userId: string;
    userEmail: string;
    lives_in: string;
  };
}
class OwnerController {
  //there is two ways to get the waiter that i want
  //by give the method just the owner_id and make join query between the restaurant and the owner to get the waiter or by give it directelly the restaurant id.
  static async createWaiter(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      let { name, email, password } = req.body;
      password = await hashPassword(password);
      const owner_id = req.user.userId;
      const restaurant = await RestaurantRepository.getByQuery({ owner_id });
      if (!restaurant) {
        throw Error("maybe this owner doesn't have a restaurant");
      }

      const [waiter] = (await executeMethodsWithTransaction([
        () =>
          WaiterRepository.createWaiter({
            name,
            email,
            password,
            restaurant_id: restaurant.id,
          }),
        () => UserRepository.createUser({ email, lives_in: UserType.WAITERS }),
      ])) as [WaiterModel, UserModel];

      res.status(201).json({ res: waiter });
    } catch (err) {
      next(err);
    }
  }

  static async createChef(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      let { name, email, password } = req.body;
      password = await hashPassword(password);
      const owner_id = req.user.userId;
      const restaurant = await RestaurantRepository.getByQuery({ owner_id });
      if (!restaurant) {
        throw Error("maybe this owner doesn't have a restaurant");
      }

      const [chef] = (await executeMethodsWithTransaction([
        () =>
          ChefRepository.createChef({
            name,
            email,
            password,
            restaurant_id: restaurant.id,
          }),
        () => UserRepository.createUser({ email, lives_in: UserType.CHEFS }),
      ])) as [ChefModel, UserModel];

      res.status(201).json({ res: chef });
    } catch (err) {
      next(err);
    }
  }

  static async getWaiters(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const owner_id = req.user.userId;
      const waiters = await WaiterRepository.getAll(owner_id);
      res.status(200).json({ res: waiters });
    } catch (err) {
      next(err);
    }
  }

  static async getChefs(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const owner_id = req.user.userId;
      const chefs = await ChefRepository.getAll(owner_id);
      res.status(200).json({ res: chefs });
    } catch (err) {
      next(err);
    }
  }

  static async getWaiter(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.params.id;
      const owner_id = req.user.userId;
      const restaurant = await RestaurantRepository.getByQuery({ owner_id });
      if (!restaurant) {
        throw Error("maybe this owner doesn't have a restaurant");
      }
      const waiter = await WaiterRepository.getById(id, restaurant.id);
      if (!waiter) {
        throw Error("waiter not found");
      }
      res.status(200).json({ res: waiter });
    } catch (err) {
      next(err);
    }
  }

  static async getChef(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const owner_id = req.user.userId;
      const restaurant = await RestaurantRepository.getByQuery({ owner_id });
      if (!restaurant) {
        throw Error("maybe this owner doesn't have a restaurant");
      }
      const chef = await ChefRepository.getById(id, restaurant.id);
      if (!chef) {
        throw Error("chef not found");
      }
      res.status(200).json({ res: chef });
    } catch (err) {
      next(err);
    }
  }

  static async deleteWaiter(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.params.id;
      const owner_id = req.user.userId;
      const restaurant = await RestaurantRepository.getByQuery({ owner_id });
      if (!restaurant) {
        throw Error("maybe this owner doesn't have a restaurant");
      }
      const waiter = await WaiterRepository.getById(id, restaurant.id);
      if (!waiter) {
        throw Error("waiter not found");
      }
      await executeMethodsWithTransaction([
        () => WaiterRepository.deleteById(id, restaurant.id),
        () => UserRepository.deleteByEmail(waiter.email),
      ]);

      res.status(201).json({ res: waiter });
    } catch (err) {
      next(err);
    }
  }

  static async deleteChef(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.params.id;
      const owner_id = req.user.userId;
      const restaurant = await RestaurantRepository.getByQuery({ owner_id });
      if (!restaurant) {
        throw Error("maybe this owner doesn't have a restaurant");
      }
      const chef = await ChefRepository.getById(id, restaurant.id);
      if (!chef) {
        throw Error("chef not found");
      }
      await executeMethodsWithTransaction([
        () => ChefRepository.deleteById(id, restaurant.id),
        () => UserRepository.deleteByEmail(chef.email),
      ]);

      res.status(201).json({ res: chef });
    } catch (err) {
      next(err);
    }
  }

  static async updateWaiter(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.params.id;
      const owner_id = req.user.userId;
      let { name, email, password } = req.body;
      password = await hashPassword(password);
      const restaurant = await RestaurantRepository.getByQuery({ owner_id });
      if (!restaurant) {
        throw Error("maybe this owner doesn't have a restaurant");
      }
      const waiter = await WaiterRepository.getById(id, restaurant.id);

      if (!waiter) {
        throw Error("waiter not found");
      }

      const [updatedWaiter] = (await executeMethodsWithTransaction([
        () =>
          WaiterRepository.updateCols(
            id,
            { name, email, password },
            restaurant.id
          ),
        () => UserRepository.updateEmail(waiter.email, email),
      ])) as [WaiterModel, void];
      res.status(201).json({ res: updatedWaiter });
    } catch (err) {
      next(err);
    }
  }

  static async updateChef(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.params.id;
      const owner_id = req.user.userId;
      let { name, email, password } = req.body;
      password = await hashPassword(password);
      const restaurant = await RestaurantRepository.getByQuery({ owner_id });
      if (!restaurant) {
        throw Error("maybe this owner doesn't have a restaurant");
      }
      const chef = await ChefRepository.getById(id, restaurant.id);

      if (!chef) {
        throw Error("chef not found");
      }

      const [updatedChef] = (await executeMethodsWithTransaction([
        () =>
          ChefRepository.updateCols(
            id,
            { name, email, password },
            restaurant.id
          ),
        () => UserRepository.updateEmail(chef.email, email),
      ])) as [ChefModel, void];

      res.status(201).json({ res: updatedChef });
    } catch (err) {
      next(err);
    }
  }

  static async updateRestaurant(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const owner_id = req.user.userId;
      const id = req.params.id;
      const { name, tele, description, tables_number } = req.body;
      const updatedRestaurant = await RestaurantRepository.updateCols(
        id,
        { name, tele, description, tables_number },
        owner_id
      );
      res.status(201).json({ res: updatedRestaurant });
    } catch (err) {
      next(err);
    }
  }
  //owner have just one restaurant for now
  static async getOwnerRestaurant(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const owner_id = req.user.userId;
      const restaurant = await RestaurantRepository.getByQuery({ owner_id });
      if (!restaurant) {
        throw Error(
          "this is not suppose to happend, but this owner does not have restaurant"
        );
      }
      res.status(200).json({ res: restaurant });
    } catch (err) {
      next(err);
    }
  }
  static async getOwnerRestaurantPlates(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const owner_id = req.user.userId;
      const restaurant = await RestaurantRepository.getByQuery({ owner_id });
      if (!restaurant) {
        throw Error(
          "this is not suppose to happend, but this owner does not have restaurant"
        );
      }
      const plates = await PlateRepository.getManyByQuery({
        restaurant_id: restaurant.id,
      });
      res.status(200).json({ res: plates });
    } catch (err) {
      next(err);
    }
  }
  static async getOwnerRestaurantPlate(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const owner_id = req.user.userId;
      const plate_id = req.params.id;
      const restaurant = await RestaurantRepository.getByQuery({ owner_id });
      if (!restaurant) {
        throw Error(
          "this is not suppose to happend, but this owner does not have restaurant"
        );
      }
      const plate = await PlateRepository.getById(plate_id, restaurant.id);
      res.status(200).json({ res: plate });
    } catch (err) {
      next(err);
    }
  }

  static async createPlate(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { name, description, ingredients, price } = req.body;
      const owner_id = req.user.userId;
      const restaurant = await RestaurantRepository.getByQuery({ owner_id });
      if (!restaurant) {
        throw Error(
          "this is not suppose to happend, but this owner does not have restaurant"
        );
      }
      const plate = await PlateRepository.createPlate({
        name,
        description,
        ingredients,
        price,
        restaurant_id: restaurant.id,
      });
      res.status(201).json({ res: plate });
    } catch (err) {
      next(err);
    }
  }
  static async deletePlate(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.params.id;
      const owner_id = req.user.userId;
      const restaurant = await RestaurantRepository.getByQuery({ owner_id });
      if (!restaurant) {
        throw Error("maybe this owner doesn't have a restaurant");
      }
      const plate = await PlateRepository.getById(id, restaurant.id);
      if (!plate) {
        throw Error("plate not found");
      }
      await PlateRepository.deleteById(id, restaurant.id);
      res.status(201).json({ res: plate });
    } catch (err) {
      next(err);
    }
  }
  static async updatePlate(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.params.id;
      const { name, description, ingredients, price } = req.body;
      const owner_id = req.user.userId;
      const restaurant = await RestaurantRepository.getByQuery({ owner_id });
      if (!restaurant) {
        throw Error("maybe this owner doesn't have a restaurant");
      }
      const plate = await PlateRepository.updateCols(
        id,
        {
          name,
          description,
          ingredients,
          price,
        },
        restaurant.id
      );
      res.status(201).json({ res: plate });
    } catch (err) {
      next(err);
    }
  }
  static async getReservations(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const owner_id = req.user.userId;
      const restaurant = await RestaurantRepository.getByQuery({ owner_id });
      if (!restaurant) {
        throw Error("maybe this owner doesn't have a restaurant");
      }
      const reservations = await ReservationRepository.getManyByQuery({
        restaurant_id: restaurant.id,
      });
      res.status(200).json({ res: reservations });
    } catch (err) {
      next(err);
    }
  }
  static async deleteReservation(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const owner_id = req.user.userId;
      const id = req.params.id;
      const restaurant = await RestaurantRepository.getByQuery({ owner_id });
      if (!restaurant) {
        throw Error("maybe this owner doesn't have a restaurant");
      }
      const reservation = await ReservationRepository.getById(
        id,
        restaurant.id
      );
      if (!reservation) {
        throw Error("reservation not found");
      }
      await ReservationRepository.deleteById(id, restaurant.id);
      res.status(201).json({ res: reservation });
    } catch (err) {
      next(err);
    }
  }
  static async getRestaurantStatistics(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const owner_id = req.user.userId;
      const restaurant = await RestaurantRepository.getByQuery({ owner_id });
      if (!restaurant) {
        throw Error("maybe this owner doesn't have a restaurant");
      }
      //day
      const todaysBookings = await StatisticRepository.getTodaysBookings(
        restaurant.id
      );
      const todaysRevenues = await StatisticRepository.getTodaysRevenues(
        restaurant.id
      );
      //month
      const thisMonthBookings = await StatisticRepository.getThisMonthBookings(
        restaurant.id
      );
      const thisMonthRevenues = await StatisticRepository.getThisMonthRevenues(
        restaurant.id
      );
      //year
      const thisYearBookings = await StatisticRepository.getThisYearBookings(
        restaurant.id
      );
      const thisYearRevenues = await StatisticRepository.getThisYearRevenues(
        restaurant.id
      );
      res.status(200).json({
        res: {
          todaysBookings: todaysBookings.bookings,
          todaysRevenues: todaysRevenues.revenues,
          thisMonthBookings: thisMonthBookings.bookings,
          thisMonthRevenues: thisMonthRevenues.revenues,
          thisYearBookings: thisYearBookings.bookings,
          thisYearRevenues: thisYearRevenues.revenues,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}

export default OwnerController;
