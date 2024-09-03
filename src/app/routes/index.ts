import express from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { UserRoutes } from '../modules/User/user.route';
import { ItemRoutes } from '../modules/Item/item.route';
import { ItemCategoryRoutes } from '../modules/ItemCategory/itemCategory.route';
import { ProfileRoutes } from '../modules/Profile/profile.route';
import { ClaimRequestRoutes } from '../modules/ClaimRequest/claimRequest.route';
import { MeilisearchRoutes } from '../modules/Meilisearch/meilisearch.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/item-categories',
    route: ItemCategoryRoutes,
  },
  {
    path: '/items',
    route: ItemRoutes,
  },
  {
    path: '/claim-request',
    route: ClaimRequestRoutes,
  },
  {
    path: '/search-items',
    route: MeilisearchRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/profile',
    route: ProfileRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
