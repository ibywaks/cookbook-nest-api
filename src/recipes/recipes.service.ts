import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeEntity } from './recipe.entity';
import { Like, Repository } from 'typeorm';
import { CreateRecipeDTO, RecipesFilterDto } from './recipes.dto';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(RecipeEntity)
    private recipeRepository: Repository<RecipeEntity>,
  ) {}

  create(payload: CreateRecipeDTO): Promise<RecipeEntity> {
    return this.recipeRepository.save(payload);
  }

  findAll(filters: RecipesFilterDto): Promise<RecipeEntity[]> {
    const whereQuery = {
      ...(filters?.author ? { author: Like(filters.author) } : {}),
    };

    return this.recipeRepository.find({
      where: whereQuery,
    });
  }
}
