import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { CreateRecipeDTO, RecipesFilterDto } from './recipes.dto';
import { RecipeEntity } from './recipe.entity';
import { RecipesService } from './recipes.service';

@Controller('recipes')
export class RecipesController {
  constructor(@Inject(RecipesService) private recipesService: RecipesService) {}
  @Get()
  getAll(@Query() filters: RecipesFilterDto): Promise<RecipeEntity[]> {
    return this.recipesService.findAll(filters);
  }

  @Post()
  create(@Body() payload: CreateRecipeDTO): Promise<RecipeEntity> {
    return this.recipesService.create(payload);
  }
}
