import { NextFunction, Request, Response } from 'express';
import { CreateDictDto, QueryDictsDto } from '@dtos/dicts.dto';
import { Dict } from '@interfaces/dicts.interface';
import dictService, { PageDictResult } from '@services/dicts.service';
import { formatResultData } from './../utils/formatResult';

class DictsController {
  public dictService = new dictService();

  public getDicts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const queryParams = req.query as unknown as QueryDictsDto;
      const findAllDictsData: PageDictResult = await this.dictService.findAllDict(queryParams);
      let result = Number.isInteger(queryParams.offset)
        ? { list: findAllDictsData.rows, total: findAllDictsData.count }
        : findAllDictsData.rows;

      res.status(200).json(formatResultData({ result }));
    } catch (error) {
      next(error);
    }
  };

  public getDictById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dictId = req.params.dictId;
      const findOneDictData: Dict[] = await this.dictService.findDictsByCode(dictId);

      res.status(200).json(formatResultData({ result: findOneDictData }));
    } catch (error) {
      next(error);
    }
  };

  public createDict = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dictData: CreateDictDto = req.body;
      const createDictData: Dict = await this.dictService.createDict(dictData);
      res.status(201).json(formatResultData({ result: createDictData }));
    } catch (error) {
      next(error);
    }
  };

  public updateDict = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dictId = Number(req.params.id);
      const dictData: CreateDictDto = req.body;
      const updateDictData: Dict = await this.dictService.updateDict(dictId, dictData);
      res.status(200).json(formatResultData({ result: updateDictData }));
    } catch (error) {
      next(error);
    }
  };

  public deleteDict = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dictId = Number(req.params.id);
      const deleteDictData: Dict = await this.dictService.deleteDict(dictId);
      res.status(200).json(formatResultData({ result: deleteDictData }));
    } catch (error) {
      next(error);
    }
  };
}

export default DictsController;
