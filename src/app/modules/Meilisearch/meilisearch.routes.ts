import express from 'express';
import { MeiliSearchController } from './meilisearch.controller';
const router = express.Router();

router.get('/', MeiliSearchController.getItemsFromMeili);

export const MeilisearchRoutes = router;
